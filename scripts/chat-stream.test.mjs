import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

// Test the actual TS parser with the project's existing compiler, without a loader dependency.
const modules = new Map();
function loadModule(name) {
  if (!['chat', 'chat-projects', 'chat-stream'].includes(name)) throw new Error('Unexpected test import');
  if (modules.has(name)) return modules.get(name);
  const exports = {};
  modules.set(name, exports);
  const source = readFileSync(new URL(`../src/lib/${name}.ts`, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
  vm.runInNewContext(outputText, { exports, TextDecoder, require: specifier => loadModule(specifier.replace('./', '')) }, { filename: `${name}.js` });
  return exports;
}
const { readChatStream } = loadModule('chat-stream');
const { answerProjectIds } = loadModule('chat-projects');
const encoder = new TextEncoder();
function response(events, splitBytes = false) {
  const bytes = encoder.encode(events.map(event => JSON.stringify(event)).join('\n') + '\n');
  return new Response(new ReadableStream({
    start(controller) {
      if (splitBytes) for (const byte of bytes) controller.enqueue(Uint8Array.of(byte));
      else controller.enqueue(bytes);
      controller.close();
    },
  }));
}

test('split UTF-8 and JSON chunks render deltas and preserve the completed answer', async () => {
  let partial = '';
  const message = await readChatStream(response([
    { type: 'delta', text: '달빛' },
    { type: 'delta', text: '서점입니다.' },
    { type: 'done', answer: '달빛서점입니다.', projectIds: ['work-moonlight', 'invented'] },
  ], true), delta => { partial += delta; });
  assert.equal(partial, '달빛서점입니다.');
  assert.equal(message.content, partial);
  assert.deepEqual([...message.projectIds], ['work-moonlight']);
});

test('an interrupted stream cannot be committed as a completed conversation', async () => {
  await assert.rejects(readChatStream(response([{ type: 'delta', text: '아직 작성 중' }]), () => {}), /중간에 끊겼/);
});

test('server stream errors are surfaced instead of committing partial text', async () => {
  await assert.rejects(readChatStream(response([{ type: 'delta', text: '일부' }, { type: 'error', message: '연결 오류' }]), () => {}), /연결 오류/);
});

test('empty completion is rejected', async () => {
  await assert.rejects(readChatStream(response([{ type: 'done', answer: ' ', projectIds: [] }]), () => {}), /중간에 끊겼/);
});

test('completion releases the underlying stream', async () => {
  let canceled = false;
  const stream = new ReadableStream({
    start(controller) { controller.enqueue(encoder.encode(JSON.stringify({ type: 'done', answer: '완료', projectIds: [] }) + '\n')); },
    cancel() { canceled = true; },
  });
  await readChatStream(new Response(stream), () => {});
  assert.equal(canceled, true);
});

test('comparison actions resolve registered WORK and PLAY anchors only', () => {
  assert.deepEqual([...answerProjectIds('Forlog와 자작의 차이')], ['work-forlog', 'work-jajak']);
  assert.deepEqual([...answerProjectIds('라스트 오더와 NO SIGNAL')], ['play-last-order', 'play-signal']);
  assert.deepEqual([...answerProjectIds('https://unknown.example/unknown')], []);
});

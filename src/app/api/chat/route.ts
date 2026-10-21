import OpenAI from 'openai';
import { CHAT_LIMITS, type ChatMessage, type ChatStreamEvent } from '../../../lib/chat';
import { answerProjectIds, getChatProject } from '../../../lib/chat-projects';
import { getPortfolioInstructions } from '../../../lib/portfolio-chat';

export const runtime = 'nodejs';
export const maxDuration = 60;

function parseMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== 'object' || !('messages' in body) || !Array.isArray(body.messages)) return null;
  if (!body.messages.length || body.messages.length > CHAT_LIMITS.historyLength) return null;
  let totalLength = 0;
  const messages: ChatMessage[] = [];
  for (const item of body.messages) {
    if (!item || typeof item !== 'object' || (item.role !== 'user' && item.role !== 'assistant') || typeof item.content !== 'string') return null;
    const content = item.content.trim();
    if (!content || content.length > (item.role === 'user' ? CHAT_LIMITS.messageLength : CHAT_LIMITS.answerLength)) return null;
    totalLength += content.length;
    if (totalLength > CHAT_LIMITS.totalLength) return null;
    messages.push({ role: item.role, content });
  }
  return messages.at(-1)?.role === 'user' ? messages : null;
}

export async function POST(request: Request) {
  let messages: ChatMessage[] | null;
  let projectId: string | undefined;
  try {
    const text = await request.text();
    if (text.length > 32000) return Response.json({ message: '질문이 너무 깁니다. 내용을 줄여 주세요.' }, { status: 413 });
    const body = JSON.parse(text);
    messages = parseMessages(body);
    if (body?.projectId !== undefined) {
      const project = getChatProject(body.projectId);
      if (!project) return Response.json({ message: '작품 정보를 확인하고 다시 보내 주세요.' }, { status: 400 });
      projectId = project.id;
    }
  } catch {
    return Response.json({ message: '질문 내용을 확인하고 다시 보내 주세요.' }, { status: 400 });
  }
  if (!messages) return Response.json({ message: '질문 내용을 확인하고 다시 보내 주세요.' }, { status: 400 });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return Response.json({ message: '지금은 안내 도우미를 준비 중입니다. 잠시 후 다시 이용해 주세요.' }, { status: 503 });

  try {
    // Lazy initialization also lets builds succeed before a key is configured.
    const openai = new OpenAI({ apiKey, timeout: 45000, maxRetries: 0 });
    const upstream = await openai.responses.create({
      model: 'gpt-5-mini',
      instructions: await getPortfolioInstructions(projectId),
      input: messages,
      reasoning: { effort: 'low' },
      max_output_tokens: 1600,
      store: false,
      stream: true,
    }, { signal: request.signal });
    let canceled = false;
    const encoder = new TextEncoder();
    const body = new ReadableStream<Uint8Array>({
      async start(controller) {
        const emit = (event: ChatStreamEvent) => {
          if (!canceled) controller.enqueue(encoder.encode(JSON.stringify(event) + '\n'));
        };
        let answer = '';
        let completed = false;
        try {
          for await (const event of upstream) {
            if (event.type === 'response.output_text.delta' || event.type === 'response.refusal.delta') {
              answer += event.delta;
              if (answer.length > CHAT_LIMITS.answerLength) throw new Error('Answer exceeded limit');
              emit({ type: 'delta', text: event.delta });
            } else if (event.type === 'response.completed') {
              if (!answer.trim()) throw new Error('Empty answer');
              emit({ type: 'done', answer: answer.trim(), projectIds: answerProjectIds(answer) });
              completed = true;
            } else if (event.type === 'response.failed' || event.type === 'response.incomplete' || event.type === 'error') {
              throw new Error('Upstream response incomplete');
            }
          }
          if (!completed && !canceled) throw new Error('Stream ended early');
        } catch {
          upstream.controller.abort();
          emit({ type: 'error', message: '답변 연결이 중간에 끊겼어요. 질문을 다시 보내 주세요.' });
        } finally {
          if (!canceled) controller.close();
        }
      },
      cancel() { canceled = true; upstream.controller.abort(); },
    });
    return new Response(body, { headers: { 'Content-Type': 'application/x-ndjson; charset=utf-8', 'Cache-Control': 'no-store', 'X-Accel-Buffering': 'no' } });
  } catch (error) {
    // Never log request content, environment values or the upstream error body.
    const status = error instanceof OpenAI.APIError ? error.status : undefined;
    console.error('Portfolio chat request failed', { status: status ?? 'connection_or_timeout' });
    if (status === 429) return Response.json({ message: '지금은 답변 요청이 많습니다. 잠시 후 다시 보내 주세요.' }, { status: 429 });
    return Response.json({ message: '답변을 가져오지 못했어요. 잠시 후 다시 시도하거나 CONTACT로 문의해 주세요.' }, { status: 503 });
  }
}

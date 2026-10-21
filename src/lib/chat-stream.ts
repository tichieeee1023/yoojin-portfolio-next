import { getChatProject } from './chat-projects';
import { CHAT_LIMITS, type ChatMessage } from './chat';

export async function readChatStream(response: Response, onDelta: (text: string) => void): Promise<ChatMessage> {
  if (!response.body) throw new Error('답변 연결을 시작하지 못했어요. 다시 보내 주세요.');
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  try {
    while (true) {
      const { value, done } = await reader.read();
      buffer += decoder.decode(value, { stream: !done });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';
      if (done && buffer.trim()) { lines.push(buffer); buffer = ''; }
      for (const line of lines) {
        if (!line.trim()) continue;
        const event = JSON.parse(line);
        if (event.type === 'error') throw new Error(typeof event.message === 'string' ? event.message : '답변 연결이 끊겼어요. 다시 보내 주세요.');
        if (event.type === 'delta' && typeof event.text === 'string') onDelta(event.text);
        else if (event.type === 'done' && typeof event.answer === 'string' && event.answer.trim() && event.answer.length <= CHAT_LIMITS.answerLength) {
          return { role: 'assistant', content: event.answer, projectIds: Array.isArray(event.projectIds) ? event.projectIds.filter((id: unknown) => Boolean(getChatProject(id))).slice(0, 3) : [] };
        }
      }
      if (done) throw new Error('답변 연결이 중간에 끊겼어요. 질문을 다시 보내 주세요.');
      if (buffer.length > 100000) throw new Error('답변을 읽지 못했어요. 다시 보내 주세요.');
    }
  } finally {
    await reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}

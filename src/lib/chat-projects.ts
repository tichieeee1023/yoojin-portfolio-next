export type ChatProject = { id: string; name: string; aliases: string[]; kind: 'work' | 'play' };

// IDs are existing portfolio anchors, never destinations supplied by the model.
export const CHAT_PROJECTS: ChatProject[] = [
  { id: 'work-moonlight', name: '달빛서점', aliases: ['달빛서점', 'Moonlight Bookstore'], kind: 'work' },
  { id: 'work-harvest', name: '데일리 하비스트', aliases: ['데일리 하비스트', '데일리 하베스트', 'Daily Harvest'], kind: 'work' },
  { id: 'work-b612', name: '어린왕자 B612', aliases: ['어린왕자', 'B612', 'The Little Prince'], kind: 'work' },
  { id: 'work-forlog', name: '포로그', aliases: ['포로그', 'Forlog'], kind: 'work' },
  { id: 'work-midnight', name: '미드나잇 코드', aliases: ['미드나잇 코드', 'Midnight Chord'], kind: 'work' },
  { id: 'work-jajak', name: '자작', aliases: ['자작', 'JAJAK'], kind: 'work' },
  { id: 'play-last-order', name: 'LAST ORDER', aliases: ['LAST ORDER', '라스트 오더'], kind: 'play' },
  { id: 'play-subway', name: 'SUBWAY', aliases: ['SUBWAY', '사라진 다음 역'], kind: 'play' },
  { id: 'play-signal', name: 'NO SIGNAL', aliases: ['NO SIGNAL', '귀환 신호 없음'], kind: 'play' },
  { id: 'play-brick', name: 'NEON BREAK', aliases: ['NEON BREAK', '네온 브레이크', '벽돌깨기'], kind: 'play' },
];

export const getChatProject = (id: unknown) => typeof id === 'string' ? CHAT_PROJECTS.find(project => project.id === id) : undefined;

export function answerProjectIds(answer: string): string[] {
  const normalize = (text: string) => text.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
  const text = normalize(answer);
  return CHAT_PROJECTS.filter(project => project.aliases.some(alias => text.includes(normalize(alias)))).map(project => project.id).slice(0, 3);
}

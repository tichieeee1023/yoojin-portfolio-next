'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
import { CHAT_LIMITS, type ChatMessage } from '../../lib/chat';
import { getChatProject } from '../../lib/chat-projects';
import { readChatStream } from '../../lib/chat-stream';
import { navigateToChapter } from '../PortfolioChapters/chapterNavigation';
import useCurrentProject from './useCurrentProject';
import AnswerContent from './AnswerContent';
import styles from './PortfolioChatbot.module.css';

const suggestions = ['대표 프로젝트를 소개해 주세요', '팀 프로젝트에서 어떤 역할을 맡았나요?', '포로그와 자작의 차이를 알려 주세요'];
const projectQuestions = [
  { label: '구현 기능', question: '의 주요 구현 기능을 알려 주세요' },
  { label: '담당 역할', question: '에서 이유진이 담당한 역할을 알려 주세요' },
  { label: '사용 기술', question: '에서 사용한 기술을 알려 주세요' },
];

// Adapted from the classroom GuideChatbot: keep its focus, scroll and error flow.
export default function PortfolioChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [pendingQuestion, setPendingQuestion] = useState('');
  const [pendingAnswer, setPendingAnswer] = useState('');
  const [error, setError] = useState('');
  const pendingRef = useRef<AbortController | null>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const followScrollRef = useRef(true);
  const panelId = useId();
  const loading = Boolean(pendingQuestion);
  const currentProject = useCurrentProject(open);

  useEffect(() => () => pendingRef.current?.abort(), []);
  useEffect(() => {
    if (messageRef.current && followScrollRef.current) messageRef.current.scrollTop = messageRef.current.scrollHeight;
  }, [messages, open, pendingQuestion, pendingAnswer]);
  useEffect(() => {
    if (open) inputRef.current?.focus({ preventScroll: true });
  }, [open, loading]);

  const close = () => {
    setOpen(false);
    toggleRef.current?.focus({ preventScroll: true });
  };

  const send = async (question: string) => {
    question = question.trim();
    if (!question || question.length > CHAT_LIMITS.messageLength || pendingRef.current) return;
    const controller = new AbortController();
    pendingRef.current = controller;
    setInput('');
    setError('');
    setPendingQuestion(question);
    setPendingAnswer('');
    followScrollRef.current = true;
    const questionMessage: ChatMessage = { role: 'user', content: question };
    const history = [...messages, questionMessage].slice(-CHAT_LIMITS.historyLength).map(({ role, content }) => ({ role, content }));
    while (history.length > 1 && history.reduce((length, message) => length + message.content.length, 0) > CHAT_LIMITS.totalLength) history.shift();
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, projectId: currentProject?.id }),
        signal: AbortSignal.any([controller.signal, AbortSignal.timeout(55000)]),
      });
      if (!response.ok) {
        const data: { message?: string } = await response.json();
        throw new Error(data.message || '답변을 가져오지 못했어요. 다시 보내 주세요.');
      }
      const answer = await readChatStream(response, delta => setPendingAnswer(current => current + delta));
      setMessages(current => [...current, questionMessage, answer]);
    } catch (requestError) {
      setInput(question);
      setError(controller.signal.aborted ? '답변 작성을 중지했어요. 질문을 다시 보내실 수 있습니다.' : requestError instanceof Error && requestError.name === 'TimeoutError'
        ? '답변이 조금 늦어지고 있어요. 잠시 후 다시 보내 주세요.'
        : requestError instanceof Error && !(requestError instanceof TypeError) && !(requestError instanceof SyntaxError)
          ? requestError.message : '연결을 확인하고 다시 보내 주세요.');
    } finally {
      pendingRef.current = null;
      setPendingQuestion('');
      setPendingAnswer('');
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); void send(input); };
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  };

  const viewProject = (id: string) => {
    const project = getChatProject(id);
    if (!project) return;
    setOpen(false);
    requestAnimationFrame(() => navigateToChapter(project.id));
  };

  return (
    <aside className={styles.chatbot} aria-label="포트폴리오 가이드 챗봇" data-portfolio-chat
      onWheel={event => event.stopPropagation()} onTouchStart={event => event.stopPropagation()}
      onTouchMove={event => event.stopPropagation()} onTouchEnd={event => event.stopPropagation()}
      onKeyDown={event => { event.stopPropagation(); if (event.key === 'Escape') close(); }}>
      {open && <section id={panelId} className={styles.panel} role="dialog" aria-labelledby={panelId + '-title'}>
        <header className={styles.header}>
          <div><span className={styles.eyebrow}>YOOJIN / FIELD NOTES</span><h2 id={panelId + '-title'}>포트폴리오 가이드<span>AI 챗봇</span></h2></div>
          <button className={styles.close} type="button" onClick={close} aria-label="포트폴리오 가이드 챗봇 닫기">×</button>
        </header>
        {currentProject && <div className={styles.context}>
          <p>지금 보는 작품 <strong>{currentProject.name}</strong></p>
          <div>{projectQuestions.map(item => <button type="button" key={item.label} disabled={loading}
            onClick={() => { void send(currentProject.name + item.question); }}>{item.label}</button>)}</div>
        </div>}
        <div className={styles.messages} ref={messageRef} role="log" aria-label="대화 내용" aria-live="polite" aria-relevant="additions"
          onScroll={event => { const element = event.currentTarget; followScrollRef.current = element.scrollHeight - element.scrollTop - element.clientHeight < 48; }}>
          <div className={styles.greeting}><span className={styles.eyebrow}>A LITTLE CONVERSATION</span><p>어떤 작업이<br /><em>궁금하신가요?</em></p><span>프로젝트와 담당 역할을 안내하는 AI 챗봇입니다.</span></div>
          {messages.length === 0 && !currentProject && !loading && <div className={styles.suggestions} aria-label="추천 질문">
            {suggestions.map(question => <button type="button" key={question} onClick={() => { void send(question); }}>{question}<span aria-hidden="true">↗</span></button>)}
          </div>}
          {messages.map((message, index) => <div key={index} className={message.role === 'user' ? styles.user : styles.answer}>
            <span className={styles.role}>{message.role === 'user' ? 'YOU' : 'YOOJIN / GUIDE'}</span>
            {message.role === 'assistant' ? <AnswerContent content={message.content} /> : <p>{message.content}</p>}
            {message.role === 'assistant' && Boolean(message.projectIds?.length) && <div className={styles.projectLinks} aria-label="관련 프로젝트로 이동">
              {message.projectIds?.map(id => { const project = getChatProject(id); return project ? <button key={id} type="button" onClick={() => viewProject(id)}>{project.name} 보기 <span aria-hidden="true">↗</span></button> : null; })}
            </div>}
          </div>)}
          {loading && <><div className={styles.user}><span className={styles.role}>YOU</span><p>{pendingQuestion}</p></div>
            {pendingAnswer && <div className={styles.answer} aria-live="off" aria-busy="true"><span className={styles.role}>YOOJIN / GUIDE</span><AnswerContent content={pendingAnswer} /></div>}
            <div className={styles.loading}><span aria-hidden="true">✳</span><span role="status">{pendingAnswer ? '답변을 작성하고 있어요…' : '작업 노트를 살펴보고 있어요…'}</span><button type="button" onClick={() => pendingRef.current?.abort()}>답변 중지</button></div></>}
        </div>
        {error && <p className={styles.error} role="alert">{error}</p>}
        <form className={styles.form} onSubmit={handleSubmit} aria-busy={loading}>
          <label className={styles.srOnly} htmlFor={panelId + '-question'}>포트폴리오에 대해 질문하기</label>
          <div className={styles.inputRow}><textarea id={panelId + '-question'} ref={inputRef} value={input}
            onChange={event => { setInput(event.target.value); setError(''); }} onKeyDown={handleKeyDown}
            placeholder="궁금한 내용을 남겨 주세요" rows={2} maxLength={CHAT_LIMITS.messageLength} readOnly={loading} aria-disabled={loading} />
            <button type="submit" disabled={loading || !input.trim()} aria-label="질문 보내기"><span aria-hidden="true">↗</span></button></div>
          <p className={styles.note}>공개된 포트폴리오를 바탕으로 안내합니다.</p>
        </form>
      </section>}
      <button ref={toggleRef} className={styles.toggle} type="button" onClick={() => { if (open) close(); else setOpen(true); }}
        aria-expanded={open} aria-controls={open ? panelId : undefined} aria-label={open ? '포트폴리오 가이드 챗봇 닫기' : '포트폴리오 가이드 챗봇 열기'} title="포트폴리오 가이드 챗봇">
        <span className={styles.toggleIcon} aria-hidden="true">
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none" focusable="false">
            {open ? <path d="m10 10 12 12M22 10 10 22" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /> : <>
              <path d="M16 5.75c-6.08 0-11 3.94-11 8.8 0 2.52 1.33 4.8 3.46 6.4l-.71 5.3 5.3-3.2c.95.21 1.94.32 2.95.32 6.08 0 11-3.94 11-8.82S22.08 5.75 16 5.75Z" fill="currentColor" fillOpacity=".08" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              <circle cx="11" cy="14.75" r="1.15" fill="currentColor" />
              <circle cx="16" cy="14.75" r="1.15" fill="currentColor" />
              <circle cx="21" cy="14.75" r="1.15" fill="currentColor" />
            </>}
          </svg>
        </span>
        <span className={styles.toggleLabel} aria-hidden="true"><small>ASK YOOJIN</small>{open ? '포트폴리오 가이드 챗봇 닫기' : '포트폴리오 가이드 챗봇'}</span>
      </button>
    </aside>
  );
}

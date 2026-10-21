import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { navigateToChapter } from '../PortfolioChapters/chapterNavigation';

const items = [
  { id: 'about', en: 'ABOUT', ko: '소개', children: [
    { id: 'about-profile', label: '개발자 소개' }, { id: 'about-method', label: '작업 방식' }, { id: 'about-background', label: '배경과 경험' },
  ] },
  { id: 'projects', en: 'PORTFOLIO', ko: '대표 작업', children: [
    { id: 'work-moonlight', label: 'Moonlight Bookstore' }, { id: 'work-harvest', label: 'Daily Harvest' },
    { id: 'work-b612', label: 'The Little Prince B612' }, { id: 'work-forlog', label: 'Forlog' },
    { id: 'work-midnight', label: 'Midnight Chord' }, { id: 'work-jajak', label: 'JAJAK' },
  ] },
  { id: 'skills', en: 'SKILL', ko: '기술', children: [
    { id: 'skill-01', label: 'React 화면과 사용자 설정' }, { id: 'skill-02', label: 'Firebase 데이터와 주문 처리' },
    { id: 'skill-03', label: 'Canvas와 화면 인터랙션' },
  ] },
  { id: 'experiments', en: 'PLAY', ko: '게임 · 개발 실험', children: [
    { id: 'play-last-order', label: 'LAST ORDER' }, { id: 'play-subway', label: 'SUBWAY' },
    { id: 'play-signal', label: 'NO SIGNAL' }, { id: 'play-brick', label: 'NEON BREAK' },
  ] },
  { id: 'contact', en: 'CONTACT', ko: '연락처', children: [
    { id: 'contact', label: '연락처 보기' }, { id: 'contact-email', label: '이메일 보내기' },
  ] },
];

type Props = { light?: boolean; active?: string };

export default function MobileMenu({ light = false, active }: Props) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string[]>(['projects']);
  const menuId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
    };
  }, [open]);

  const goTo = (id: string) => {
    dialogRef.current?.close();
    setOpen(false);
    // Let the modal release focus and the scroll lock before navigating.
    window.requestAnimationFrame(() => navigateToChapter(id));
  };
  const currentChild = (id: string) => {
    if (window.location.hash === '#' + id) return true;
    const projectIds = items[1].children.map(child => child.id);
    return active === 'projects' && projectIds.indexOf(id) === Number(document.querySelector<HTMLElement>('.portfolio-book')?.dataset.projectIndex);
  };

  return <div className={`mobileSiteMenu${light ? ' mobileSiteMenu--light' : ''}`}>
    <button type="button" className="mobileSiteMenuTrigger" aria-expanded={open} aria-controls={menuId}
      aria-haspopup="dialog" aria-label="전체 목차 열기" onClick={() => setOpen(true)}>
      <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
    </button>
    {createPortal(<dialog ref={dialogRef} id={menuId} className="siteDirectory" aria-labelledby={menuId + '-title'}
      onCancel={() => setOpen(false)} onClose={() => setOpen(false)}
      onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right) setOpen(false); } }}
      onWheel={event => event.stopPropagation()}>
      <header className="siteDirectoryHeader">
        <div><span>YOOJIN / PORTFOLIO</span><h2 id={menuId + '-title'}>전체 목차<span>INDEX</span></h2></div>
        <button type="button" aria-label="전체 목차 닫기" onClick={() => setOpen(false)}>×</button>
      </header>
      <nav aria-label="전체 섹션과 상세 목차">
        {items.map((item, index) => {
          const isExpanded = expanded.includes(item.id);
          const listId = menuId + '-' + item.id;
          return <div className="siteDirectoryGroup" key={item.id}>
            <div className="siteDirectoryRow">
              <a href={'#' + item.id} aria-current={active === item.id ? 'location' : undefined}
                onClick={event => { event.preventDefault(); goTo(item.id); }}>
                <span className="siteDirectoryNumber">{String(index + 1).padStart(2, '0')}</span>
                <strong>{item.en}</strong><small>{item.ko}</small>
              </a>
              <button type="button" aria-expanded={isExpanded} aria-controls={listId} aria-label={item.en + ' 하위 목차 ' + (isExpanded ? '접기' : '펼치기')}
                onClick={() => setExpanded(value => value.includes(item.id) ? value.filter(id => id !== item.id) : [...value, item.id])}>
                <span aria-hidden="true">{isExpanded ? '−' : '+'}</span>
              </button>
            </div>
            <ul id={listId} className="siteDirectoryChildren" hidden={!isExpanded}>
              {item.children.map((child, childIndex) => <li key={child.id}><a href={'#' + child.id}
                aria-current={open && currentChild(child.id) ? 'location' : undefined}
                onClick={event => { event.preventDefault(); goTo(child.id); }}>
                <span aria-hidden="true">{String(childIndex + 1).padStart(2, '0')}</span>{child.label}<span aria-hidden="true">↗</span>
              </a></li>)}
            </ul>
          </div>;
        })}
      </nav>
      <footer className="siteDirectoryFooter">읽고, 해석하고, 화면으로 만듭니다.</footer>
    </dialog>, document.body)}
  </div>;
}

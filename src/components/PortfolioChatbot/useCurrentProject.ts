import { useEffect, useState } from 'react';
import { CHAT_PROJECTS, type ChatProject } from '../../lib/chat-projects';

function readCurrentProject(): ChatProject | null {
  const visible = (element: Element | null) => {
    if (!element) return false;
    const bounds = element.getBoundingClientRect();
    return bounds.top < innerHeight * .65 && bounds.bottom > innerHeight * .35;
  };
  const book = document.querySelector<HTMLElement>('.portfolio-book');
  if (visible(book) && book?.querySelector<HTMLElement>('.intro-sheet')?.inert) {
    return CHAT_PROJECTS.filter(project => project.kind === 'work')[Number(book.dataset.projectIndex)] ?? null;
  }
  if (visible(document.getElementById('play-detail'))) {
    const tiles = [...document.querySelectorAll('#experiments .tile')];
    const index = tiles.findIndex(tile => tile.getAttribute('aria-pressed') === 'true');
    return CHAT_PROJECTS.filter(project => project.kind === 'play')[index] ?? null;
  }
  return null;
}

export default function useCurrentProject(open: boolean) {
  const [project, setProject] = useState<ChatProject | null>(null);
  useEffect(() => {
    if (!open) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const next = readCurrentProject();
        setProject(current => current?.id === next?.id ? current : next);
      });
    };
    update();
    const observer = new MutationObserver(update);
    const root = document.getElementById('root');
    if (root) observer.observe(root, { subtree: true, childList: true, attributes: true, attributeFilter: ['data-project-index', 'aria-pressed', 'inert'] });
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [open]);
  return project;
}

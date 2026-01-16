import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import WhoIsBamForDoersCard from './WhoIsBamForDoersCard';
import WhoIsBamForConnectCard from './WhoIsBamForConnectCard';
import WhoIsBamForDiscoverCard from './WhoIsBamForDiscoverCard';
import WhoIsBamForDreamersCard from './WhoIsBamForDreamersCard';
import WhoIsBamForPortfolioCard from './WhoIsBamForPortfolioCard';
import WhoIsBamForShortlistCard from './WhoIsBamForShortlistCard';
import WhoIsBamForTitleCard from './WhoIsBamForTitleCard';

type Card = {
  title: string;
  subtitle: string;
  theme: string;
  image?: boolean;
  gallery?: boolean;
  search?: boolean;
  montage?: boolean;
};

const cards: Card[] = [];

type CardPanelProps = {
  card: Card;
};

const CardPanel = ({ card }: CardPanelProps) => (
  <div
    className={`flex h-screen w-screen shrink-0 flex-col justify-between px-12 py-16 ${card.theme}`}
  >
    <div className="max-w-4xl">
      <h3 className="text-5xl font-extrabold uppercase leading-tight">{card.title}</h3>
      <p className="mt-3 text-lg font-semibold opacity-80">{card.subtitle}</p>
    </div>

    {card.image ? (
      <div className="mt-8 grid flex-1 grid-cols-3 gap-4">
        <div className="col-span-2 rounded-3xl bg-[linear-gradient(135deg,#f9fafb,#d1d5db)]" />
        <div className="rounded-3xl bg-[linear-gradient(135deg,#d1d5db,#9ca3af)]" />
        <div className="rounded-3xl bg-[linear-gradient(135deg,#9ca3af,#6b7280)]" />
        <div className="col-span-2 rounded-3xl bg-[linear-gradient(135deg,#f3f4f6,#d1d5db)]" />
      </div>
    ) : null}

    {card.gallery ? (
      <div className="mt-8 flex-1 rounded-3xl bg-[linear-gradient(135deg,#111827,#1f2937)]" />
    ) : null}

    {card.search ? (
      <div className="mt-8 flex w-full max-w-3xl items-center gap-3 rounded-3xl bg-black px-6 py-6">
        <div className="h-12 flex-1 rounded-full bg-white/90" />
        <div className="h-12 w-12 rounded-full bg-[#BD0308]" />
      </div>
    ) : null}

    {card.montage ? (
      <div className="mt-8 grid flex-1 grid-cols-3 gap-4">
        <div className="rounded-2xl bg-[linear-gradient(135deg,#111827,#1f2937)]" />
        <div className="rounded-2xl bg-[linear-gradient(135deg,#1f2937,#111827)]" />
        <div className="rounded-2xl bg-[linear-gradient(135deg,#0f172a,#1f2937)]" />
        <div className="col-span-2 rounded-2xl bg-[linear-gradient(135deg,#111827,#0f172a)]" />
        <div className="rounded-2xl bg-[linear-gradient(135deg,#1f2937,#0f172a)]" />
      </div>
    ) : null}
  </div>
);

const WhoIsBamFor = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const hasEnteredFromAboveRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const [scrollLength, setScrollLength] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [titleProgress, setTitleProgress] = useState(0);
  const [floatingProgress, setFloatingProgress] = useState<number | undefined>(undefined);

  useEffect(() => {
    const update = () => {
      if (!trackRef.current || !sectionRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const totalScroll = Math.max(trackWidth - viewportWidth, 0);
      setScrollLength(totalScroll);
      setViewportHeight(window.innerHeight);
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!trackRef.current || !sectionRef.current) return;
      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;
      const start = rect.top + currentScrollY;
      const end = start + section.offsetHeight - window.innerHeight;
      const earlyStartOffset = viewportHeight * 0.6;
      const adjustedStart = start - earlyStartOffset;
      const rawProgress = (currentScrollY - start) / Math.max(end - start, 1);
      const titleRawProgress =
        (currentScrollY - adjustedStart) / Math.max(end - adjustedStart, 1);
      const progress = Math.min(Math.max(rawProgress, 0), 1);
      const translate = -scrollLength * progress;
      trackRef.current.style.transform = `translateX(${translate}px)`;
      const panelCount = trackRef.current.children.length;
      const panels = Math.max(panelCount - 1, 1);
      const firstPanelProgress = Math.min(Math.max(progress * panels, 0), 1);
      const isStickyActive = rect.top <= 0 && rect.bottom >= viewportHeight;
      setFloatingProgress(isStickyActive ? firstPanelProgress : undefined);
      if (!hasEnteredFromAboveRef.current && isScrollingDown && currentScrollY >= adjustedStart) {
        hasEnteredFromAboveRef.current = true;
      }
      const titleProgress = hasEnteredFromAboveRef.current
        ? Math.min(Math.max(titleRawProgress, 0), 1)
        : 0;
      section.style.setProperty('--title-progress', titleProgress.toFixed(3));
      setTitleProgress(titleProgress);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollLength]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#BD0308]"
      style={{ '--title-progress': 0 } as CSSProperties}
    >
      <div className="sticky top-0 overflow-hidden">
        <div ref={trackRef} className="flex w-max items-stretch">
          <WhoIsBamForTitleCard
            scrollProgress={titleProgress}
            floatingProgress={floatingProgress}
          />
          <WhoIsBamForDoersCard />
          <WhoIsBamForPortfolioCard />
          <WhoIsBamForConnectCard />
          <WhoIsBamForDreamersCard />
          <WhoIsBamForDiscoverCard />
          <WhoIsBamForShortlistCard />
          {cards.map((card) => (
            <CardPanel key={card.title} card={card} />
          ))}
        </div>
      </div>
      <div style={{ height: `${Math.max(scrollLength + viewportHeight, 1)}px` }} />
    </section>
  );
};

export default WhoIsBamFor;

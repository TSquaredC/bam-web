import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useEffect, useState, useMemo, useRef } from 'react';
import type { StaticImageData } from 'next/image';
import { PiCubeTransparentThin } from 'react-icons/pi';
import {
  RedBam,
  vertical1,
  vertical2,
  vertical3,
  vertical4,
  vertical5,
  vertical6,
  vertical10,
  leadscroll1,
  leadscroll2,
  leadscroll3,
} from '../../../assets/images';
import Image from 'next/image';

// --- Types & Helper Components ---

type ParallaxCard = {
  title: string;
  image: StaticImageData;
  accentColor: string;
};

type ParallaxColumnProps = {
  cards: ParallaxCard[];
  direction?: 'up' | 'down';
  duration?: number;
  likedTitles: string[];
};

const ParallaxColumn = ({
  cards,
  direction = 'up',
  duration = 30,
  likedTitles,
}: ParallaxColumnProps) => {
  const loopCards = [...cards, ...cards];
  const translate = direction === 'up' ? ['0%', '-50%'] : ['-50%', '0%'];

  return (
    <div className="h-full w-full overflow-hidden">
      <motion.div
        animate={{ y: translate }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
        className="flex w-full flex-col gap-1.5 sm:gap-3"
      >
        {loopCards.map((card, index) => {
          const isActive = likedTitles.includes(card.title);

          return (
            <div
              key={`${card.title}-${index}`}
              className="rounded-md bg-[#1B1B1B] p-[2px] sm:p-1.5"
            >
              <div
                // Mobile: Ultra compact height
                className="relative h-[65px] xs:h-[90px] sm:h-[180px] w-full overflow-hidden rounded-[4px] sm:rounded-md"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 45%, ${card.accentColor} 100%), url(${card.image.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: card.accentColor,
                }}
              >
                <span
                  className="absolute bottom-1.5 left-1.5 inline-flex items-center rounded sm:rounded-md px-1 py-[1px] text-[5px] xs:text-[7px] sm:text-sm font-semibold text-white"
                  style={{
                    background: 'rgba(12, 12, 12, 0.4)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {card.title}
                </span>

                <motion.span
                  key={isActive ? 'filled' : 'empty'}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{
                    scale: isActive ? 1.2 : 1,
                    opacity: 1,
                    color: isActive ? '#ff3b3b' : 'rgba(255,255,255,0.7)',
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  className="absolute bottom-1 right-1 text-[10px] xs:text-xs sm:text-xl select-none"
                >
                  {isActive ? '♥' : '♡'}
                </motion.span>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

// --- Main Component ---

const WhoIsBamForShortlistCard = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.5 });

  const shortlist = [
    {
      role: 'Singer*',
      cleanTitle: 'Singer',
      name: 'Sanjay Gupta',
      badges: ['Singer', 'Songwriter'],
      location: 'Mumbai',
      avatar: leadscroll1,
    },
    {
      role: 'Lead Guitar*',
      cleanTitle: 'Lead Guitarist',
      name: 'Arjun Rao',
      badges: ['Guitarist'],
      location: 'Mumbai',
      avatar: leadscroll2,
    },
    {
      role: 'Stage/Sound*',
      cleanTitle: 'Stage and Lighting',
      name: 'Aarav Khanna',
      badges: ['Stage', 'Sound'],
      location: 'Mumbai',
      avatar: leadscroll3,
    },
    {
      role: 'Video*',
      cleanTitle: 'Videographer',
      name: 'Vikram Singh',
      badges: ['Video'],
      location: 'Mumbai',
      avatar: leadscroll1,
    },
  ];

  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= shortlist.length) return 0;
        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [shortlist.length, isInView]);

  const activeTitles = useMemo(() => {
    return shortlist.slice(0, visibleCount).map((item) => item.cleanTitle);
  }, [visibleCount]);

  const column1 = [
    { title: 'Singer', image: vertical1, accentColor: '#6F5AAE' },
    { title: 'Theatre Actor', image: vertical2, accentColor: '#C57A3E' },
    { title: 'Videographer', image: vertical3, accentColor: '#5A7BCB' },
  ];
  const column2 = [
    { title: 'Choreographer', image: vertical4, accentColor: '#6A8B9E' },
    { title: 'Lead Guitarist', image: vertical5, accentColor: '#3C8E76' },
    { title: 'Stage and Lighting', image: vertical6, accentColor: '#6F5AAE' },
  ];

  return (
    <section className="relative flex min-h-screen w-screen items-center justify-center bg-white px-0 text-black sm:px-6 lg:px-8 pt-3">
      <div
        ref={containerRef}
        // WIDTH CONSTRAINT: Restricted max-width on mobile (280px-340px)
        className="flex w-full max-w-[330px] xs:max-w-[340px] sm:max-w-5xl flex-col items-start mx-auto"
      >
        <div className="w-full overflow-hidden rounded-lg sm:rounded-xl bg-black pt-2 sm:pt-5 h-[200px] xs:h-[280px] sm:h-[480px] lg:h-[550px]">
          {/* Main Grid: Tight gaps */}
          <div className="grid h-full gap-1 sm:gap-6 grid-cols-2 lg:grid-cols-[1.05fr_0.95fr]">
            {/* Left Side: Parallax Images */}
            <div className="rounded-t-lg sm:rounded-t-xl bg-[#1B1B1B] pr-1 pt-1 sm:pr-4 sm:pt-4">
              <div className="grid h-full gap-1 sm:gap-3 grid-cols-2">
                <ParallaxColumn
                  cards={column1}
                  direction="up"
                  duration={25}
                  likedTitles={activeTitles}
                />
                <ParallaxColumn
                  cards={column2}
                  direction="down"
                  duration={25}
                  likedTitles={activeTitles}
                />
              </div>
            </div>

            {/* Right Side: The "Project" Interface */}
            <div className="relative h-full w-full bg-[#121212] px-1.5 py-2 sm:px-6 sm:py-6 lg:rounded-tl-xl lg:px-8 pb-2">
              {/* Header: User & Logo - Micro */}
              <div className="flex items-center justify-between">
                <div className="relative h-5 w-5 sm:h-10 sm:w-10 overflow-hidden rounded-full border border-white/20">
                  <Image src={vertical10} alt="BK" fill className="object-cover" />
                </div>
                <Image src={RedBam} alt="BAM" className="h-2 w-auto sm:h-5 object-contain" />
              </div>
              <hr className="mt-1.5 sm:mt-4 border-white/10 w-full" />

              {/* Inner Project List Container */}
              <div
                className="bg-[#1A1A1A] py-1.5 pl-1.5 pr-0.5 sm:py-4 sm:pl-4 sm:pr-0 rounded-tl-lg sm:rounded-tl-xl z-10 
                              relative w-full mt-1.5 sm:mt-6 
                              lg:absolute lg:right-0 lg:w-[350px] xl:w-[400px] lg:mt-4 lg:mb-6"
              >
                <div className="mb-1 sm:mb-2">
                  <h3 className="font-normal text-white text-[8px] sm:text-sm">Project</h3>
                  <p className="text-[6px] sm:text-[10px] text-white/50 leading-none">
                    Add members
                  </p>
                </div>

                {/* LIST ITEMS */}
                <div className="flex flex-col gap-1 sm:gap-2">
                  {shortlist.map((person, index) => {
                    const isFilled = index < visibleCount;

                    return (
                      <div key={person.role} className="flex justify-between gap-1 sm:gap-4 mt-0">
                        {/* Role Label - Micro text */}
                        <p className="w-8 xs:w-10 sm:w-24 shrink-0 text-[6px] sm:text-[10px] font-medium text-white/80 mt-1 sm:mt-3 leading-tight break-words">
                          {person.role}
                        </p>

                        {/* Animated Container Row: Height 30px (mobile) */}
                        <div className="relative flex h-[30px] xs:h-[48px] sm:h-[76px] w-full items-center rounded-l-md sm:rounded-l-xl border-l border-t border-b border-white/10 bg-transparent pl-1 sm:pl-3 pr-0">
                          <AnimatePresence mode="popLayout" initial={false}>
                            {isFilled ? (
                              <motion.div
                                key="filled"
                                layout
                                initial={{ opacity: 0, scale: 0.9, x: -2, filter: 'blur(2px)' }}
                                animate={{ opacity: 1, scale: 1, x: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, scale: 0.9, filter: 'blur(2px)' }}
                                transition={{ duration: 0.4, ease: 'backOut' }}
                                className="flex w-full items-center justify-between"
                              >
                                <div className="flex items-center gap-1 sm:gap-2 rounded-md sm:rounded-xl bg-[#444649] py-0.5 px-1 sm:px-1.5 pr-2 sm:pr-6 shadow-sm w-full">
                                  {/* Avatar - Mobile 14px */}
                                  <div className="relative flex h-3.5 w-3.5 xs:h-6 xs:w-6 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full shadow-inner overflow-hidden">
                                    <Image
                                      src={person.avatar}
                                      alt={person.name ?? 'Avatar'}
                                      fill
                                      className="object-cover rounded-full"
                                      sizes="35px"
                                      priority
                                    />
                                  </div>

                                  {/* Text Content */}
                                  <div className="flex flex-col min-w-0 w-full relative">
                                    <div className="flex items-center gap-0.5 sm:gap-1">
                                      <span className="text-[6px] xs:text-[8px] sm:text-[10px] font-semibold text-white truncate max-w-[40px] xs:max-w-none">
                                        {person.name}
                                      </span>
                                      <svg
                                        className="h-2 w-2 sm:h-3.5 sm:w-3.5 text-[#3B82F6] shrink-0"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                      >
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                      </svg>
                                    </div>

                                    {/* Badges */}
                                    <div className="flex gap-0.5 overflow-hidden">
                                      {person.badges.map((badge, i) => (
                                        <span
                                          key={badge}
                                          className={`rounded-full bg-[#1E1E1E] px-1 sm:px-1.5 py-[0px] text-[4px] xs:text-[7px] sm:text-[9px] font-medium text-white whitespace-nowrap ${
                                            i > 0 ? 'hidden xs:inline-block' : ''
                                          }`}
                                        >
                                          {badge}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ) : (
                              <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                className="absolute inset-0 flex flex-col items-center justify-center w-full"
                              >
                                <PiCubeTransparentThin className="text-xs sm:text-2xl text-white/20" />
                                <span className="text-[5px] sm:text-[9px] text-white/30 text-center px-1 leading-none">
                                  Select
                                </span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-2 sm:mt-3 text-left bam-connect-copy">
          <span className="font-extrabold">Shortlist with confidence,</span>{' '}
          <br className="sm:hidden" />
          connect quickly, &amp; build your reliable crew in no time.
        </p>
      </div>
    </section>
  );
};

export default WhoIsBamForShortlistCard;

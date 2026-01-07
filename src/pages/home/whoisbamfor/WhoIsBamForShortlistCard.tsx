import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { StaticImageData } from 'next/image';
import {
  RedBam,
  vertical1,
  vertical2,
  vertical3,
  vertical4,
  vertical5,
  vertical6,
  vertical7,
  vertical8,
  vertical9,
  vertical10,
} from '../../../assets/images';
import Image from 'next/image';

type ParallaxCard = {
  title: string;
  image: StaticImageData;
  accentColor: string;
};

type ParallaxColumnProps = {
  cards: ParallaxCard[];
  direction?: 'up' | 'down';
  duration?: number;
};

const ParallaxColumn = ({ cards, direction = 'up', duration = 30 }: ParallaxColumnProps) => {
  const loopCards = [...cards, ...cards];
  const translate = direction === 'up' ? ['0%', '-50%'] : ['-50%', '0%'];

  const [activeHeart, setActiveHeart] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loopCards.length);
      setActiveHeart(randomIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [loopCards.length]);

  return (
    <div className="h-[320px] w-full overflow-hidden sm:h-[380px] lg:h-[440px]">
      <motion.div
        animate={{ y: translate }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
        className="flex w-full flex-col gap-3"
      >
        {loopCards.map((card, index) => {
          const isActive = index === activeHeart;

          return (
            <div key={`${card.title}-${index}`} className="rounded-md bg-[#1B1B1B] p-1.5">
              <div
                className="relative h-[180px] w-full overflow-hidden rounded-md"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 45%, ${card.accentColor} 100%), url(${card.image.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: card.accentColor,
                }}
              >
                <span
                  className="absolute bottom-3 left-3 inline-flex items-center rounded-md px-3 py-1 text-xs font-semibold text-white sm:text-sm"
                  style={{
                    background: 'rgba(12, 12, 12, 0.4)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {card.title}
                </span>

                {/* ❤️ HEART */}
                <motion.span
                  key={isActive ? 'filled' : 'empty'}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{
                    scale: isActive ? 1.2 : 1,
                    opacity: 1,
                    color: isActive ? '#ff3b3b' : 'rgba(255,255,255,0.7)',
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  className="absolute bottom-3 right-3 text-xl select-none"
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

const WhoIsBamForShortlistCard = () => {
  const shortlist = [
    {
      role: 'Singer*',
      name: 'Sanjau Gupta',
      badges: ['Singer', 'Songwriter'],
      location: 'Mumbai',
      avatar: 'SG',
      gradient: ['#7C3AED', '#EC4899'],
    },
    {
      role: 'Lead Guitarist*',
      name: 'Arjun Rao',
      badges: ['Lead Guitarist'],
      location: 'Mumbai',
      avatar: 'AR',
      gradient: ['#111827', '#6B7280'],
    },
    {
      role: 'Stage and sound*',
      name: 'Aarav Khanna',
      badges: ['Stage & Sound', 'Lights'],
      location: 'Mumbai',
      avatar: 'AK',
      gradient: ['#F97316', '#FACC15'],
    },
    {
      role: 'Videographers*',
      name: 'Vikram Singh',
      badges: ['Videographer'],
      location: 'Mumbai',
      avatar: 'VS',
      gradient: ['#6B7280', '#111827'],
    },
  ];
  const column1 = [
    { title: 'Stage and Lighting', image: vertical1, accentColor: '#6F5AAE' },
    { title: 'Theatre Actor', image: vertical2, accentColor: '#C57A3E' },
    { title: 'Director', image: vertical3, accentColor: '#5A7BCB' },
  ];
  const column2 = [
    { title: 'Choreographer', image: vertical4, accentColor: '#6A8B9E' },
    { title: 'Lead Guitarist', image: vertical5, accentColor: '#3C8E76' },
    { title: 'Stage and Lighting', image: vertical6, accentColor: '#6F5AAE' },
  ];
  const column3 = [
    { title: 'Stage and Lighting', image: vertical7, accentColor: '#6F5AAE' },
    { title: 'Theatre Actor', image: vertical2, accentColor: '#C57A3E' },
    { title: 'Director', image: vertical10, accentColor: '#5A7BCB' },
  ];

  return (
    <section className="flex min-h-screen w-screen shrink-0 flex-col bg-white pt-6 text-black sm:pt-12">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-start justify-center">
        <div className="w-full rounded-xl bg-black pt-5">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className=" bg-[#1B1B1B] pt-3 sm:pt-4 pr-3 sm:pr-4 rounded-t-xl">
              <div className="grid gap-3 sm:grid-cols-2">
                <ParallaxColumn cards={column1} direction="up" duration={20} />
                <ParallaxColumn cards={column2} direction="down" duration={20} />
              </div>
            </div>

            <div className="rounded-xl bg-[#121212] p-4 sm:p-6 relative">
              <div className="-mx-4 -mt-4 mb-4 border-b border-white/10 px-4 pb-4 sm:-mx-6 sm:-mt-6 sm:px-6 pt-4">
                <div className="flex items-center gap-2 justify-between">
                  {/* BK image */}
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full ">
                    <Image
                      src={vertical10}
                      alt="BK"
                      className="h-10 w-10 object-contain rounded-[50%]"
                    />
                  </span>

                  {/* BAM image */}
                  <Image src={RedBam} alt="BAM" className="h-6 object-contain" />
                </div>
              </div>

              <div className="pl-10 bg-[#1A1A1A] p-5 pr-0 absolute right-0 bottom-5">
                <div className="text-white">
                  <p className="text-sm font-normal">Project</p>
                  <p className="text-[10px] text-white/60">Add members to your project</p>
                </div>

                <div className="mt-5 space-y-5 text-white/80">
                  {shortlist.map((person) => (
                    <div
                      key={person.role}
                      className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-white/70 sm:w-36">
                        {person.role}
                      </p>
                      <div className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-[#2A2A2A] px-3 py-2 sm:max-w-[300px]">
                        <div className="flex items-center gap-3">
                          <span
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[11px] font-semibold text-white"
                            style={{
                              backgroundImage: `linear-gradient(135deg, ${person.gradient[0]}, ${person.gradient[1]})`,
                            }}
                          >
                            {person.avatar}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-xs font-semibold text-white">{person.name}</p>
                              <span className="inline-flex h-2 w-2 rounded-full bg-[#4C7DFF]" />
                            </div>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {person.badges.map((badge) => (
                                <span
                                  key={badge}
                                  className="rounded-full bg-black/50 px-2 py-0.5 text-[9px] font-semibold text-white/80"
                                >
                                  {badge}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-[10px] text-white/50">{person.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-[14px] font-bold leading-snug sm:mt-8 sm:text-[28px] xl:text-[36px]">
          <span className="font-extrabold">Shortlist with confidence,</span> connect quickly, &amp;
          build your reliable crew in no time.
        </p>
      </div>
    </section>
  );
};

export default WhoIsBamForShortlistCard;

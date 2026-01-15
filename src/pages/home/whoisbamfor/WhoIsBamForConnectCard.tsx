import { motion } from 'framer-motion';
import type { StaticImageData } from 'next/image';
import {
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
  scroll1 as Scroll1,
} from '../../../assets/images';

const vertical11 = vertical10;
const vertical12 = vertical10;
const vertical13 = vertical10;

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

const ParallaxColumn = ({ cards, direction = 'up', duration = 25 }: ParallaxColumnProps) => {
  const loopCards = [...cards, ...cards];
  const translate = direction === 'up' ? ['0%', '-50%'] : ['-50%', '0%'];

  return (
    <div className="h-[260px] w-full overflow-hidden sm:h-[360px] md:h-[460px] lg:h-[520px]">
      <motion.div
        animate={{ y: translate }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
        className="flex w-full flex-col gap-1 sm:gap-4"
      >
        {loopCards.map((card, index) => (
          <div key={`${card.title}-${index}`} className="rounded-md bg-[#1B1B1B] p-1 sm:p-1.5">
            <div
              className="relative h-[80px] w-full overflow-hidden rounded-md sm:h-[200px]"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(65, 65, 65, 0.00) 32.93%, ${card.accentColor} 100%), url(${card.image.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center bottom',
                backgroundColor: card.accentColor,
              }}
            >
              <span
                className="absolute bottom-1.5 left-1.5 px-1 sm:px-2 py-0.5 text-[6px] text-white sm:bottom-3 sm:left-3 sm:px-3 sm:py-1 sm:text-sm"
                style={{
                  borderRadius: '3px',
                  background: 'rgba(72, 1, 0, 0.31)',
                  backdropFilter: 'blur(5.010199546813965px)',
                }}
              >
                {card.title}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const WhoIsBamForConnectCard = () => {
  const column1 = [
    { title: 'Videographer', image: vertical1, accentColor: '#4EB18E' },
    { title: 'Stunt Performer', image: vertical2, accentColor: '#7A9CF3' },
    { title: 'Videographer', image: vertical3, accentColor: '#F37A7A' },
  ];
  const column2 = [
    { title: 'Stage and Lighting', image: vertical4, accentColor: '#A093EA' },
    { title: 'Choreographer', image: vertical5, accentColor: '#EEAA4B' },
    { title: 'Videographer', image: vertical6, accentColor: '#4EB18E' },
  ];
  const column3 = [
    { title: 'Theatre Actor', image: vertical7, accentColor: '#7A9CF3' },
    { title: 'Director', image: vertical8, accentColor: '#F37A7A' },
    { title: 'Lead Guitarist', image: vertical8, accentColor: '#A093EA' },
    { title: 'Producer', image: vertical9, accentColor: '#EEAA4B' },
  ];
  const column4 = [
    { title: 'Stage and Lighting', image: vertical9, accentColor: '#4EB18E' },
    { title: 'Choreographer', image: vertical10, accentColor: '#7A9CF3' },
    { title: 'Videographer', image: vertical11, accentColor: '#F37A7A' },
  ];
  const column5 = [
    { title: 'Stage and Lighting', image: vertical12, accentColor: '#A093EA' },
    { title: 'Choreographer', image: vertical12, accentColor: '#EEAA4B' },
    { title: 'Videographer', image: vertical13, accentColor: '#4EB18E' },
  ];

  return (
    <section className="relative flex min-h-screen w-screen shrink-0 flex-col justify-center bg-[#BD0308] px-4 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-lg border-[8px] border-black bg-black sm:rounded-xl sm:border-[12px] lg:border-[18px] mt-4 h-[200px] sm:h-[360px] xl:h-[535px]">
        <div className="bg-black">
          <div className="grid w-[calc(100%+60px)] -ml-[40px] grid-cols-5 gap-0.5 sm:w-[calc(100%+100px)] sm:-ml-[50px] sm:gap-1 lg:w-[calc(100%+200px)] lg:-ml-[100px]">
            <ParallaxColumn cards={column1} direction="up" duration={20} />
            <ParallaxColumn cards={column2} direction="down" duration={20} />
            <ParallaxColumn cards={column3} direction="up" duration={20} />
            <ParallaxColumn cards={column4} direction="down" duration={20} />
            <ParallaxColumn cards={column5} direction="up" duration={20} />
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-5xl">
        <p className="bam-connect-copy mt-3">
          Let Bam connect you with serious collaborators and perfect opportunities.
        </p>
      </div>
    </section>
  );
};

export default WhoIsBamForConnectCard;

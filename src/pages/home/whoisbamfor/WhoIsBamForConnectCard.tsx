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
    <div className="h-[360px] w-full overflow-hidden sm:h-[460px] lg:h-[520px] ">
      <motion.div
        animate={{ y: translate }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
        className="flex w-full flex-col gap-4 p-"
      >
        {loopCards.map((card, index) => (
          <div key={`${card.title}-${index}`} className="rounded-md bg-[#1B1B1B] p-1.5">
            <div
              className="relative h-[200px] w-full overflow-hidden rounded-md"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(65, 65, 65, 0.00) 32.93%, ${card.accentColor} 100%), url(${card.image.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center bottom',
                backgroundColor: card.accentColor,
              }}
            >
              <span
                className="absolute bottom-3 left-3 px-3 py-1 text-sm text-white"
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
    <section className="relative flex min-h-screen w-screen shrink-0 flex-col items-center justify-center gap-6 bg-[#BD0308] text-white ">
      <div className="bg-black mx-auto flex w-full max-w-5xl flex-col overflow-hidden  rounded-xl">
        <div className="bg-black">
          <div className="grid w-[calc(100%+200px)] grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-5 lg:-ml-[100px]">
            <ParallaxColumn cards={column1} direction="up" duration={20} />
            <ParallaxColumn cards={column2} direction="down" duration={20} />
            <ParallaxColumn cards={column3} direction="up" duration={20} />
            <ParallaxColumn cards={column3} direction="down" duration={20} />
            <ParallaxColumn cards={column3} direction="up" duration={20} />
          </div>
        </div>
      </div>
      <p className="mt-2 w-full max-w-5xl px-3 text-left text-[14px] font-[500] leading-snug sm:text-[28px] xl:text-[36px]">
        Let Bam connect you with serious collaborators and perfect opportunities.
      </p>
    </section>
  );
};

export default WhoIsBamForConnectCard;

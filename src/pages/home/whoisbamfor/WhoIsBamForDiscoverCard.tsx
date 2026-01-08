import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { IoPlaySharp } from 'react-icons/io5';
import { IoIosSearch } from 'react-icons/io';
import { BiSolidVolumeMute } from 'react-icons/bi';
import { LuMic } from 'react-icons/lu';
import { leadscroll1, leadscroll2, leadscroll3 } from '../../../assets/images';

// Placeholder for the image import if not available in this context

type Artist = {
  name: string;
  song: string;
  img: string | { src: string };
  active?: boolean;
};

const ARTISTS: Artist[] = [
  {
    name: 'Jaxon Porter',
    song: 'Riff Fusion',
    img: leadscroll1,
  },
  {
    name: 'Owen Pierce',
    song: 'Electro Bloom',
    img: leadscroll2,
  },
  {
    name: 'Micah West',
    song: 'Global Grooves',
    img: leadscroll3,
    active: true,
  },
];

type CursorStyle = CSSProperties & {
  '--cursor-start-x'?: string;
  '--cursor-start-y'?: string;
};

type CardPositionStyle = CSSProperties & {
  '--card-shift'?: string;
  '--card-shift-sm'?: string;
  '--card-scale'?: string;
  '--card-scale-sm'?: string;
};

const WhoIsBamForDiscoverCard = () => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const searchButtonRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLSpanElement | null>(null);
  const [cursorStyle, setCursorStyle] = useState<CursorStyle>({});
  const [cursorReady, setCursorReady] = useState(false);
  const initialIndex = Math.max(
    0,
    ARTISTS.findIndex((artist) => artist.active),
  );
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // State for the typing effect
  const [placeholderText, setPlaceholderText] = useState('Ask What You Want');
  const [isTyping, setIsTyping] = useState(false);
  const getImageSrc = (image: Artist['img']) => (typeof image === 'string' ? image : image?.src);
  const [hasSearched, setHasSearched] = useState(false);

  // 1. Cursor Position Logic
  useEffect(() => {
    let frameId: number | null = null;
    const updateCursor = () => {
      if (!cardRef.current || !searchButtonRef.current || !cursorRef.current) return;

      const cardRect = cardRef.current.getBoundingClientRect();
      const buttonRect = searchButtonRef.current.getBoundingClientRect();
      const cursorRect = cursorRef.current.getBoundingClientRect();

      // CALCULATE CENTER OF BUTTON
      const buttonCenterX = buttonRect.left - cardRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top - cardRect.top + buttonRect.height / 2;

      const endLeft = buttonCenterX;
      const endTop = buttonCenterY;

      // STARTING POSITION
      const edgePadding = 20;
      const startLeft = cardRect.width - cursorRect.width - edgePadding;
      const startTop = cardRect.height - cursorRect.height - edgePadding;

      setCursorStyle({
        left: `${endLeft}px`,
        top: `${endTop}px`,
        '--cursor-start-x': `${startLeft - endLeft}px`,
        '--cursor-start-y': `${startTop - endTop}px`,
      });
      setCursorReady(true);
    };

    const handleResize = () => {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateCursor);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  // 2. Typing Simulation Loop
  useEffect(() => {
    const cycleDuration = 9200;

    const typeLoop = () => {
      setPlaceholderText('Ask What You Want');
      setIsTyping(false);

      setTimeout(() => {
        setIsTyping(true);
        setPlaceholderText('Lead Guitarists');
      }, 1200);
    };

    typeLoop();
    const interval = setInterval(typeLoop, cycleDuration);
    return () => clearInterval(interval);
  }, []);

  // 3. Card auto-scroll loop
  useEffect(() => {
    if (!isAutoScrolling) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ARTISTS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  const pauseAutoScroll = () => {
    setIsAutoScrolling(false);
    setTimeout(() => setIsAutoScrolling(true), 15000);
  };

  const mobileCardShift = '82px';
  const desktopCardShift = '30%';
  const mobileCardScale = '0.96';
  const desktopCardScale = '0.9';

  const getCardPosition = (index: number): CardPositionStyle => {
    const totalCards = ARTISTS.length;
    const diff = (index - currentIndex + totalCards) % totalCards;

    // Adjusted offsets and scale to reduce gaps on mobile
    if (diff === 0) {
      return {
        '--card-shift': '0px',
        '--card-shift-sm': '0%',
        '--card-scale': '1',
        '--card-scale-sm': '1',
        zIndex: 30,
        opacity: 1,
      };
    }
    if (diff === 1) {
      return {
        '--card-shift': mobileCardShift,
        '--card-shift-sm': desktopCardShift,
        '--card-scale': mobileCardScale,
        '--card-scale-sm': desktopCardScale,
        zIndex: 25,
        opacity: 0.55,
      };
    }
    if (diff === totalCards - 1) {
      return {
        '--card-shift': `-${mobileCardShift}`,
        '--card-shift-sm': `-${desktopCardShift}`,
        '--card-scale': mobileCardScale,
        '--card-scale-sm': desktopCardScale,
        zIndex: 25,
        opacity: 0.55,
      };
    }
    const isRight = diff < totalCards / 2;
    const flyoutShift = `${isRight ? 150 : -150}%`;
    return {
      '--card-shift': flyoutShift,
      '--card-shift-sm': flyoutShift,
      '--card-scale': '0.5',
      '--card-scale-sm': '0.5',
      zIndex: 1,
      opacity: 0,
    };
  };

  return (
    <>
      <style>
        {`
        /* --- CONFIGURATION --- */
        :root {
          --anim-duration: 9.2s;
        }

        /* 1. TYPING EFFECT */
        .typing-text {
          overflow: hidden;
          border-right: 2px solid black;
          white-space: nowrap;
          animation: typing 0.8s steps(20, end) forwards, blink-caret 0.75s step-end infinite;
          display: inline-block;
          width: 0;
        }

        @keyframes typing {
          from { width: 0; }
          to { width: 100%; border-color: transparent; }
        }

        @keyframes blink-caret {
          from, to { border-color: transparent; }
          50% { border-color: black; }
        }

        /* 2. CURSOR MOVEMENT */
        .discover-cursor {
          animation: cursor-flow var(--anim-duration) cubic-bezier(0.4, 0, 0.2, 1) infinite;
          transform-origin: top left;
        }

        @keyframes cursor-flow {
          0% {
            opacity: 0;
            transform: translate(var(--cursor-start-x), var(--cursor-start-y)) scale(0.6);
          }
          5% { opacity: 1; }
          16% { transform: translate(0, 0) scale(1); }
          20% { transform: translate(0, 0) scale(0.85); }
          22% { transform: translate(0, 0) scale(1); }
          27% { opacity: 1; }
          35% { opacity: 0; transform: translate(0, 50px) scale(1); }
          100% { opacity: 0; }
        }

        /* 3. SEARCH BUTTON CLICK RESPONSE */
        .discover-search {
          animation: search-click var(--anim-duration) ease-in-out infinite;
        }

        .discover-searchgroup {
          animation: searchbar-resize var(--anim-duration) ease-in-out infinite;
          transform-origin: center;
          transition: transform 0.6s ease;
        }

        .discover-searchgroup--condensed {
          animation: none;
          transform: scale(0.8);
        }

        .discover-searchbar {
          transform-origin: center;
        }

        @keyframes search-click {
          0%, 19% { transform: scale(1); box-shadow: none; }
          22% { transform: scale(0.92); box-shadow: 0 0 0 4px rgba(189, 3, 8, 0.25); }
          25%, 100% { transform: scale(1); box-shadow: none; }
        }

        /* 4. SEARCH BAR SLIDE UP */
        .search-container {
          animation: search-container-move var(--anim-duration) ease-in-out infinite;
        }

        .search-container--fixed {
          animation: none;
          transform: translateY(-5px);
          transition: transform 0.6s ease;
        }

        @keyframes search-container-move {
          0%, 22% { transform: translateY(0); }
          /* Mobile Slide: -65px puts it comfortably at top of 180px container */
          28%, 95% { transform: translateY(-65px); } 
          100% { transform: translateY(0); }
        }

        /* DESKTOP OVERRIDE */
        @media (min-width: 640px) {
           @keyframes search-container-move {
            0%, 22% { transform: translateY(0); }
            28%, 95% { transform: translateY(-200px); } 
            100% { transform: translateY(0); }
          }
        }

        @keyframes searchbar-resize {
          0%, 22% { transform: scale(1); }
          28%, 95% { transform: scale(0.85); }
          100% { transform: scale(1); }
        }

        /* 5. RESULTS GRID APPEARANCE */
        .results-grid {
          animation: results-appear var(--anim-duration) ease-in-out infinite;
        }

        .discover-card-motion {
          transform: translateX(var(--card-shift, 0px)) scale(var(--card-scale, 1));
        }

        @media (min-width: 640px) {
          .discover-card-motion {
            transform: translateX(var(--card-shift-sm, var(--card-shift, 0px)))
              scale(var(--card-scale-sm, var(--card-scale, 1)));
          }
        }

        @keyframes results-appear {
          0%, 25% {
            opacity: 0;
            transform: translateY(60px); 
          }
          30% {
            opacity: 1;
            transform: translateY(0); 
          }
          95% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(60px);
          }
        }

        /* 6. DISCOVER CARD LOOK */
        .discover-artist-card {
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.45);
          background: #0b0b0b;
        }

        .discover-artist-card--active {
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.12);
        }

        .discover-artist-vignette {
          background:
            radial-gradient(circle at 20% 10%, rgba(155, 0, 0, 0.75), rgba(0, 0, 0, 0) 55%),
            linear-gradient(180deg, rgba(0, 0, 0, 0.1) 20%, rgba(0, 0, 0, 0.85) 100%);
          mix-blend-mode: screen;
        }

        .discover-artist-meta {
          background: rgba(72, 1, 0, 0.31);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 4.877px;
          padding: 4px 6px; /* Very small padding for mobile */
          backdrop-filter: blur(4.968100070953369px);
        }
        
        @media (min-width: 640px) {
           .discover-artist-meta {
              padding: 10px 14px;
           }
        }

        .discover-artist-actions {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        `}
      </style>

      <section className="relative flex min-h-screen w-screen items-center justify-center bg-white px-4 text-black sm:px-6 lg:px-8">
        <div className="flex w-full max-w-5xl flex-col items-start">
          <div className="flex w-full items-center justify-center">
            {/* Main Card Container */}
            <div
              ref={cardRef}
              className="discover-card relative h-[200px] w-full overflow-hidden rounded-xl bg-black sm:h-[360px] md:h-[460px] lg:h-[575px]"
            >
              {/* Search Bar Container */}
              <div
                className={`search-container absolute inset-0 z-20 flex flex-col items-center justify-center ${
                  hasSearched ? 'search-container--fixed' : ''
                }`}
              >
                <div
                  className={`discover-searchgroup flex w-full max-w-[260px] sm:max-w-xl items-center gap-1 sm:gap-1 xl:gap-3 ${
                    hasSearched ? 'discover-searchgroup--condensed' : ''
                  }`}
                >
                  <div
                    className={`discover-searchbar flex h-8 sm:h-10 w-full flex-1 items-center gap-2 bg-white pl-2 pr-2 sm:pr-6 transition-all xl:h-[70px] xl:max-w-[488px] ${
                      hasSearched ? 'discover-searchbar--condensed' : ''
                    }`}
                    style={{
                      borderRadius: '16.312px',
                      border: '1.359px solid var(--Colors-Desktop-Active-BG, #1E1E1E)',
                      boxShadow: '0 12.916px 18.2px 0 rgba(111, 111, 111, 0.00)',
                    }}
                  >
                    <div className="flex h-5 w-5 sm:h-6 sm:w-6 xl:h-14 xl:w-14 items-center justify-center rounded-lg bg-white shadow-sm">
                      <LuMic className="h-3 w-3 sm:h-4 sm:w-4 text-black" />
                    </div>

                    {/* Typing Text Area */}
                    <div className="relative flex-1 h-full flex items-center overflow-hidden">
                      <span
                        className={`pt-0.5 text-[10px] sm:text-sm xl:text-base font-normal whitespace-nowrap transition-colors duration-300 ${
                          isTyping ? 'text-black' : 'text-black/40'
                        }`}
                      >
                        {isTyping ? (
                          <span className="typing-text">Lead Guitarists</span>
                        ) : (
                          'Ask What You Want'
                        )}
                      </span>
                    </div>
                  </div>

                  <div
                    ref={searchButtonRef}
                    className="discover-search flex h-8 w-8 sm:h-10 sm:w-20 xl:h-[70px] xl:w-[70px] items-center justify-center rounded-lg sm:rounded-2xl bg-[#BD0308] text-white cursor-pointer"
                    onClick={() => setHasSearched(true)}
                  >
                    <IoIosSearch className="h-3.5 w-3.5 sm:h-5 sm:w-5 xl:h-8 xl:w-8" />
                  </div>
                </div>
              </div>

              {/* Results Grid - Appears after click */}
              <div className="results-grid absolute inset-x-0 bottom-0 z-10 h-[125px] pb-2 sm:h-[360px] sm:pb-12 lg:h-[400px]">
                <div className="relative mx-auto h-full w-full max-w-2xl">
                  {ARTISTS.map((artist, idx) => {
                    const isActive = idx === currentIndex;
                    return (
                      <div
                        key={`${artist.name}-${idx}`}
                        className={`discover-card-motion absolute inset-0 transition-all duration-500 ease-in-out cursor-pointer
                         ${isActive ? 'translate-y-0' : 'translate-y-3 sm:translate-y-8'}
                       `}
                        style={getCardPosition(idx)}
                        onClick={() => {
                          pauseAutoScroll();
                          setCurrentIndex(idx);
                        }}
                      >
                        <div
                          className={`discover-artist-card relative mx-auto overflow-hidden rounded-lg sm:rounded-2xl ${
                            /* MOBILE SIZES - Further Reduced */
                            isActive
                              ? 'h-[115px] w-[100px] sm:h-[330px] sm:w-[260px] lg:h-[380px] lg:w-[300px]'
                              : 'h-[95px] w-[70px] sm:h-[280px] sm:w-[200px] lg:h-[310px] lg:w-[210px]'
                          } ${isActive ? 'discover-artist-card--active' : ''}`}
                        >
                          {/* Card Image */}
                          <img
                            src={getImageSrc(artist.img)}
                            alt={artist.name}
                            className="absolute inset-0 h-full w-full object-cover"
                          />

                          {/* Card Text */}
                          <div className="absolute bottom-0 left-0 w-[95px] sm:w-full px-0.5 pb-1 sm:px-4 sm:pb-4 text-white">
                            <div className="flex items-end justify-between gap-1 sm:gap-4">
                              <div className="discover-artist-meta w-full">
                                <h3
                                  className={`font-bold truncate ${
                                    isActive ? 'text-[6px] sm:text-xl' : 'text-[8px] sm:text-base'
                                  }`}
                                >
                                  {artist.name}
                                </h3>
                                <p
                                  className={`text-white/70 truncate ${
                                    isActive ? 'text-[4px] sm:text-sm' : 'text-[6px] sm:text-xs'
                                  }`}
                                >
                                  "{artist.song}"
                                </p>
                              </div>
                              {isActive ? (
                                <div className="discover-artist-actions hidden sm:flex">
                                  <span>
                                    <IoPlaySharp className="h-2 w-2 sm:h-4 sm:w-4" />
                                  </span>
                                  <span>
                                    <BiSolidVolumeMute className="h-1.5 w-1.5 sm:h-4 sm:w-4" />
                                  </span>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Cursor */}
              <span
                ref={cursorRef}
                style={cursorStyle}
                className={` pointer-events-none absolute z-50 h-3 w-3 sm:h-6 sm:w-6 xl:h-14 xl:w-14 drop-shadow-xl ${
                  cursorReady ? 'discover-cursor' : 'opacity-0'
                }`}
              >
                <svg
                  viewBox="0 0 48 48"
                  className="h-full w-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 6L42 24L22 27L18 42L8 6Z" fill="#E21B23" />
                </svg>
              </span>
            </div>
          </div>

          <p className="mt-3 bam-connect-copy">
            Discover creators by skill or style, see their real work
          </p>
        </div>
      </section>
    </>
  );
};

export default WhoIsBamForDiscoverCard;

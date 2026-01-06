import { useEffect, useRef, useState } from 'react';
import { IoMicOutline } from 'react-icons/io5';
import { IoIosSearch } from 'react-icons/io';
import vertical1 from '../../../assets/images/home/vertical1.jpg';
// Mock Data for the cards shown in the video
const ARTISTS = [
  {
    name: 'Jaxon Porter',
    song: 'Riff Fusion',
    color: 'from-gray-900 to-gray-800',
    img: vertical1,
  },
  {
    name: 'Owen Pierce',
    song: 'Electro Bloom',
    color: 'from-gray-800 to-gray-900',
    img: vertical1,
  },
  {
    name: 'Micah West',
    song: 'Global Grooves',
    color: 'from-red-900 to-black',
    img: vertical1,
    active: true,
  },
  {
    name: 'Sarah Key',
    song: 'Acoustic Soul',
    color: 'from-gray-800 to-gray-900',
    img: vertical1,
  },
  {
    name: 'Davon Lewis',
    song: 'Jazz Flow',
    color: 'from-gray-900 to-gray-800',
    img: vertical1,
  },
];

const WhoIsBamForDiscoverCard = () => {
  const cardRef = useRef(null);
  const searchButtonRef = useRef(null);
  const cursorRef = useRef(null);
  const [cursorStyle, setCursorStyle] = useState({});
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
  const getImageSrc = (image) => (typeof image === 'string' ? image : image?.src);
  const [hasSearched, setHasSearched] = useState(false);

  // 1. Cursor Position Logic (From your original code)
  useEffect(() => {
    let frameId = null;
    const updateCursor = () => {
      if (!cardRef.current || !searchButtonRef.current || !cursorRef.current) return;

      const cardRect = cardRef.current.getBoundingClientRect();
      const buttonRect = searchButtonRef.current.getBoundingClientRect();
      const cursorRect = cursorRef.current.getBoundingClientRect();

      const edgePadding = 50;
      const targetOffset = 50;
      const endLeft = buttonRect.right - cardRect.left + targetOffset - cursorRect.width;
      const endTop = buttonRect.top - cardRect.top + buttonRect.height / 2 - cursorRect.height / 2;
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
    const cycleDuration = 4200; // Matches CSS animation duration

    const typeLoop = () => {
      // Reset
      setPlaceholderText('Ask What You Want');
      setIsTyping(false);

      // Start typing "Lead Guitarists" after 1.2s
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
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  const pauseAutoScroll = () => {
    setIsAutoScrolling(false);
    setTimeout(() => setIsAutoScrolling(true), 12000);
  };

  const getCardPosition = (index) => {
    const totalCards = ARTISTS.length;
    const diff = (index - currentIndex + totalCards) % totalCards;

    if (diff === 0) {
      return { transform: 'translateX(0%) scale(1)', zIndex: 30, opacity: 1 };
    }
    if (diff === 1) {
      return { transform: 'translateX(40%) scale(0.9)', zIndex: 25, opacity: 0.4 };
    }
    if (diff === totalCards - 1) {
      return { transform: 'translateX(-40%) scale(0.9)', zIndex: 25, opacity: 0.4 };
    }
    const isRight = diff < totalCards / 2;
    return {
      transform: `translateX(${isRight ? 200 : -200}%) scale(0.5)`,
      zIndex: 1,
      opacity: 0,
    };
  };

  return (
    <div className="flex w-screen min-h-screen flex-col bg-white px-12 py-16 text-black">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-start justify-center">
        <div className="flex w-full items-center justify-center">
          {/* Main Card Container */}
          <div
            ref={cardRef}
            className="discover-card relative w-full h-[600px] overflow-hidden rounded-xl bg-black"
          >
            {/* Search Bar Container - Moves Up */}
            <div
              className={`search-container absolute inset-0 z-20 flex flex-col items-center justify-center ${
                hasSearched ? 'search-container--fixed' : ''
              }`}
            >
              <div
                className={`discover-searchgroup flex w-full max-w-xl items-center gap-1 xl:gap-3 ${
                  hasSearched ? 'discover-searchgroup--condensed' : ''
                }`}
              >
                <div
                  className={`discover-searchbar flex h-10 w-[500px] xl:h-[70px] xl:w-[488px] items-center gap-3 bg-white pl-2 pr-6 transition-all ${
                    hasSearched ? 'discover-searchbar--condensed' : ''
                  }`}
                  style={{
                    borderRadius: '16.312px',
                    border: '1.359px solid var(--Colors-Desktop-Active-BG, #1E1E1E)',
                    boxShadow: '0 12.916px 18.2px 0 rgba(111, 111, 111, 0.00)',
                  }}
                >
                  <div className="flex h-6 w-6 xl:h-14 xl:w-14 items-center justify-center rounded-lg bg-white shadow-sm">
                    <IoMicOutline className="h-4 w-4 sm:h-6 sm:w-6 text-black" />
                  </div>

                  {/* Typing Text Area */}
                  <div className="relative flex-1 h-full flex items-center overflow-hidden">
                    <span
                      className={`pt-1 text-sm xl:text-base font-normal whitespace-nowrap transition-colors duration-300 ${
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
                  className="discover-search flex h-10 w-20 xl:h-[70px] xl:w-[70px] items-center justify-center rounded-2xl bg-[#BD0308] text-white cursor-pointer"
                  onClick={() => setHasSearched(true)}
                >
                  <IoIosSearch className="h-5 w-5 sm:h-8 sm:w-8" />
                </div>
              </div>
            </div>

            {/* Results Grid - Appears after click */}
            <div className="results-grid absolute inset-x-0 bottom-0 z-10 h-[400px] pb-12 opacity-0">
              <div className="relative mx-auto h-full w-full max-w-2xl">
                {ARTISTS.map((artist, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <div
                      key={`${artist.name}-${idx}`}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out cursor-pointer
                         ${
                           isActive ? 'translate-y-0 shadow-2xl shadow-red-900/50' : 'translate-y-8'
                         }
                       `}
                      style={getCardPosition(idx)}
                      onClick={() => {
                        pauseAutoScroll();
                        setCurrentIndex(idx);
                      }}
                    >
                      <div
                        className={`relative mx-auto overflow-hidden rounded-2xl ${
                          isActive ? 'w-[280px] h-[360px]' : 'w-[180px] h-[280px]'
                        }`}
                      >
                        {/* Card Image */}
                        <img
                          src={getImageSrc(artist.img)}
                          alt={artist.name}
                          className="absolute inset-0 h-full w-full object-cover"
                        />

                        {/* Gradient Overlay */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-t ${
                            isActive ? 'from-black via-transparent' : 'from-black/80 via-black/20'
                          }`}
                        />

                        {/* Card Text */}
                        <div className="absolute bottom-0 left-0 p-6 w-full text-white">
                          <h3 className={`font-bold ${isActive ? 'text-2xl' : 'text-lg'}`}>
                            {artist.name}
                          </h3>
                          <p className={`text-white/70 ${isActive ? 'text-sm' : 'text-xs'}`}>
                            "{artist.song}"
                          </p>
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
              className={` pointer-events-none absolute z-50 h-6 w-6 xl:h-14 xl:w-14 drop-shadow-xl ${
                cursorReady ? 'discover-cursor' : 'opacity-0'
              }`}
            >
              <svg viewBox="0 0 48 48" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 6L42 24L22 27L18 42L8 6Z" fill="#E21B23" />
              </svg>
            </span>
          </div>
        </div>

        <p className="mt-8 max-w-3xl text-lg xl:text-4xl font-semibold">
          Discover creators by skill or style, see their real work
        </p>
      </div>
    </div>
  );
};

export default WhoIsBamForDiscoverCard;

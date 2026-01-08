'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
// Replace these with your actual imports
import { scroll1, scroll2 } from '../../../assets/images';

const galleryData = [
  {
    src: scroll1,
    alt: 'Studio session',
    title: 'Studio Engineers',
    description: 'Masters of sound design and mixing',
  },
  {
    src: scroll2,
    alt: 'Live performance',
    title: 'Performing Artists',
    description: 'People who perform live or on-set',
  },
  {
    src: scroll1,
    alt: 'On stage',
    title: 'Event Managers',
    description: 'Orchestrating the perfect show',
  },
  {
    src: scroll2,
    alt: 'Camera rig',
    title: 'Cinematographers',
    description: 'Capturing the visual essence',
  },
  {
    src: scroll1,
    alt: 'Backstage',
    title: 'Production Crew',
    description: 'The backbone of every event',
  },
  {
    src: scroll2,
    alt: 'On stage',
    title: 'Event Managers',
    description: 'Orchestrating the perfect show',
  },
];

const AboutGallery = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isInView, setIsInView] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), {
      threshold: 0.3,
    });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % galleryData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + galleryData.length) % galleryData.length);
  };

  const getCardStyle = (index: number): React.CSSProperties => {
    const total = galleryData.length;

    // Circular distance calculation
    let distance = (index - activeIndex + total) % total;
    if (distance > total / 2) distance -= total;

    const isActive = distance === 0;
    const isMobile = windowWidth < 768;
    const absDistance = Math.abs(distance);

    // Configuration
    const rotationAngle = isMobile ? 5 : 10;

    // --- GAP CONFIGURATION (X-AXIS) ---
    const level1Gap = isMobile ? 270 : 500;
    const level2Gap = isMobile ? 260 : 920;

    // --- DROP CONFIGURATION (Y-AXIS) ---
    // Level 1: Neighbors (2nd and 4th)
    const level1Drop = isMobile ? 20 : 50;

    // Level 2: Outer (1st and 5th)
    // INCREASED THIS VALUE: This pushes the outer cards significantly lower
    const level2Drop = isMobile ? 40 : 160;

    const visibleLimit = isMobile ? 1 : 2;
    const isVisible = absDistance <= visibleLimit;

    if (!isVisible) {
      return {
        transform: 'translate(-50%, -50%) scale(0)',
        opacity: 0,
        zIndex: 0,
        visibility: 'hidden',
      };
    }

    // --- CALCULATE TRANSLATE ---
    let xTranslate = 0;
    let yTranslate = 0;

    // X-Axis Logic
    if (absDistance === 1) {
      xTranslate = Math.sign(distance) * level1Gap;
    } else if (absDistance === 2) {
      xTranslate = Math.sign(distance) * level2Gap;
    }

    // Y-Axis Logic (Vertical Drop)
    if (absDistance === 1) {
      yTranslate = level1Drop;
    } else if (absDistance === 2) {
      yTranslate = level2Drop;
    }

    const rotate = distance * rotationAngle;
    const zIndex = 50 - absDistance * 10;

    let scale = isActive ? 1.0 : 0.85;
    if (absDistance === 2) scale = 0.7;

    return {
      transform: `translate(calc(-50% + ${xTranslate}px), calc(-50% + ${yTranslate}px)) rotate(${rotate}deg) scale(${scale})`,
      zIndex,
      opacity: 1,
      visibility: 'visible',
    };
  };

  return (
    <div
      ref={sectionRef}
      className={`relative w-full overflow-hidden py-10 md:py-20 min-h-[600px] md:min-h-[800px] transition-colors duration-1000 ease-in-out flex flex-col items-center justify-center ${
        isInView ? 'bg-[#BD0308]' : ''
      }`}
    >
      <div
        className={`text-center mb-0 md:mb-16 px-4 transition-all duration-1000 transform ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}
      >
        <h2 className="text-4xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9]">
          Top
          <br />
          Categories
        </h2>
      </div>

      <div className="relative w-full max-w-[1600px] h-[300px] md:h-[450px] flex items-center justify-center mt-4 md:mt-0 perspective-1000 mx-auto">
        {galleryData.map((image, index) => {
          const style = getCardStyle(index);

          return (
            <div
              key={index}
              className="absolute top-1/2 left-1/2 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] origin-center will-change-transform shadow-2xl"
              style={{
                ...style,
                width: windowWidth < 768 ? '280px' : '500px',
                height: windowWidth < 768 ? '180px' : '280px',
              }}
            >
              <div className="relative w-full h-full overflow-hidden border-2 border-transparent ">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index === activeIndex}
                />
                <div
                  className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${
                    index === activeIndex ? 'opacity-0' : 'opacity-100'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div
        className={`relative z-50 -mt-10 text-center px-6 transition-all duration-500 ${
          isInView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h3 className="text-base md:text-3xl font-bold text-white md:mb-2 tracking-wide">
          {galleryData[activeIndex].title}
        </h3>
        <p className="text-white/80 font-medium mb-3 md:mb-8 text-xs md:text-lg max-w-lg mx-auto">
          {galleryData[activeIndex].description}
        </p>

        <button className="px-4 py-1.5 md:px-8 md:py-3 border border-white text-white uppercase text-[10px] md:text-xs font-bold tracking-widest hover:bg-white hover:text-[#BD0308] transition-colors rounded-full">
          View more
        </button>
      </div>

      <div className="absolute -bottom-16 md:-bottom-8 w-full flex justify-between px-6 md:px-20 z-50 pointer-events-none pb-32">
        <button
          onClick={handlePrev}
          className="pointer-events-auto p-2 md:p-4 bg-red-600 border border-white/10 text-white hover:bg-white hover:text-[#BD0308] transition-all transform hover:scale-110 shadow-lg rounded-full cursor-pointer"
          aria-label="Previous"
        >
          <GoArrowLeft size={24} />
        </button>

        <button
          onClick={handleNext}
          className="pointer-events-auto p-2 md:p-4 bg-red-600 border border-white/10 text-white hover:bg-white hover:text-[#BD0308] transition-all transform hover:scale-110 shadow-lg rounded-full cursor-pointer"
          aria-label="Next"
        >
          <GoArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default AboutGallery;

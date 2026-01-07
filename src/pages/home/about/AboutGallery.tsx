'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
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
    src: scroll1, // Reusing for demo
    alt: 'On stage',
    title: 'Event Managers',
    description: 'Orchestrating the perfect show',
  },
  {
    src: scroll2, // Reusing for demo
    alt: 'Camera rig',
    title: 'Cinematographers',
    description: 'Capturing the visual essence',
  },
  {
    src: scroll1, // Reusing for demo
    alt: 'Backstage',
    title: 'Production Crew',
    description: 'The backbone of every event',
  },
];

const AboutGallery = () => {
  const [activeIndex, setActiveIndex] = useState(2); // Start in the middle
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  // Scroll Trigger Logic (30% visibility)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.3, // Trigger when 30% is visible
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

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

  // Calculate styles to create the "Arc" / Circular motion
  const getCardStyle = (distance) => {
    // We want to visually center the active item.
    // In a "carousel", we usually shift items relative to the center.
    // Let's create a "virtual" position for animation

    const isActive = distance === 0;

    // Base transforms
    let xTranslate = 0;
    let yTranslate = 0;
    let rotate = 0;
    let zIndex = 0;
    let opacity = 1;
    let scale = 1;

    // Configuration for the Arc
    const xGap = 500; // Horizontal spacing (adjust for mobile/desktop)
    const yDrop = 40; // How much side items drop down (creating the arc)
    const rotationAngle = 8; // Degrees of rotation

    // Calculate relative position (simple slider logic)
    // We limit the visible items to strictly surrounding ones for the effect
    if (isActive) {
      xTranslate = 0;
      yTranslate = 0;
      rotate = 0;
      zIndex = 50;
      scale = 1.1;
    } else if (distance === -1) {
      // Immediate Left
      xTranslate = -xGap;
      yTranslate = yDrop;
      rotate = -rotationAngle;
      zIndex = 40;
      scale = 0.9;
    } else if (distance === 1) {
      // Immediate Right
      xTranslate = xGap;
      yTranslate = yDrop;
      rotate = rotationAngle;
      zIndex = 40;
      scale = 0.9;
    } else if (distance === -2) {
      // Far Left
      xTranslate = -xGap * 1.8;
      yTranslate = yDrop * 3;
      rotate = -rotationAngle * 2;
      zIndex = 30;
      scale = 0.8;
      opacity = 0.6;
    } else if (distance === 2) {
      // Far Right
      xTranslate = xGap * 1.8;
      yTranslate = yDrop * 3;
      rotate = rotationAngle * 2;
      zIndex = 30;
      scale = 0.8;
      opacity = 0.6;
    }

    // Responsive adjustments (using inline styles for logic, but could be cleaner with tailwind classes if purely static)
    // Note: For a true robust responsive layout, you might want to adjust xGap based on window width

    return {
      transform: `translateX(${xTranslate}px) translateY(${yTranslate}px) rotate(${rotate}deg) scale(${scale})`,
      zIndex,
      opacity,
    };
  };

  return (
    <div
      ref={sectionRef}
      className={`relative w-full overflow-hidden py-20 mb-32 min-h-[900px] transition-colors duration-1000 ease-in-out flex flex-col items-center justify-center ${
        isInView ? 'bg-[#BD0308]' : ''
      }`}
    >
      {/* 1. Header Text (Triggered by Scroll) */}
      <div
        className={`text-center mb-10 transition-all duration-1000 transform ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}
      >
        <h2 className="text-5xl md:text-8xl font-black text-white tracking-normal uppercase">
          Top
          <br />
          Categories
        </h2>
      </div>

      {/* 2. The Circular/Arc Gallery */}
      <div className="relative w-full min-w-[1900px] mx-auto h-[400px] flex items-center justify-center mt-10 perspective-1000">
        {[-2, -1, 0, 1, 2].map((distance) => {
          const index = (activeIndex + distance + galleryData.length) % galleryData.length;
          const image = galleryData[index];
          const style = getCardStyle(distance);

          return (
            <div
              key={distance}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] origin-bottom will-change-transform"
              style={{
                ...style,
                // We add the centering translation to the dynamic transform
                transform: `translate(-50%, -50%) ${style.transform}`,
                width: '320px', // Base width
                height: '240px', // Base height
                backfaceVisibility: 'hidden',
              }}
            >
              <div className="relative w-[420px] h-[280px] overflow-hidden border-white/10">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={distance === 0}
                />
                {/* Overlay to darken non-active images */}
                <div
                  className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
                    distance === 0 ? 'opacity-0' : 'opacity-100'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Active Item Text & Description (Updates with slide) */}
      <div
        className={`-mt-32 text-center transition-all duration-500 ${
          isInView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h3 className="text-2xl font-bold text-white mb-2">{galleryData[activeIndex].title}</h3>
        <p className="text-white/80 font-medium mb-6">{galleryData[activeIndex].description}</p>

        <button className="px-6 py-2 rounded-full border border-white text-white uppercase text-xs tracking-widest hover:bg-white hover:text-red-600 transition-colors">
          View more
        </button>
      </div>

      {/* 4. Navigation Buttons */}
      <div className="absolute bottom-10 md:bottom-10 w-full flex justify-between px-10 md:px-32 z-50">
        <button
          onClick={handlePrev}
          className="p-4 rounded-full bg-red-700/80 hover:bg-white hover:text-red-600 text-white transition-all transform hover:scale-110 shadow-lg"
          aria-label="Previous category"
        >
          <GoArrowLeft size={24} />
        </button>

        <button
          onClick={handleNext}
          className="p-4 rounded-full bg-red-700/80 hover:bg-white hover:text-red-600 text-white transition-all transform hover:scale-110 shadow-lg"
          aria-label="Next category"
        >
          <GoArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default AboutGallery;

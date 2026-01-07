import React, { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './ScrollReveal.module.css';

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealProps = {
  children: React.ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement> | null;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
};

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = '+=500%',
  wordAnimationEnd = '+=65%',
}: ScrollRevealProps) => {
  const containerRef = useRef<HTMLHeadingElement | null>(null);

  const splitText = useMemo(() => {
    const wrapWords = (text: string | number, keyPrefix: string) => {
      return String(text)
        .split(/(\s+)/)
        .map((word, index) => {
          if (word.match(/^\s+$/)) return word;
          return (
            <span className="word" key={`${keyPrefix}-${index}`}>
              {word}
            </span>
          );
        });
    };

    const processNode = (node: React.ReactNode, keyPrefix: string): React.ReactNode => {
      if (node === null || node === undefined || typeof node === 'boolean') return null;
      if (typeof node === 'string' || typeof node === 'number') return wrapWords(node, keyPrefix);

      if (React.isValidElement(node)) {
        const childNodes = React.Children.toArray(node.props.children);
        const processed = childNodes.flatMap((child, index) =>
          processNode(child, `${keyPrefix}-${index}`),
        );
        return React.cloneElement(node, { key: keyPrefix }, processed);
      }

      if (Array.isArray(node)) {
        return node.flatMap((child, index) => processNode(child, `${keyPrefix}-${index}`));
      }

      return node;
    };

    return React.Children.toArray(children).flatMap((child, index) =>
      processNode(child, `node-${index}`),
    );
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    gsap.fromTo(
      el,
      { transformOrigin: '0% 50%', rotate: baseRotation },
      {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom',
          end: rotationEnd,
          scrub: true,
        },
      },
    );

    const wordElements = el.querySelectorAll('.word');

    gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: 'opacity' },
      {
        ease: 'none',
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom-=20%',
          end: wordAnimationEnd,
          scrub: true,
        },
      },
    );

    if (enableBlur) {
      gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: 'none',
          filter: 'blur(0px)',
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom-=20%',
            end: wordAnimationEnd,
            scrub: true,
          },
        },
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
  ]);

  return (
    <h2 ref={containerRef} className={`${styles.scrollReveal} ${containerClassName}`}>
      <p className={`${styles.scrollRevealText} ${textClassName}`}>{splitText}</p>
    </h2>
  );
};

export default ScrollReveal;

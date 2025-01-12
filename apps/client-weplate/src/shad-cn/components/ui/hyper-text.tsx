"use client";

import { AnimatePresence, motion, MotionProps } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/utils/tailwind";

type CharacterSet = string[] | readonly string[];

interface HyperTextProps extends MotionProps {
  /** The text content to be animated */
  children: string;
  /** Optional className for styling */
  className?: string;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Delay before animation starts in milliseconds */
  delay?: number;
  /** Component to render as - defaults to div */
  as?: React.ElementType;
  /** Whether to start animation when element comes into view */
  startOnView?: boolean;
  /** Whether to trigger animation on hover */
  animateOnHover?: boolean;
  /** Custom character set for scramble effect. Defaults to uppercase alphabet */
  characterSet?: CharacterSet;
}

const DEFAULT_CHARACTER_SET = Object.freeze(
  // "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  "ㄱ가ㄴ나ㄷ다ㄹ라ㅁ마ㅂ바ㅅ사ㅇ아ㅈ자ㅊ차ㅋ카ㅌ타ㅍ파ㅎ하".split(""),
) as readonly string[];

const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * max);
};

export default function HyperText({
  children,
  className,
  duration = 800,
  delay = 0,
  as: Component = "div",
  startOnView = false,
  animateOnHover = false,
  characterSet = DEFAULT_CHARACTER_SET,
  ...props
}: HyperTextProps) {
  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  });

  const [displayText, setDisplayText] = useState<string[]>(() => {
    return children.split("");
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const iterationCount = useRef(0);
  const elementRef = useRef<HTMLElement>(null);

  const handleAnimationTrigger = () => {
    if (animateOnHover && !isAnimating) {
      iterationCount.current = 0;
      setIsAnimating(true);
    }
  };

  // Handle animation start based on view or delay
  useEffect(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => {
        setIsAnimating(true);
      }, delay);
      return () => {
        return clearTimeout(startTimeout);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsAnimating(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-30% 0px -30% 0px" },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      return observer.disconnect();
    };
  }, [delay, startOnView]);

  // Handle scramble animation
  useEffect(() => {
    if (!isAnimating) return;

    const intervalDuration = duration / (children.length * 10);
    const maxIterations = children.length;

    const interval = setInterval(() => {
      if (iterationCount.current < maxIterations) {
        setDisplayText((currentText) => {
          return currentText.map((letter, index) => {
            return letter === " "
              ? letter
              : index <= iterationCount.current
                ? children[index]
                : characterSet[getRandomInt(characterSet.length)];
          });
        });
        iterationCount.current = iterationCount.current + 0.1;
      } else {
        setIsAnimating(false);
        clearInterval(interval);
      }
    }, intervalDuration);

    return () => {
      return clearInterval(interval);
    };
  }, [children, duration, isAnimating, characterSet]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cn("overflow-hidden", className)}
      onMouseEnter={handleAnimationTrigger}
      {...props}
    >
      <AnimatePresence>
        {displayText.map((letter, index) => {
          return (
            <motion.span
              key={index}
              className={cn("font-mono", letter === " " ? "w-3" : "")}
            >
              {letter.toUpperCase()}
            </motion.span>
          );
        })}
      </AnimatePresence>
    </MotionComponent>
  );
}
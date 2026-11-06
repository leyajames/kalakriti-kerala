import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  count?: number;
}

export const CulturalCardSkeleton: React.FC<SkeletonProps> = ({ className = '', count = 1 }) => {
  const shouldReduceMotion = useReducedMotion();

  const shimmerVariants = {
    initial: { x: '-100%' },
    animate: {
      x: '100%',
      transition: {
        repeat: Infinity,
        duration: shouldReduceMotion ? 0 : 1.5,
        ease: 'linear'
      }
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className={`bg-white rounded-3xl border border-warm-sand/30 overflow-hidden shadow-soft flex flex-col justify-between ${className}`}
        >
          {/* Image skeleton */}
          <div className="relative h-52 bg-parchment-warm/70 overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-full h-full pointer-events-none"
            />
            {/* Tag skeleton */}
            <div className="absolute top-3 right-3 w-20 h-5 bg-warm-sand/30 rounded-full" />
          </div>

          {/* Text content skeleton */}
          <div className="p-5 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-16 h-3.5 bg-terracotta/20 rounded-md" />
              <div className="w-20 h-3.5 bg-olive-green/20 rounded-md" />
            </div>
            <div className="w-4/5 h-5 bg-deep-brown/15 rounded-md" />
            <div className="space-y-1.5 pt-1">
              <div className="w-full h-3 bg-deep-brown/10 rounded-md" />
              <div className="w-3/4 h-3 bg-deep-brown/10 rounded-md" />
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-warm-sand/20">
              <div className="w-24 h-4 bg-warm-sand/20 rounded-md" />
              <div className="w-8 h-8 rounded-full bg-parchment-warm" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};


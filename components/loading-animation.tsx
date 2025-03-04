import { Bike, Cloud, Gauge, Heart, Sparkles } from "lucide-react";

import { motion } from "framer-motion";

export default function LoadingAnimation() {
  return (
    <div className='fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='bg-white/90 p-8 rounded-2xl shadow-lg border border-blue-100'>
        <div className='flex flex-col items-center gap-4'>
          <div className='relative'>
            {/* Main motorcycle doing a wheelie */}
            <motion.div
              animate={{
                rotate: [-10, 15, -10],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className='relative'>
              <Bike
                className='w-12 h-12 text-blue-600 transform -rotate-12'
                strokeWidth={1.5}
              />
            </motion.div>

            {/* Floating hearts */}
            <motion.div
              animate={{
                y: [-20, -30, -20],
                x: [5, 15, 5],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className='absolute -top-2 -right-2'>
              <Heart
                className='w-4 h-4 text-pink-400'
                strokeWidth={1.5}
                fill='currentColor'
              />
            </motion.div>

            {/* Speed gauge */}
            <motion.div
              animate={{
                rotate: [0, 180, 360],
                scale: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              className='absolute -top-3 -left-3'>
              <Gauge className='w-5 h-5 text-blue-500' strokeWidth={1.5} />
            </motion.div>

            {/* Dust clouds */}
            <motion.div
              animate={{
                x: [-10, -20],
                opacity: [0, 0.5, 0],
                scale: [0.8, 1.2],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className='absolute bottom-0 -left-6'>
              <Cloud className='w-5 h-5 text-gray-400/70' strokeWidth={1.5} />
            </motion.div>

            {/* Speed lines */}
            <motion.div
              animate={{
                x: [0, -30],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "linear",
              }}
              className='absolute top-1/2 -right-8 flex space-x-1'>
              <div className='h-[2px] w-3 bg-blue-400/60 rounded-full' />
              <div className='h-[2px] w-4 bg-blue-400/60 rounded-full' />
              <div className='h-[2px] w-3 bg-blue-400/60 rounded-full' />
            </motion.div>

            {/* Engine sparkles */}
            <motion.div
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className='absolute -bottom-1 left-1/2'>
              <Sparkles className='w-4 h-4 text-yellow-400' strokeWidth={1.5} />
            </motion.div>
          </div>

          <div className='space-y-1 text-center'>
            <p className='text-sm font-medium text-blue-950'>
              Vrooom! Calculating...
            </p>
            <p className='text-xs text-blue-600/70'>
              Revving up the price engine 🏍️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

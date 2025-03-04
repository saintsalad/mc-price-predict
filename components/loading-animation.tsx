import { Bike, Cloud, Gauge, Heart, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const loadingMessages = [
  "Vrooom! Calculating...",
  "Revving up the price engine...",
  "Analyzing market trends...",
  "Checking similar listings...",
  "Computing depreciation...",
  "Evaluating condition...",
  "Almost there...",
  "Finalizing prediction...",
];

const timeoutMessages = [
  "Our AI is taking a coffee break",
  "The motorcycle is stuck in traffic",
  "Our servers are having a nap",
  "The prediction engine needs a tune-up",
  "Our AI is practicing wheelies",
  "The price calculator is doing yoga",
  "Our servers are playing hide and seek",
  "The motorcycle is refueling",
];

export default function LoadingAnimation() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [isTimeout, setIsTimeout] = useState(false);
  const [timeoutMessageIndex, setTimeoutMessageIndex] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 3500);

    const timeoutId = setTimeout(() => {
      setIsTimeout(true);
      const timeoutInterval = setInterval(() => {
        setTimeoutMessageIndex((prev) => (prev + 1) % timeoutMessages.length);
      }, 3500);

      return () => clearInterval(timeoutInterval);
    }, 30000);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className='fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50'>
      <div className='flex flex-col items-center gap-8'>
        {/* Animated Background Elements */}
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent)]' />
          <div className='absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.02]' />
        </div>

        {/* Main Content */}
        <div className='relative'>
          {/* Motorcycle Animation */}
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
              className='w-16 h-16 text-blue-600 transform -rotate-12'
              strokeWidth={1.5}
            />

            {/* Decorative Elements */}
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
                className='w-5 h-5 text-pink-400'
                strokeWidth={1.5}
                fill='currentColor'
              />
            </motion.div>

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
              <Gauge className='w-6 h-6 text-blue-500' strokeWidth={1.5} />
            </motion.div>

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
              <Cloud className='w-6 h-6 text-gray-400/70' strokeWidth={1.5} />
            </motion.div>

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
              <Sparkles className='w-5 h-5 text-yellow-400' strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        </div>

        {/* Text Content */}
        <div className='space-y-2 text-center'>
          <AnimatePresence mode='wait'>
            <motion.p
              key={
                isTimeout
                  ? `timeout-${timeoutMessageIndex}`
                  : `loading-${messageIndex}`
              }
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
              }}
              className='text-base font-medium text-blue-950 min-h-[24px]'>
              {isTimeout
                ? timeoutMessages[timeoutMessageIndex]
                : loadingMessages[messageIndex]}
            </motion.p>
          </AnimatePresence>
          <p className='text-sm text-blue-600/70'>
            {isTimeout
              ? "We're still working on it, promise!"
              : "Please wait while we process your request"}
          </p>
        </div>
      </div>
    </div>
  );
}

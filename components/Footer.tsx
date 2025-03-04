"use client";

import { Bot, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className='relative border-t border-blue-100 bg-gradient-to-b from-white to-blue-50/50 overflow-hidden'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0 overflow-hidden'>
        {/* Grid Pattern */}
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.02]' />

        {/* Animated Circles */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className='absolute -top-1/2 -right-1/2 w-full h-full bg-blue-500/5 rounded-full blur-3xl'
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className='absolute -bottom-1/2 -left-1/2 w-full h-full bg-indigo-500/5 rounded-full blur-3xl'
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className='absolute w-1 h-1 bg-blue-500/20 rounded-full'
            animate={{
              x: [0, 50, 0],
              y: [0, 50, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "linear",
            }}
            style={{
              left: `${(i % 5) * 20}%`,
              top: `${Math.floor(i / 5) * 20}%`,
            }}
          />
        ))}
      </div>

      <div className='container mx-auto px-4 py-12 relative'>
        <div className='flex flex-col items-center justify-center space-y-8'>
          {/* Brand Section */}
          <motion.div
            className='flex flex-col items-center space-y-4'
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}>
            <div className='relative'>
              <div className='absolute inset-0 bg-blue-600 rounded-lg blur-sm opacity-50' />
              <div className='relative flex items-center justify-center w-12 h-12 rounded-lg bg-blue-600 text-white font-bold text-xl'>
                MP
              </div>
            </div>
            <div className='flex items-center space-x-2'>
              <span className='text-2xl font-semibold text-blue-950'>
                MotorPrice
              </span>
              <Bot className='w-6 h-6 text-blue-600' />
            </div>
            <p className='text-sm text-blue-600/70 text-center max-w-md'>
              AI-powered motorcycle price prediction platform
            </p>
          </motion.div>

          {/* Decorative Elements */}
          <div className='flex items-center justify-center space-x-2'>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}>
                <Sparkles className='w-4 h-4 text-blue-600' />
              </motion.div>
            ))}
          </div>

          {/* Copyright */}
          <motion.p
            className='text-sm text-blue-600/70'
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}>
            © {new Date().getFullYear()} MotorPrice. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id='hero'
      className='min-h-[90vh] relative flex items-center justify-center overflow-hidden'>
      {/* Background Elements */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent)]' />

      {/* Animated AI Grid Pattern */}
      <div className='absolute inset-0 opacity-[0.03]'>
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:4rem_4rem]' />
      </div>

      <div className='container mx-auto px-4 py-12 relative z-10'>
        <div className='max-w-4xl mx-auto text-center space-y-6'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='flex items-center justify-center gap-2 mb-4'>
            <Sparkles className='w-5 h-5 text-blue-500' />
            <span className='text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full'>
              AI-Powered Predictions
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='text-5xl font-bold text-blue-950 tracking-tight'>
            Get Accurate Motorcycle{" "}
            <span className='bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent'>
              Price Predictions
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='text-xl text-blue-600/70 max-w-2xl mx-auto'>
            Make informed decisions with our advanced AI-powered motorcycle
            valuation tool
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className='flex items-center justify-center gap-4'>
            <button
              onClick={() => scrollToSection("predictor")}
              className='bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-blue-200/50'>
              Try It Now
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className='bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium shadow-lg hover:shadow-blue-100/50 border border-blue-200'>
              Learn More
            </button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className='absolute bottom-8 left-1/2 -translate-x-1/2'>
        <div className='animate-bounce'>
          <ArrowDown className='w-6 h-6 text-blue-600' />
        </div>
      </motion.div>
    </section>
  );
}

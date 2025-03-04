"use client";

import { motion } from "framer-motion";
import { Brain, BarChart3, Clock } from "lucide-react";

export default function AboutSection() {
  return (
    <section id='about' className='py-24 bg-white relative overflow-hidden'>
      {/* Background Elements */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent)]' />

      <div className='container mx-auto px-4 relative z-10'>
        <div className='max-w-3xl mx-auto'>
          <div className='space-y-6 text-center'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className='space-y-4'>
              <div className='w-12 h-12 mx-auto bg-blue-100 rounded-xl flex items-center justify-center'>
                <Brain className='w-6 h-6 text-blue-600' />
              </div>
              <h2 className='text-3xl font-semibold text-blue-950'>
                About MotorPrice
              </h2>
              <p className='text-lg text-blue-600/70 max-w-2xl mx-auto'>
                We combine advanced AI technology with extensive motorcycle
                market data to provide you with accurate and reliable price
                predictions for your motorcycle.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className='grid md:grid-cols-3 gap-8 mt-12'>
              <div className='space-y-2'>
                <div className='flex items-center justify-center gap-2 text-blue-600'>
                  <BarChart3 className='w-5 h-5' />
                  <div className='text-3xl font-bold'>10K+</div>
                </div>
                <div className='text-sm text-blue-950'>Predictions Made</div>
              </div>
              <div className='space-y-2'>
                <div className='flex items-center justify-center gap-2 text-blue-600'>
                  <Brain className='w-5 h-5' />
                  <div className='text-3xl font-bold'>95%</div>
                </div>
                <div className='text-sm text-blue-950'>Accuracy Rate</div>
              </div>
              <div className='space-y-2'>
                <div className='flex items-center justify-center gap-2 text-blue-600'>
                  <Clock className='w-5 h-5' />
                  <div className='text-3xl font-bold'>24/7</div>
                </div>
                <div className='text-sm text-blue-950'>Available</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className='mt-12 p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100'>
              <p className='text-sm text-blue-600/70'>
                Our AI model continuously learns from market trends and user
                feedback to provide increasingly accurate predictions. We use a
                combination of machine learning algorithms and real-time market
                data to ensure reliable results.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

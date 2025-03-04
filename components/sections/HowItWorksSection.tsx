"use client";

import { motion } from "framer-motion";
import { Calculator, Brain, BarChart3, Sparkles } from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section
      id='how-it-works'
      className='py-24 bg-white relative overflow-hidden'>
      {/* Background Elements */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent)]' />
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.02]' />

      <div className='container mx-auto px-4 relative z-10'>
        <div className='max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className='text-center space-y-4 mb-16'>
            <div className='flex items-center justify-center gap-2'>
              <Sparkles className='w-5 h-5 text-blue-500' />
              <span className='text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full'>
                AI-Powered Process
              </span>
            </div>
            <h2 className='text-3xl font-semibold text-blue-950'>
              How It Works
            </h2>
            <p className='text-blue-600/70 max-w-2xl mx-auto'>
              Our advanced AI system analyzes your motorcycle details to provide
              accurate price predictions in seconds
            </p>
          </motion.div>

          <div className='grid md:grid-cols-3 gap-8'>
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className='relative group'>
              <div className='absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000' />
              <div className='relative bg-white rounded-xl p-6 space-y-4 border border-blue-100'>
                <div className='w-12 h-12 mx-auto bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                  <Calculator className='w-6 h-6 text-blue-600' />
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center justify-center gap-2'>
                    <span className='text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full'>
                      Step 1
                    </span>
                  </div>
                  <h3 className='font-medium text-blue-950'>Input Details</h3>
                  <p className='text-sm text-blue-600/70'>
                    Enter your motorcycle&apos;s specifications and condition
                    details
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className='relative group'>
              <div className='absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000' />
              <div className='relative bg-white rounded-xl p-6 space-y-4 border border-blue-100'>
                <div className='w-12 h-12 mx-auto bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                  <Brain className='w-6 h-6 text-blue-600' />
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center justify-center gap-2'>
                    <span className='text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full'>
                      Step 2
                    </span>
                  </div>
                  <h3 className='font-medium text-blue-950'>AI Analysis</h3>
                  <p className='text-sm text-blue-600/70'>
                    Our AI model analyzes market data and current trends
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className='relative group'>
              <div className='absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000' />
              <div className='relative bg-white rounded-xl p-6 space-y-4 border border-blue-100'>
                <div className='w-12 h-12 mx-auto bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                  <BarChart3 className='w-6 h-6 text-blue-600' />
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center justify-center gap-2'>
                    <span className='text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full'>
                      Step 3
                    </span>
                  </div>
                  <h3 className='font-medium text-blue-950'>Get Results</h3>
                  <p className='text-sm text-blue-600/70'>
                    Receive accurate price predictions with confidence scores
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
            className='mt-12 p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100'>
            <div className='flex items-center gap-3 mb-2'>
              <Brain className='w-5 h-5 text-blue-600' />
              <h4 className='font-medium text-blue-950'>AI-Powered Insights</h4>
            </div>
            <p className='text-sm text-blue-600/70'>
              Our system uses advanced machine learning algorithms to analyze
              historical data, market trends, and current conditions to provide
              you with the most accurate price predictions.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

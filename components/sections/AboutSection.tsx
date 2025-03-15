"use client";

import { motion } from "framer-motion";
import { Code, GitBranch, Database } from "lucide-react";

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
                <GitBranch className='w-6 h-6 text-blue-600' />
              </div>
              <h2 className='text-3xl font-semibold text-blue-950'>
                The Science Behind Moto Price Predictor
              </h2>
              <p className='text-lg text-blue-600/70 max-w-2xl mx-auto'>
                Built using Python&apos;s powerful machine learning libraries
                and trained on the Random Forest algorithm, our system navigates
                through thousands of data points to uncover the hidden patterns
                that influence motorcycle values.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className='grid md:grid-cols-3 gap-8 mt-12'>
              <div className='space-y-2'>
                <div className='w-10 h-10 mx-auto bg-blue-100 rounded-xl flex items-center justify-center'>
                  <GitBranch className='w-5 h-5 text-blue-600' />
                </div>
                <div className='text-blue-950 font-medium'>
                  Random Forest Algorithm
                </div>
                <div className='text-sm text-blue-600/70'>
                  Our ML model examines thousands of decision trees to identify
                  value patterns invisible to human analysis
                </div>
              </div>
              <div className='space-y-2'>
                <div className='w-10 h-10 mx-auto bg-blue-100 rounded-xl flex items-center justify-center'>
                  <Code className='w-5 h-5 text-blue-600' />
                </div>
                <div className='text-blue-950 font-medium'>
                  Python-Powered Backend
                </div>
                <div className='text-sm text-blue-600/70'>
                  Developed with scikit-learn and pandas to process complex
                  motorcycle data relationships
                </div>
              </div>
              <div className='space-y-2'>
                <div className='w-10 h-10 mx-auto bg-blue-100 rounded-xl flex items-center justify-center'>
                  <Database className='w-5 h-5 text-blue-600' />
                </div>
                <div className='text-blue-950 font-medium'>
                  Philippine Market Focus
                </div>
                <div className='text-sm text-blue-600/70'>
                  Trained specifically on local motorcycle data to reflect
                  unique market conditions
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className='mt-12 p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100'>
              <p className='text-sm text-blue-600/70'>
                Ever wondered how a machine can understand motorcycle values?
                Moto Price Predictor&apos;s Random Forest algorithm works by
                creating thousands of decision trees – each analyzing different
                aspects of your motorcycle. These trees &quot;vote&quot; on the
                most likely price range, considering factors that even
                experienced dealers might overlook. The result is a fascinating
                glimpse into how data science can illuminate market dynamics in
                ways traditional methods cannot.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

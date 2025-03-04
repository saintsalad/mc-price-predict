"use client";

import PricePredictor from "@/components/PricePredictor";
import { ArrowDown, BarChart3, Brain, Calculator } from "lucide-react";
import { motion } from "framer-motion";
export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className='relative'>
      {/* Hero Section */}
      <section
        id='hero'
        className='min-h-[90vh] relative flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100'>
        <div className='container mx-auto px-4 py-12'>
          <div className='max-w-4xl mx-auto text-center space-y-6'>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='text-5xl font-bold text-blue-950 tracking-tight'>
              Get Accurate Motorcycle Price Predictions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='text-xl text-blue-600/70'>
              Make informed decisions with our AI-powered motorcycle valuation
              tool
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}>
              <button
                onClick={() => scrollToSection("predictor")}
                className='bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg'>
                Try It Now
              </button>
            </motion.div>
          </div>
        </div>
        <div className='absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce'>
          <ArrowDown className='w-6 h-6 text-blue-600' />
        </div>
      </section>

      {/* How It Works Section */}
      <section id='how-it-works' className='py-24 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto'>
            <h2 className='text-3xl font-semibold text-blue-950 text-center mb-12'>
              How It Works
            </h2>
            <div className='grid md:grid-cols-3 gap-8'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className='text-center space-y-4'>
                <div className='w-12 h-12 mx-auto bg-blue-100 rounded-xl flex items-center justify-center'>
                  <Calculator className='w-6 h-6 text-blue-600' />
                </div>
                <h3 className='font-medium text-blue-950'>Input Details</h3>
                <p className='text-sm text-blue-600/70'>
                  Enter your motorcycle&apos;s specifications and condition
                  details
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className='text-center space-y-4'>
                <div className='w-12 h-12 mx-auto bg-blue-100 rounded-xl flex items-center justify-center'>
                  <Brain className='w-6 h-6 text-blue-600' />
                </div>
                <h3 className='font-medium text-blue-950'>AI Analysis</h3>
                <p className='text-sm text-blue-600/70'>
                  Our AI model analyzes market data and current trends
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className='text-center space-y-4'>
                <div className='w-12 h-12 mx-auto bg-blue-100 rounded-xl flex items-center justify-center'>
                  <BarChart3 className='w-6 h-6 text-blue-600' />
                </div>
                <h3 className='font-medium text-blue-950'>Get Results</h3>
                <p className='text-sm text-blue-600/70'>
                  Receive accurate price predictions with confidence scores
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Predictor Section */}
      <section
        id='predictor'
        className='py-24 bg-gradient-to-br from-blue-50 via-white to-blue-100'>
        <div className='container mx-auto px-4'>
          <div className='max-w-3xl mx-auto'>
            <div className='space-y-2 mb-10'>
              <h2 className='text-2xl font-semibold text-blue-950 tracking-tight'>
                Motorcycle Price Prediction
              </h2>
              <p className='text-sm text-blue-600/70'>
                Get accurate market value estimates based on data analysis
              </p>
            </div>
            <PricePredictor />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id='about' className='py-24 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='max-w-3xl mx-auto'>
            <div className='space-y-6 text-center'>
              <h2 className='text-3xl font-semibold text-blue-950'>
                About MotorPrice
              </h2>
              <p className='text-lg text-blue-600/70 max-w-2xl mx-auto'>
                We combine advanced AI technology with extensive motorcycle
                market data to provide you with accurate and reliable price
                predictions for your motorcycle.
              </p>
              <div className='grid md:grid-cols-3 gap-8 mt-12 text-center'>
                <div className='space-y-2'>
                  <div className='text-3xl font-bold text-blue-600'>10K+</div>
                  <div className='text-sm text-blue-950'>Predictions Made</div>
                </div>
                <div className='space-y-2'>
                  <div className='text-3xl font-bold text-blue-600'>95%</div>
                  <div className='text-sm text-blue-950'>Accuracy Rate</div>
                </div>
                <div className='space-y-2'>
                  <div className='text-3xl font-bold text-blue-600'>24/7</div>
                  <div className='text-sm text-blue-950'>Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import HeroSection from "@/components/sections/HeroSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import PricePredictor from "@/components/PricePredictor";
import AboutSection from "@/components/sections/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className='min-h-screen'>
      <HeroSection />
      <HowItWorksSection />

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

      <AboutSection />
      <Footer />
    </main>
  );
}

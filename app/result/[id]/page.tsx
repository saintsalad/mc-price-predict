"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  BarChart2,
  GitBranch,
  TrendingUp,
  Database,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  LineChart,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoadingAnimation from "@/components/loading-animation";
import { use } from "react";

interface PredictionResult {
  id: string;
  brand: string;
  model: string;
  confidence: string;
  pricePredicted: number;
  description: string;
  ml_price: number;
  gpt_price: number;
  heuristic_price: number;
  specifications: {
    category: string;
    displacement: string;
    transmission: string;
    yearRange: string;
    priceRange: {
      min: number;
      max: number;
    };
  };
  condition: {
    year: number;
    mileage: number;
    sellerType: string;
    owner: string;
    knownIssues: string;
  };
}

export default function ResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch result data from localStorage
    const storedData = localStorage.getItem(`prediction_${resolvedParams.id}`);

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setResult(parsedData);
      } catch (error) {
        console.error("Error parsing stored data:", error);
        router.push("/"); // Redirect to home if data is invalid
      }
    } else {
      router.push("/"); // Redirect to home if no data found
    }

    setIsLoading(false);
  }, [resolvedParams.id, router]);

  if (isLoading) {
    return (
      <div className='fixed inset-0 flex items-center justify-center bg-white'>
        <LoadingAnimation />
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <main className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100'>
      <div className='container mx-auto px-4 py-12'>
        {/* Back Button */}
        <Button
          variant='ghost'
          className='mb-8 text-blue-600 hover:text-blue-700'
          onClick={() => router.back()}>
          <ArrowLeft className='w-4 h-4 mr-2' />
          Back
        </Button>

        <div className='max-w-4xl mx-auto space-y-8'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-center space-y-4'>
            <div className='flex items-center justify-center gap-2'>
              <BarChart2 className='w-5 h-5 text-blue-600' />
              <span className='text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full'>
                Moto Price Predictor Results
              </span>
            </div>
            <h1 className='text-3xl font-bold text-blue-950'>
              {result.brand} {result.model}
            </h1>
            <p className='text-blue-600/70'>
              Price prediction based on machine learning analysis and market
              data
            </p>
          </motion.div>

          {/* Main Result Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}>
            <Card className='border border-blue-100 shadow-lg bg-white relative overflow-hidden'>
              <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent)]' />
              <div className='absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.02]' />

              <CardContent className='p-6 relative z-10'>
                <div className='mb-6'>
                  <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-3'>
                    <div className='space-y-1.5'>
                      <h2 className='text-2xl font-bold text-blue-700'>
                        ₱ {result.pricePredicted.toLocaleString() || 0.0}
                      </h2>
                      <div className='flex items-center gap-2'>
                        <GitBranch className='w-4 h-4 text-blue-600' />
                        <span className='text-sm font-medium text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full'>
                          {result.confidence} Model Confidence
                        </span>
                      </div>
                    </div>
                    <div className='flex items-center gap-2 bg-blue-50/50 px-3 py-1.5 rounded-lg border border-blue-100'>
                      <TrendingUp className='w-4 h-4 text-blue-600' />
                      <div className='text-sm'>
                        <span className='text-blue-600/70'>Market Range: </span>
                        <span className='font-medium text-blue-700'>
                          ₱
                          {result.specifications.priceRange.min.toLocaleString()}
                          - ₱
                          {result.specifications.priceRange.max.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='grid md:grid-cols-2 gap-6 mb-6'>
                  <div className='space-y-3'>
                    <h3 className='font-medium text-blue-950 flex items-center gap-2'>
                      <CheckCircle className='w-4 h-4 text-blue-600' />
                      Specifications
                    </h3>
                    <div className='grid grid-cols-2 gap-3 text-sm'>
                      <div className='bg-blue-50/50 p-2.5 rounded-lg border border-blue-100'>
                        <span className='text-blue-600/70 block mb-0.5'>
                          Category
                        </span>
                        <p className='font-medium text-blue-950'>
                          {result.specifications.category}
                        </p>
                      </div>
                      <div className='bg-blue-50/50 p-2.5 rounded-lg border border-blue-100'>
                        <span className='text-blue-600/70 block mb-0.5'>
                          Engine
                        </span>
                        <p className='font-medium text-blue-950'>
                          {result.specifications.displacement}
                        </p>
                      </div>
                      <div className='bg-blue-50/50 p-2.5 rounded-lg border border-blue-100'>
                        <span className='text-blue-600/70 block mb-0.5'>
                          Transmission
                        </span>
                        <p className='font-medium text-blue-950'>
                          {result.specifications.transmission}
                        </p>
                      </div>
                      <div className='bg-blue-50/50 p-2.5 rounded-lg border border-blue-100'>
                        <span className='text-blue-600/70 block mb-0.5'>
                          Year Range
                        </span>
                        <p className='font-medium text-blue-950'>
                          {result.specifications.yearRange}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className='space-y-3'>
                    <h3 className='font-medium text-blue-950 flex items-center gap-2'>
                      <AlertCircle className='w-4 h-4 text-blue-600' />
                      Condition
                    </h3>
                    <div className='grid grid-cols-2 gap-3 text-sm'>
                      <div className='bg-blue-50/50 p-2.5 rounded-lg border border-blue-100'>
                        <span className='text-blue-600/70 block mb-0.5'>
                          Year
                        </span>
                        <p className='font-medium text-blue-950'>
                          {result.condition.year}
                        </p>
                      </div>
                      <div className='bg-blue-50/50 p-2.5 rounded-lg border border-blue-100'>
                        <span className='text-blue-600/70 block mb-0.5'>
                          Mileage
                        </span>
                        <p className='font-medium text-blue-950'>
                          {result.condition.mileage.toLocaleString()} km
                        </p>
                      </div>
                      <div className='bg-blue-50/50 p-2.5 rounded-lg border border-blue-100'>
                        <span className='text-blue-600/70 block mb-0.5'>
                          Seller Type
                        </span>
                        <p className='font-medium text-blue-950 capitalize'>
                          {result.condition.sellerType}
                        </p>
                      </div>
                      <div className='bg-blue-50/50 p-2.5 rounded-lg border border-blue-100'>
                        <span className='text-blue-600/70 block mb-0.5'>
                          Owner
                        </span>
                        <p className='font-medium text-blue-950'>
                          {result.condition.owner} Owner
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='mt-6 pt-4 border-t border-blue-100'>
                  <div className='flex items-center gap-2 mb-3'>
                    <LineChart className='w-4 h-4 text-blue-600' />
                    <h3 className='font-medium text-blue-950'>
                      Model Analysis
                    </h3>
                  </div>
                  <div className='bg-blue-50/50 p-3 rounded-lg border border-blue-100'>
                    <div className='space-y-3'>
                      {result.description
                        .replace(/\\n/g, "\n")
                        .split("\n\n")
                        .map((paragraph, index) => (
                          <p
                            key={index}
                            className='text-sm text-blue-600/70 leading-relaxed whitespace-pre-line'>
                            {paragraph}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className='flex justify-center gap-4'>
            <Button
              variant='outline'
              className='text-blue-600 hover:text-blue-700'
              onClick={() => router.back()}>
              <ArrowLeft className='w-4 h-4 mr-2' />
              Back
            </Button>
            <Button
              className='bg-blue-600 text-white hover:bg-blue-700'
              onClick={() => router.push("/")}>
              <Database className='w-4 h-4 mr-2' />
              Calculate Another Motorcycle
            </Button>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

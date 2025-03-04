"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import {
  motorcycleBrands,
  type MotorcycleModel,
} from "@/constants/motorcycleBrands";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import LoadingAnimation from "@/components/loading-animation";
import { CheckCircle, Brain, Sparkles, Gauge } from "lucide-react";
import SpecificationsContainer from "@/components/SpecificationsContainer";
import { useRouter } from "next/navigation";

interface PredictionResult {
  confidence: string;
  pricePredicted: number;
  description: string;
  ml_price: number;
  gpt_price: number;
  heuristic_price: number;
}

export default function PricePredictor() {
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [modelDetails, setModelDetails] = useState<MotorcycleModel | null>(
    null
  );
  const [predictionResult, setPredictionResult] =
    useState<PredictionResult | null>(null);
  const [formData, setFormData] = useState({
    year: "",
    mileage: 0,
    sellerType: "",
    owner: "",
    knownIssues: [] as string[],
    otherIssues: "",
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const router = useRouter();

  const modelOptions = selectedBrand
    ? motorcycleBrands.find((brand) => brand.name === selectedBrand)?.models ||
      []
    : [];

  const commonIssues = [
    "Engine knocking",
    "Oil leaks",
    "Chain issues",
    "Electrical problems",
    "Transmission problems",
    "Brake issues",
    "Suspension issues",
    "Starting problems",
    "Exhaust system issues",
    "Fuel system problems",
  ];

  useEffect(() => {
    if (selectedBrand && selectedModel) {
      const brand = motorcycleBrands.find(
        (brand) => brand.name === selectedBrand
      );
      const model = brand?.models.find((model) => model.name === selectedModel);
      setModelDetails(model || null);
    } else {
      setModelDetails(null);
    }
  }, [selectedBrand, selectedModel]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!selectedBrand || !selectedModel || !modelDetails) {
      toast.error("Please select a motorcycle model first");
      return;
    }

    setIsCalculating(true);
    setPredictionResult(null);

    const knownIssuesString = formData.knownIssues
      .filter((issue) => issue !== "Other")
      .concat(formData.otherIssues ? [formData.otherIssues] : [])
      .join(", ");

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({
          brand: selectedBrand,
          model: selectedModel,
          specifications: {
            category: modelDetails.category,
            displacement: modelDetails.displacement,
            transmission: modelDetails.transmission,
            yearRange: modelDetails.yearRange,
            priceRange: modelDetails.priceRange,
          },
          condition: {
            year: parseInt(formData.year),
            mileage: parseInt(formData.mileage.toString()),
            sellerType: formData.sellerType,
            owner: formData.owner,
            knownIssues: knownIssuesString,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || `Server error: ${response.status}`
        );
      }

      const result = await response.json();

      // Store the result data in localStorage
      const resultData = {
        id: Date.now().toString(), // Generate a unique ID
        brand: selectedBrand,
        model: selectedModel,
        confidence: result.confidence,
        pricePredicted: result.pricePredicted,
        description: result.description,
        ml_price: result.ml_price,
        gpt_price: result.gpt_price,
        heuristic_price: result.heuristic_price,
        specifications: {
          category: modelDetails.category,
          displacement: modelDetails.displacement,
          transmission: modelDetails.transmission,
          yearRange: modelDetails.yearRange,
          priceRange: modelDetails.priceRange,
        },
        condition: {
          year: parseInt(formData.year),
          mileage: parseInt(formData.mileage.toString()),
          sellerType: formData.sellerType,
          owner: formData.owner,
          knownIssues: formData.knownIssues.join(", "),
        },
      };

      // Store in localStorage
      localStorage.setItem(
        `prediction_${resultData.id}`,
        JSON.stringify(resultData)
      );

      // Navigate to result page
      router.push(`/result/${resultData.id}`);
    } catch (error) {
      console.error("Error calculating price:", error);
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        toast.error(
          "Unable to connect to the prediction server. Please make sure the server is running."
        );
      } else {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to calculate price. Please try again."
        );
      }
    } finally {
      setIsCalculating(false);
    }
  };

  const handleClear = () => {
    setSelectedBrand("");
    setSelectedModel("");
    setModelDetails(null);
    setPredictionResult(null);
    setFormData({
      year: "",
      mileage: 0,
      sellerType: "",
      owner: "",
      knownIssues: [],
      otherIssues: "",
    });
  };

  const handleIssueToggle = (issue: string) => {
    setFormData((prev) => ({
      ...prev,
      knownIssues: prev.knownIssues.includes(issue)
        ? prev.knownIssues.filter((i) => i !== issue)
        : [...prev.knownIssues, issue],
    }));
  };

  return (
    <div className='space-y-6'>
      <Card className='border border-blue-100 shadow-sm bg-white relative overflow-hidden'>
        {/* Background Elements */}
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent)]' />
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.02]' />

        <CardContent className='p-6 space-y-8 relative z-10'>
          {/* Header */}
          <div className='flex items-center gap-2 mb-2'>
            <Brain className='w-5 h-5 text-blue-600' />
            <span className='text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full'>
              AI Price Predictor
            </span>
          </div>

          {/* Brand and Model Selection - Horizontal */}
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-1.5'>
              <label className='text-xs font-medium text-blue-800'>Brand</label>
              <Select
                value={selectedBrand}
                onValueChange={(value) => {
                  setSelectedBrand(value);
                  setSelectedModel("");
                }}>
                <SelectTrigger className='h-9 text-sm bg-white border-blue-200'>
                  <SelectValue placeholder='Select brand' />
                </SelectTrigger>
                <SelectContent>
                  {motorcycleBrands.map((brand) => (
                    <SelectItem key={brand.name} value={brand.name}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-1.5'>
              <label className='text-xs font-medium text-blue-800'>Model</label>
              <Select
                value={selectedModel}
                onValueChange={setSelectedModel}
                disabled={!selectedBrand}>
                <SelectTrigger className='h-9 text-sm bg-white border-blue-200'>
                  <SelectValue placeholder='Select model' />
                </SelectTrigger>
                <SelectContent>
                  {modelOptions.map((model) => (
                    <SelectItem key={model.name} value={model.name}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Specifications Container */}
          {modelDetails && (
            <SpecificationsContainer
              modelDetails={modelDetails}
              selectedBrand={selectedBrand}
            />
          )}

          {/* Basic Details */}
          <div className='grid grid-cols-3 gap-4'>
            <div className='space-y-1.5'>
              <label className='text-xs font-medium text-blue-800'>Year</label>
              <Input
                type='number'
                placeholder='Enter year'
                min='1900'
                max='2024'
                name='year'
                value={formData.year}
                onChange={handleInputChange}
                className='h-9 text-sm bg-white border-blue-200'
              />
            </div>

            <div className='space-y-1.5'>
              <label className='text-xs font-medium text-blue-800'>
                Seller Type
              </label>
              <Select
                value={formData.sellerType}
                onValueChange={(value) =>
                  handleSelectChange("sellerType", value)
                }>
                <SelectTrigger className='h-9 text-sm bg-white border-blue-200'>
                  <SelectValue placeholder='Select type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='individual'>Individual</SelectItem>
                  <SelectItem value='dealer'>Dealer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-1.5'>
              <label className='text-xs font-medium text-blue-800'>Owner</label>
              <Select
                value={formData.owner}
                onValueChange={(value) => handleSelectChange("owner", value)}>
                <SelectTrigger className='h-9 text-sm bg-white border-blue-200'>
                  <SelectValue placeholder='Select owner' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='1'>1st Owner</SelectItem>
                  <SelectItem value='2'>2nd Owner</SelectItem>
                  <SelectItem value='3'>3rd Owner</SelectItem>
                  <SelectItem value='4'>4th Owner or more</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Mileage Slider - Simplified Design */}
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <label className='text-xs font-medium text-blue-800 flex items-center gap-2'>
                <Gauge className='w-4 h-4 text-blue-600' />
                Mileage
              </label>
              <span className='text-sm font-medium text-blue-700 bg-blue-50 px-3 py-1 rounded-full'>
                {formData.mileage.toLocaleString()} km
              </span>
            </div>

            <div className='space-y-2'>
              <Slider
                value={[formData.mileage]}
                onValueChange={([value]) =>
                  setFormData((prev) => ({ ...prev, mileage: value }))
                }
                max={100000}
                step={100}
                className='w-full'
              />
              <div className='flex justify-between text-xs text-blue-600/70'>
                <span>0 km</span>
                <span>100,000 km</span>
              </div>
            </div>
          </div>

          {/* Known Issues - Simplified */}
          <div className='space-y-3'>
            <label className='text-xs font-medium text-blue-800'>
              Known Issues
            </label>
            <div className='flex flex-wrap gap-2'>
              {commonIssues.slice(0, -1).map((issue) => (
                <button
                  key={issue}
                  type='button'
                  onClick={() => handleIssueToggle(issue)}
                  className={`text-sm px-3 py-1 rounded-full transition-colors ${
                    formData.knownIssues.includes(issue)
                      ? "bg-blue-50 border-blue-200 text-blue-700"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}>
                  {issue}
                </button>
              ))}
              <button
                type='button'
                onClick={() => handleIssueToggle("Other")}
                className={`text-sm px-3 py-1 rounded-full transition-colors ${
                  formData.knownIssues.includes("Other")
                    ? "bg-blue-50 border-blue-200 text-blue-700"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}>
                Other
              </button>
            </div>

            {formData.knownIssues.includes("Other") && (
              <div className='space-y-1.5'>
                <Textarea
                  placeholder='Describe other issues...'
                  name='otherIssues'
                  value={formData.otherIssues}
                  onChange={handleInputChange}
                  className='w-full resize-none text-sm h-20 bg-white border-blue-200'
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className='flex gap-3'>
            <button
              type='button'
              onClick={handleClear}
              disabled={isCalculating}
              className='w-32 bg-white text-blue-600 text-sm h-10 rounded-md hover:bg-blue-50 transition-colors font-medium shadow-sm border border-blue-200 disabled:opacity-50'>
              Clear
            </button>
            <button
              type='button'
              onClick={handleSubmit}
              disabled={isCalculating}
              className='flex-1 bg-blue-600 text-white text-sm h-10 rounded-md hover:bg-blue-700 transition-colors font-medium shadow-sm disabled:opacity-50 flex items-center justify-center gap-2'>
              <Sparkles className='w-4 h-4' />
              Calculate Price Estimate
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Prediction Result */}
      <AnimatePresence mode='wait'>
        {predictionResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}>
            <Card className='border border-blue-300 shadow-md bg-gradient-to-br from-blue-50 to-white relative overflow-hidden'>
              {/* Background Elements */}
              <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent)]' />

              <CardContent className='p-6 relative z-10'>
                <div className='flex items-start justify-between mb-6'>
                  <div className='space-y-1'>
                    <h3 className='text-lg font-semibold text-blue-950'>
                      Predicted Price
                    </h3>
                    <p className='text-3xl font-bold text-blue-700'>
                      ₱
                      {predictionResult.gpt_price === undefined ||
                      predictionResult.gpt_price === null
                        ? predictionResult.pricePredicted.toLocaleString()
                        : predictionResult.gpt_price.toLocaleString()}
                    </p>
                  </div>
                  <div className='flex items-center space-x-2 bg-blue-100/50 px-3 py-1.5 rounded-full border border-blue-200'>
                    <CheckCircle className='w-4 h-4 text-blue-700' />
                    <span className='text-sm font-medium text-blue-700'>
                      {predictionResult.confidence} Confidence
                    </span>
                  </div>
                </div>
                <div className='bg-blue-50/50 rounded-lg p-4 border border-blue-100'>
                  <p className='text-sm text-blue-700 leading-relaxed whitespace-pre-line'>
                    {predictionResult.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      {isCalculating && (
        <div className='fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50'>
          <LoadingAnimation />
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { motorcycleBrands } from "@/constants/motorcycleBrands";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import LoadingAnimation from "@/components/loading-animation";
import { CheckCircle, Brain, Sparkles, Gauge, Search, X } from "lucide-react";
import SpecificationsContainer from "@/components/SpecificationsContainer";
import { useRouter } from "next/navigation";
import { API_CONFIG } from "@/lib/config";
import {
  commonIssues,
  IssueType,
  MotorcycleModel,
  PredictionResult,
} from "@/interfaces/motorcycle";
import { Button } from "@/components/ui/button";

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
    knownIssues: [] as IssueType[],
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const modelOptions = selectedBrand
    ? motorcycleBrands.find((brand) => brand.name === selectedBrand)?.models ||
      []
    : [];

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".issues-dropdown-container")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const handleInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

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

    const knownIssuesString = formData.knownIssues.join(", ");

    try {
      const response = await fetch(`${API_CONFIG.baseUrl}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
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
    });
  };

  const handleIssueToggle = (issue: IssueType) => {
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
              ML Price Predictor
            </span>
          </div>

          {/* Brand and Model Selection - Responsive */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
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

          {/* Basic Details - Responsive */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            <div className='space-y-1.5'>
              <label className='text-xs font-medium text-blue-800'>Year</label>
              <Select
                value={formData.year.toString()}
                onValueChange={(value) => handleSelectChange("year", value)}
                disabled={!modelDetails}>
                <SelectTrigger className='h-9 text-sm bg-white border-blue-200'>
                  <SelectValue
                    placeholder={
                      modelDetails ? "Select year" : "Select model first"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {modelDetails &&
                    modelDetails.yearRange.split("-").length === 2 &&
                    Array.from(
                      {
                        length:
                          parseInt(modelDetails.yearRange.split("-")[1]) -
                          parseInt(modelDetails.yearRange.split("-")[0]) +
                          1,
                      },
                      (_, i) => {
                        const year =
                          parseInt(modelDetails.yearRange.split("-")[0]) + i;
                        return (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        );
                      }
                    )}
                </SelectContent>
              </Select>
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
                  <SelectItem value='Private'>Private</SelectItem>
                  <SelectItem value='Dealer'>Dealer</SelectItem>
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
                max={150000}
                step={100}
                className='w-full'
              />
              <div className='flex justify-between text-xs text-blue-600/70'>
                <span>0 km</span>
                <span>150,000 km</span>
              </div>
            </div>
          </div>

          {/* Known Issues - Searchable Dropdown & Badges */}
          <div className='space-y-3'>
            <label className='text-xs font-medium text-blue-800'>
              Known Issues
            </label>

            <div className='space-y-3'>
              {/* Searchable Dropdown */}
              <div className='relative issues-dropdown-container'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Search className='h-4 w-4 text-blue-500' />
                </div>
                <input
                  type='text'
                  className='h-9 pl-10 w-full text-sm bg-white border border-blue-200 rounded-md focus:ring-1 focus:ring-blue-300 focus:border-blue-300 outline-none'
                  placeholder='Search for issues...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowDropdown(true)}
                />
                {showDropdown && (
                  <div className='absolute z-10 mt-1 w-full bg-white border border-blue-200 rounded-md shadow-lg max-h-60 overflow-auto'>
                    <div className='p-1'>
                      {Object.keys(commonIssues)
                        .filter((issue) => {
                          const searchTermLower = searchTerm.toLowerCase();
                          const titleMatches = issue
                            .toLowerCase()
                            .includes(searchTermLower);
                          const description =
                            commonIssues[issue as keyof typeof commonIssues];
                          const descriptionMatches =
                            typeof description === "string" &&
                            description.toLowerCase().includes(searchTermLower);

                          return titleMatches || descriptionMatches;
                        })
                        .map((issue) => (
                          <div
                            key={issue}
                            className={`px-2 py-1.5 text-sm rounded cursor-pointer hover:bg-blue-50 ${
                              formData.knownIssues.includes(issue as IssueType)
                                ? "bg-blue-50 text-blue-700"
                                : ""
                            }`}
                            onClick={() => {
                              handleIssueToggle(issue as IssueType);
                              setSearchTerm("");
                              setShowDropdown(false);
                            }}>
                            <div className='flex items-center'>
                              <span className='mr-2'>
                                {formData.knownIssues.includes(
                                  issue as IssueType
                                ) && (
                                  <CheckCircle className='h-3.5 w-3.5 text-blue-600' />
                                )}
                              </span>
                              <div>
                                <div className='font-medium'>{issue}</div>
                                <div className='text-xs text-gray-500 truncate'>
                                  {
                                    commonIssues[
                                      issue as keyof typeof commonIssues
                                    ]
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Selected Issues as Badges */}
              {formData.knownIssues.length > 0 && (
                <div className='flex flex-wrap gap-2 mt-2 p-3 bg-blue-50/30 border border-blue-100 rounded-md'>
                  {formData.knownIssues.map((issue) => (
                    <div
                      key={issue}
                      className='flex items-center bg-blue-100 text-blue-700 text-xs py-1 pl-2 pr-1 rounded-full group relative'>
                      <span>{issue}</span>
                      <button
                        type='button'
                        onClick={() => handleIssueToggle(issue)}
                        className='ml-1 p-0.5 rounded-full hover:bg-blue-200 transition-colors'>
                        <X className='h-3 w-3' />
                      </button>

                      {/* Tooltip on hover */}
                      <div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-white shadow-lg rounded-md border border-blue-100 text-xs text-blue-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10'>
                        {commonIssues[issue as keyof typeof commonIssues]}
                        <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-white border-b border-r border-blue-100 rotate-45'></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons - Responsive */}
          <div className='flex flex-col sm:flex-row gap-3'>
            <Button
              type='button'
              onClick={handleClear}
              disabled={isCalculating}
              className='w-full sm:w-32 bg-white text-blue-600 text-sm h-10 rounded-md hover:bg-blue-50 transition-colors font-medium shadow-sm border border-blue-200 disabled:opacity-50'>
              Clear
            </Button>
            <Button
              type='button'
              onClick={handleSubmit}
              disabled={isCalculating}
              className='w-full flex-1 bg-blue-600 text-white text-sm h-10 rounded-md hover:bg-blue-700 transition-colors font-medium shadow-sm disabled:opacity-50 flex items-center justify-center gap-2'>
              <Sparkles className='w-4 h-4' />
              Calculate Price Estimate
            </Button>
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

// Motorcycle Brand and Model Interfaces
export enum TransmissionType {
  Manual = "Manual",
  Automatic = "Automatic",
  SemiAutomatic = "Semi-Automatic",
  CVT = "CVT",
}

export enum MotorcycleCategory {
  Scooter = "Scooter",
  Underbone = "Underbone",
  Backbone = "Backbone",
  Sport = "Sport",
  Adventure = "Adventure",
  Cruiser = "Cruiser",
}

export interface MotorcycleModel {
  name: string;
  priceRange: {
    min: number;
    max: number;
  };
  yearRange: string;
  category: MotorcycleCategory;
  displacement: number; // in cc
  transmission: TransmissionType;
}

export interface MotorcycleBrand {
  name: string;
  models: MotorcycleModel[];
}

// Condition and Specifications Interfaces
export interface Condition {
  year: number;
  mileage: number;
  sellerType: string;
  owner: string;
  knownIssues: string;
}

export interface Specifications {
  category: MotorcycleCategory;
  displacement: number;
  transmission: TransmissionType;
  yearRange: string;
  priceRange: {
    min: number;
    max: number;
  };
}

// Training Record Interface
export interface TrainingRecord {
  id?: number;
  brand: string;
  model: string;
  specifications: Specifications;
  condition: Condition;
  predictedPrice?: number;
  created_at?: string;
}

// Prediction Result Interface
export interface PredictionResult {
  confidence: string;
  pricePredicted: number;
  description: string;
  ml_price: number;
  gpt_price: number;
  heuristic_price: number;
}

export const commonIssues = {
  "Cosmetic damage":
    "Minor exterior damages that don't affect performance: scratches, dents, paint chips, or faded paint",
  "Engine knocking":
    "Concerning engine noises: unusual banging, tapping, or knocking sounds while the engine is running",
  "Oil leaks":
    "Oil dripping or seeping from seals, gaskets, or engine parts, visible on ground or engine surfaces",
  "Chain issues":
    "Drive chain problems: excessive looseness, noise, rust, or damage requiring adjustment or replacement",
  "Electrical problems":
    "Malfunctioning electrical components: lights, starter, battery, or wiring issues",
  "Transmission problems":
    "Gear-related issues: difficult shifting, grinding noises, or slipping out of gear while riding",
  "Brake issues":
    "Brake system concerns: reduced stopping power, unusual noises, or vibrations during braking",
  "Suspension issues":
    "Poor ride quality: excessive bouncing, unstable handling, or leaking suspension components",
  "Starting problems":
    "Difficulty starting the motorcycle: requires multiple attempts or won't start consistently",
  "Exhaust system issues":
    "Exhaust-related problems: unusual noises, visible damage, or holes in pipes/muffler",
  "Fuel system problems":
    "Fuel delivery issues: poor performance, irregular idling, or unusual fuel consumption",
  Overheating:
    "Engine temperature rises beyond normal operating conditions, potentially causing damage",
  "Smoke from exhaust":
    "Visible smoke coming from the exhaust, indicating potential engine combustion issues",
  "Clutch problems":
    "Issues with clutch engagement/disengagement, slipping, or unusual noises when using the clutch",
  "Rust/Corrosion":
    "Visible rust or corrosion on frame, exhaust, or other metal parts affecting appearance or integrity",
  "Leaking fork seals":
    "Oil leaking from fork seals, affecting suspension performance and requiring replacement",
  "Worn tires":
    "Tires with low tread depth, visible wear patterns, cracks, or other damage requiring replacement",
} as const;

export type IssueType = keyof typeof commonIssues;

export const commonIssues = [
  "Cosmetic damage",
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
] as const;

export type IssueType = (typeof commonIssues)[number];

export const issueDescriptions: Record<IssueType, string> = {
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
};

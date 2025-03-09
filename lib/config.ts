// API Configuration
export const API_CONFIG = {
  baseUrl:
    process.env.NEXT_PUBLIC_TEST_MODE === "true"
      ? "http://localhost:8000"
      : process.env.NEXT_PUBLIC_API_URL,
};

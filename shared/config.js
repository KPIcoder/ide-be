export const config = {
  POSTGRES_USER: process.env.POSTGRES_USER || "marcus",
  POSTGRES_HOST: process.env.POSTGRES_HOST || "localhost",
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || "marcus",
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE || "postgres",

  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || "",
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || "",

  API_V1_BASE_URL: process.env.API_V1_BASE_URL || "http://localhost:3001",

  PORT: process.env.PORT || 3001,

  COOKIE_SECRET: process.env.COOKIE_SECRET || "",
};

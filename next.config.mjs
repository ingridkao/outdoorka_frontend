/** @type {import('next').NextConfig} */
import dotenv from "dotenv";
// import withBundleAnalyzer from "@next/bundle-analyzer";

const appEnv = process.env.APP_ENV || "production";
// const analyzeEnabled = process.env.ANALYZE === "true";

dotenv.config({
  path: [`.env.${appEnv}`],
  override: true,
  debug: true,
});

const nextConfig = {
  // enabled: analyzeEnabled,
  reactStrictMode: false,
  trailingSlash: true,
  // output: "export",
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    appDir: true,
  },
  // onlyBrowser: true,
  // reportDir: ".next/analyze",
};

export default nextConfig;

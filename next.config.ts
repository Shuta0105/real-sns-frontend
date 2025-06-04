import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["kotonohaworks.com", "i.pinimg.com"], // ← ここが必要
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["randomuser.me"], 
  },
  reactStrictMode: true, 
  swcMinify: true, 
};

export default nextConfig;
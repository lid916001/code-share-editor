import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Allow access from local network IP
  allowedDevOrigins: ["192.168.1.209:3000", "localhost:3000"],
};

export default nextConfig;

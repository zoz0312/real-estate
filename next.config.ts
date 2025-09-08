import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    emotion: true, // Next 12+는 emotion 최적화를 공식 지원
  },
};

export default nextConfig;

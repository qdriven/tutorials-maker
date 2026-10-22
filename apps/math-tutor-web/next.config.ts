import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,
  transpilePackages: ['tldraw', '@tutorials-maker/math-tutor-protocol'],
};

export default nextConfig;

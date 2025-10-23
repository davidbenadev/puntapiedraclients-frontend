/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  /* config options here */
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../'),
  },
};

export default nextConfig;

// next.config.mjs  o  next.config.js (si tienes "type": "module")
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../'),
  },
};

export default nextConfig;
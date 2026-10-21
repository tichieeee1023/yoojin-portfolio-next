import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Ship only the public answer material with this server route.
  outputFileTracingIncludes: {
    '/api/chat': ['./src/data/chatbot/public-knowledge.md'],
  },
};

export default nextConfig;

import type { NextConfig } from 'next'

const replitDomain = process.env.REPLIT_DOMAINS ?? ''

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  allowedDevOrigins: [
    '*.replit.dev',
    '*.sisko.replit.dev',
    '*.replit.app',
    ...(replitDomain ? [replitDomain] : []),
  ],
}

export default nextConfig

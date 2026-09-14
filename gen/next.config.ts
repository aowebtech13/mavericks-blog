import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    qualities: [100, 75],
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'apiv3advfvsgatvyc.mavericksai.tech',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'kreightor.lexicron.org',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'kreightor.lexicron.org',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: 'kreightor.lexicron.org',
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        hostname: 'kreightor.lexicron.org',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

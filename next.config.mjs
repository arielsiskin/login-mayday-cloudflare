/** @type {import('next').NextConfig} */
const nextConfig = {async rewrites() {
  return [
    {
      source: '/api/proxy/delivery/:path*',
      destination: 'http://delivery.neotelecd.com/:path*', // Proxy to Backend
     },
      {
        source: '/api/proxy/ecd02/:path*',
        destination: 'http://ecd02.neotelecd.com/:path*',
      }
  ];
},};
export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'http://delivery.neotelecd.com/neoapi/webservice.asmx/:path*' // Proxy to Backend
    }
  ];
},};
export default nextConfig;

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/proxy/delivery/:path*',
        destination: 'https://delivery.neotelecd.com/:path*',
      },
      {
        source: '/api/proxy/ecd04/:path*',
        destination: 'https://ecd04.neotelecd.com/:path*',
      },
      {
        source: '/api/proxy/ecd02/:path*',
        destination: 'https://ecd02.neotelecd.com/:path*',
      },
      {
        source: '/api/proxy/broxel/:path*',
        destination: 'https://broxel.neotelecd.com/:path*',
      },
      {
        source: '/api/proxy/ecd05/:path*',
        destination: 'https://ecd05-i1.neotelecd.com/:path*',
      },
    ]
  },
}


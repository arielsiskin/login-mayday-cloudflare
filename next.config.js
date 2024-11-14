module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/proxy/delivery/:path*',
        destination: 'https://delivery.neotelecd.com/:path*',
      },
      {
        source: '/api/proxy/ceneval/:path*',
        destination: 'https://ceneval.neotelecd.com/:path*',
      },
      {
        source: '/api/proxy/ecd02/:path*',
        destination: 'https://ecd02.neotelecd.com/:path*',
      },
      {
        source: '/api/proxy/broxel/:path*',
        destination: 'https://broxel.neotelecd.com/:path*',
      },
    ]
  },
}


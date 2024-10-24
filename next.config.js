module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/proxy/delivery/:path*',
        destination: 'http://delivery.neotelecd.com/:path*',
      },
      {
        source: '/api/proxy/ceneval/:path*',
        destination: 'http://ceneval.neotelecd.com/:path*',
      },
      {
        source: '/api/proxy/ecd02/:path*',
        destination: 'http://ecd02.neotelecd.com/:path*',
      },
      {
        source: '/api/proxy/broxel/:path*',
        destination: 'http://broxel.neotelecd.com/:path*',
      },
    ]
  },
}


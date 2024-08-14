module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/proxy/delivery/:path*',
        destination: 'https://delivery.neotelecd.com/:path*',
      },
      {
        source: '/api/proxy/ecd02/:path*',
        destination: 'http://ecd02.neotelecd.com/:path*',
      },
    ]
  },
}


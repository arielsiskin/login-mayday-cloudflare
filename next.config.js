module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/proxy/kfc/:path*',
        destination: 'https://delivery.neotelecd.com/:path*',
      },
      {
        source: '/api/proxy/ecd02/:path*',
        destination: 'http://ecd02.neotelecd.com/:path*',
      },
    ]
  },
}


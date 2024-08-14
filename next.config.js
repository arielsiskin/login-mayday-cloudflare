module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/proxy/kfc/:path*',
        destination: 'https://delivery.neotelecd.com/:path*',
      },
      {
        source: '/api/proxy/mcdonald/:path*',
        destination: 'https://ecd02.neotelecd.com/:path*',
      },
    ]
  },
}


module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/proxy/kfc/:path*',
        destination: 'http://delivery.neotelecd.com/:path*',
      },
      {
        source: '/api/proxy/mcdonald/:path*',
        destination: 'http://webmcdonald.neotelecd.com/:path*',
      },
    ]
  },
}


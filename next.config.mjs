/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-Requested-With, Content-Type, Authorization' },
        ],
      },
    ];
  },
  images: {
    domains: ['aceternity.com',"assets.aceternity.com"], // This should be outside the headers function
  },
};

export default nextConfig;

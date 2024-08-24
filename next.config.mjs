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
    domains: ['aceternity.com', 'assets.aceternity.com', 'images.unsplash.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/chatbot',
        destination: 'https://4880-2401-4900-3e4f-2c03-4dea-5580-9b89-2bd3.ngrok-free.app/chatbot', // Proxy to the external server
      },
    ];
  },
};

export default nextConfig;

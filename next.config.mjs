/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: '/gethotelai',
  assetPrefix: '/gethotelai',
  // Ensure CSS paths are correct
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;

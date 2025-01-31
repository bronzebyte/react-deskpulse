/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    // You can customize the webpack config here if necessary
    return config;
  },
};

export default nextConfig;

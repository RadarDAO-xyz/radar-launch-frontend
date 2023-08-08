/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    VITE_WEB3AUTH_CLIENT_ID: process.env.VITE_WEB3AUTH_CLIENT_ID,
    VITE_INFURA_KEY: process.env.VITE_INFURA_KEY,
    BACKEND_URL: process.env.BACKEND_URL,
    WHITELISTED_ADDRESSES: process.env.WHITELISTED_ADDRESSES,
  },
};

module.exports = nextConfig;

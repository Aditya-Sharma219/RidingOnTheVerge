/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['example.com'],  // Add allowed image domains for external images
    },
    reactStrictMode: true,  // Enable React strict mode for catching potential issues
    env: {
      customKey: 'your-custom-value',  // Define environment variables here
    },
  };
  
  export default nextConfig;
  
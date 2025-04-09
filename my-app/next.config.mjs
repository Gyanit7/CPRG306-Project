/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "api.escuelajs.co",
        },
        {
          protocol: "https",
          hostname: "i.imgur.com", 
        },
      ],
    },
  };
  
  export default nextConfig;
  
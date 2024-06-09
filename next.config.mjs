/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: true, // הפעלת React Strict Mode לאיתור בעיות
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },
  };
  
  export default nextConfig;
  
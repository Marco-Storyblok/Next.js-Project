/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.storyblok.com",
      },
      {
        protocol: "https",
        hostname: "a-us.storyblok.com",
      },
      {
        protocol: "https",
        hostname: "a-ca.storyblok.com",
      },
      {
        protocol: "https",
        hostname: "a-ap.storyblok.com",
      },
    ],
  },
};

export default nextConfig;

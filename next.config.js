/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "100xdev-jobs.s3.ap-south-1.amazonaws.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;

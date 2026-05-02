import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/stories/building-legato",
        destination: "/en/stories/building-cadenza",
        permanent: true,
      },
      {
        source: "/en/stories/building-legato",
        destination: "/en/stories/building-cadenza",
        permanent: true,
      },
      {
        source: "/ko/stories/building-legato",
        destination: "/ko/stories/building-cadenza",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);

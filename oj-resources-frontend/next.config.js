/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://js.paystack.co",
          },
        ],
      },
    ];
  },
  images: {
    // domains: ["images.unsplash.com"],
    domains: ["images.unsplash.com", "unsplash.com"],

    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "720",
        pathname: "/uploads/**",
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig;

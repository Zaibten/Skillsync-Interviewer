const withTM = require("next-transpile-modules")(["face-api.js"]);

/** @type {import('next').NextConfig} */
const nextConfig = withTM({
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
  webpack: (webpackConfig, { webpack }) => {
    webpackConfig.plugins.push(
      // Remove node: from import specifiers, because Next.js does not yet support node: scheme
      // https://github.com/vercel/next.js/issues/28774
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, "");
      }),
    );

    // Add fallbacks for Node.js core modules
    webpackConfig.resolve.fallback = {
      fs: false,
      path: false,
      os: false,
      stream: false,
    };

    return webpackConfig;
  },
});

module.exports = nextConfig;

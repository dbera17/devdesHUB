const withLess = require("next-with-less");
const path = require('node:path');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  transpilePackages: ['antd-mobile'],
  webpack(config, options) {
    // disable css-module in Next.js
    config.module.rules.forEach((rule) => {
      const { oneOf } = rule;
      if (oneOf) {
        oneOf.forEach((one) => {
          if (!`${one.issuer?.and}`.includes('_app')) return;
          one.issuer.and = [path.resolve(__dirname)];
        });
      }
    })

    // // import antd Less files after next/head component
    // config.module.rules.push({
    //   test: /\.less$/,
    //   use: [
    //     {
    //       loader: "less-loader",
    //       options: {
    //         lessOptions: {
    //           paths: [path.resolve(__dirname, "node_modules/antd/lib/style")],
    //         },
    //       },
    //     },
    //     {
    //       loader: MiniCssExtractPlugin.loader,
    //       options: {
    //         filename: "[name].css",
    //       },
    //     },
    //   ],
    // });

    // // add mini-css-extract-plugin to plugins array
    // config.plugins = [
    //   new MiniCssExtractPlugin(),
    // ];

    return config;
  }
}

module.exports = withLess(nextConfig);
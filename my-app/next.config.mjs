/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  enableWorker: false,
  cache:false,
  webpack(config, options) {
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: '/_next/static/sounds/',
          outputPath: 'static/sounds/'
        }
      },
    });
    return config;
  },
};

export default nextConfig;

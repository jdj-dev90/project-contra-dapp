/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    return {
      ...config,
      module: { ...config.module, noParse: /gun\.js$|axe.js|sea.js/ },
    };
  },
};

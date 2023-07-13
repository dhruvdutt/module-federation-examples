const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    const { webpack } = options;
    Object.assign(config.experiments, { topLevelAwait: true });
    if (!options.isServer) {
      //config.cache=false
      config.plugins.push(
        new NextFederationPlugin({
          name: 'transactions',
          remotes: {
            home: `home@http://localhost:3001/_next/static/chunks/remoteEntry.js`,
            shop: 'shop@http://localhost:3002/_next/static/chunks/remoteEntry.js',
          },
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            './transactions': './pages/index.js',
            './pages-map': './pages-map.js',
          },
          shared: {},
          // extraOptions: {
          //   exposePages: true,
          // }
        }),
      );
    }

    return config;
  },
};

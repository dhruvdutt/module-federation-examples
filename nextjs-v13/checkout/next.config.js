const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    const { webpack } = options;
    if (!options.isServer) {
      //config.cache=false
      config.plugins.push(
        new NextFederationPlugin({
          name: 'checkout',
          remotes: {
            home: `home@http://localhost:3001/_next/static/chunks/remoteEntry.js`,
            shop: 'shop@http://localhost:3002/_next/static/chunks/remoteEntry.js',
          },
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            './title': './components/exposedTitle.js',
            './routerEntry': './pages/routerEntry',
            './checkout': './pages/checkout',
            './pages-map': './pages-map.js',
            './WebRemoteContainer': './components/WebRemoteContainer.js',
          },
          extraOptions: {},
        }),
      );
    }

    return config;
  },
};

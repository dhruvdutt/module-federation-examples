const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const packageJson = require('./package.json');

module.exports = {
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
          new NextFederationPlugin({
            name: 'host',
            remotes: {
              remote: 'remote@http://localhost:8081/remoteEntry.js',
            },
            exposes: {
              './ShellRouter': './components/ShellRouter',
              './TestComponent': './components/TestComponent',
            },
            filename: 'static/chunks/host.remoteEntry.js',
            shared: {
              'react-router-dom': {
                singleton: true,
                requiredVersion: packageJson.dependencies['react-router-dom'],
              },
              'next': {
                requiredVersion: packageJson.dependencies['next'],
              },
              'react': {
                singleton: true,
                requiredVersion: packageJson.dependencies['react'],
              },
              'react-dom': {
                singleton: true,
                requiredVersion: packageJson.dependencies['react-dom'],
              },
            },
          }),
      );
    }

    return config;
  },
};

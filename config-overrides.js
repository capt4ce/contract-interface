const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = function override(config, env) {
  config.plugins.push(
    new NodePolyfillPlugin({
      excludeAliases: ['console'],
    })
  );
  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: [require.resolve('buffer/'), 'Buffer'],
    })
  );
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: false,
    stream: require.resolve('stream-browserify'),
    assert: false,
    util: false,
    http: false,
    https: false,
    os: false,
  };
  return config;
};

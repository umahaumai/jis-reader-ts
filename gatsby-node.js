const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
      alias: {
        path: require.resolve('path-browserify'),
        stream: require.resolve('stream-browserify'),
        zlib: require.resolve('browserify-zlib'),
      },
      fallback: {
        http: false,
        https: false,
        fs: false,
        buffer: false,
        assert: false,
        events: false,
        querystring: false,
        url: false,
      },
    },
  });
};

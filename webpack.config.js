const swcDefaultConfig =
  require('@nestjs/cli/lib/compiler/defaults/swc-defaults').swcDefaultsFactory()
    .swcOptions;
const path = require('node:path');

module.exports = {
  resolve: {
    // Enable resolution of TypeScript files without specifying extensions
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@common/health-check': path.resolve(
        __dirname,
        './libs/health-check/src',
      ),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: '@swc-node/loader',
          options: swcDefaultConfig,
        },
      },
    ],
  },
};

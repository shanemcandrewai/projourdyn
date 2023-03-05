import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import TerserPlugin from 'terser-webpack-plugin';

/* eslint no-underscore-dangle: ["error", { "allow": ["__dirname"] }] */
const __dirname = dirname(fileURLToPath(import.meta.url));

const config = {
  entry: resolve(__dirname, 'src/js/main.js'),
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist'),
    // clean: true,
  },
  devServer: {
    static: resolve(__dirname, 'dist'),
    open: true,
    // hot: false,
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader',
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader',
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // Options
                    },
                  ],
                ],

              },
            },
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  optimization: {
    usedExports: true,
    splitChunks: {
    },
  },
  performance: {
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000,
  },
  experiments: {
    topLevelAwait: true,
  },
};

export default (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  } else if (argv.mode === 'production') {
    config.optimization.minimize = true;
    config.optimization.minimizer = [new TerserPlugin()];
  }
  return config;
};

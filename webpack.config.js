const webpack = require('webpack');
const path = require('path');
const pkg = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: {
    hot: true,
    compress: true,
    port: 3003
  },
  devtool: 'cheap-module-source-map',
  entry: {
    main: [
      'react-hot-loader/patch',
      'webpack/hot/only-dev-server',
      './src/index.js'
    ]
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 3,
              sourceMap: true,
              localIdentName: '[name]_[local]--[hash:base64:5]'
            }
          },
          'postcss-loader?sourceMap=true',
          'resolve-url-loader',
          'sass-loader?sourceMap=true'
        ]
      },
      {
        test: /\.svg$/,
        loaders: [
          'babel-loader',
          'react-svg-loader'
        ]
      }
    ]
  },
  node: {
    setImmediate: false
  },
  output: {
    filename: "[name].js",
    devtoolFallbackModuleFilenameTemplate: 'webpack:///' + pkg.name + '/[resource-path]?v=' + pkg.version + '#[hash]',
    devtoolModuleFilenameTemplate: 'webpack:///' + pkg.name + '/[resource-path]',
    path: path.join(__dirname, 'build'),
    publicPath: '/'
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        commons: {
          test (module) {
            return module.content && (
              module.context.indexOf('node_modules') !== -1
            )
          },
          priority: 10,
          name: 'vendor',
          chunks: 'initial',
          minSize: 1
        }
      }
    }
  },
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

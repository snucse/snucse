const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Always-enabled plugins
const plugins = [
  new ExtractTextPlugin('static/application.css'),
  new CopyWebpackPlugin([{from: '*.html'}])
];

// Production-only plugins
const productionPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  })
];

module.exports = {
  entry: './app.js',

  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'static/application.js'
  },
  devtool: 'source-map',
  plugins: process.env.NODE_ENV === 'production' ? plugins.concat(productionPlugins) : plugins,
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css')
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style', 'css!stylus')
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-3', 'react']
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'xo'
      }
    ]
  },
  devServer: {
    contentBase: 'dist/',
    host: '0.0.0.0',
    port: 12321,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://snucse.snucse.org:30000',
        secure: false
      }
    }
  }
};

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

const stylesheetDir = `${__dirname}/stylesheets`;
const markdownStyl = `${stylesheetDir}/markdown.styl`;
const outMarkdownDir = `${__dirname}/dist/static`;

// Always-enabled plugins
const plugins = [
  new ExtractTextPlugin({
    filename: 'static/application.css'
  }),
  new CopyWebpackPlugin([{from: '*.html'}]),
  new WebpackShellPlugin({
    onBuildEnd: [`stylus -I ${stylesheetDir} -o ${outMarkdownDir} ${markdownStyl}`]
  })
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
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'stylus-loader'
          ]
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'stage-3', 'react']
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'xo-loader'
      }
    ]
  },
  devServer: {
    contentBase: 'dist/',
    host: '0.0.0.0',
    port: 12321,
    historyApiFallback: true,
    proxy: [
      {
        context: ['/api', '/files'],
        target: 'http://snucse.snucse.org:30110',
        secure: false
      }
    ]
  }
};

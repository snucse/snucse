module.exports = {
  entry: './app.js',

  output: {
    path: './dist/static/',
    filename: 'application.js'
  },
  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'xo-loader'
      }
    ]
  }
};

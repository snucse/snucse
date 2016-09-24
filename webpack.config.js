var es2015 = require('babel-preset-es2015');
var react = require('babel-preset-react');
module.exports = {
    entry: './app.js',

    output: {
        path: './application/static/',
        filename: 'application.js',
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
        }
        ],
    }
};

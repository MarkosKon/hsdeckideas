const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack'); // to access built-in plugins
const dotenv = require('dotenv');
const path = require('path');

// call dotenv and it will return an Object with a parsed key
const env = dotenv.config().parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: {
    data: './src/data.js',
    main: './src/index.jsx',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[name].[contenthash].js',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
        resolve: {
          extensions: ['.js', '.jsx'],
        },
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{ loader: 'file-loader' }],
      },
      // {
      //   test: /deck.js$/,
      //   use: [{ loader: 'workerize-loader' }],
      // },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['../dist'], { allowExternal: true }),
    new webpack.DefinePlugin(envKeys),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new ScriptExtHtmlWebpackPlugin({ inline: 'data' }),
    new CopyWebpackPlugin([
      {
        from: 'public',
        transform(fileContent, path) {
          if (path.includes('data.json')) {
            return JSON.stringify(JSON.parse(fileContent.toString()));
          }
          return fileContent;
        },
      },
    ]),
  ],
};

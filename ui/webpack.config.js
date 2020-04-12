/* eslint linebreak-style: ["error","windows"] */
const path = require('path');

module.exports = {
  mode: 'development',
  entry: { app: ['./src/app.jsx'] },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',       
      },
    ],
  },
};

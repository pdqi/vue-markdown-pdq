const path = require('path');
const webpack = require('webpack');
const version = require("./package.json").version;
const banner =
  "vue-markdown-pdq v" + version + "\n" +
  "https://github.com/pdqi/vue-markdown-pdq\n" +
  "MIT License";

module.exports = {
  entry: './src/VueMarkdownPdq.js',
  target: 'node',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vue-markdown-pdq.common.js',
    library: 'VueMarkdownPdq',
    libraryTarget: 'umd',
  },
  plugins: [
    new webpack.BannerPlugin(banner)
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};

"use strict"
const path = require("path");
const webpack = require("webpack");
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: {
    'index': './src/main.ts'
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader"
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
    }),

    new VueLoaderPlugin(),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html'),
      filename: "index.html",
      title: 'Vue 你好'
    }),
  ],

  devtool: "source-map",

  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  }
}

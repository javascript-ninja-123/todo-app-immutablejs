const webpack = require('webpack');
const path = require('path');



//plugin
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


//plugin helper


const VENDOR_LIBS = [
  "lodash",
  "react",
  "react-dom",
  "react-redux",
  "react-router",
  "react-router-dom",
  "react-router-redux",
  "redux",
  "redux-form",
  "redux-observable",
  "rxjs"
];


module.exports = {
   entry: {
     bundle:['@babel/polyfill','./src/index.js'],
     vendor:VENDOR_LIBS
   },
   output:{
    path: path.join(__dirname, 'build'),
    filename: '[name].[hash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
  contentBase: path.join(__dirname, "build"),
  compress: true,
  port: 3000
  },
  module: {
   rules: [
     {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use:[
          {
            loader:"css-loader",
            options:{
              modules:true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
              minimize: true,
              sourceMap: true
            }
          },
          {
            loader:'sass-loader'
          }
        ]
      })
    },
    {
     test: /\.(js|jsx)$/,
     exclude: /(node_modules|bower_components)/,
     use: {
       loader: 'babel-loader',
       options: {
         presets: ['@babel/preset-env'],
         // cacheDirectory:true,
         plugins:['@babel/plugin-proposal-class-properties',
         '@babel/plugin-proposal-object-rest-spread',
         "transform-async-to-generator"
       ]
       }
     }
   }
   ]
 },
 plugins: [
  new webpack.optimize.SplitChunksPlugin({names:['vendor','manifest']}),
  new CleanWebpackPlugin(['build']),
  new ExtractTextPlugin({
    filename:'styles.css',
    allChunks: true
  }),
  new HtmlWebpackPlugin({template: './src/index.html'})
],
mode:"development"
}

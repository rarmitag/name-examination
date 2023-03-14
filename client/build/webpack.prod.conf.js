'use strict'
const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.base.conf.js')
const webpack = require('webpack')

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { config } = require('process')

console.log("Prod Build: " + path.build)

module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'production',
  
  // Control how source maps are generated
  devtool: 'source-map',
 
  plugins: [
    //Stop process errors
    new webpack.DefinePlugin({
      'process.env': { 
        NODE_ENV: '"production"'
      }  
    }),   

    // Extracts CSS into separate files
    // Note: style-loader is for development, MiniCssExtractPlugin is for production
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),

    new webpack.SourceMapDevToolPlugin({
        filename: '[name].map'         
      }
    ),
    
    // Only update what has changed on hot reload
    // new webpack.HotModuleReplacementPlugin(),    
  ], 
  module: {    
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
            },
          },
          'sass-loader',
          'postcss-loader',          
        ],
      },
    ],
  }, 
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), "..."],
    // Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
    // instead of having their own. This also helps with long-term caching, since the chunks will only
    // change when actual code changes, not the webpack runtime.
    runtimeChunk: {
      name: 'runtime',
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },  
})
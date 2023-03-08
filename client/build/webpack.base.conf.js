'use strict'
const path = require('path')
const webpack = require('webpack')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const vueConfig = require('./vue.config.js')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  //return path.join(__dirname, '..', dir)
  return path.join(__dirname, dir)
}

path.client = resolve("../")
path.public = resolve("")
path.src = resolve("../src")

console.log("Client: " + path.client)
console.log("Public: " + path.public)
console.log("Src: " + path.src)
console.log("Build: " + path.build)

module.exports = {
  // Where webpack looks to start building the bundle
  entry: [ 'whatwg-fetch', path.src + '/main.js'],
  
  resolve: {
        extensions: ['.vue','.js','.json'],
		        alias: {
                'components': path.resolve(__dirname, '../src/components/'),
			          'images': path.resolve(__dirname, '../src/images/'),
		            'styles': path.resolve(__dirname, '../src/styles/'),
                'router': path.resolve(__dirname, '../src/router/'),
                '@': path.resolve('src'),
                'vue$': 'vue/dist/vue.esm.js'            
		 }
  },
  //            'vue$': path.resolve(__dirname, '../node_modules/vue/dist/vue.common.js')            

  // Where webpack outputs the assets and bundles
  //path: path.build,
  /*
  output: {
    path: path.resolve(__dirname,"../dist"),
    filename: '[name].bundle.js',    
    publicPath: '/',
  },  
  */
  // Customize the webpack build process
  plugins: [
    
    // Vue plugin for the magic
    new VueLoaderPlugin(), 
	
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        'app.*.css',
        'app.*.js',
        'app.*.js.map',
        'vendors*',
        'dist/*.bundle.js'
      ]
    }),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(path.client, 'static'),
          to: 'static',
          globOptions: {
            ignore: ['.*'],
          },
        },
      ],
    }),

    /*
    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      title: 'Names Examination',
      favicon: path.client + 'static/images/favicon.ico',
      template: path.client + '/index.html', // template file
      filename: 'index.html', // output file
    }),
    */
    new HtmlWebpackPlugin({     
      template: path.client + '/index.html' // template file     
    }),
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
	    {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
    
      {test: /\.js$/, exclude: /node_modules/, use: ['babel-loader']},

      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(scss|css)$/,
        use: [
        // Note: Only style-loader works for me !!!
		    // 'vue-style-loader',
		      'style-loader',
          {loader: 'css-loader', options: {sourceMap: true, importLoaders: 1, esModule: false}},
          {loader: 'postcss-loader', options: {sourceMap: true}},
          {loader: 'sass-loader', options: {sourceMap: true}},
        ],
      },

      // Stylus: 
      {
        test: /\.(styl)$/,
        use: ['stylus-loader','style-loader', 'css-loader']
      },

      // Images: Copy image files to build folder
      {test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource'},

      // Fonts and SVGs: Inline files
      {test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline'},

    ],
  },
}
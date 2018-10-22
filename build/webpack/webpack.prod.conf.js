var baseConfig = require('./webpack.base.conf')
var webpack = require('webpack')
var merge = require('webpack-merge')
// var ExtractTextPlugin = require('extract-text-webpack-plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

// 修改输出output配置
baseConfig.output.filename = '[name].[chunkhash:7].js'
baseConfig.output.chunkFilename = '[id].[chunkhash:7].js'

module.exports = merge(baseConfig, {
  mode: 'production',
  // 正式环境不开启
  devtool: false,
  optimization: {
    minimize: true,
    splitChunks: {
      name: 'vendor',
    },
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
      ],
      // ExtractTextPlugin.extract({
      //   use: ['css-loader', 'postcss-loader'],
      //   fallback: 'vue-style-loader',
      // }),
    }, {
      test: /\.styl(us)?$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'stylus-loader?resolve url',
      ],
      // ExtractTextPlugin.extract({
      //   use: ['css-loader', 'postcss-loader', 'stylus-loader?resolve url'],
      //   fallback: 'vue-style-loader',
      // }),
    }, {
      test: /\.less$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'less-loader?resolve url',
      ],
      // ExtractTextPlugin.extract({
      //   use: ['css-loader', 'postcss-loader', 'less-loader?resolve url'],
      //   fallback: 'vue-style-loader',
      // }),
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': '"production"',
    }),
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:7].css',
      chunkFilename: '[id].[contenthash:7].css',
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
        autoprefixer: false,
      },
    }),
  ],
})

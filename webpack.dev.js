const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const pks = require('./package.json')

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        app: './src/index.js',
        vendor: ['babel-polyfill']
    },
    output: {
        filename: '[name].[hash].min.js',
        chunkFilename: '[name].[hash].min.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {}
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['./dist']),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor' // 提取公共组件
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime' // 将 webpack 的样板(boilerplate)和 manifest 提取出来
        }),
        new ExtractTextPlugin('[name].[chunkhash].css') // 生成独立css文件
    ]
    // devServer: {
    //     contentBase: './dist'
    // }
}
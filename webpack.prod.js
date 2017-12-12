const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


module.exports = {
    devtool: 'source-map',
    entry: {
        app: './src/index.js',
        vendor: ['babel-polyfill']
    },
    output: {
        filename: '[name].[chunkhash].min.js',
        chunkFilename: '[name].[chunkhash].min.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
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
        new CleanWebpackPlugin(['./dist']),
        new HtmlWebpackPlugin({
            title: 'Learn'
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor' // 提取公共组件
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime' // 将 webpack 的样板(boilerplate)和 manifest 提取出来
        }),
        new ExtractTextPlugin('[name].[chunkhash].css'), // 生成独立css文件
        new UglifyJSPlugin({ // js压缩
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env': { // 配置开发环境
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
}
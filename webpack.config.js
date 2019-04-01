const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
    mode: process.env.NODE_ENV || "production",
    target: 'web',
    entry: path.join(__dirname, 'index.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'MonitorCenter'),
        publicPath:'/'
    },
    module: {
        rules: [
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: 'url-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html')
        }),
        new VueLoaderPlugin()
    ]
}

if (isDev) {
    config.devServer = {
        port: '8020',
        host: '0.0.0.0',
        hot: true,
        overlay: {
            errors: true,
        },
        historyApiFallback: {
            index: '/index.html'
        }
    };
    config.module.rules.push({
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader',
        ]
    });
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    )
} else {
    config.entry = {
        app: path.join(__dirname, 'index.js')
    };
    config.output = {
        filename: '[name].[chunkhash:8].js',
        path: path.join(__dirname, 'MonitorCenter')
    };
    config.module.rules.push({
        test: /\.css$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../'
                }
            },
            "css-loader"
        ]
    });
    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash:8].css'
        })
    );
    config.optimization = {
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: {
            name: 'runtime'
        }
    }

}

module.exports = config;
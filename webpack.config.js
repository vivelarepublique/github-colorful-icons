const path = require('path');
const { BannerPlugin } = require('webpack');
const { banner, scriptFilename } = require('./configuration/config');

const config = {
    entry: './index.ts',
    output: {
        path: path.resolve(__dirname, 'release'),
        filename: scriptFilename,
        pathinfo: false,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    mode: 'production',
    optimization: {
        minimize: false,
    },
    plugins: [
        new BannerPlugin({
            banner: banner,
            raw: true,
        }),
    ],
};

module.exports = config;

const path = require('path');
const { BannerPlugin } = require('webpack');
const { banner, scriptFilename } = require('./public/config');

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
    performance: {
        maxAssetSize: 1024 * 1024 * 10,
        maxEntrypointSize: 1024 * 1024 * 10,
    },
    plugins: [
        new BannerPlugin({
            banner: banner,
            raw: true,
        }),
    ],
};

module.exports = config;

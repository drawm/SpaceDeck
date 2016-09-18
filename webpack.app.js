const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require("path");
const fs = require('fs');
var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(moduleName => nodeModules[moduleName] = 'commonjs ' + moduleName);

module.exports = {
    entry: ['./src/app/Main.ts'],
    devtool: "source-map",
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
        alias: {
            fs: './node_modules/'
        }
    },
    module: {
        loaders: [
            {test: /\.ts?$/, loader: "ts-loader"},
        ],
        preLoaders: [
            {test: /\.js?$/, loader: "source-map-loader"},
        ],
    },
    output: {
        path: './bin/app/',
        filename: 'app.bundle.js',
    },
    plugins: [
        new HtmlWebPackPlugin({
            title: 'Space Deck',
        }),
    ],
    externals: nodeModules,
};

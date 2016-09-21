const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require("path");
const fs = require('fs');
var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(moduleName => nodeModules[moduleName] = 'commonjs ' + moduleName);

module.exports = {
    entry: ['./src/client/Main.tsx'],
    devtool: "source-map",
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    },
    node: {
        net: 'net',
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                include: path.join(__dirname, 'src/client')
            },
        ],
        preLoaders: [
            {test: /\.js?$/, loader: "source-map-loader"},
        ],
    },
    output: {
        path: './bin/client/',
        filename: 'app.bundle.js',
    },
    plugins: [
        new HtmlWebPackPlugin({
            title: 'Space Deck',
        }),
    ],
    externals: nodeModules,
};

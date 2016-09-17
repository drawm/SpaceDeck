module.exports = {
    entry: ['./client/Client.ts', './client/index'],
    devtool: "source-map",
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            { test:/\.ts?$/, loader: "ts-loader"},
        ],
        preLoaders: [
            { test:/\.js?$/, loader: "source-map-loader"},
        ],
    },
    output: {
        path: './bin',
        filename: 'app.bundle.js',
    },
    node: {
        net: "empty",
        fs: "empty",
    },
    devServer: {
        contentBase: './bin',
        hot: true,
    }
};

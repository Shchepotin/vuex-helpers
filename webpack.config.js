const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: './dist/index.js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin()
    ]
};
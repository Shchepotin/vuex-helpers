module.exports = {
    entry: './src/index.js',
    output: {
        filename: './dist/index.js'
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
    }
};
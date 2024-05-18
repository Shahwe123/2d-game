const path = require("path");
const common = require("./webpack.common")
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = merge(common, {
    mode:"development",
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: "./src/template.html"
        })
    ],
    devtool: 'source-map',
    devServer: {
        static: {
          directory: path.resolve(__dirname, 'dist'),
        },
        port: 5000,
        open: true,
        hot: true,
    },
    module: {
        rules:[
            {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
            }
        ]
    }
})
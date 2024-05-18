const path = require("path");

module.exports = {
    entry: {
        bundle: path.resolve(__dirname, 'src/index.js'),
    },
    plugins: [
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: {
                  loader: "file-loader",
                  options: {
                    name: "[name].[hash].[ext]",
                    outputPath: "imgs"
                  }
                }
            }
        ]
    }
}
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
 
module.exports = {
  // context: path.resolve(__dirname, './src'),
    entry: {
        bundle: './index.js'
    },
    devServer: {
        contentBase: "./dist",
        open: true,
        port: 3000,
        overlay: true,
        hot: true
    },
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "[name].js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};

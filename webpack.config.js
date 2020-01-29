const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const CopyPlugin = require('copy-webpack-plugin');
 
module.exports = {
    mode: 'development',
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
        new CopyPlugin([
          { from: './src/assets', to: './assets' }
        ]),
        new webpack.HotModuleReplacementPlugin()
    ]
};

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: process.env.MODE || "development",
    entry: {
        dev: "./src/index.tsx",
    },
    output: {
        filename: "./build/index.js",
    },
    devtool: "source-map",
    resolve: {
        extensions:[".tsx", ".ts", ".js", ".jsx"],
    },
    devServer: {
        port: process.env.PORT || 3001
    },
    module: {
        rules: [
            // Typescript
            { test: /\.tsx?$/, exclude: /node_modules/, loader: "ts-loader" },
            {
                test: /\.css$/i, use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                exclude: /node_modules/,
                use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './public/index.html',
          filename: './index.html',
          favicon: './public/favicon.ico'
        }),
        new webpack.DefinePlugin({
            'process.env.MODE': JSON.stringify(process.env.MODE),
            'process.env.API_URL': JSON.stringify(process.env.API_URL),
            'process.env.PORT': JSON.stringify(process.env.PORT)
        })
    ],
};

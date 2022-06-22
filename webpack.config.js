const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
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
        port: 3001
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
        })
      ]
};

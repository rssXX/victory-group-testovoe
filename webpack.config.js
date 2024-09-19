const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = (env) => {
    return {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.jsx'),
        output: {
            filename: '[name].[contenthash].bundle.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
            publicPath: "/"
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html')
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            })
        ],
        module: {
            rules: [
                {
                    // Правило для SCSS-модулей
                    test: /\.module\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                modules: {
                                    namedExport: false,
                                    exportLocalsConvention: 'as-is',
                                    localIdentName: env.mode === 'development' ? '[path][name]__[local]' : '[hash:base64]'
                                }
                            }
                        },
                        "sass-loader",
                    ],
                },
                {
                    // Правило для обычных SCSS-файлов
                    test: /\.s[ac]ss$/i,
                    exclude: /\.module\.s[ac]ss$/i,  // Исключаем файлы с модулями
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader", // Без опции modules для обычных файлов
                        "sass-loader",
                    ],
                },
                // {
                //     test: /\.s[ac]ss$/i,
                //     use: [
                //         MiniCssExtractPlugin.loader,
                //         {
                //             loader: "css-loader",
                //             options: {
                //                 modules: {
                //                     namedExport: false,
                //                     exportLocalsConvention: 'as-is',
                //                     localIdentName: env.mode === 'development'? '[path][name]__[local]' : '[hash:base64]'
                //                 }
                //             }
                //         },
                //         "sass-loader",
                //     ],
                // },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
            ]
        },
        resolve: {
            extensions: ['.jsx', '.js']
        },
        devServer: {
            watchFiles: path.join(__dirname, 'src'),
            port: 9000,
            hot: true,
            compress: true,
            historyApiFallback: true,
            static: path.resolve(__dirname, 'public')
        },
    }
};

import merge from "webpack-merge"
import { Configuration, DefinePlugin } from "webpack"
import { resolve as resolvePath } from "path"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import CssMinimizerPlugin from "css-minimizer-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import { WebpackManifestPlugin } from "webpack-manifest-plugin"
import TerserPlugin from "terser-webpack-plugin"

const styleOptions = (config: Configuration, otherOptions?: any) => {
    const options = [
        {
            loader: config?.mode === "development" ? require.resolve("style-loader") : MiniCssExtractPlugin.loader,
        },
        {
            loader: require.resolve("css-loader"),
            options: {
                sourceMap: true,
                modules: true,
            },
        },
        {
            loader: require.resolve("postcss-loader"),
            options: {
                postcssOptions: {
                    ident: "postcss",
                    config: false,
                    plugins: [
                        [
                            "postcss-preset-env",
                            {
                                autoprefixer: { flexbox: "no-2009" },
                                stage: 3,
                            },
                        ],
                        "postcss-normalize",
                    ],
                },
            },
        },
    ]

    if (otherOptions) {
        options.push({
            loader: require.resolve(otherOptions),
        })
    }

    return options
}

const cssRegex = /\.css$/
const cssModuleRegex = /\.module\.css$/
const sassRegex = /\.(scss|sass)$/
const sassModuleRegex = /\.module\.(scss|sass)$/

export default function confg(config: Configuration): Configuration {
    return merge(
        {
            mode: config.mode,
            devtool: config.devtool,
            entry: ["./src/root.tsx"],
            output: {
                clean: true,
                path: resolvePath(__dirname, "../build"),
                filename: config.mode === "production" ? "js/[name].[contenthash:8].js" : "js/bundle.js",
                chunkFilename:
                    config.mode === "production" ? "js/[name].[contenthash:8].chunk.js" : "js/[name].chunk.js",
                assetModuleFilename: "images/[hash][ext][query]",
                publicPath: process.env.PUBLIC_PATH || "/",
            },
            resolve: {
                alias: {
                    src: resolvePath(__dirname, "../src"),
                },
                extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
            },
            module: {
                strictExportPresence: true,
                rules: [
                    {
                        oneOf: [
                            {
                                test: /\.(js|mjs|jsx|ts|tsx)$/,
                                exclude: /(node_modules|bower_components)/,
                                use: [
                                    {
                                        loader: "swc-loader",
                                        options: {
                                            // env: {
                                            //     mode: "usage",
                                            //     coreJs: 3,
                                            // },
                                            jsc: {
                                                target: "es5",
                                                parser: {
                                                    syntax: "typescript",
                                                    dynamicImport: true,
                                                    tsx: true,
                                                },
                                                transform: {
                                                    react: {
                                                        runtime: "automatic",
                                                        useBuiltins: true,
                                                    },
                                                },
                                            },
                                        },
                                    },
                                ],
                            },
                            {
                                test: cssRegex,
                                exclude: cssModuleRegex,
                                use: styleOptions(config),
                            },
                            {
                                test: cssModuleRegex,
                                use: styleOptions(config),
                            },
                            {
                                test: sassRegex,
                                exclude: sassModuleRegex,
                                use: styleOptions(config, "sass-loader"),
                            },
                            {
                                test: sassModuleRegex,
                                use: styleOptions(config, "sass-loader"),
                            },
                            {
                                test: [/\.gif$/, /\.jpe?g$/, /\.png$/],
                                type: "asset/resource",
                            },
                            {
                                test: /\.svg$/i,
                                type: "asset/inline",
                            },
                        ],
                    },
                ],
            },
            optimization: {
                minimize: true,
                minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
            },
            plugins: [
                new DefinePlugin({
                    PROJECTMODE: JSON.stringify(config?.mode),
                }),
                new MiniCssExtractPlugin({
                    filename: "css/[name].[contenthash:8].css",
                }),
                new HtmlWebpackPlugin(
                    Object.assign(
                        {},
                        {
                            hash: true,
                            template: "./public/index.html",
                            favicon: "./public/favicon.ico",
                        },
                        config?.mode === "production"
                            ? {
                                  minify: {
                                      removeComments: true,
                                      collapseWhitespace: true,
                                      removeRedundantAttributes: true,
                                      useShortDoctype: true,
                                      removeEmptyAttributes: true,
                                      removeStyleLinkTypeAttributes: true,
                                      keepClosingSlash: true,
                                      minifyJS: true,
                                      minifyCSS: true,
                                      minifyURLs: true,
                                  },
                              }
                            : undefined
                    )
                ),
                new WebpackManifestPlugin({
                    fileName: "asset-manifest.json",
                }),
            ],
            performance: false,
        },
        config || {}
    )
}

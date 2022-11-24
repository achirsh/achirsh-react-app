import { resolve as resolvePath } from "path"
import merge from "webpack-merge"
import HtmlWebpackPlugin from "html-webpack-plugin"
import { Configuration, DefinePlugin } from "webpack"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import CssMinimizerPlugin from "css-minimizer-webpack-plugin"
import { WebpackManifestPlugin } from "webpack-manifest-plugin"
import CopyWebpackPlugin from "copy-webpack-plugin"
import TerserPlugin from "terser-webpack-plugin"
import BundleAnalyzerPlugin from "webpack-bundle-analyzer"

const styleOptions = (config: Configuration, isModule: string, otherOptions?: any) => {
    const options = [
        {
            loader: config?.mode === "development" ? require.resolve("style-loader") : MiniCssExtractPlugin.loader,
        },
        {
            loader: require.resolve("css-loader"),
            options: isModule === "module" ? { modules: true } : {},
        },
        {
            loader: require.resolve("postcss-loader"),
            options: {
                postcssOptions: {
                    ident: "postcss",
                    plugins: [
                        [
                            "postcss-preset-env",
                            {
                                autoprefixer: { flexbox: "no-2009" },
                                stage: 3,
                            },
                        ],
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

const PUBLIC_PATH = process.env.PUBLIC_PATH || "/"

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
                filename: config.mode === "production" ? "assets/js/[name].[contenthash:8].js" : "js/bundle.js",
                chunkFilename:
                    config.mode === "production" ? "assets/js/[name].[contenthash:8].chunk.js" : "js/[name].chunk.js",
                assetModuleFilename: "assets/images/[hash][ext][query]",
                publicPath: PUBLIC_PATH,
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
                                use: styleOptions(config, "no-module"),
                            },
                            {
                                test: cssModuleRegex,
                                use: styleOptions(config, "module"),
                            },
                            {
                                test: sassRegex,
                                exclude: sassModuleRegex,
                                use: styleOptions(config, "no-module", "sass-loader"),
                            },
                            {
                                test: sassModuleRegex,
                                use: styleOptions(config, "module", "sass-loader"),
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
                    PUBLIC_PATH: process.env.PUBLIC_PATH || "/",
                }),
                new MiniCssExtractPlugin({
                    filename: "assets/css/[name].[contenthash:8].css",
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
                new CopyWebpackPlugin({
                    patterns: [
                        {
                            from: resolvePath(__dirname, "../public/assets/pixi"),
                            to: resolvePath(__dirname, "../build/assets/pixi"),
                        },
                    ],
                }),
                // new BundleAnalyzerPlugin.BundleAnalyzerPlugin()
            ],
            performance: false,
        },
        config || {}
    )
}

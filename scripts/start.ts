import open from "open"
import yargs from "yargs-parser"
import webpack from "webpack"
import devMiddleware from "webpack-dev-middleware"
import hotMiddleware from "webpack-hot-middleware"
import fallback from "connect-history-api-fallback"
import express from "express"
import config from "./config"
import { getProxy } from "./proxy"
import { createProxyMiddleware } from "http-proxy-middleware"
import path from "path"
import fs from "fs"

import WebpackDevServer from "webpack-dev-server"

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath: any) => path.resolve(appDirectory, relativePath)

const { REACT_APP_ENV } = process.env
const argv = yargs(process.argv.slice(2))

const publicPath = process.env.PUBLIC_PATH || "/"

const compiler = webpack(
    config({
        mode: "development",
        devtool: "eval-source-map",
        output: { publicPath },
        entry: ["webpack-hot-middleware/client?reload=true"],
        plugins: [new webpack.HotModuleReplacementPlugin()],
        cache: {
            type: "filesystem",
            buildDependencies: {
                config: [__filename],
            },
        },
    })
)

const serverConfig: any = {
    hot: true,
    allowedHosts: "all",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
    },
    compress: true,
    static: {
        directory: resolveApp("public"),
        publicPath: ["/"],
        watch: false,
    },
    devMiddleware: { publicPath: "" },
    https: false,
    host: "0.0.0.0",
    historyApiFallback: { disableDotRule: true, index: "/" },
    port: 3003,
}

const devServer = new WebpackDevServer(serverConfig, compiler)

devServer.startCallback(() => {
    console.info("Listening on :3003")
})

// const proxySetting: any = getProxy(REACT_APP_ENV)

// express()
//     .use(fallback({ index: `${publicPath}index.html` }))
//     .use(devMiddleware(compiler, { publicPath: "/" }))
//     .use(hotMiddleware(compiler))
//     .use(proxySetting[0].url, createProxyMiddleware(proxySetting[0].options))
//     .use(proxySetting[1].url, createProxyMiddleware(proxySetting[1].options))
//     .listen(3003, () => {
//         console.info("Listening on :3003")
//         // open(`http://localhost:3003${publicPath}`, {
//         //     app: argv.open === true ? null : argv.open,
//         // })
//     })

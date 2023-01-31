import webpack from "webpack"
import config from "./config"
import path from "path"
import fs from "fs"

import WebpackDevServer from "webpack-dev-server"

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath: any) => path.resolve(appDirectory, relativePath)

const publicPath = process.env.PUBLIC_PATH || "/"

const compiler = webpack(
    config({
        mode: "development",
        devtool: "eval-source-map",
        output: { publicPath },
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
        publicPath: [publicPath],
        watch: false,
    },
    devMiddleware: { publicPath: "" },
    https: false,
    host: "0.0.0.0",
    historyApiFallback: { disableDotRule: true, index: publicPath },
    port: 3004,
}

const devServer = new WebpackDevServer(serverConfig, compiler)

devServer.startCallback(() => {
    console.info("Listening on :3004")
})

// const proxySetting: any = getProxy(REACT_APP_ENV)

import fs from "fs"
import net from "net"
import path from "path"
import webpack from "webpack"
import config from "./config"
import WebpackDevServer from "webpack-dev-server"

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath: any) => path.resolve(appDirectory, relativePath)
const publicPath = process.env.PUBLIC_PATH || "/"

const checkPortUsable = (port: number) => {
    return new Promise((resolve, reject) => {
        const server = net.createConnection({ port })
        server.on("connect", () => {
            server.end()
            reject("Port is not available!")
        })

        server.on("error", () => {
            resolve(port)
        })
    })
}

const findUsablePort = async (port: number, callback: any) => {
    try {
        const res = await checkPortUsable(port)
        callback(res)
    } catch (err) {
        port++
        findUsablePort(port, callback)
    }
}

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

findUsablePort(3000, (port: number) => {
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
        port: port,
    }

    const devServer = new WebpackDevServer(serverConfig, compiler)

    devServer.startCallback(() => {
        console.info(`Listening on :${port}`)
    })
})

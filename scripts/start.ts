import open from "open"
import yargs from "yargs-parser"
import webpack from "webpack"
import devMiddleware from "webpack-dev-middleware"
import hotMiddleware from "webpack-hot-middleware"
import fallback from "connect-history-api-fallback"
import express from "express"
import config from "./config"


const argv = yargs(process.argv.slice(2));

const publicPath = process.env.PUBLIC_PATH || "/";

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
);

express()
    .use(fallback({ index: `${publicPath}index.html` }))
    .use(devMiddleware(compiler, { publicPath }))
    .use(hotMiddleware(compiler))
    .listen(3002, () => {
        console.info("Listening on :3002");
        open(`http://localhost:3002${publicPath}`, {
            app: argv.open === true ? null : argv.open,
        });
    });
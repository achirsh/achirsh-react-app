import webpack from "webpack"
import config from "./config"

const compiler = webpack(
    config({
        mode: "production",
        devtool: false,
        cache: false
    })
);

compiler.run((err?: Error | null, stats?: webpack.Stats) => {
    if (err) {
        throw err;
    }
    if (stats) {
        process.stdout.write(
            stats.toString({
                colors: true,
            })
        );
        process.stdout.write("\n");
    }
});
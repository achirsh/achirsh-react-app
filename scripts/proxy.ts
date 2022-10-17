function getProxy(type: string | undefined) {
    let proxy
    switch (type) {
        case "sit":
            proxy = [
                {
                    options: {
                        target: "https://shverse.sit.shanhai.team",
                        changeOrigin: true,
                        pathRewrite: {
                            "^/": "",
                        },
                    },
                    url: "/",
                },
                {
                    options: {
                        target: "https://manors.sit.shanhai.team",
                        changeOrigin: true,
                        pathRewrite: {
                            "^/manors": "",
                        },
                    },
                    url: "/manors",
                },
            ]
            break
        default:
            proxy = [
                {
                    options: {
                        target: "https://shverse.sit.shanhai.team",
                        changeOrigin: true,
                        pathRewrite: {
                            "^/": "",
                        },
                    },
                    url: "/",
                },
                {
                    options: {
                        target: "https://manors.sit.shanhai.team",
                        changeOrigin: true,
                        pathRewrite: {
                            "^/manors": "",
                        },
                    },
                    url: "/manors",
                },
            ]
    }
    return proxy
}

export { getProxy }

// 初始化路由
export const routes = [
    {
        url: "home",
        page: "home",
        keepAlive: true,
        sceneConfig: {
            enter: "fadeIn",
            exit: "back",
        },
    },
    {
        url: "home/map",
        page: "map",
        sceneConfig: {
            enter: "forward",
            exit: "back",
        },
    },
    {
        url: "home/me",
        page: "me",
        sceneConfig: {
            enter: "forward",
            exit: "back",
        },
    },
    {
        url: "home/building",
        page: "building",
        sceneConfig: {
            enter: "forward",
            exit: "back",
        },
    },
]

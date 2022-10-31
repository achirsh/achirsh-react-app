// 初始化路由
export const routes = [
    {
        url: "home",
        page: "home",
        // keepAlive: true,
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
    {
        url: "home/building/setting",
        page: "building/setting",
        sceneConfig: {
            enter: "forward",
            exit: "back",
        },
    },
    {
        url: "home/square",
        page: "square",
        sceneConfig: {
            enter: "forward",
            exit: "back",
        },
    },
    {
        url: "home/square/release",
        page: "square/release",
        sceneConfig: {
            enter: "forward",
            exit: "back",
        },
    },
    {
        url: "home/wishing-well",
        page: "wishing-well",
        sceneConfig: {
            enter: "forward",
            exit: "back",
        },
    },
    {
        url: "home/tribal",
        page: "tribal",
        sceneConfig: {
            enter: "forward",
            exit: "back",
        },
    },
    {
        url: "home/tribal/chat",
        page: "tribal/chat",
        sceneConfig: {
            enter: "forward",
            exit: "back",
        },
    },
    {
        url: "home/three",
        page: "three",
        sceneConfig: {
            enter: "forward",
            exit: "back",
        },
    },
]

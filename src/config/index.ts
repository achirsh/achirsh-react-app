export * from "./route"
export * from "./request"

export function clientHeight() {
    return document.documentElement && document.documentElement.clientHeight
        ? document.documentElement.clientHeight
        : document.body.clientHeight
}

export function clientWidth() {
    return document.documentElement && document.documentElement.clientWidth
        ? document.documentElement.clientWidth
        : document.body.clientWidth
}

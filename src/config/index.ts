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

export function hitTestRectangle(r1: any, r2: any) {
    let hit

    hit = false

    r1.centerX = r1.x + r1.width / 2
    r1.centerY = r1.y + r1.height / 2
    r2.centerX = r2.x + r2.width / 2
    r2.centerY = r2.y + r2.height / 2

    r1.halfWidth = r1.width / 2
    r1.halfHeight = r1.height / 2
    r2.halfWidth = r2.width / 2
    r2.halfHeight = r2.height / 2

    const vx = r1.centerX - r2.centerX
    const vy = r1.centerY - r2.centerY

    const combinedHalfWidths = r1.halfWidth + r2.halfWidth
    const combinedHalfHeights = r1.halfHeight + r2.halfHeight

    if (Math.abs(vx) < combinedHalfWidths) {
        if (Math.abs(vy) < combinedHalfHeights) {
            hit = true
        } else {
            hit = false
        }
    } else {
        hit = false
    }

    return hit
}

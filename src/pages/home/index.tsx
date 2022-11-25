import "./index.scss"
import AMapLoader from "@amap/amap-jsapi-loader"
import { useEffect, useState } from "react"

export default function Home(): JSX.Element {
    // 4 9 18
    // 0 0 40

    // 116.397083, 39.874531 116.398419,39.919209 116.47609,39.865086
    const [MAP, SETMAP] = useState<any>(null)

    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        const mapLoader = await AMapLoader.load({
            key: "259b0027f2e11456d32a085761d3bf38",
            version: "2.0",
        })

        const map = new mapLoader.Map("container", {
            viewMode: "3D", //是否为3D地图模式
            zoom: 4, //初始化地图级别
            center: [116.397083, 39.874531],
            zooms: [4, 18],
            terrain: true, // 开启地形图

            zoomEnable: true,
            rotateEnable: false,
            pitchEnable: true,
            pitch: 0, // 地图俯仰角度，有效范围 0 度- 83 度

            // wallColor: [],  // 地图楼块的侧面颜色
            // roofColor: [],  // 地图楼块的顶面颜色
            // skyColor: [],   // 天空颜色
        })

        SETMAP(map)

        const markerContent =
            "" +
            '<div class="custom-content-marker">' +
            `   <img src=${require("src/assets/images/shg.png")}>` +
            "</div>"

        const marker = new mapLoader.Marker({
            position: [116.476046, 39.865105],
            content: markerContent,
            offset: new mapLoader.Pixel(-50, -50),
            zooms: [18, 18],
        })

        map.add(marker)

        const markerContent1 =
            "" +
            '<div class="custom-content-marker-q">' +
            `   <img src=${require("src/assets/images/q.png")}>` +
            "</div>"

        const marker1 = new mapLoader.Marker({
            position: [116.401165, 39.904462],
            content: markerContent1,
            offset: new mapLoader.Pixel(-10, -28),
            zooms: [4, 8.9],
        })

        marker1.on("click", () => {
            map.setCenter([116.398419, 39.919209])
            map.setZoom(9)
        })

        map.add(marker1)

        const markerContent2 =
            "" +
            '<div class="custom-content-marker-2">' +
            `   <img src="//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png">` +
            "</div>"

        const marker2 = new mapLoader.Marker({
            content: markerContent2,
            position: [116.398419, 39.919209],
            offset: new mapLoader.Pixel(-8.5, -24),
            zooms: [9, 17.9],
        })

        marker2.on("click", () => {
            map.setCenter([116.47609, 39.865086])
            map.setZoom(18)
        })

        map.add(marker2)

        map.on("zoomend", () => {
            if (map.getZoom() >= 18) {
                map.setPitch(40)
            }

            if (map.getPitch() !== 0 && map.getZoom() < 18) {
                map.setPitch(0)
            }
        })
    }

    const reset = () => {
        MAP.setCenter([116.397083, 39.874531])
        MAP.setZoom(4)
    }

    return (
        <div className="container" id="container">
            <div className="reset" onClick={reset}>
                重置
            </div>
        </div>
    )
}

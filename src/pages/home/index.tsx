import "./index.scss"
import AMapLoader from "@amap/amap-jsapi-loader"
import { useEffect, useState, Component } from "react"

export default class Home extends Component<any> {
    private map: any
    private zoom = 4

    componentDidMount() {
        this.init()
    }

    async init() {
        const mapLoader = await AMapLoader.load({
            key: "259b0027f2e11456d32a085761d3bf38",
            version: "2.0",
        })

        this.map = new mapLoader.Map("container", {
            viewMode: "3D", //是否为3D地图模式
            zoom: 4, //初始化地图级别
            center: [116.47609, 39.865086],
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

        const markerContent =
            "" +
            '<div class="custom-content-marker">' +
            `   <img src=${require("src/assets/images/shg.png")}>` +
            "</div>"

        const marker = new mapLoader.Marker({
            position: [116.47609, 39.865086],
            content: markerContent,
            offset: new mapLoader.Pixel(-50, -50),
            zooms: [18, 18],
        })

        this.map.add(marker)

        const markerContent1 =
            "" +
            '<div class="custom-content-marker-q">' +
            `   <img src=${require("src/assets/images/q.png")}>` +
            "</div>"

        const marker1 = new mapLoader.Marker({
            position: [116.47609, 39.865086],
            content: markerContent1,
            offset: new mapLoader.Pixel(-10, -28),
            zooms: [4, 8.9],
        })

        marker1.on("click", () => {
            this.map.setCenter([116.47609, 39.865086])
            this.map.setZoom(9)
            this.zoom = 9
        })

        this.map.add(marker1)

        const markerContent2 =
            "" +
            '<div class="custom-content-marker-2">' +
            `   <img src="//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png">` +
            "</div>"

        const marker2 = new mapLoader.Marker({
            content: markerContent2,
            position: [116.47609, 39.865086],
            offset: new mapLoader.Pixel(-8.5, -24),
            zooms: [9, 17.9],
        })

        marker2.on("click", () => {
            this.map.setCenter([116.47609, 39.865086])
            this.map.setZoom(18)
            this.zoom = 18
        })

        this.map.add(marker2)

        this.map.on("zoomend", () => {
            if (this.map.getZoom() > 4 && this.map.getZoom() < 9 && this.zoom === 4) {
                this.map.setCenter([116.47609, 39.865086])
                this.map.setZoom(9)
                this.zoom = 9
            } else if (this.map.getZoom() > 9 && this.map.getZoom() < 18 && this.zoom === 9) {
                this.map.setCenter([116.47609, 39.865086])
                this.map.setZoom(18)
                this.zoom = 18
            } else if (this.zoom === 18 && this.map.getZoom() < 18 && this.map.getZoom() > 9) {
                this.map.setCenter([116.47609, 39.865086])
                this.map.setZoom(9)
                this.zoom = 9
            } else if (this.map.getZoom() > 4 && this.map.getZoom() < 9 && this.zoom === 9) {
                this.map.setCenter([116.47609, 39.865086])
                this.map.setZoom(4)
                this.zoom = 4
            }

            if (this.map.getZoom() >= 18) {
                this.map.setPitch(40)
            }

            if (this.map.getPitch() !== 0 && this.map.getZoom() < 18) {
                this.map.setPitch(0)
            }
        })
    }

    render() {
        return <div className="container" id="container"></div>
    }
}

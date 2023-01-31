import "./index.scss"
import { Component } from "react"
import lottie from "lottie-web"
import flagJson from "src/assets/flag.json"
import AMap from "@amap/amap-jsapi-loader"
import { cityItems } from "./json"

const CHINARANGE = {
    northEast: [135.214058, 48.440836],
    southWest: [73.435189, 39.373343],
}

// 行政区域
interface IDistrict {
    id: string
    name: string
    adcode: string
    pcode: string
    level: string
    center?: number[]
    districts?: IDistrict[]
    sort?: number
    center_text?: number[]
    center_flag?: number[]
    north_east?: number[]
    south_west?: number[]
}
interface IAreaFill {
    adcode: string | string[]
    depth?: number
    style: {
        fill?: string
        province?: string
        county?: string
        city?: string
    }
}
export default class MapPage extends Component<any> {
    private map: any
    private mapLoader: any
    private mapMixZoom = 3 // 展示全国地图的最小缩放
    private mapCenter = [104.710713, 35.865113]

    async componentDidMount() {
        window._AMapSecurityConfig = {
            securityJsCode: "99e676d44942a16176e54a4053fccd05",
        }

        this.mapLoader = await AMap.load({
            key: "259b0027f2e11456d32a085761d3bf38",
            version: "2.0",
            plugins: ["AMap.DistrictLayer", "AMap.Geolocation", "AMap.Geocoder", "AMap.DistrictSearch"],
        })

        this.map = new this.mapLoader.Map("map-home", {
            mapStyle: "amap://styles/2481b4a764ad464f4fc2e516478ae481",
            viewMode: "3D",
            terrain: true,
            zoomEnable: true,
            rotateEnable: false,
            pitchEnable: true,
            pitch: 0,
            showLabel: true,
            doubleClickZoom: false,
            scrollWheel: true,
            touchZoom: true,
            showIndoorMap: false,
        })

        this.init()
    }

    async init() {
        this.map.on("complete", async () => {
            const { northEast, southWest } = CHINARANGE
            const zoomAndCenter = this.getZoomAndCenterByPoint(northEast, southWest)
            this.mapMixZoom = zoomAndCenter[0] || 3
            this.mapCenter = [zoomAndCenter[1].lng, zoomAndCenter[1].lat]
            this.settingFirstCenterAndZoom()

            setTimeout(() => {
                this.addProvinceName()
                this.flagProcess()
            }, 1200)
        })
    }

    // 根据经纬度获取区域zoom和中心
    getZoomAndCenterByPoint(northEast?: number[], southWest?: number[]) {
        const bounds = new this.mapLoader.Bounds(northEast, southWest)
        const initMapData = this.map.getFitZoomAndCenterByBounds(bounds)

        return initMapData
    }

    // 添加省份名称marker
    addProvinceName() {
        const markers: any = []

        cityItems.map(item => {
            if (item.adcode !== "100000") {
                const text = new this.mapLoader.Text({
                    text: item.name,
                    anchor: "bottom-center", // 设置文本标记锚点
                    style: {
                        "border-width": 0,
                        "font-size": "10px",
                        color: "#87A1BA",
                        "background-color": "transparent",
                    },
                    position: item.center_text,
                    zooms: [4.5, 5],
                    bubble: true,
                })

                markers.push(text)
            }
        })

        const overlayGroups = new this.mapLoader.OverlayGroup(markers)
        this.map.add(overlayGroups)
    }

    // 插旗动画
    insertFlagAnimation(code: string) {
        const lottieElement = document.getElementById("flag-animation-" + code)
        if (!lottieElement) return

        lottie.loadAnimation({
            container: lottieElement,
            renderer: "canvas",
            loop: false,
            autoplay: true,
            animationData: flagJson,
            assetsPath: PUBLIC_PATH,
        })
    }

    // 设置全国地图中心点和缩放zoom
    settingFirstCenterAndZoom() {
        this.map.setZooms([this.mapMixZoom, 5])
        this.map.setZoomAndCenter(this.mapMixZoom, this.mapCenter, false, 200)
    }

    // 插旗过程
    async flagProcess() {
        let delayAnimation = cityItems.filter(x => (x.sort || 0) > 0)
        const immediatelyAnimation = cityItems.filter(x => x.sort === 0)

        if (delayAnimation.length > 0) {
            delayAnimation = delayAnimation.sort((a, b) => {
                return (b.sort || 0) - (a.sort || 0)
            })
        }

        delayAnimation.forEach((item: any, idx: number) => {
            setTimeout(async () => {
                this.areaOfFill({
                    adcode: item.adcode,
                    depth: 0,
                    style: {
                        province: "#59A2F8",
                        fill: "rgba(173, 220, 255, 0.6)",
                    },
                })
                this.insertFlag(item, true)
                this.insertFlagAnimation(item.adcode)
            }, 1500 * idx)
        })

        setTimeout(() => {
            const adcodesList: string[] = []

            immediatelyAnimation.forEach((item: any) => {
                adcodesList.push(item.adcode)
                this.insertFlag(item, false)
                this.insertFlagAnimation(item.adcode)
            })

            this.areaOfFill({
                adcode: adcodesList,
                depth: 0,
                style: {
                    province: "#59A2F8",
                    fill: "rgba(173, 220, 255, 0.6)",
                },
            })
        }, 1500 * 5)
    }

    // 区域颜色填充
    areaOfFill(params: IAreaFill) {
        const areaProvince = new this.mapLoader.DistrictLayer.Province({
            zIndex: 12,
            adcode: Array.isArray(params.adcode) ? params.adcode : [params.adcode],
            depth: params.depth || 1,
            styles: {
                fill: params.style.fill || "rgb(151, 208, 146)",
                "province-stroke": params.style.province,
                "city-stroke": params.style.city,
                "county-stroke": params.style.county,
            },
        })

        areaProvince.setMap(this.map)
    }

    // 一级区域插旗marker
    insertFlag(item: IDistrict, showText: boolean) {
        const flagMarker = this.firstFlagMarker(item, showText)
        this.map.add(flagMarker)
    }

    // 一级区域插旗marker
    firstFlagMarker(item: IDistrict, showText: boolean) {
        const flagMarkerContent = `<div class="flag-animation" id=${"flag-animation-" + item.adcode}>
            ${showText ? `<div class="flag-animation-text">${item.name}</div>` : `<div />`}
        </div>`

        return this.commonMarker(item.center_flag || [], flagMarkerContent, [3, 5], [0, 0], true)
    }

    // 公共marker
    commonMarker(coordinate: number[], markerContent: string, zooms: number[], offset: number[], bubble?: boolean) {
        const marker = new this.mapLoader.Marker({
            position: coordinate,
            content: markerContent,
            offset: new this.mapLoader.Pixel(offset[0], offset[1]),
            zooms: zooms,
            anchor: "bottom-center",
            bubble: bubble || false,
        })

        return marker
    }

    render() {
        return <div className="map-home" id="map-home"></div>
    }
}

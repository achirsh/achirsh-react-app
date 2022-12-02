import "./index.scss"
import AMap from "@amap/amap-jsapi-loader"
import { Component } from "react"

const zoomsData = [4, 8, 18]

const adcodes = [
    {
        name: "黑龙江",
        code: "230000",
        center: [126.534142, 45.801889],
        pixel: { x: -20, y: -80 },
        province: "#000",
        depth: 0,
        zooms: [zoomsData[0], zoomsData[0]],
    },
    {
        name: "吉林",
        code: "220000",
        center: [125.324257, 43.811158],
        pixel: { x: -20, y: -60 },
        province: "#000",
        depth: 0,
        zooms: [zoomsData[0], zoomsData[0]],
    },
    {
        name: "辽宁",
        code: "210000",
        center: [123.482987, 41.679366],
        pixel: { x: -40, y: -70 },
        province: "#000",
        depth: 0,
        zooms: [zoomsData[0], zoomsData[0]],
    },
    {
        name: "北京",
        code: "110000",
        center: [116.41647, 39.90347],
        pixel: { x: -35, y: -80 },
        province: "#000",
        depth: 0,
        zooms: [zoomsData[0], zoomsData[0]],
    },
    {
        name: "河北省",
        code: "130000",
        center: [114.625221, 37.953045],
        pixel: { x: -30, y: -70 },
        province: "#000",
        depth: 0,
        zooms: [zoomsData[0], zoomsData[0]],
    },
]

interface IAreaFill {
    adcode: string
    depth: number
    style: {
        fill?: string
        province?: string
        county?: string
        city?: string
    }
}
export default class Home extends Component<any> {
    private map: any
    private mapLoader: any
    private zoom = 4
    private disProvinces: any = []
    private selectCity: any

    componentDidMount() {
        this.init()
    }

    async init() {
        window._AMapSecurityConfig = {
            securityJsCode: "99e676d44942a16176e54a4053fccd05",
            // 例如 ：serviceHost:'http://1.1.1.1:80/_AMapService',
        }

        this.mapLoader = await AMap.load({
            key: "259b0027f2e11456d32a085761d3bf38",
            version: "2.0",
            plugins: [
                "AMap.DistrictLayer",
                "AMap.CitySearch",
                "AMap.Geolocation",
                "AMap.DistrictSearch",
                "AMap.Geocoder",
            ],
        })

        this.map = new this.mapLoader.Map("container", {
            viewMode: "3D",
            zoom: 4,
            center: [116.47609, 39.865086],
            zooms: [zoomsData[0], zoomsData[2]],
            terrain: true,
            zoomEnable: true,
            rotateEnable: false,
            pitchEnable: true,
            pitch: 0,
            showLabel: false,
            doubleClickZoom: false,
            scrollWheel: false,
            touchZoom: false,
        })

        this.dingwei()
        this.insertFlag()
        this.mapFn()

        // this.map.on('click', () => {
        //     console.log(111)
        // })

        // const markerContent =
        //     "" +
        //     '<div class="custom-content-marker">' +
        //     `   <img src=${require("src/assets/images/shg.png")}>` +
        //     "</div>"

        // const marker = new this.mapLoader.Marker({
        //     position: [116.47609, 39.865086],
        //     content: markerContent,
        //     offset: new this.mapLoader.Pixel(-50, -50),
        //     zooms: [zoomsData[2], zoomsData[2]],
        // })

        // this.map.add(marker)

        // const markerContent1 =
        //     "" +
        //     '<div class="custom-content-marker-q">' +
        //     `   <img src=${require("src/assets/images/q.png")}>` +
        //     "</div>"

        // const marker1 = new mapLoader.Marker({
        //     position: [116.47609, 39.865086],
        //     content: markerContent1,
        //     offset: new mapLoader.Pixel(-10, -28),
        //     zooms: [zoomsData[0], zoomsData[1]],
        // })

        // marker1.on("click", () => {
        //     this.map.setCenter([116.47609, 39.865086])
        //     this.map.setZoom(zoomsData[1])
        //     this.zoom = zoomsData[1]
        // })

        // this.map.add(marker1)

        // const markerContent2 =
        //     "" +
        //     '<div class="custom-content-marker-2">' +
        //     `   <img src="//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png">` +
        //     "</div>"

        // const marker2 = new this.mapLoader.Marker({
        //     content: markerContent2,
        //     position: [116.47609, 39.865086],
        //     offset: new this.mapLoader.Pixel(-8.5, -24),
        //     zooms: [zoomsData[1], zoomsData[2] - 0.1],
        // })

        // marker2.on("click", () => {
        //     this.map.setZoomAndCenter(zoomsData[2], [116.47609, 39.865086])
        //     this.zoom = zoomsData[2]
        // })

        // this.map.add(marker2)
    }

    // 地图区域颜色填充
    areaOfFill(params: IAreaFill) {
        const disProvince = new this.mapLoader.DistrictLayer.Province({
            zIndex: 12,
            adcode: [params.adcode],
            depth: params.depth,
            styles: {
                fill: params.style.fill || "rgb(151, 208, 146)",
                "province-stroke": params.style.province,
                "city-stroke": params.style.city,
                "county-stroke": params.style.county,
            },
        })

        disProvince.setMap(this.map)

        this.disProvinces.push(disProvince)
    }

    // 绘制行政区边界
    drawArea(item: any, districtSearch: any) {
        districtSearch.search(item.name, (status: any, result: any) => {
            const bounds = result.districtList[0].boundaries
            if (bounds) {
                for (let i = 0; i < bounds.length; i++) {
                    const polygon = new this.mapLoader.Polygon({
                        strokeWeight: 0.5,
                        path: bounds[i],
                        fillOpacity: 1,
                        fillColor: "rgb(151, 208, 146)",
                        strokeColor: "#000",
                    })

                    console.log(polygon)

                    polygon.setMap(this.map)
                }
            }
        })
    }

    // 插旗
    insertFlag() {
        adcodes.forEach((item, idx) => {
            // const districtSearch = new this.mapLoader.DistrictSearch({
            //     level: 'city',
            //     subdistrict: 0,
            //     extensions: 'all',
            // })

            setTimeout(() => {
                // this.drawArea(item, districtSearch)

                this.areaOfFill({
                    adcode: item.code,
                    depth: item.depth,
                    style: {
                        province: item.province,
                    },
                })

                const flagMarkerContent =
                    "" +
                    `<div class="flag-animation" id=${item.code}>` +
                    `   <div class="flag-animation-text">${item.name}</div>` +
                    "</div>"

                const flagMarker = new this.mapLoader.Marker({
                    position: item.center,
                    content: flagMarkerContent,
                    offset: new this.mapLoader.Pixel(item.pixel?.x, item.pixel?.y),
                    zooms: item.zooms,
                    bubble: true,
                })

                this.map.add(flagMarker)
            }, 1600 * idx)
        })
    }

    // 定位
    dingwei() {
        const geolocation = new this.mapLoader.Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 10000, //超过10秒后停止定位，默认：无穷大
            maximumAge: 0, //定位结果缓存0毫秒，默认：0
            convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true, //显示定位按钮，默认：true
            buttonPosition: "RB", //定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new this.mapLoader.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: false, //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: false, //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        })

        // this.map.addControl(geolocation);
        // geolocation.getCurrentPosition()
    }

    // 地图缩放事件
    mapFn() {
        const geocoder = new this.mapLoader.Geocoder({
            city: "010", //城市设为北京，默认：“全国”
            radius: 1000, //范围，默认：500
        })

        this.map.on("click", (e: any) => {
            geocoder.getAddress([e.lnglat.lng, e.lnglat.lat], (status: any, result: any) => {
                if (status === "complete" && result.regeocode) {
                    const address = result.regeocode.formattedAddress

                    const center = adcodes.filter(x => address.includes(x.name))

                    if (center.length) {
                        this.map.setZoomAndCenter(zoomsData[1], center[0].center)
                        this.selectCity = center[0]
                    }
                }
            })
        })

        this.map.on("zoomstart", () => {
            if (this.map.getZoom() > zoomsData[0] && this.map.getZoom() < zoomsData[2]) {
                this.disProvinces.map((item: any) => {
                    item.setMap(null)
                })

                if (this.selectCity) {
                    this.areaOfFill({
                        adcode: this.selectCity.code,
                        depth: 1,
                        style: {
                            fill: "rgba(110, 181, 226, 0.3)",
                            city: "#045f99",
                        },
                    })
                }
            }
        })

        this.map.on("zoomend", () => {
            // if (this.map.getZoom() > zoomsData[0] && this.map.getZoom() < zoomsData[1] && this.zoom === zoomsData[0]) {
            //     // this.map.setZoomAndCenter(zoomsData[1], [116.47609, 39.865086])
            //     this.zoom = zoomsData[1]
            // } else if (this.map.getZoom() > zoomsData[1] && this.map.getZoom() < zoomsData[2] && this.zoom === zoomsData[1]) {
            //     // this.map.setZoomAndCenter(zoomsData[2], [116.47609, 39.865086])
            //     this.zoom = zoomsData[2]
            // } else if (this.zoom === zoomsData[2] && this.map.getZoom() < zoomsData[2] && this.map.getZoom() > zoomsData[1]) {
            //     // this.map.setZoomAndCenter(zoomsData[1], [116.47609, 39.865086])
            //     this.zoom = zoomsData[1]
            // } else if (this.map.getZoom() > zoomsData[0] && this.map.getZoom() < zoomsData[1] && this.zoom === zoomsData[1]) {
            //     // this.map.setZoomAndCenter(zoomsData[0], [116.47609, 39.865086])
            //     this.zoom = zoomsData[0]
            // }
            // if (this.map.getZoom() < zoomsData[2]) {
            //     this.map.setZoom(zoomsData[0])
            // }
            // if (this.map.getZoom() >= zoomsData[2]) {
            //     this.map.setPitch(40)
            //     this.map.setRotation(45)
            // }
            // if (this.map.getPitch() !== 0 && this.map.getZoom() < zoomsData[2]) {
            //     this.map.setPitch(0)
            //     this.map.setRotation(0)
            // }
        })
    }

    render() {
        return <div className="container" id="container"></div>
    }
}

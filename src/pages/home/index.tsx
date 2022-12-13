import "./index.scss"
import AMap from "@amap/amap-jsapi-loader"
import { Component, CSSProperties } from "react"
import Popup from "antd-mobile/es/components/popup"
import Mask from "antd-mobile/es/components/mask"
import Toast from "antd-mobile/es/components/toast"
import { adcodes, cityItems, formats } from "./json"
import lottie from "lottie-web"
import flagJson from "src/assets/flag.json"

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
    private disProvinces: any = []
    private selectProvince: any
    private firstMarkerCity: any = []
    private secondMarkerCity: any = []
    private thirdMarkerCity: any = []
    private peopleMarker: any = []
    private city = "全国地图"
    private searchStatus = "show"

    private mapMixZoom = 3
    private mapCenter = [104.710713, 35.865113]

    state = {
        visible: false,
        visible1: false,
        visible2: true,
        visible3: false,

        visible5: false,
        visible6: false,
        visible7: false,
        showSearch: true,

        selectFormat: "all",
        formatCitys: [],
        showCity: "全国地图",
    }

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
        })

        const bounds = new this.mapLoader.Bounds([135.214058, 48.440836], [73.435189, 39.373343])

        this.map.on("complete", () => {
            const initMapData = this.map.getFitZoomAndCenterByBounds(bounds)

            this.mapMixZoom = initMapData[0] || 3
            this.mapCenter = [initMapData[1].lng, initMapData[1].lat]
            this.map.setCenter(this.mapCenter)
            this.map.setZooms([this.mapMixZoom, 5])
            this.map.setZoom(this.mapMixZoom)

            setTimeout(() => {
                this.mapFn()
                this.commonFn()

                adcodes.map(item => {
                    this.addProvinceName(item)
                })
            }, 1200)
        })
    }

    commonFn() {
        const delayAnimation = adcodes.filter(x => x.animation === "delay")
        const immediatelyAnimation = adcodes.filter(x => x.animation === "immediately")

        delayAnimation.forEach((item: any, idx: number) => {
            setTimeout(() => {
                this.insertFlag(item, true)

                const lottieElement: any = document.getElementById(item.code)

                const animation = lottie.loadAnimation({
                    container: lottieElement,
                    renderer: "canvas",
                    loop: false,
                    autoplay: false,
                    animationData: flagJson,
                    assetsPath: PUBLIC_PATH,
                })

                animation.play()
            }, 800 * idx)
        })

        setTimeout(() => {
            immediatelyAnimation.forEach((item: any) => {
                this.insertFlag(item, false)

                const lottieElement: any = document.getElementById(item.code)

                const animation = lottie.loadAnimation({
                    container: lottieElement,
                    renderer: "canvas",
                    loop: false,
                    autoplay: false,
                    animationData: flagJson,
                    assetsPath: PUBLIC_PATH,
                })

                animation.play()
            })
        }, 800 * 5)

        setTimeout(() => {
            this.setState({ visible2: false })
        }, 4500)
    }

    // 一级、二级区域颜色填充
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

    // 一级区域插旗
    insertFlag(item: any, showText: boolean) {
        this.areaOfFill({
            adcode: item.code,
            depth: 0,
            style: {
                province: "#59A2F8",
                fill: "rgba(173, 220, 255, 0.6)",
            },
        })

        const flagMarkerContent =
            "" +
            `<div class="flag-animation" id=${item.code}>` +
            `${showText ? `<div class="flag-animation-text">${item.name}</div>` : `<div />`}` +
            "</div>"

        const flagMarker = new this.mapLoader.Marker({
            position: item.centerQ,
            content: flagMarkerContent,
            zooms: [3, 5],
            bubble: true,
            anchor: "bottom-center",
        })

        this.firstMarkerCity.push(flagMarker)

        this.map.add(flagMarker)
    }

    // 添加省份名称marker
    addProvinceName(item: any) {
        const text = new this.mapLoader.Text({
            text: item.name,
            anchor: "bottom-center", // 设置文本标记锚点
            style: {
                "border-width": 0,
                "font-size": "10px",
                color: "#87A1BA",
                "background-color": "transparent",
            },
            position: item.centerT,
            zooms: [4.5, 5],
        })

        text.setMap(this.map)
    }

    // 定位
    dingwei() {
        const geolocation = new this.mapLoader.Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 20000, //超过10秒后停止定位，默认：无穷大
            maximumAge: 0, //定位结果缓存0毫秒，默认：0
            convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: false, //显示定位按钮，默认：true
            showMarker: false, //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: false, //定位成功后用圆圈表示定位精度范围，默认：true
            zoomToAccuracy: false, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        })

        geolocation.getCurrentPosition((status: any, result: any) => {
            if (status === "complete") {
                const geocoder = new this.mapLoader.Geocoder()

                geocoder.getAddress(result.position, (status: any, result1: any) => {
                    if (status === "complete" && result1.regeocode) {
                        const info = result1.regeocode.addressComponent
                        let searchText = ""

                        if (info.city === "") {
                            searchText = info.province
                        } else {
                            searchText = info.city
                        }

                        this.city = searchText

                        const data: any = adcodes.filter(
                            x =>
                                x.title ===
                                (info.city === "" ? info.province.substr(0, info.province.length - 1) : info.province)
                        )
                        if (data.length) {
                            this.map.setZooms([data[0].city.zoom, 20])

                            // this.clearAllLayout()
                            this.selectProvince = data[0]

                            const info1 = data[0].city.citys.filter((x: any) => x.name === searchText)

                            if (info1.length) {
                                this.setState({ showCity: data[0].title + " " + info1[0].name })

                                if (this.peopleMarker.length) {
                                    this.map.remove(this.peopleMarker)
                                    this.peopleMarker = []
                                }

                                const markerContent =
                                    "" +
                                    '<div class="people-marker">' +
                                    `   <img src=${require(`src/assets/images/men.png`)} alt="" />` +
                                    "</div>"

                                const marker = new this.mapLoader.Marker({
                                    content: markerContent,
                                    position: result.position,
                                    offset: new this.mapLoader.Pixel(0, 0),
                                    zooms: [18, 20],
                                    anchor: "bottom-center",
                                })

                                this.peopleMarker.push(marker)

                                this.map.add(marker)

                                this.secondCityFillAndAddMarker(data[0], result.position, 18, false)
                            }
                        }
                    }
                })
            } else {
                Toast.show({ content: "定位失败" })
            }
        })
    }

    // 地图事件
    mapFn() {
        const geocoder = new this.mapLoader.Geocoder()

        this.map.on("click", (e: any) => {
            if (this.map.getZoom() <= 5) {
                // 当地图zoom小于等于5，点击区域缩放到二级区域
                geocoder.getAddress([e.lnglat.lng, e.lnglat.lat], (status: any, result: any) => {
                    if (status === "complete" && result.regeocode) {
                        const address = result.regeocode.formattedAddress

                        const center: any = adcodes.filter(x => address.includes(x.name))

                        this.map.setZooms([center[0].city.zoom, 20])

                        // 点击一级区域缩放到二级区域
                        if (center.length) {
                            this.city = center[0].title
                            this.setState({ showCity: center[0].title })
                            this.selectProvince = center[0]
                            this.secondCityFillAndAddMarker(center[0], center[0].center, center[0].city.zoom, true)
                        }
                    }
                })
            }
        })

        this.map.on("zoomend", () => {
            const zoom = this.map.getZoom()
            const center = this.map.getCenter()
            const { selectProvince } = this

            if (selectProvince) {
                if (zoom >= selectProvince.city.zoom && zoom < 17.99) {
                    this.setState({ showCity: selectProvince.name })
                    if (!this.disProvinces.length) {
                        // this.areaOfFill({
                        //     adcode: this.selectProvince.code,
                        //     depth: 1,
                        //     style: {
                        //         fill: "rgba(173, 220, 255, 0.6)",
                        //         city: "#59A2F8",
                        //     },
                        // })

                        if (selectProvince.municipality) {
                            this.areaOfFill({
                                adcode: selectProvince.code,
                                depth: 1,
                                style: {
                                    fill: "rgba(173, 220, 255, 0.6)",
                                    city: "#59A2F8",
                                },
                            })
                        } else {
                            this.areaOfFill({
                                adcode: selectProvince.code,
                                depth: 1,
                                style: {
                                    fill: "rgba(225, 225, 225, 0.6)",
                                    city: "rgba(209, 209, 209, 0.6)",
                                    province: "#59A2F8",
                                },
                            })

                            selectProvince.city.citys.map((cc: any) => {
                                this.areaOfFill({
                                    adcode: cc.code,
                                    depth: 1,
                                    style: {
                                        fill: "rgba(173, 220, 255, 0.6)",
                                        city: "#59A2F8",
                                    },
                                })
                            })
                        }
                    }
                } else if (zoom >= 18) {
                    if (this.disProvinces && this.disProvinces.length) {
                        this.disProvinces.map((item: any) => {
                            item.setMap(null)
                        })
                        this.disProvinces = []
                    }

                    geocoder.getAddress([center.lng, center.lat], (status: any, result: any) => {
                        if (status === "complete" && result.regeocode) {
                            const info = result.regeocode.addressComponent
                            let searchText = []

                            if (info.city === "") {
                                searchText = [info.province.substr(0, info.province.length - 1), info.province]
                            } else {
                                searchText = [info.province, info.city]
                            }

                            this.city = searchText[1]
                            this.setState({ showCity: searchText[0] + " " + searchText[1] })
                        }
                    })
                }
            }

            if (zoom > 5 && zoom < 18) {
                if (!this.state.visible5) {
                    this.setState({ visible5: true })
                }
            } else {
                this.setState({ visible5: false })
            }

            if (zoom >= 18) {
                this.map.setPitch(50)
                this.map.setRotation(10)
            }

            if (this.map.getPitch() !== 0 && zoom < 18) {
                this.map.setPitch(0)
                this.map.setRotation(0)
            }

            if (zoom >= 18) {
                this.setState({ showSearch: false })
            } else {
                this.setState({ showSearch: true })
            }

            if (zoom > 5) {
                if (!this.state.visible7) {
                    this.setState({ visible7: true })
                }
            } else {
                this.setState({ visible7: false })
            }
        })
    }

    // 搜索框点击事件
    searchClickFn() {
        this.searchStatus = "show"
        this.setState({ visible: true })
    }

    // 搜索popup隐藏事件
    hidePopup() {
        this.setState({ visible: false }, () => {
            setTimeout(() => {
                this.searchStatus = "hide"
            }, 200)
        })
    }

    // 搜索框Render
    searchRender(style?: CSSProperties) {
        return (
            <div className="search-main" style={{ ...style }} onClick={() => this.searchClickFn()}>
                <div className="search-main-content">
                    <img alt="" src={require("src/assets/images/search/search.png")} className="search-icon" />
                    <span className="search-text">输入你想去的地方</span>
                    <img alt="" src={require("src/assets/images/search/scan.png")} className="scan-icon" />
                    <img alt="" src={require("src/assets/images/search/voice.png")} className="voice-icon" />
                </div>
            </div>
        )
    }

    // 清空一级、二级、三级图层
    clearAllLayout() {
        // 清除填充颜色
        if (this.disProvinces && this.disProvinces.length) {
            this.disProvinces.map((item: any) => {
                item.setMap(null)
            })
            this.disProvinces = []
        }

        // 清除一级区域旗子
        if (this.firstMarkerCity.length) {
            this.map.remove(this.firstMarkerCity)
            this.firstMarkerCity = []
        }
        // 清除二级区域marker
        if (this.secondMarkerCity.length) {
            this.map.remove(this.secondMarkerCity)
            this.secondMarkerCity = []
        }
        // 清除三级区域marker
        if (this.thirdMarkerCity.length) {
            this.map.remove(this.thirdMarkerCity)
            this.thirdMarkerCity = []
        }
    }

    // 选择城市
    selectCityFn(params: any, parentTitle: string) {
        if (this.city === params.title) return

        this.city = params.title

        this.setState({ visible1: false }, () => {
            if (params.title === "全国地图") {
                this.setState({ showCity: "全国地图" })

                this.map.setZooms([this.mapMixZoom, 5])
                this.setState({ selectFormat: "all" })
                // 选择全国地图
                this.clearAllLayout()
                this.map.setZoomAndCenter(this.mapMixZoom, this.mapCenter)
                this.map.setPitch(0)
                this.map.setRotation(0)

                this.setState({ visible2: true }, () => {
                    this.commonFn()
                })
            } else {
                const data: any = adcodes.filter(x => x.title === parentTitle)

                if (data.length) {
                    this.selectProvince = data[0]
                    const { city } = data[0]

                    this.map.setZooms([city.zoom, 20])

                    if (params.key === "s") {
                        this.setState({ showCity: params.title })
                        // 选择省
                        this.secondCityFillAndAddMarker(data[0], data[0].center, data[0].city.zoom, true)
                    } else {
                        this.setState({ showCity: data[0].title + " " + params.title })
                        // 选择市
                        const nowCity = city.citys.filter((x: any) => x.name === params.title)

                        if (nowCity.length) {
                            this.secondCityFillAndAddMarker(data[0], nowCity[0].center, 18, false)
                        }
                    }
                }
            }
        })
    }

    // 二级区域填充、打点
    secondCityFillAndAddMarker(params: any, center: number[], zoom: number, isFill?: boolean) {
        const { city } = params

        this.map.setZoomAndCenter(zoom, center)
        this.clearAllLayout()

        if (this.selectProvince) {
            // 给二级区域填充颜色
            if (isFill) {
                if (this.selectProvince.municipality) {
                    this.areaOfFill({
                        adcode: params.code,
                        depth: 1,
                        style: {
                            fill: "rgba(173, 220, 255, 0.6)",
                            city: "#59A2F8",
                        },
                    })
                } else {
                    this.areaOfFill({
                        adcode: params.code,
                        depth: 1,
                        style: {
                            fill: "rgba(225, 225, 225, 0.6)",
                            city: "rgba(209, 209, 209, 0.6)",
                            province: "#59A2F8",
                        },
                    })

                    this.selectProvince.city.citys.map((cc: any) => {
                        this.areaOfFill({
                            adcode: cc.code,
                            depth: 1,
                            style: {
                                fill: "rgba(173, 220, 255, 0.6)",
                                city: "#59A2F8",
                            },
                        })
                    })
                }
            }

            city.citys.forEach((item: any) => {
                if (Array.isArray(this.state.selectFormat)) {
                    this.state.selectFormat.forEach((n: any) => {
                        if (item[n]) {
                            item[n].forEach((n1: any) => {
                                this.addMarkerToSecond(n1.center, n1, item)
                                this.thirdCityAddMarker(n1)
                            })
                        }
                    })
                } else {
                    item.have.forEach((n: any) => {
                        item[n].forEach((n1: any) => {
                            this.addMarkerToSecond(n1.center, n1, item)
                            this.thirdCityAddMarker(n1)
                        })
                    })
                }
            })
        }
    }

    // 给二级区域打marker
    addMarkerToSecond(center: string[], item: any, item1: any) {
        const { city } = this.selectProvince

        const markerContent =
            "" +
            '<div class="city-marker">' +
            // `   <img src=${require(`src/assets/images/formats-position.png`)} alt="" />` +
            `   <img src=${require(`src/assets/images/city/${
                item.type + (item.status === "decorate" ? "-decorate" : "")
            }.png`)} alt="" />` +
            // `   <div class="city-formats-number">${item.total || 0}</div>` +
            "</div>"

        const marker = new this.mapLoader.Marker({
            content: markerContent,
            position: center,
            offset: new this.mapLoader.Pixel(0, 0),
            zooms: [city.zoom, 17.99],
            anchor: "bottom-center",
        })

        this.secondMarkerCity.push(marker)

        // 二级marker点击事件
        marker.on("click", () => {
            this.setState({ showCity: this.selectProvince.title + " " + item1.name })
            this.city = item1.name
            this.map.setZoomAndCenter(18, item.center)
        })

        this.map.add(marker)
    }

    // 三级区域打点
    thirdCityAddMarker(item: any) {
        const markerContent =
            "" +
            `<div class="custom-content-marker" style="height: ${item.status === "decorate" ? "122px" : "152px"}">` +
            `<div class="dialog">
                    <div class="dialog-title">${item.name}</div>
                    ${
                        item.status === "decorate" || item.status === "not-up"
                            ? `<div class="dialog-desc">
                            <img alt="" src=${require(`src/assets/images/${item.status}.png`)} class="icon1" />
                            <span class="desc1">${item.status === "decorate" ? "待开业" : "待点亮"}</span>
                        </div>`
                            : `<div class="dialog-desc1">
                            <img alt="" src=${require(`src/assets/images/thermal_${
                                item.fire > 0 ? 100 : 0
                            }.png`)} class="icon2" />
                            <div class="w3-light-grey">
                                <div class="w3-container" style="width:${item.fire}%"></div>
                            </div>
                        </div>`
                    }
                </div>` +
            `<div class="people-content">
                    <img alt="" src=${require(`src/assets/images/men.png`)} class="people-1" />
                    <img alt="" src=${require(`src/assets/images/men.png`)} class="people-2" />
                    <img alt="" src=${require(`src/assets/images/women.png`)} class="people-3" />
                    <img alt="" src=${require(`src/assets/images/women.png`)} class="people-4" />
                </div>` +
            `<div class="build">
                    ${
                        item.status === "normal"
                            ? `<img src=${require(`src/assets/images/build/${item.type}-not-up.png`)} class="build-image" />`
                            : `<div />`
                    }
                    <img src=${require(`src/assets/images/build/${item.type}-${item.status}.png`)} class="build-image" style="margin-top: ${
                item.status === "decorate" ? "-30px" : "0"
            };opacity: ${item.fire / 100}" />
                </div>` +
            "</div>"

        const marker = new this.mapLoader.Marker({
            position: item.center,
            content: markerContent,
            offset: new this.mapLoader.Pixel(30, 10),
            zooms: [18, 20],
            anchor: "bottom-center",
        })

        marker.on("click", () => {
            if (!this.state.visible6) {
                this.setState({ visible6: true })
            }
        })

        this.thirdMarkerCity.push(marker)
        this.map.add(marker)
    }

    // 业态点击函数
    formatFn(key: string) {
        const { city } = this.selectProvince
        if (this.state.selectFormat === key && this.state.selectFormat === "all") return

        // 删除二级marker
        if (this.secondMarkerCity.length) {
            this.map.remove(this.secondMarkerCity)
            this.secondMarkerCity = []
        }
        // 删除三级marker
        if (this.thirdMarkerCity.length) {
            this.map.remove(this.thirdMarkerCity)
            this.thirdMarkerCity = []
        }

        if (key === "all") {
            // 业态点击全部，绘制二级、三级区域的点
            this.setState({ selectFormat: key }, () => {
                city.citys.forEach((item: any) => {
                    item.have.forEach((n: any) => {
                        item[n].forEach((n1: any) => {
                            this.addMarkerToSecond(n1.center, n1, item)
                            this.thirdCityAddMarker(n1)
                        })
                    })
                })
            })
        } else {
            if (!Array.isArray(this.state.selectFormat)) {
                this.setState({ selectFormat: [key] }, () => {
                    city.citys.forEach((item: any) => {
                        this.state.selectFormat.forEach((n: any) => {
                            if (item[n]) {
                                item[n].forEach((n1: any) => {
                                    this.addMarkerToSecond(n1.center, n1, item)
                                    this.thirdCityAddMarker(n1)
                                })
                            }
                        })
                    })
                })
            } else {
                const arr = this.state.selectFormat
                if (arr.includes(key)) {
                    const index = arr.findIndex(x => x === key)
                    arr.splice(index, 1)
                } else {
                    arr.push(key)
                }
                this.setState({ selectFormat: arr }, () => {
                    city.citys.forEach((item: any) => {
                        this.state.selectFormat.forEach((n: any) => {
                            if (item[n]) {
                                item[n].forEach((n1: any) => {
                                    this.addMarkerToSecond(n1.center, n1, item)
                                    this.thirdCityAddMarker(n1)
                                })
                            }
                        })
                    })
                })
            }
        }
    }

    render() {
        const { selectFormat } = this.state

        return (
            <div className="container" id="container">
                {this.state.showSearch ? this.searchRender() : null}

                <div className="locate-main" onClick={() => this.dingwei()}>
                    <img alt="" src={require("src/assets/images/locate.png")} />
                    <span>我的位置</span>
                </div>

                <div
                    className="locate-main"
                    style={{ bottom: "141px" }}
                    onClick={() => this.setState({ visible1: true })}
                >
                    <img alt="" src={require("src/assets/images/national.png")} />
                    <span>城市选择</span>
                </div>

                {/* 业态选择 */}
                <Popup
                    visible={this.state.visible5}
                    position="left"
                    style={{ "--z-index": "1001" }}
                    mask={false}
                    bodyStyle={{ height: "308px" }}
                >
                    <div className="formats-main">
                        {formats.map(item => {
                            return (
                                <div
                                    key={`formats-${item.key}`}
                                    className="formats-main-item"
                                    style={{
                                        color:
                                            selectFormat === item.key ||
                                            (Array.isArray(selectFormat) && selectFormat.includes(item.key))
                                                ? "#fff"
                                                : "#000",
                                        background:
                                            selectFormat === item.key ||
                                            (Array.isArray(selectFormat) && selectFormat.includes(item.key))
                                                ? "#0076E3"
                                                : "#fff",
                                    }}
                                    onClick={() => this.formatFn(item.key)}
                                >
                                    {item.title}
                                </div>
                            )
                        })}
                    </div>
                </Popup>

                {/* 右上角城市显示 */}
                <Popup
                    visible={this.state.visible7}
                    position="right"
                    style={{ "--z-index": "1001" }}
                    mask={false}
                    bodyStyle={{ height: "53px" }}
                >
                    <div className="show-city">{this.state.showCity}</div>
                </Popup>

                {/* 运营弹窗 */}
                <Popup
                    visible={this.state.visible}
                    onMaskClick={() => this.hidePopup()}
                    bodyStyle={{ height: "508px" }}
                    maskStyle={{ background: "transparent" }}
                    style={{ "--z-index": "1003" }}
                >
                    <div className="popup-content" style={{ opacity: this.searchStatus === "show" ? 1 : 0 }}>
                        {this.searchRender({ position: "absolute", top: 0 })}
                        <img alt="" src={require("src/assets/images/search/operating.png")} className="operating" />
                    </div>
                </Popup>

                <Popup visible={this.state.visible1} style={{ "--z-index": "1005" }} bodyStyle={{ height: "100%" }}>
                    <div className="select-city-main">
                        <div className="title">
                            <span>选择城市</span>
                            <img
                                alt=""
                                src={require("src/assets/images/close.png")}
                                onClick={() => this.setState({ visible1: false })}
                                className="close"
                            />
                        </div>
                        <div className="content">
                            {cityItems.map((item, idx) => {
                                return (
                                    <div className="my-address-main" key={`city-${idx}`}>
                                        <div className="my-address-title">{item.title}</div>
                                        <div className="my-address-content">
                                            {item.view.map((n, i) => {
                                                return (
                                                    <div
                                                        className={`my-address-content-item ${
                                                            n.title === this.city && "my-address-content-item-active"
                                                        }`}
                                                        key={`city-view-${i}`}
                                                        onClick={() => this.selectCityFn(n, item.title)}
                                                    >
                                                        {n.title}
                                                        {n.title === this.city ? (
                                                            <div className="isselect"></div>
                                                        ) : (
                                                            <div />
                                                        )}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </Popup>

                {/* 点击二级建筑弹窗 */}
                <Popup visible={this.state.visible6} bodyStyle={{ height: "100%" }} style={{ "--z-index": "1009" }}>
                    <div className="store-main">
                        <img
                            alt=""
                            src={require("src/assets/images/close.png")}
                            className="close"
                            onClick={() => this.setState({ visible6: false })}
                        />
                        <img alt="" src={require("src/assets/images/store/1.png")} />
                        <img alt="" src={require("src/assets/images/store/2.png")} />
                        <img alt="" src={require("src/assets/images/store/3.png")} />
                        <img alt="" src={require("src/assets/images/store/4.png")} />
                        <img alt="" src={require("src/assets/images/store/5.png")} />
                        <img alt="" src={require("src/assets/images/store/6.png")} />
                        <img alt="" src={require("src/assets/images/store/7.png")} />
                        <img alt="" src={require("src/assets/images/store/8.png")} />
                    </div>
                </Popup>

                <Mask visible={this.state.visible2} opacity={0} />
            </div>
        )
    }
}

import "./index.scss"
import AMap from "@amap/amap-jsapi-loader"
import { Component, CSSProperties } from "react"
import Popup from "antd-mobile/es/components/popup"
import Mask from "antd-mobile/es/components/mask"
import Toast from "antd-mobile/es/components/toast"
import { adcodes, cityItems, formats } from "./json"
import lottie from "lottie-web"
import flagJson from "src/assets/flag2.json"

interface IAreaFill {
    adcode: string | string[]
    depth: number
    style: {
        fill?: string
        province?: string
        county?: string
        city?: string
    }
}

const CHINARANGE = {
    northEast: [135.214058, 48.440836],
    southWest: [73.435189, 39.373343],
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
    private city = "全国"
    private searchStatus = "show"

    private mapMixZoom = 3 // 展示全国地图的最小缩放
    private mapCenter = [104.710713, 35.865113]
    private touch = true

    state = {
        visible: false,
        visible1: false,
        visible2: true,
        visible3: false,
        visible4: false,
        visible6: false,
        showSearch: true,

        formatSelect: "all",
        formatSelect1: "all",
        showAllCity: false,
        showCity1: [{ title: "全国", key: "countries", parent: "" }],
        zoomNumber: this.mapMixZoom,
        totalStoreNumber: 0,
        formatCitys: [],
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
            plugins: ["AMap.DistrictLayer", "AMap.Geolocation", "AMap.Geocoder"],
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

        this.map.on("complete", () => {
            const zoomAndCenter = this.getZoomAndCenterByPoint(CHINARANGE.northEast, CHINARANGE.southWest)
            this.mapMixZoom = zoomAndCenter[0] || 3
            this.mapCenter = [zoomAndCenter[1].lng, zoomAndCenter[1].lat]

            this.map.setZooms([this.mapMixZoom, 5])
            this.map.setZoomAndCenter(this.mapMixZoom, this.mapCenter)

            setTimeout(() => {
                this.mapFn()
                this.flagProcess()

                adcodes.map(item => {
                    this.addProvinceName(item.name, item.centerT)
                })
            }, 1200)
        })
    }

    // 地图事件
    mapFn() {
        this.map.on("click", async (e: any) => {
            if (this.map.getZoom() <= 5) {
                this.getAddressByPoint([e.lnglat.lng, e.lnglat.lat], (result: any) => {
                    const nowCity: any = adcodes.filter(x => result.formattedAddress.includes(x.name))

                    // 点击一级区域缩放到二级区域
                    if (nowCity.length) {
                        this.city = nowCity[0].title
                        this.setState({ showCity1: [{ title: nowCity[0].title, key: "s", parent: "" }] })
                        this.selectProvince = nowCity[0]
                        this.secondCityFillAndAddMarker(nowCity[0], true)
                    }
                })
            }
        })

        this.map.on("zoomend", () => {
            const zoom = this.map.getZoom()
            const center = this.map.getCenter()
            const { selectProvince, touch } = this

            if (selectProvince && touch) {
                const zoomAndCenter = this.getZoomAndCenterByPoint(
                    selectProvince.range.northEast,
                    selectProvince.range.southWest
                )

                if (zoom >= (zoomAndCenter[0] < 5.1 ? 5.1 : zoomAndCenter[0]) && zoom < 17.99) {
                    if (this.state.showCity1.length === 2) {
                        this.setState({ showCity1: [{ title: selectProvince.name, key: "s", parent: "" }] })
                    }
                    if (!this.disProvinces.length) {
                        if (selectProvince.municipality) {
                            this.areaOfFill({
                                adcode: selectProvince.code,
                                depth: 1,
                                style: {
                                    fill: "rgba(173, 220, 255, 0.6)",
                                    province: "#59A2F8",
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

                            const arr: any = []
                            this.selectProvince.citys.map((cc: any) => {
                                arr.push(cc.code)
                            })
                            this.areaOfFill({
                                adcode: arr,
                                depth: 1,
                                style: {
                                    fill: "rgba(173, 220, 255, 0.6)",
                                    city: "#59A2F8",
                                },
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

                    this.getAddressByPoint([center.lng, center.lat], (result: any) => {
                        const info = result.addressComponent
                        let searchText = []

                        if (info.city === "") {
                            searchText = [info.province.substr(0, info.province.length - 1), info.province]
                        } else {
                            searchText = [info.province, info.city]
                        }

                        this.city = searchText[1]

                        const data1 = selectProvince.citys.filter((x: any) => x.name === this.city)

                        if (data1.length) {
                            const arr: string | any[] = []

                            data1[0].have.forEach((n: any) => {
                                data1[0][n].forEach((n1: any) => {
                                    arr.push(n1)
                                })
                            })

                            this.setState({
                                showCity1: [
                                    { title: searchText[0], key: "s", parent: "" },
                                    { title: searchText[1], key: "111", parent: searchText[0] },
                                ],
                                totalStoreNumber: data1[0].total,
                                formatCitys: arr,
                            })
                        }
                    })
                }
            }

            if (zoom >= 18) {
                this.map.setPitch(50)
                this.map.setRotation(10)
            }

            if (this.map.getPitch() !== 0 && zoom < 18) {
                this.map.setPitch(0)
                this.map.setRotation(0)
            }

            this.setState({ showSearch: zoom >= 18 ? false : true, zoomNumber: zoom })
        })
    }

    // 通过经纬度获取地址
    getAddressByPoint(position: [lng: number[], lat: number[]], callback: any) {
        const geocoder = new this.mapLoader.Geocoder()

        geocoder.getAddress(position, (status: any, result: any) => {
            if (status === "complete" && result.regeocode) {
                callback(result.regeocode)
            } else {
                callback(null)
            }
        })
    }

    // 插旗过程
    flagProcess() {
        const delayAnimation = adcodes.filter(x => x.animation === "delay")
        const immediatelyAnimation = adcodes.filter(x => x.animation === "immediately")

        delayAnimation.forEach((item: any, idx: number) => {
            setTimeout(() => {
                this.insertFlag(item, true)
                this.insertFlagAnimation(item.code)
            }, 800 * idx)
        })

        setTimeout(() => {
            immediatelyAnimation.forEach((item: any) => {
                this.insertFlag(item, false)
                this.insertFlagAnimation(item.code)
            })
        }, 800 * 5)

        setTimeout(() => {
            this.setState({ visible2: false })
        }, 4500)
    }

    // 区域颜色填充
    areaOfFill(params: IAreaFill) {
        const disProvince = new this.mapLoader.DistrictLayer.Province({
            zIndex: 12,
            adcode: Array.isArray(params.adcode) ? params.adcode : [params.adcode],
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

    // 一级区域插旗marker
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

    // 插旗动画
    insertFlagAnimation(code: string) {
        const lottieElement = document.getElementById(code)

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

    // 添加省份名称marker
    addProvinceName(name: string, center: number[]) {
        const text = new this.mapLoader.Text({
            text: name,
            anchor: "bottom-center", // 设置文本标记锚点
            style: {
                "border-width": 0,
                "font-size": "10px",
                color: "#87A1BA",
                "background-color": "transparent",
            },
            position: center,
            zooms: [4.5, 5],
        })

        text.setMap(this.map)
    }

    // 定位
    orientation() {
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
                this.getAddressByPoint(result.position, (result1: any) => {
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
                        const { range } = data[0]
                        const zoomAndCenter = this.getZoomAndCenterByPoint(range.northEast, range.southWest)

                        this.map.setZooms([zoomAndCenter[0] < 5.1 ? 5.1 : zoomAndCenter[0], 20])

                        this.selectProvince = data[0]

                        const info1 = data[0].citys.filter((x: any) => x.name === searchText)

                        if (info1.length) {
                            this.setState({
                                showCity1: [
                                    { title: data[0].title, key: "s", parent: "" },
                                    { title: info1[0].name, key: info1[0].code, parent: data[0].name },
                                ],
                                totalStoreNumber: info1[0].total,
                            })

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

                            this.secondCityFillAndAddMarker(data[0], false)
                        }
                    }
                })
            } else {
                Toast.show({ content: "定位失败" })
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

    // 清空一级、二级、三级layer和marker
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

    selectCityFn1(params: any, parentTitle: string) {
        // if (this.city === params.title) return

        this.city = params.title
        this.touch = false
        setTimeout(() => {
            this.touch = true
        }, 500)

        this.setState({ showAllCity: false }, async () => {
            if (params.title === "全国") {
                // 选择全国
                this.clearAllLayout()
                this.map.setZooms([this.mapMixZoom, 5])
                this.map.setZoomAndCenter(this.mapMixZoom, this.mapCenter)
                await this.setState({ formatSelect: "all", showCity1: [params], visible2: true })
                setTimeout(() => {
                    this.flagProcess()
                }, 1200)
            } else {
                const data: any = adcodes.filter(x => x.title === (parentTitle === "" ? params.title : parentTitle))
                this.selectProvince = data[0]

                if (data.length) {
                    const { citys, range } = data[0]
                    // const zoomAndCenter = this.getZoomAndCenterByPoint(range.northEast, range.southWest)
                    // this.map.setZooms([zoomAndCenter[0] < 5.1 ? 5.1 : zoomAndCenter[0], 20])
                    // 选择省
                    if (params.key === "s") {
                        this.setState({ showCity1: [{ title: params.title, key: "s", parent: "" }] })
                        this.secondCityFillAndAddMarker(data[0], true)
                    } else {
                        // 选择市
                        const nowCity = citys.filter((x: any) => x.name === params.title)
                        if (nowCity.length) {
                            const arr: string | any[] = []

                            nowCity[0].have.forEach((n: any) => {
                                nowCity[0][n].forEach((n1: any) => {
                                    arr.push(n1)
                                })
                            })

                            this.setState({
                                showCity1: [
                                    { title: data[0].title, key: "s" },
                                    { title: params.title, key: params.key, parent: data[0].title },
                                ],
                                totalStoreNumber: nowCity[0].total,
                                formatCitys: arr,
                            })

                            this.secondCityFillAndAddMarker(data[0], false, 18, params.center)
                        }
                    }
                }
            }
        })
    }

    // 根据经纬度获取区域zoom和中心
    getZoomAndCenterByPoint(northEast: number[], southWest: number[]) {
        const bounds = new this.mapLoader.Bounds(northEast, southWest)
        const initMapData = this.map.getFitZoomAndCenterByBounds(bounds)

        return initMapData
    }

    // 二级区域填充、打点
    secondCityFillAndAddMarker(params: any, isFill?: boolean, thirdZoom?: number, thirdCenter?: number[]) {
        const { citys, range } = params

        const zoomAndCenter = this.getZoomAndCenterByPoint(range.northEast, range.southWest)
        const secondMixZoom = zoomAndCenter[0] < 5.1 ? 5.1 : zoomAndCenter[0]
        this.map.setZooms([secondMixZoom, 20])
        this.map.setZoomAndCenter(
            thirdZoom || secondMixZoom,
            thirdCenter || [zoomAndCenter[1].lng, zoomAndCenter[1].lat]
        )

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
                            province: "#59A2F8",
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

                    const arr: any = []
                    this.selectProvince.citys.map((cc: any) => {
                        arr.push(cc.code)
                    })
                    this.areaOfFill({
                        adcode: arr,
                        depth: 1,
                        style: {
                            fill: "rgba(173, 220, 255, 0.6)",
                            city: "#59A2F8",
                        },
                    })
                }
            }

            if (this.state.formatSelect === "all") {
                citys.forEach((item: any) => {
                    item.have.forEach((n: any) => {
                        item[n].forEach((n1: any) => {
                            this.addMarkerToSecond(n1.center, n1, item)
                            this.thirdCityAddMarker(n1)
                        })
                    })
                })
            } else {
                citys.forEach((item: any) => {
                    item[this.state.formatSelect] &&
                        item[this.state.formatSelect].forEach((n1: any) => {
                            this.addMarkerToSecond(n1.center, n1, item)
                            this.thirdCityAddMarker(n1)
                        })
                })
            }
        }
    }

    // 给二级区域打marker
    addMarkerToSecond(center: string[], item: any, item1: any) {
        const markerContent =
            "" +
            '<div class="city-marker">' +
            `   <img src=${require(`src/assets/images/city/${
                item.type + (item.status === "decorate" ? "-decorate" : "")
            }.png`)} alt="" />` +
            "</div>"

        const marker = new this.mapLoader.Marker({
            content: markerContent,
            position: center,
            offset: new this.mapLoader.Pixel(0, 0),
            zooms: [5.1, 17.99],
            anchor: "bottom-center",
        })

        this.secondMarkerCity.push(marker)

        // 二级marker点击事件
        marker.on("click", () => {
            const arr: string | any[] = []

            item1.have.forEach((n: any) => {
                item1[n].forEach((n1: any) => {
                    arr.push(n1)
                })
            })

            this.setState({
                showCity1: [
                    { title: this.selectProvince.title, key: "s", parent: "" },
                    { title: item1.name, key: item.code, parent: this.selectProvince.title },
                ],
                totalStoreNumber: item1.total,
                formatCitys: arr,
            })
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
    formatFn1(key: string) {
        if (this.state.formatSelect === key) return

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

        this.setState({ formatSelect: key }, () => {
            if (this.selectProvince) {
                const { citys } = this.selectProvince

                if (key === "all") {
                    citys.forEach((item: any) => {
                        item.have.forEach((n: any) => {
                            item[n].forEach((n1: any) => {
                                this.addMarkerToSecond(n1.center, n1, item)
                                this.thirdCityAddMarker(n1)
                            })
                        })
                    })
                } else {
                    citys.forEach((item: any) => {
                        item[key] &&
                            item[key].forEach((n1: any) => {
                                this.addMarkerToSecond(n1.center, n1, item)
                                this.thirdCityAddMarker(n1)
                            })
                    })
                }
            }
        })
    }

    // 三级组装业态数据
    thirdAssembleFormatData(key: string) {
        if (this.state.formatSelect1 === key) return

        this.setState({ formatSelect1: key }, () => {
            const { showCity1 } = this.state

            // 筛选出当前市
            const nowUrban = this.selectProvince.citys.filter((x: any) => x.name === showCity1[1].title)

            if (nowUrban.length) {
                if (key !== "all") {
                    this.setState({ formatCitys: nowUrban[0][key] || [] })
                } else {
                    const arr: string | any[] = []

                    nowUrban[0].have.forEach((n: any) => {
                        nowUrban[0][n].forEach((n1: any) => {
                            arr.push(n1)
                        })
                    })

                    this.setState({ formatCitys: arr })
                }
            }
        })
    }

    goThird(item: any) {
        this.map.setZooms([18, 20])

        this.setState({ visible4: false }, () => {
            this.map.setCenter(item.center)
        })
    }

    render() {
        const { formatSelect, showAllCity, showCity1, zoomNumber, formatSelect1, totalStoreNumber } = this.state

        return (
            <div className="container" id="container">
                {this.state.showSearch ? this.searchRender() : null}

                <div className="locate-main" onClick={() => this.orientation()}>
                    <img alt="" src={require("src/assets/images/locate.png")} />
                    <span>我的位置</span>
                </div>

                <div className="formats-city">
                    {zoomNumber >= 18 ? (
                        <div className="other-store">
                            <span className="other-store-text1">同城还有其他{totalStoreNumber}家门店</span>
                            <span className="other-store-text2" onClick={() => this.setState({ visible4: true })}>
                                点击查看
                            </span>
                            <img alt="" src={require("src/assets/images/arrow-right.png")} className="arrow-right" />
                        </div>
                    ) : zoomNumber <= 5 ? (
                        <div />
                    ) : (
                        <div className="format-select">
                            {formats.map(item => {
                                return (
                                    <div
                                        className={`format-select-item ${
                                            formatSelect === item.key && "format-select-item-active"
                                        }`}
                                        key={`format-${item.key}`}
                                        onClick={() => this.formatFn1(item.key)}
                                    >
                                        {item.title}

                                        <div
                                            className="format-select-item-line"
                                            style={{ opacity: formatSelect === item.key ? 1 : 0 }}
                                        ></div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                    <div className="city-select">
                        <div
                            className="city-select-left"
                            onClick={() => this.setState({ showAllCity: !this.state.showAllCity })}
                        >
                            <img alt="" src={require("src/assets/images/national.png")} className="national" />
                            <div className="city-select-text">城市选择</div>
                            <img
                                alt=""
                                src={require("src/assets/images/arrow-down.png")}
                                className={`arrow-down ${showAllCity && "arrow-down-rotate"}`}
                            />
                        </div>

                        <div className="city-show">
                            {showCity1.map((item, idx) => {
                                return (
                                    <div
                                        className="city-show-item"
                                        key={`showCity1-${idx}`}
                                        onClick={() => {
                                            this.selectCityFn1(item, item.parent)
                                        }}
                                    >
                                        {item.title}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div
                        className="all-city"
                        style={{
                            height: showAllCity ? "400px" : 0,
                            padding: showAllCity ? "0 9px 9px" : 0,
                        }}
                    >
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
                                                    onClick={() => this.selectCityFn1(n, item.title)}
                                                >
                                                    {n.title}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

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

                <Mask visible={this.state.visible4} opacity={0} style={{ "--z-index": "1999" }}>
                    <div className="popup-content-1">
                        <div className="format-title">
                            <span>同城地图</span>
                            <img
                                alt=""
                                src={require("src/assets/images/close.png")}
                                onClick={() => this.setState({ visible4: false })}
                                className="close"
                            />
                        </div>
                        <div className="format-select">
                            {formats.map(item => {
                                return (
                                    <div
                                        className={`format-select-item ${
                                            formatSelect1 === item.key && "format-select-item-active"
                                        }`}
                                        key={`format-${item.key}`}
                                        onClick={() => this.thirdAssembleFormatData(item.key)}
                                    >
                                        {item.title}
                                        <div
                                            className="format-select-item-line"
                                            style={{ opacity: formatSelect1 === item.key ? 1 : 0 }}
                                        ></div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="format-main">
                            {this.state.formatCitys && this.state.formatCitys.length ? (
                                this.state.formatCitys.map((item: any, idx: number) => {
                                    return (
                                        <div
                                            className="format-main-item"
                                            key={`formatCity-${idx}`}
                                            onClick={() => {
                                                this.goThird(item)
                                            }}
                                        >
                                            <div className="format-main-item-name">{item.name}</div>
                                            <div className="format-main-item-address">{item.address}</div>
                                            <div className="go-third-city">
                                                <span className="go-third-city-text">去这里</span>
                                                <img
                                                    alt=""
                                                    src={require("src/assets/images/arrow-right.png")}
                                                    className="arrow-right"
                                                />
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </Mask>

                <Mask visible={this.state.visible2} opacity={0} style={{ "--z-index": "2000" }} />
            </div>
        )
    }
}

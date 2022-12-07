import "./index.scss"
import AMap from "@amap/amap-jsapi-loader"
import { Component, CSSProperties } from "react"
import Popup from "antd-mobile/es/components/popup"
import Mask from "antd-mobile/es/components/mask"
import Toast from "antd-mobile/es/components/toast"
import { adcodes } from "./json"

const zoomsData = [4, 8, 18, 20]

const cityItems = [
    {
        title: "全国",
        view: [{ title: "全国地图", key: "countries" }],
    },
    {
        title: "辽宁省",
        view: [
            { title: "辽宁省", key: "s" },
            { title: "沈阳市", key: "shenyang" },
            { title: "大连市", key: "dalian" },
            { title: "丹东市", key: "dandong" },
            { title: "盘锦市", key: "panjin" },
            { title: "海城市", key: "haicheng" },
            { title: "抚顺市", key: "fushun" },
            { title: "本溪市", key: "benxi" },
            { title: "瓦房店市", key: "wafangdian" },
            { title: "鞍山市", key: "anshan" },
            { title: "大石桥市", key: "dashiqiao" },
            { title: "营口市", key: "yingkou" },
        ],
    },
    {
        title: "黑龙江省",
        view: [
            { title: "黑龙江省", key: "s" },
            { title: "哈尔滨市", key: "haerbin" },
        ],
    },
    {
        title: "北京",
        view: [
            { title: "北京", key: "s" },
            { title: "北京市", key: "beijing" },
        ],
    },
    {
        title: "吉林省",
        view: [
            { title: "吉林省", key: "s" },
            { title: "长春市", key: "changchun" },
            { title: "吉林市", key: "jilin" },
        ],
    },
    {
        title: "河北省",
        view: [
            { title: "河北省", key: "s" },
            { title: "石家庄市", key: "shijiazhuang" },
            { title: "沧州市", key: "cangzhou" },
            { title: "廊坊市", key: "langfang" },
            { title: "唐山市", key: "tangshan" },
            { title: "保定市", key: "baoding" },
        ],
    },
]

const formats = [
    { title: "全部", key: "all" },
    { title: "餐饮", key: "shg" },
    { title: "旅游", key: "lxs" },
    { title: "康养", key: "ky" },
    { title: "药店", key: "yd" },
    { title: "生鲜", key: "sx" },
    { title: "商超", key: "sc" },
    { title: "便利店", key: "bld" },
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
    private disProvinces: any = []
    private selectProvince: any
    private firstMarkerCity: any = []
    private secondMarkerCity: any = []
    private thirdMarkerCity: any = []
    private city = "全国地图"
    private searchStatus = "show"

    state = {
        visible: false,
        visible1: false,
        visible2: true,
        visible3: false,
        visible4: false,

        selectFormat: "all",
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
            plugins: [
                "AMap.DistrictLayer",
                "AMap.CitySearch",
                "AMap.Geolocation",
                "AMap.DistrictSearch",
                "AMap.Geocoder",
            ],
        })

        this.map = new this.mapLoader.Map("container", {
            // mapStyle: 'amap://styles/a19ca5840dc79a390ca7a5601233d296',
            mapStyle: "amap://styles/2481b4a764ad464f4fc2e516478ae481",
            viewMode: "3D",
            zoom: 4,
            center: [116.47609, 39.865086],
            // zooms: [zoomsData[0], zoomsData[3]],
            terrain: true,
            zoomEnable: true,
            rotateEnable: false,
            pitchEnable: true,
            pitch: 0,
            showLabel: true,
            doubleClickZoom: false,
            scrollWheel: false,
            touchZoom: true,
        })

        this.map.setZooms([zoomsData[0], 5])

        this.insertFlag()
        this.mapFn()

        setTimeout(() => {
            this.setState({ visible2: false })
        }, 7500)
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
    insertFlag() {
        adcodes.forEach((item: any, idx: number) => {
            setTimeout(() => {
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
                    `   <div class="flag-animation-text">${item.name}</div>` +
                    "</div>"

                const flagMarker = new this.mapLoader.Marker({
                    position: item.centerQ,
                    content: flagMarkerContent,
                    offset: new this.mapLoader.Pixel(item.pixel?.x || 0, item.pixel?.y || 0),
                    zooms: [4, 5],
                    bubble: true,
                })

                this.firstMarkerCity.push(flagMarker)

                this.map.add(flagMarker)
            }, 1600 * idx)
        })
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
                            // 北京市
                            // 直辖市
                            searchText = info.province
                        } else {
                            // 具体市
                            searchText = info.city
                        }

                        this.city = searchText

                        const data: any = adcodes.filter(
                            x =>
                                x.title ===
                                (info.city === "" ? info.province.substr(0, info.province.length - 1) : info.province)
                        )
                        if (data.length) {
                            this.map.setZooms([18, 20])

                            this.clearAllLayout()
                            this.selectProvince = data[0]

                            const info1 = data[0].city.citys.filter((x: any) => x.name === searchText)
                            this.map.setZoomAndCenter(zoomsData[2], result.position)
                            info1[0].have.forEach((n: any) => {
                                info1[0][n].forEach((n1: any) => {
                                    this.thirdCityAddMarker(n1)
                                })
                            })
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
                geocoder.getAddress([e.lnglat.lng, e.lnglat.lat], (status: any, result: any) => {
                    if (status === "complete" && result.regeocode) {
                        const address = result.regeocode.formattedAddress

                        const center: any = adcodes.filter(x => address.includes(x.name))

                        this.map.setZooms([center[0].city.zoom, 10])

                        // 点击一级区域缩放到二级区域
                        if (center.length) {
                            this.city = center[0].title
                            this.selectProvince = center[0]
                            this.secondCityFillAndAddMarker(center[0])
                        }
                    }
                })
            }
        })

        this.map.on("zoomend", () => {
            if (this.map.getZoom() >= zoomsData[2]) {
                this.map.setPitch(50)
                this.map.setRotation(10)
            }
            if (this.map.getPitch() !== 0 && this.map.getZoom() < zoomsData[2]) {
                this.map.setPitch(0)
                this.map.setRotation(0)
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
                this.map.setZooms([zoomsData[0], 5])

                // 选择全国地图
                this.clearAllLayout()
                this.map.setZoomAndCenter(zoomsData[0], [116.47609, 39.865086])
                this.map.setPitch(0)
                this.map.setRotation(0)
                this.insertFlag()

                setTimeout(() => {
                    this.setState({ visible2: false })
                }, 7500)
            } else {
                const data: any = adcodes.filter(x => x.title === parentTitle)

                if (data.length) {
                    this.selectProvince = data[0]
                    const { city } = data[0]

                    if (params.key === "s") {
                        this.map.setZooms([city.zoom, 10])

                        // 选择省
                        this.secondCityFillAndAddMarker(data[0])
                    } else {
                        this.map.setZooms([18, 20])

                        // 选择市
                        this.clearAllLayout()
                        const nowCity = city.citys.filter((x: any) => x.name === params.title)

                        if (nowCity.length) {
                            this.map.setZoomAndCenter(zoomsData[2], nowCity[0].center)

                            nowCity[0].have.forEach((n: any) => {
                                nowCity[0][n].forEach((n1: any) => {
                                    this.thirdCityAddMarker(n1)
                                })
                            })
                        }
                    }
                }
            }
        })
    }

    // 二级区域填充、打点
    secondCityFillAndAddMarker(params: any) {
        const { city, center } = params

        this.map.setZoomAndCenter(city.zoom, center)
        if (this.map.getZoom() > zoomsData[0] && this.map.getZoom() < zoomsData[2]) {
            this.clearAllLayout()

            if (this.selectProvince) {
                // 给二级区域填充颜色
                this.areaOfFill({
                    adcode: params.code,
                    depth: 1,
                    style: {
                        fill: "rgba(173, 220, 255, 0.6)",
                        city: "#59A2F8",
                    },
                })

                city.citys.forEach((item: any) => {
                    // 展开二级区域时，向各个市打点
                    this.addMarkerToSecond(item[item.have[0]][0].center, item)
                })
            }
        }
    }

    // 给二级区域打marker
    addMarkerToSecond(center: string[], item: any) {
        const { city } = this.selectProvince

        const markerContent =
            "" +
            '<div class="city-marker">' +
            `   <img src=${require(`src/assets/images/formats-position.png`)} alt="" />` +
            `   <div class="city-formats-number">${item.total || 0}</div>` +
            "</div>"

        const marker = new this.mapLoader.Marker({
            content: markerContent,
            position: center,
            offset: new this.mapLoader.Pixel(0, 0),
            zooms: [city.zoom, 10],
            anchor: "bottom-center",
        })

        this.secondMarkerCity.push(marker)

        // 二级marker点击事件
        marker.on("click", () => {
            this.city = item.name
            const arr: string | any[] = []

            item.have.forEach((n: any) => {
                item[n].forEach((n1: any) => {
                    arr.push(n1)
                })
            })

            this.setState({ formatCitys: arr, visible4: true })
        })

        this.map.add(marker)
    }

    // 三级区域打点
    thirdCityAddMarker(item: any) {
        const markerContent =
            "" +
            `<div class="custom-content-marker" style="height: ${item.status === "decorate" ? "122px" : "152px"}">` +
            `   <div class="dialog">
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
            zooms: [zoomsData[2], zoomsData[3]],
            anchor: "bottom-center",
        })

        this.thirdMarkerCity.push(marker)
        this.map.add(marker)
    }

    // 业态点击事件
    formatFn(key: string) {
        if (this.state.selectFormat === key) return

        this.setState({ selectFormat: key }, () => {
            if (key !== "all") {
                const data = this.selectProvince.city.citys[0][key]
                this.setState({ formatCitys: data && data.length ? data : [] })
            } else {
                const nowCity = this.selectProvince.city.citys[0]
                const arr: string | any[] = []

                nowCity.have.forEach((n: any) => {
                    nowCity[n].forEach((n1: any) => {
                        arr.push(n1)
                    })
                })

                this.setState({ formatCitys: arr })
            }
        })
    }

    goThird(item: any) {
        this.map.setZooms([18, 20])

        this.setState({ visible4: false }, () => {
            this.clearAllLayout()
            this.map.setZoomAndCenter(zoomsData[2], item.center)
            this.thirdCityAddMarker(item)
        })
    }

    render() {
        return (
            <div className="container" id="container">
                {this.searchRender()}

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

                <Popup
                    visible={this.state.visible}
                    onMaskClick={() => this.hidePopup()}
                    bodyStyle={{ height: "508px" }}
                    maskStyle={{ background: "transparent" }}
                >
                    <div className="popup-content" style={{ opacity: this.searchStatus === "show" ? 1 : 0 }}>
                        {this.searchRender({
                            position: "absolute",
                            top: 0,
                        })}
                        <img alt="" src={require("src/assets/images/search/operating.png")} className="operating" />
                    </div>
                </Popup>

                <Popup visible={this.state.visible1} bodyStyle={{ height: "100%" }}>
                    <div className="select-city-main">
                        <div className="title">
                            <span>选择城市</span>
                            <span onClick={() => this.setState({ visible1: false })}>X</span>
                        </div>
                        <div className="content">
                            {/* <div className="my-address-main">
                                <div className="my-address-title">我的位置</div>
                                <div className="my-address-content">
                                    <div className="my-address-content-item">
                                        <img alt="" src={require('src/assets/images/position-fill.png')} className="position-fill" />
                                        <span>{this.positionText}</span>
                                    </div>
                                </div>
                            </div> */}
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
                                                        onClick={() => {
                                                            this.selectCityFn(n, item.title)
                                                        }}
                                                        style={{
                                                            color:
                                                                n.title === this.city
                                                                    ? "rgba(26, 131, 228, 1)"
                                                                    : "#000",
                                                            backgroundColor:
                                                                n.title === this.city
                                                                    ? "rgba(26, 131, 228, .1)"
                                                                    : "#f0f0f0",
                                                        }}
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

                <Popup
                    visible={this.state.visible4}
                    onMaskClick={() => this.setState({ visible4: false, formatCitys: [], selectFormat: "all" })}
                    bodyStyle={{ height: "70vh" }}
                    maskStyle={{ background: "transparent" }}
                >
                    <div className="popup-content-1">
                        <div className="format-content">
                            {formats.map((item, idx) => {
                                return (
                                    <div
                                        key={`format-${idx}`}
                                        className="format-item"
                                        style={{
                                            backgroundColor:
                                                this.state.selectFormat === item.key ? "#0076E3" : "#F0F0F0",
                                            color: this.state.selectFormat === item.key ? "#fff" : "#000",
                                        }}
                                        onClick={() => this.formatFn(item.key)}
                                    >
                                        {item.title}
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
                                                    src={require("src/assets/images/navigation.png")}
                                                    className="navigation"
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
                </Popup>

                <Mask visible={this.state.visible2} opacity={0} />
            </div>
        )
    }
}

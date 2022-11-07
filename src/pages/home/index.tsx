import "./index.scss"
import { Component, useState, useRef } from "react"
import * as config from "src/config"
import * as PIXI from "pixi.js"
import { Spine } from "pixi-spine"
import { useNavigate } from "react-router-dom"
import Popup from "antd-mobile/es/components/popup"

const bgWidth = 2658
const bgHeight = 1864
const roomRatio = config.clientHeight() / bgHeight
const speed = 1.5

const builds = [
    {
        img: "shanhaige",
        w: 286,
        h: 251,
        x: 1403,
        y: 1226,
    },
    {
        img: "xuyuanchi",
        w: 211,
        h: 240,
        x: 440,
        y: 205,
    },
    {
        img: "tiananmen",
        w: 302,
        h: 113,
        x: 1216,
        y: 378,
    },
    {
        img: "guangchang",
        w: 471,
        h: 159,
        x: 1161,
        y: 512,
    },
    {
        img: "tribal",
        w: 198,
        h: 236,
        x: 415,
        y: 1247,
    },
]

export default function HomePage(): JSX.Element {
    const navigate = useNavigate()

    const [modal, setModal] = useState<{ visible: boolean; type: string }>({ visible: false, type: "" })

    return (
        <div className="home-page">
            <Home
                showModal={(status: boolean, type: string) => {
                    if (type === "guangchang") {
                        navigate(String(PUBLIC_PATH) + "home/square")
                    } else if (type === "xuyuanchi") {
                        navigate(String(PUBLIC_PATH) + "home/wishing-well")
                    } else if (type === "tribal") {
                        navigate(String(PUBLIC_PATH) + "home/tribal")
                    } else {
                        setModal({ visible: status, type })
                    }
                }}
            />

            <div className="top-render">
                <div className="user-info">
                    <div>
                        <img alt="" src={String(PUBLIC_PATH) + "assets/pixi/me/avatar.png"} className="avatar" />
                        <span className="name">蓝天白云</span>
                        <span className="level">LV.2</span>
                    </div>
                    <div>
                        <span className="steps">
                            今日步数 <i>2333</i>
                        </span>
                        <span className="power">
                            今日体力值 <i>1899</i>
                        </span>
                    </div>
                </div>
                <div className="header-icon">
                    <img alt="" src={String(PUBLIC_PATH) + "assets/pixi/home/icon-1.png"} />
                    <img alt="" src={String(PUBLIC_PATH) + "assets/pixi/home/icon-2.png"} />
                    <img alt="" src={String(PUBLIC_PATH) + "assets/pixi/home/icon-3.png"} />
                </div>
            </div>

            <div className="bottom-render">
                <img
                    alt=""
                    src={String(PUBLIC_PATH) + `assets/pixi/home/icon-4.png`}
                    onClick={() => {
                        navigate(String(PUBLIC_PATH) + "home/map")
                    }}
                    className="go-tourism button"
                />

                <img
                    alt=""
                    src={String(PUBLIC_PATH) + `assets/pixi/home/icon-5.png`}
                    onClick={() => {
                        navigate(String(PUBLIC_PATH) + "home/me")
                    }}
                    className="go-tourism button"
                />
                {/* <div
                    className="go-tourism button"
                    onClick={() => {
                        navigate(String(PUBLIC_PATH) + "home/map")
                    }}
                >
                    <div>去旅行</div>
                </div> */}
                {/* <div
                    className="go-home button"
                    onClick={() => {
                        navigate(String(PUBLIC_PATH) + "home/me")
                    }}
                >
                    <div>回家</div>
                </div> */}
            </div>

            <Popup visible={modal.visible} onMaskClick={() => setModal({ ...modal, visible: false })}>
                <img
                    alt=""
                    src={String(PUBLIC_PATH) + `assets/pixi/home/${modal.type}-modal.png`}
                    className="modal"
                    onClick={() => {
                        if (modal.type === "shanhaige") {
                            setModal({ ...modal, visible: false })
                            navigate(String(PUBLIC_PATH) + "home/building")
                        }
                    }}
                />
                <img
                    className="close-popup"
                    alt=""
                    src={String(PUBLIC_PATH) + `assets/pixi/home/close.png`}
                    onClick={() => setModal({ ...modal, visible: false })}
                />
            </Popup>
        </div>
    )
}
class Home extends Component<any> {
    private dragging = false
    private data: any
    private diff = { x: 0, y: 0 }

    private app: any
    private spineBoy: any
    private bgContainer: any
    private bgTexture5: any
    private resolution = 2

    private oldBgContainerX: any
    private oldBgContainerY: any

    private newBodyY: any
    private newBodyX: any

    private buildContainer: any

    private bgDirection: any = {
        top: false,
        bottom: false,
        left: false,
        right: false,
    }

    private peopleDirection = {
        top: false,
        bottom: false,
        left: false,
        right: false,
    }

    private status = false

    componentDidMount() {
        this.initApp()
    }

    initApp() {
        this.app = new PIXI.Application({
            width: config.clientWidth(),
            height: config.clientHeight(),
            antialias: true, // 抗锯齿
            resolution: this.resolution, // 分辨率
            transparent: false, // 背景透明
            backgroundColor: 0x000000,
        })

        document.getElementById("main")?.appendChild(this.app.view)
        this.app.stop()

        this.bgFn()
        this.loadingBuild()

        this.app.stage.pivot.x = (this.bgTexture5.width - config.clientWidth()) / 2
        this.app.stage.pivot.y = (this.bgTexture5.height - config.clientHeight()) / 2
        this.app.stage.interactive = true
        this.app.stage.sortableChildren = true

        this.loadPeople()
        this.appTicker()

        this.app.start()
    }

    // 背景
    bgFn() {
        this.bgContainer = new PIXI.Container()

        this.bgContainer.interactive = true

        this.bgTexture5Fn()

        this.bgContainer
            .on("pointertap", (event: any) => {
                const screenPoor = config.clientWidth() / 2 - this.bgContainer.width / 2

                this.diff = {
                    x: event.data.global.x - config.clientWidth() / 2,
                    // y: event.data.global.y - config.clientHeight() / 2,
                    y: event.data.global.y - this.spineBoy.y,
                }

                // bg的偏移量
                this.oldBgContainerX = this.bgContainer.x
                this.oldBgContainerY = this.bgContainer.y

                // console.log(this.bgContainer.x, screenPoor)

                if (event.data.global.x > config.clientWidth() / 2) {
                    // 地图动-向右
                    this.bgDirection.right = true
                    this.bgDirection.left = false
                    this.spineBoy.skew.set(0, 0)
                } else if (event.data.global.x < config.clientWidth() / 2) {
                    // 地图动-向左
                    this.bgDirection.right = false
                    this.bgDirection.left = true
                    this.spineBoy.skew.set(0, 3.2)
                }

                // if (this.bgContainer.x > screenPoor) {

                // } else {
                //     // this.bgDirection.right = false
                //     // this.bgDirection.left = false

                //     // if (event.data.global.x >= this.newBodyX) {
                //     //     this.peopleDirection.right = true
                //     //     this.peopleDirection.left = false
                //     //     this.spineBoy.skew.set(0, 0)
                //     // }

                //     // if (event.data.global.x <= this.newBodyX) {
                //     //     this.peopleDirection.right = false
                //     //     this.peopleDirection.left = true
                //     //     this.spineBoy.skew.set(0, 3.2)
                //     // }
                // }

                // if (event.data.global.x >= this.newBodyX) {
                //     console.log(11)
                //     this.peopleDirection.right = true
                //     this.peopleDirection.left = false
                // } else if (event.data.global.x < this.newBodyX) {
                //     console.log(111)
                //     this.peopleDirection.right = false
                //     this.peopleDirection.left = true
                // }

                // 判断点击的点是否在最外围范围内

                // 地图动
                // if (event.data.global.y - config.clientHeight() / 2 > 0) {
                //     this.bgType.top = true
                //     this.bgType.bottom = false
                // }
                // 地图动
                // if (event.data.global.y - config.clientHeight() / 2 < 0) {
                //     this.bgType.top = false
                //     this.bgType.bottom = true
                // }

                // 人动-垂直-点击了人物当前位置上边的点
                if (event.data.global.y - this.spineBoy.y <= 0) {
                    this.peopleDirection.top = true
                    this.peopleDirection.bottom = false
                } else {
                    // 人动-垂直-点击了人物当前位置下边的点
                    this.peopleDirection.top = false
                    this.peopleDirection.bottom = true
                }

                this.newBodyY = event.data.global.y
                this.newBodyX = event.data.global.x

                this.dragging = true
                this.data = event.data
            })
            .on("pointerup", () => {
                this.dragging = false
                this.data = null
            })
            .on("pointerupoutside", () => {
                this.dragging = false
                this.data = null
            })
            .on("pointermove", (event: any) => {
                if (this.dragging) {
                    // console.log(11)
                }
            })

        this.app.stage.addChild(this.bgContainer)
    }

    bgTexture5Fn() {
        this.bgTexture5 = new PIXI.Sprite(PIXI.Texture.from(String(PUBLIC_PATH) + "assets/pixi/home/bg.jpg"))

        this.bgTexture5.position.set(0, 0)
        this.bgTexture5.width =
            Math.ceil(bgWidth * roomRatio) % 2 === 0
                ? Math.ceil(bgWidth * roomRatio)
                : Math.ceil(bgWidth * roomRatio) + 1
        this.bgTexture5.height = config.clientHeight()
        this.bgTexture5.zIndex = 1

        this.bgContainer.addChild(this.bgTexture5)
    }

    // 加载人物
    async loadPeople() {
        this.app.loader
            .add("spineboy", String(PUBLIC_PATH) + "assets/pixi/spineboy.json")
            .load((loader: any, res: any) => {
                this.spineBoy = new Spine(res.spineboy.spineData)

                const spineBodyCoordinates = {
                    x: this.bgTexture5.width / 2,
                    y: this.bgTexture5.height / 2,
                }

                this.spineBoy.x = spineBodyCoordinates.x
                this.spineBoy.y = spineBodyCoordinates.y + 90 * roomRatio
                this.spineBoy.zIndex = 2
                this.spineBoy.width = 27
                this.spineBoy.height = 63

                this.spineBoy.state.setAnimation(0, "walk", true)
                this.spineBoy.interactive = true

                this.app.stage.addChild(this.spineBoy)
            })
    }

    // 加载建筑
    loadingBuild() {
        this.buildContainer = new PIXI.Container()

        this.buildContainer.position.set(0, 0)
        this.buildContainer.width =
            Math.ceil(bgWidth * roomRatio) % 2 === 0
                ? Math.ceil(bgWidth * roomRatio)
                : Math.ceil(bgWidth * roomRatio) + 1
        this.buildContainer.height = config.clientHeight()
        this.buildContainer.zIndex = 3

        this.app.stage.addChild(this.buildContainer)

        builds.forEach(item => {
            const commonBuild = new PIXI.Sprite(
                PIXI.Texture.from(String(PUBLIC_PATH) + `assets/pixi/building/beijing/${item.img}.png?t=${Date.now()}`)
            )
            commonBuild.width = item.w * roomRatio
            commonBuild.height = item.h * roomRatio
            commonBuild.x = item.x * roomRatio
            commonBuild.y = item.y * roomRatio

            commonBuild.interactive = true

            commonBuild.on("pointertap", () => {
                if (item.img === "shanhaige" || item.img === "tiananmen") {
                    this.props.showModal(true, item.img)
                } else {
                    this.props.showModal(false, item.img)
                }
            })

            this.buildContainer.addChild(commonBuild)
        })
    }

    // 舞台ticker事件
    appTicker() {
        this.app.ticker.add((delta: any) => {
            if (this.diff.x) {
                const screenPoor = config.clientWidth() / 2 - this.bgContainer.width / 2
                const bgContainerXPoor = this.oldBgContainerX - this.bgContainer.x

                // 地图动-横向->向右
                if (this.bgDirection.right && bgContainerXPoor <= this.diff.x && this.bgContainer.x > screenPoor) {
                    this.bgContainer.x -= speed
                    this.buildContainer.x -= speed
                }

                // 地图动-横向->向左
                if (this.bgDirection.left && bgContainerXPoor >= this.diff.x && this.bgContainer.x < -screenPoor) {
                    this.bgContainer.x += speed
                    this.buildContainer.x += speed
                }

                // 人走-向上走
                if (
                    this.peopleDirection.top &&
                    this.spineBoy.y >= this.spineBoy.height &&
                    this.spineBoy.y > this.newBodyY
                ) {
                    this.spineBoy.y -= speed
                }

                // 人走-向下走
                if (this.peopleDirection.bottom && this.spineBoy.y <= this.newBodyY) {
                    this.spineBoy.y += speed
                }
            }
        })
    }

    render() {
        return <div className="main" id="main"></div>
    }
}

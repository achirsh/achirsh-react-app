import "./index.scss"
import { useEffect, Component } from "react"
import * as config from "src/config"
import * as PIXI from "pixi.js"
import { Spine } from "pixi-spine"
import { useNavigate } from "react-router-dom"

// 1680 1976 2120 1606

const bgWidth = 5316
const bgHeight = 3728
const roomRatio = config.clientHeight() / bgHeight

export default function HomePage(): JSX.Element {
    const navigate = useNavigate()

    return (
        <div className="home-page">
            <Home />

            <div className="bottom-render">
                <div
                    className="go-tourism button"
                    onClick={() => {
                        navigate(String(PUBLIC_PATH) + "home/map")
                    }}
                >
                    <div>去旅行</div>
                </div>
                <div className="go-home button">
                    <div>回家</div>
                </div>
            </div>
        </div>
    )
}
class Home extends Component {
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

    state = {
        map: [],
    }

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

                console.log(this.bgContainer.x, screenPoor)

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
        this.bgTexture5 = new PIXI.Sprite(PIXI.Texture.from(String(PUBLIC_PATH) + "assets/pixi/bg/bg2.jpg"))

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
    loadPeople() {
        this.app.loader
            .add("spineboy", String(PUBLIC_PATH) + "assets/pixi/spineboy.json")
            .add("shanhaige", String(PUBLIC_PATH) + "assets/pixi/building/beijing/shanhaige.png")
            .load((loader: any, res: any) => {
                this.spineBoy = new Spine(res.spineboy.spineData)

                const spineBodyCoordinates = {
                    x: this.bgTexture5.width / 2,
                    y: this.bgTexture5.height / 2,
                }

                this.spineBoy.x = spineBodyCoordinates.x
                this.spineBoy.y = spineBodyCoordinates.y
                this.spineBoy.zIndex = 2
                this.spineBoy.width = 29
                this.spineBoy.height = 68

                console.log("人物长宽", this.spineBoy.width, this.spineBoy.height)
                console.log("地图宽度-高度", this.bgTexture5.width, this.bgTexture5.height)

                const col = this.bgTexture5.width / this.spineBoy.width
                const row = this.bgTexture5.height / this.spineBoy.height

                console.log("col-row", col, row)

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

        const shanhaige = new PIXI.Sprite(
            PIXI.Texture.from(String(PUBLIC_PATH) + "assets/pixi/building/beijing/shanhaige.png")
        )
        shanhaige.width = 572 * roomRatio
        shanhaige.height = 502 * roomRatio
        shanhaige.x = 2806 * roomRatio
        shanhaige.y = 2453 * roomRatio

        console.log("山海阁位置", shanhaige.x, shanhaige.y)
        console.log("山海阁宽高", shanhaige.width, shanhaige.height)

        const mapArray = Array.from(new Array(Math.trunc(this.bgTexture5.width)).keys())
        this.setState({ map: mapArray })

        shanhaige.interactive = true

        shanhaige.on("pointertap", () => {
            // alert(111)
        })

        this.buildContainer.addChild(shanhaige)
    }

    // 舞台ticker事件
    appTicker() {
        this.app.ticker.add((delta: any) => {
            if (this.diff.x) {
                const screenPoor = config.clientWidth() / 2 - this.bgContainer.width / 2
                const bgContainerXPoor = this.oldBgContainerX - this.bgContainer.x

                // 地图动-横向->向右
                if (
                    this.bgDirection.right &&
                    bgContainerXPoor <= this.diff.x
                    // && this.bgContainer.x > screenPoor
                ) {
                    this.bgContainer.x -= 1
                    this.buildContainer.x -= 1

                    // console.log(this.bgContainer.x)
                }

                // 地图动-横向->向左
                if (
                    this.bgDirection.left &&
                    bgContainerXPoor >= this.diff.x
                    // && this.bgContainer.x < -screenPoor
                ) {
                    this.bgContainer.x += 1
                    this.buildContainer.x += 1
                }

                // if (Math.abs(this.bgContainer.x) === Math.abs(screenPoor)) {
                //     if (this.peopleDirection.right && this.spineBoy.x <= this.newBodyX + (this.bgContainer.width - config.clientWidth()) / 2) {
                //         this.spineBoy.x += 1
                //     }
                //     if (this.peopleDirection.left && this.spineBoy.x >= this.newBodyX + Math.abs((this.bgContainer.width - config.clientWidth()) / 2)) {
                //         this.spineBoy.x -= 1
                //     }
                // }

                // 人走-横向->向右
                // if (
                //     this.peopleDirection.right &&
                //     this.bgContainer.x < (config.clientWidth() - this.bgContainer.width) / 2 &&
                //     this.spineBoy.x < this.newBodyX + (this.bgContainer.width - config.clientWidth()) / 2
                // ) {
                //     this.spineBoy.x += 1
                // }

                // 人走-横向->向左
                // if (
                //     this.peopleDirection.left &&
                //     this.bgContainer.x > Math.abs((config.clientWidth() - this.bgContainer.width) / 2) &&
                //     this.spineBoy.x > this.newBodyX + Math.abs((this.bgContainer.width - config.clientWidth()) / 2)
                // ) {
                //     this.spineBoy.x -= 1
                // }

                // 地图动-垂直->向上
                // if (this.bgType.top && Math.abs(this.bgContainer.y - this.oldBgContainerY) < this.diff.y) {
                //     // this.bgContainer.y -= 1
                //     // this.spineBoy.y += 1
                // }
                // 地图动-垂直->向下
                // if (this.bgType.bottom && Math.abs(this.oldBgContainerY - this.bgContainer.y) < Math.abs(this.diff.y)) {
                //     this.bgContainer.y += 1
                // }

                // 人走-向上走
                if (
                    this.peopleDirection.top &&
                    this.spineBoy.y >= this.spineBoy.height &&
                    this.spineBoy.y > this.newBodyY
                ) {
                    this.spineBoy.y -= 1
                }

                // 人走-向下走
                if (this.peopleDirection.bottom && this.spineBoy.y <= this.newBodyY) {
                    this.spineBoy.y += 1
                }

                // 检测人物和山海阁是否碰撞
            }
        })
    }

    render() {
        return <div className="main" id="main"></div>
    }
}

import "./index.scss"
import { useEffect, Component } from "react"
import * as config from "src/config"
import * as PIXI from "pixi.js"
import { Spine } from "pixi-spine"

// 1680 1976 2120 1606
export default class Home extends Component {
    private dragging = false
    private data: any
    private diff = { x: 0, y: 0 }

    private oldBgContainerX: any
    private oldBgContainerY: any

    private newBodyY: any

    private bgDirection: any = {
        top: false,
        bottom: false,
        left: false,
        right: false,
    }

    private peopleDirection = {
        top: false,
        bottom: false,
    }

    private app: any
    private spineBoy: any
    private bgContainer: any
    private bgTexture5: any

    private resolution = 2

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

        this.app.stage.addChild(this.bgContainer)

        this.app.stage.pivot.x = (this.bgTexture5.width - config.clientWidth()) / 2
        this.app.stage.pivot.y = (this.bgTexture5.height - config.clientHeight()) / 2
        this.app.stage.interactive = true
        this.app.stage.buttonMode = true

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
                this.diff = {
                    x: event.data.global.x - config.clientWidth() / 2,
                    // y: event.data.global.y - config.clientHeight() / 2,
                    y: event.data.global.y - this.spineBoy.y,
                }

                // bg的偏移量
                this.oldBgContainerX = this.bgContainer.x
                this.oldBgContainerY = this.bgContainer.y

                this.newBodyY = event.data.global.y

                // 地图动-向右
                if (event.data.global.x - config.clientWidth() / 2 > 0) {
                    this.bgDirection.right = true
                    this.bgDirection.left = false
                    this.spineBoy.skew.set(0, 0)
                }
                // 地图动-向左
                if (event.data.global.x - config.clientWidth() / 2 < 0) {
                    this.bgDirection.right = false
                    this.bgDirection.left = true
                    this.spineBoy.skew.set(0, 3.2)
                }

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
                if (event.data.global.y - this.spineBoy.y < 0) {
                    this.peopleDirection.top = true
                    this.peopleDirection.bottom = false
                }
                // 人动-垂直-点击了人物当前位置下边的点
                else if (event.data.global.y - this.spineBoy.y > 0) {
                    this.peopleDirection.top = false
                    this.peopleDirection.bottom = true
                } else {
                    this.peopleDirection.top = false
                    this.peopleDirection.bottom = false
                }

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
    }

    bgTexture5Fn() {
        this.bgTexture5 = new PIXI.Sprite(PIXI.Texture.from(String(PUBLIC_PATH) + "assets/pixi/bg/bg.jpg"))

        this.bgTexture5.position.set(0, 0)

        const bgWidth = 5304
        const bgHeight = 3330

        this.bgTexture5.width = (bgWidth * config.clientHeight()) / bgHeight
        this.bgTexture5.height = config.clientHeight()

        this.bgContainer.addChild(this.bgTexture5)
    }

    // 加载人物
    loadPeople() {
        this.app.loader
            .add("spineboy", String(PUBLIC_PATH) + "assets/pixi/spineboy.json")
            .load((loader: any, res: any) => {
                this.spineBoy = new Spine(res.spineboy.spineData)

                const spineBodyCoordinates = {
                    x: this.bgTexture5.width / 2,
                    y: this.bgTexture5.height / 2,
                }

                this.spineBoy.x = spineBodyCoordinates.x
                this.spineBoy.y = spineBodyCoordinates.y
                this.spineBoy.scale.set(0.2)

                this.spineBoy.state.setAnimation(0, "walk", true)
                this.app.stage.addChild(this.spineBoy)
            })
    }

    // 舞台ticker事件
    appTicker() {
        this.app.ticker.add((delta: any) => {
            if (this.diff.x) {
                // 地图动-横向->向右
                if (
                    this.bgDirection.right &&
                    this.oldBgContainerX - this.bgContainer.x <= this.diff.x &&
                    this.bgContainer.width / 2 + this.bgContainer.x >= config.clientWidth() / 2
                ) {
                    this.bgContainer.x -= 1
                }
                // 地图动-横向->向左
                if (
                    this.bgDirection.left &&
                    this.oldBgContainerX - this.bgContainer.x >= this.diff.x &&
                    this.bgContainer.width / 2 - this.bgContainer.x >= config.clientWidth() / 2
                ) {
                    this.bgContainer.x += 1
                }
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
            }
        })
    }

    render() {
        return <div className="main" id="main"></div>
    }
}

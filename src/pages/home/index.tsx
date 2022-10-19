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

    private bgType: any = {
        top: false,
        bottom: false,
        left: false,
        right: false,
    }

    private app: any
    private spineBoy: any
    private bgContainer: any
    private bgTexture5: any

    componentDidMount() {
        this.initApp()
    }

    initApp() {
        this.app = new PIXI.Application({
            width: config.clientWidth(),
            height: config.clientHeight(),
            antialias: true, // 抗锯齿
            resolution: 2, // 分辨率
            transparent: false, // 背景透明
            backgroundColor: 0xd7dd7d,
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
                    y: event.data.global.y - config.clientHeight() / 2,
                }

                // bg的偏移量
                this.oldBgContainerX = this.bgContainer.x
                this.oldBgContainerY = this.bgContainer.y

                if (event.data.global.x - config.clientWidth() / 2 > 0) {
                    this.bgType.right = true
                    this.bgType.left = false
                    this.spineBoy.skew.set(0, 0)
                }

                if (event.data.global.x - config.clientWidth() / 2 < 0) {
                    this.bgType.right = false
                    this.bgType.left = true
                    this.spineBoy.skew.set(0, 3.2)
                }

                if (event.data.global.y - config.clientHeight() / 2 > 0) {
                    this.bgType.top = true
                    this.bgType.bottom = false
                }

                if (event.data.global.y - config.clientHeight() / 2 < 0) {
                    this.bgType.top = false
                    this.bgType.bottom = true
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
        this.bgTexture5 = new PIXI.Sprite(PIXI.Texture.from(String(PUBLIC_PATH) + "pixi/bg/bg.jpg"))

        this.bgTexture5.position.set(0, 0)

        this.bgTexture5.width = 5304 / 4
        this.bgTexture5.height = 3330 / 4

        this.bgContainer.addChild(this.bgTexture5)
    }

    // 加载人物
    loadPeople() {
        this.app.loader.add("spineboy", String(PUBLIC_PATH) + "pixi/spineboy.json").load((loader: any, res: any) => {
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
            if (this.diff.x && this.bgType !== "") {
                // 横向走
                if (this.bgType.right && Math.abs(this.bgContainer.x - this.oldBgContainerX) < this.diff.x) {
                    this.bgContainer.x -= 1
                }

                if (this.bgType.left && Math.abs(this.oldBgContainerX - this.bgContainer.x) < Math.abs(this.diff.x)) {
                    this.bgContainer.x += 1
                }

                // 垂直走
                if (this.bgType.top && Math.abs(this.bgContainer.y - this.oldBgContainerY) < this.diff.y) {
                    this.bgContainer.y -= 1
                }

                if (this.bgType.bottom && Math.abs(this.oldBgContainerY - this.bgContainer.y) < Math.abs(this.diff.y)) {
                    this.bgContainer.y += 1
                }
            }
        })
    }

    render() {
        return <div className="main" id="main"></div>
    }
}

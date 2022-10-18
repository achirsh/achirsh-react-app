import "./index.css"
import { useEffect, Component } from "react"
import * as config from "src/config"
import * as PIXI from "pixi.js"
import { Spine } from "pixi-spine"
import * as api from "src/api"

// 1680 1976 2120 1606
export default class Home extends Component {
    private dragging = false
    private data: any
    private diff = { x: 0, y: 0 }
    private x = 500
    private y = 500

    private oldBgContainerX: any
    private oldBgContainerY: any

    private bgType: any = {
        top: false,
        bottom: false,
        left: false,
        right: false,
    }

    private spineBoy: any

    componentDidMount() {
        this.init1()
    }

    init1() {
        const app = new PIXI.Application({
            width: 1801, //window.screen.availWidth * 2,    // 渲染视图宽度
            height: 1110, // window.screen.availHeight * 2,  // 渲染视图高度
            antialias: true, // 抗锯齿
            resolution: 1, // 分辨率
            transparent: false, // 背景透明
        })

        document.getElementById("main")?.appendChild(app.view)

        const bgContainer = new PIXI.Container()

        // const bgContaineScale = 0.5
        // bgContainer.scale.set(bgContaineScale)

        app.stage.addChild(bgContainer)

        bgContainer.interactive = true

        // const bgTexture1 = new PIXI.Sprite(PIXI.Texture.from('assets/bg/left-top.jpg'))
        // const bgTexture2 = new PIXI.Sprite(PIXI.Texture.from('assets/bg/left-bottom.jpg'))
        // const bgTexture3 = new PIXI.Sprite(PIXI.Texture.from('assets/bg/right-top.jpg'))
        // const bgTexture4 = new PIXI.Sprite(PIXI.Texture.from('assets/bg/right-bottom.jpg'))

        const bgTexture5 = new PIXI.Sprite(PIXI.Texture.from("assets/bg/bg.png"))

        // bgTexture1.position.set(0, 0)

        // bgTexture1.width = 1680 / 2
        // bgTexture1.height = 1976 / 2

        // bgTexture2.position.set(0, 1976 / 2)

        // bgTexture2.width = 1680 / 2
        // bgTexture2.height = 1606 / 2

        // bgTexture3.position.set(1680 / 2, 0)

        // bgTexture3.width = 2120 / 2
        // bgTexture3.height = 1976 / 2

        // bgTexture4.position.set(1680 / 2, 1976 /2)

        // bgTexture4.width = 2120 / 2
        // bgTexture4.height = 1606 / 2

        bgTexture5.position.set(0, 0)

        bgTexture5.width = 1801
        bgTexture5.height = 1110

        // bgContainer.addChild(bgTexture1)
        // bgContainer.addChild(bgTexture2)
        // bgContainer.addChild(bgTexture3)
        // bgContainer.addChild(bgTexture4)

        bgContainer.addChild(bgTexture5)

        // 设置bgContainer容器原点
        // bgContainer.pivot.x = app.screen.width / 2
        // bgContainer.pivot.y = app.screen.width / 2

        // app.stage.pivot.x = 1801 / 2
        // app.stage.pivot.y = 1110 / 2

        app.loader.add("spineboy", "assets/spineboy.json").load((loader: any, res: any) => {
            this.spineBoy = new Spine(res.spineboy.spineData)
            this.spineBoy.x = this.x
            this.spineBoy.y = this.y
            this.spineBoy.scale.set(0.3)

            this.spineBoy.state.setAnimation(0, "walk", true)
            app.stage.addChild(this.spineBoy)

            bgContainer
                .on("pointertap", event => {
                    this.diff = { x: event.data.global.x - this.x, y: event.data.global.y - this.y }

                    // bg的偏移量
                    this.oldBgContainerX = bgContainer.x
                    this.oldBgContainerY = bgContainer.y

                    if (event.data.global.x - this.x > 0) {
                        // 向左平移
                        this.bgType.right = true
                        this.bgType.left = false

                        this.spineBoy.skew.set(0, 0)
                    }

                    if (event.data.global.x - this.x < 0) {
                        // 向右平移
                        this.bgType.right = false
                        this.bgType.left = true

                        this.spineBoy.skew.set(0, 3.2)
                    }

                    if (event.data.global.y - this.y > 0) {
                        // 向左平移
                        this.bgType.top = true
                        this.bgType.bottom = false
                    }

                    if (event.data.global.y - this.y < 0) {
                        // 向右平移
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
                .on("pointermove", event => {
                    if (this.dragging) {
                        // console.log(11)
                    }
                })
        })

        app.stage.interactive = true
        app.stage.buttonMode = true

        app.ticker.add(delta => {
            if (this.diff.x && this.bgType !== "") {
                // 横向走
                if (this.bgType.right && Math.abs(bgContainer.x - this.oldBgContainerX) < this.diff.x) {
                    bgContainer.x -= 0.5
                }

                if (this.bgType.left && Math.abs(this.oldBgContainerX - bgContainer.x) < Math.abs(this.diff.x)) {
                    bgContainer.x += 0.5
                }

                // 垂直走
                if (this.bgType.top && Math.abs(bgContainer.y - this.oldBgContainerY) < this.diff.y) {
                    bgContainer.y -= 0.5
                }

                if (this.bgType.bottom && Math.abs(this.oldBgContainerY - bgContainer.y) < Math.abs(this.diff.y)) {
                    bgContainer.y += 0.5
                }
            }
        })
    }

    render() {
        return <div className="main" id="main"></div>
    }
}

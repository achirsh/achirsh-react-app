import "./index.css"
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

    private spineBoy: any

    componentDidMount() {
        this.init1()
    }

    init1() {
        const app = new PIXI.Application({
            width: 1768,
            height: 1110,
            antialias: true, // 抗锯齿
            resolution: 1, // 分辨率
            transparent: false, // 背景透明
            backgroundColor: 0xd7dd7d,
        })

        document.getElementById("main")?.appendChild(app.view)

        app.stop()

        const bgContainer = new PIXI.Container()

        // const bgContaineScale = 0.5
        // bgContainer.scale.set(bgContaineScale)

        app.stage.addChild(bgContainer)

        bgContainer.interactive = true

        // const bgTexture1 = new PIXI.Sprite(PIXI.Texture.from('assets/bg/left-top.jpg'))
        // const bgTexture2 = new PIXI.Sprite(PIXI.Texture.from('assets/bg/left-bottom.jpg'))
        // const bgTexture3 = new PIXI.Sprite(PIXI.Texture.from('assets/bg/right-top.jpg'))
        // const bgTexture4 = new PIXI.Sprite(PIXI.Texture.from('assets/bg/right-bottom.jpg'))

        const bgTexture5 = new PIXI.Sprite(PIXI.Texture.from(String(PUBLIC_PATH) + "pixi/bg/bg.png"))

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

        bgTexture5.width = app.screen.width
        bgTexture5.height = app.screen.height

        // bgContainer.addChild(bgTexture1)
        // bgContainer.addChild(bgTexture2)
        // bgContainer.addChild(bgTexture3)
        // bgContainer.addChild(bgTexture4)

        bgContainer.addChild(bgTexture5)

        app.stage.pivot.x = (app.screen.width - window.screen.availWidth) / 2
        app.stage.pivot.y = (app.screen.height - window.screen.availHeight) / 2

        app.loader.add("spineboy", String(PUBLIC_PATH) + "pixi/spineboy.json").load((loader: any, res: any) => {
            this.spineBoy = new Spine(res.spineboy.spineData)

            const spineBodyCoordinates = {
                x: app.screen.width / 2,
                y: app.screen.height / 2,
            }

            this.spineBoy.x = spineBodyCoordinates.x
            this.spineBoy.y = spineBodyCoordinates.y
            this.spineBoy.scale.set(0.3)

            this.spineBoy.state.setAnimation(0, "walk", true)
            app.stage.addChild(this.spineBoy)

            bgContainer
                .on("pointertap", event => {
                    this.diff = {
                        x: event.data.global.x - window.screen.availWidth / 2,
                        y: event.data.global.y - window.screen.availHeight / 2,
                    }

                    // bg的偏移量
                    this.oldBgContainerX = bgContainer.x
                    this.oldBgContainerY = bgContainer.y

                    if (event.data.global.x - window.screen.availWidth / 2 > 0) {
                        this.bgType.right = true
                        this.bgType.left = false
                        this.spineBoy.skew.set(0, 0)
                    }

                    if (event.data.global.x - window.screen.availWidth / 2 < 0) {
                        this.bgType.right = false
                        this.bgType.left = true
                        this.spineBoy.skew.set(0, 3.2)
                    }

                    if (event.data.global.y - window.screen.availHeight / 2 > 0) {
                        this.bgType.top = true
                        this.bgType.bottom = false
                    }

                    if (event.data.global.y - window.screen.availHeight / 2 < 0) {
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
                    bgContainer.x -= 0.8
                }

                if (this.bgType.left && Math.abs(this.oldBgContainerX - bgContainer.x) < Math.abs(this.diff.x)) {
                    bgContainer.x += 0.8
                }

                // 垂直走
                if (this.bgType.top && Math.abs(bgContainer.y - this.oldBgContainerY) < this.diff.y) {
                    bgContainer.y -= 0.8
                }

                if (this.bgType.bottom && Math.abs(this.oldBgContainerY - bgContainer.y) < Math.abs(this.diff.y)) {
                    bgContainer.y += 0.8
                }
            }
        })

        app.start()
    }

    render() {
        return <div className="main" id="main"></div>
    }
}

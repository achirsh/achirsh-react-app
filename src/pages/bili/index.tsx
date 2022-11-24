import { Component } from "react"
import * as PIXI from "pixi.js"
import * as config from "src/config"
import "./style.scss"

const divisor = 2
const width = (1680 + 2120) / divisor
const height = (1976 + 1606) / divisor

const bgList = [
    { img: "left-top", w: 1680, h: 1976, x: 0, y: 0 },
    { img: "right-top", w: 2120, h: 1976, x: 1680, y: 0 },
    { img: "left-bottom", w: 1680, h: 1606, x: 0, y: 1976 },
    { img: "right-bottom", w: 2120, h: 1606, x: 1680, y: 1976 },
]

export default class Bili extends Component {
    private diff = { x: 0, y: 0 }
    private container: any
    private containerDirection = {}
    private oldContainer = { x: 0, y: 0 }

    componentDidMount(): void {
        const app: any = new PIXI.Application({
            width: config.clientWidth(),
            height: config.clientHeight(),
            antialias: true, // 抗锯齿
            resolution: 2, // 分辨率
            backgroundAlpha: 1,
        })

        document.getElementById("bili-main")?.appendChild(app.view)

        this.container = new PIXI.Container()
        this.container.interactive = true
        app.stage.addChild(this.container)

        // 添加背景
        for (let i = 0; i < 4; i++) {
            const bg = PIXI.Sprite.from(String(PUBLIC_PATH) + `assets/bilibili/bg/${bgList[i].img}.jpg`)
            bg.width = bgList[i].w / divisor
            bg.height = bgList[i].h / divisor
            bg.position.set(bgList[i].x / divisor, bgList[i].y / divisor)
            this.container.addChild(bg)
        }

        this.container.on("pointerdown", (event: any) => {
            console.log("event.data.screen", event.data.screen, event.data.global)

            // this.diff = {
            //     x: event.data.global.x - config.clientWidth() / 2,
            //     y: event.data.global.y - config.clientHeight() / 2,
            // }

            // this.oldContainer = {
            //     x: this.container.x,
            //     y: this.container.y,
            // }

            // if (event.data.global.x > config.clientWidth() / 2) {
            //     this.containerDirection = { right: true }
            // } else if (event.data.global.x < config.clientWidth() / 2) {
            //     this.containerDirection = { left: true }
            // }
        })

        // PIXI.Assets.load(String(PUBLIC_PATH) + "assets/bilibili/cat.json").then(spritesheet => {
        //     const cat_down = []
        //     const cat_left = []
        //     const cat_right = []
        //     const cat_up = []

        //     for (let i = 0; i <= 8; i++) {
        //         cat_down.push(PIXI.Texture.from(`cat_down_${i}.png`))
        //         cat_left.push(PIXI.Texture.from(`cat_left_${i}.png`))
        //         cat_right.push(PIXI.Texture.from(`cat_right_${i}.png`))
        //         cat_up.push(PIXI.Texture.from(`cat_up_${i}.png`))
        //     }

        //     dealAnim(cat_down, true)

        //     dealAnim(cat_left, false)

        //     dealAnim(cat_right, false)

        //     dealAnim(cat_up, false)

        //     function dealAnim(element: any, show: boolean) {
        //         const anim: any = new PIXI.AnimatedSprite(element)

        //         anim.x = width / 2
        //         anim.y = height / 2
        //         anim.animationSpeed = 0.1
        //         anim.width = 145 / divisor
        //         anim.height = 145 / divisor
        //         anim.visible = show
        //         app.stage.addChild(anim)
        //     }
        // })

        app.stage.pivot.x = (width - config.clientWidth()) / 2
        app.stage.pivot.y = (height - config.clientHeight()) / 2

        app.ticker.add(() => {
            if (this.diff.x) {
                // const bgContainerXPoor = this.oldContainer.x - this.container.x
                // if (this.containerDirection.right && bgContainerXPoor < this.diff.x) {
                //     this.container.x -= 1
                // }
                // if (this.containerDirection.left && bgContainerXPoor > this.diff.x) {
                //     this.container.x += 1
                // }
            }
        })
    }

    render() {
        return <div className="bili-main" id="bili-main"></div>
    }
}

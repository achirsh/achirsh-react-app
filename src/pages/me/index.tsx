import "./index.scss"
import { useEffect, Component } from "react"
import * as config from "src/config"
import * as PIXI from "pixi.js"
import { Spine } from "pixi-spine"
import { useNavigate } from "react-router-dom"

const bgWidth = 1060
const bgHeight = 1334
const resolution = 2
const roomRatio = config.clientHeight() / bgHeight

export default function MyHome(): JSX.Element {
    const navigate = useNavigate()

    return (
        <div className="my-home">
            <Home />

            <div className="top-render">
                <div className="avatar-render">
                    <div className="back" onClick={() => navigate(-1)}>
                        <img alt="" src={String(PUBLIC_PATH) + "assets/pixi/me/back.png"} />
                    </div>
                    <img alt="" src={String(PUBLIC_PATH) + "assets/pixi/me/avatar.png"} className="avatar" />
                    <div className="avatar-info">
                        <div>
                            <span className="name">山海猫星人</span>
                            <span className="level">LV.2</span>
                            <span className="xunzhang">勋章：9枚</span>
                        </div>
                        <div>
                            <span>今日步数：328</span>
                            <span>今日体力值：328</span>
                        </div>
                    </div>
                </div>
                <img alt="" src={String(PUBLIC_PATH) + "assets/pixi/me/icon-5.png"} className="icon-5" />
            </div>

            <div className="bottom-render">
                <img alt="" src={String(PUBLIC_PATH) + "assets/pixi/me/icon-4.png"} />
                <img alt="" src={String(PUBLIC_PATH) + "assets/pixi/me/icon-1.png"} />
                <img alt="" src={String(PUBLIC_PATH) + "assets/pixi/me/icon-2.png"} />
                <img alt="" src={String(PUBLIC_PATH) + "assets/pixi/me/icon-3.png"} />
            </div>
        </div>
    )
}

class Home extends Component {
    private dragging = false
    private diff: any

    componentDidMount() {
        this.initApp()
    }

    initApp() {
        const app = new PIXI.Application({
            width: config.clientWidth(),
            height: config.clientHeight(),
            antialias: true, // 抗锯齿
            resolution: resolution, // 分辨率
            transparent: false, // 背景透明
            backgroundColor: 0x000000,
        })

        app.stage.sortableChildren = true

        document.getElementById("my-home-main")?.appendChild(app.view)

        const myHomeImg = new PIXI.Sprite(PIXI.Texture.from(String(PUBLIC_PATH) + "assets/pixi/me/my-home-bg.png"))

        myHomeImg.height = config.clientHeight()
        myHomeImg.width =
            Math.ceil(bgWidth * roomRatio) % 2 === 0
                ? Math.ceil(bgWidth * roomRatio)
                : Math.ceil(bgWidth * roomRatio) + 1

        myHomeImg.position.x = -(myHomeImg.width - config.clientWidth()) / 2
        myHomeImg.position.y = (myHomeImg.height - config.clientHeight()) / 2

        myHomeImg.interactive = true
        myHomeImg.zIndex = 1

        myHomeImg
            .on("touchstart", (e: any) => {
                this.dragging = true

                this.diff = {
                    x: e.data.global.x - myHomeImg.x,
                    y: e.data.global.y - myHomeImg.y,
                }
            })
            .on("touchendoutside", () => {
                this.dragging = false
            })
            .on("touchend", () => {
                this.dragging = false
            })
            .on("touchmove", (e: any) => {
                if (this.dragging) {
                    const newPosition = e.data.getLocalPosition(myHomeImg.parent)
                    myHomeImg.x = newPosition.x - this.diff.x
                    myHomeImg.y = newPosition.y - this.diff.y

                    if (myHomeImg.x >= 0) {
                        myHomeImg.x = 0
                    }

                    if (myHomeImg.y >= 0) {
                        myHomeImg.y = 0
                    }

                    if (myHomeImg.x <= config.clientWidth() - myHomeImg.width) {
                        myHomeImg.x = config.clientWidth() - myHomeImg.width
                    }

                    if (myHomeImg.y <= config.clientHeight() - myHomeImg.height) {
                        myHomeImg.y = config.clientHeight() - myHomeImg.height
                    }
                }
            })

        app.stage.addChild(myHomeImg)
    }

    render() {
        return <div className="my-home-main" id="my-home-main"></div>
    }
}

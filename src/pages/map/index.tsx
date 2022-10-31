import "./index.scss"
import { useEffect, Component } from "react"
import * as config from "src/config"
import * as PIXI from "pixi.js"
import { Spine } from "pixi-spine"
import { useNavigate } from "react-router-dom"

// 1680 1976 2120 1606

const bgWidth = 4096
const bgHeight = 3165
const resolution = 2
const roomRatio = (config.clientHeight() * 1.5) / bgHeight

export default function ChinaMap(): JSX.Element {
    const navigate = useNavigate()

    return (
        <div className="china-map">
            <Home back={() => navigate(-1)} />

            <div
                className="back-button"
                onClick={() => {
                    navigate(-1)
                }}
            >
                返回
            </div>
        </div>
    )
}

class Home extends Component<any> {
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

        document.getElementById("map-main")?.appendChild(app.view)

        const container = new PIXI.Container()
        container.interactive = true
        container.sortableChildren = true

        app.stage.addChild(container)

        const mapImg = new PIXI.Sprite(PIXI.Texture.from(String(PUBLIC_PATH) + "assets/pixi/map/map.png"))

        mapImg.height = config.clientHeight() * 1.5
        mapImg.width =
            Math.ceil(bgWidth * roomRatio) % 2 === 0
                ? Math.ceil(bgWidth * roomRatio)
                : Math.ceil(bgWidth * roomRatio) + 1

        mapImg.zIndex = 1

        const diffX = mapImg.width - config.clientWidth()
        const diffY = config.clientHeight() / 3

        container.position.x = -diffX + config.clientWidth() / 4
        container.position.y = -diffY

        container.addChild(mapImg)

        const graphics = new PIXI.Graphics()
        graphics.beginFill(0x000000, 0.01)
        graphics.drawRect(2896 * roomRatio, 1009 * roomRatio, 160 * roomRatio, 217 * roomRatio)
        graphics.endFill()
        graphics.zIndex = 2

        graphics.interactive = true

        graphics.on("touchstart", () => {
            this.props.back()
        })

        container.addChild(graphics)

        container
            .on("touchstart", (e: any) => {
                this.dragging = true

                this.diff = {
                    x: e.data.global.x - container.x,
                    y: e.data.global.y - container.y,
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
                    const newPosition = e.data.getLocalPosition(container.parent)
                    container.x = newPosition.x - this.diff.x
                    container.y = newPosition.y - this.diff.y

                    if (container.x >= 0) {
                        container.x = 0
                    }

                    if (container.y >= 0) {
                        container.y = 0
                    }

                    if (container.x <= config.clientWidth() - container.width) {
                        container.x = config.clientWidth() - container.width
                    }

                    if (container.y <= config.clientHeight() - container.height) {
                        container.y = config.clientHeight() - container.height
                    }
                }
            })
    }

    render() {
        return <div className="map-main" id="map-main"></div>
    }
}

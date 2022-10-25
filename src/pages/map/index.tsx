import "./index.scss"
import { useEffect, Component } from "react"
import * as config from "src/config"
import * as PIXI from "pixi.js"
import { Spine } from "pixi-spine"
import { useNavigate } from "react-router-dom"

// 1680 1976 2120 1606

const bgWidth = 8192
const bgHeight = 6330
const resolution = 2
const roomRatio = (config.clientHeight() * 1.5) / bgHeight

export default function ChinaMap(): JSX.Element {
    const navigate = useNavigate()

    return (
        <div className="china-map">
            <Home />

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

        document.getElementById("map-main")?.appendChild(app.view)

        const mapImg = new PIXI.Sprite(PIXI.Texture.from(String(PUBLIC_PATH) + "assets/pixi/map/map.png"))

        mapImg.height = config.clientHeight() * 1.5
        mapImg.width =
            Math.ceil(bgWidth * roomRatio) % 2 === 0
                ? Math.ceil(bgWidth * roomRatio)
                : Math.ceil(bgWidth * roomRatio) + 1

        mapImg.position.x = -(mapImg.width - config.clientWidth()) + config.clientWidth() / 4
        mapImg.position.y = -(config.clientHeight() / 3)

        mapImg.interactive = true
        mapImg.zIndex = 1

        mapImg
            .on("touchstart", (e: any) => {
                this.dragging = true

                this.diff = {
                    x: e.data.global.x - mapImg.x,
                    y: e.data.global.y - mapImg.y,
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
                    const newPosition = e.data.getLocalPosition(mapImg.parent)
                    mapImg.x = newPosition.x - this.diff.x
                    mapImg.y = newPosition.y - this.diff.y

                    if (mapImg.x >= 0) {
                        mapImg.x = 0
                    }

                    if (mapImg.y >= 0) {
                        mapImg.y = 0
                    }

                    if (mapImg.x <= config.clientWidth() - mapImg.width) {
                        mapImg.x = config.clientWidth() - mapImg.width
                    }

                    if (mapImg.y <= config.clientHeight() - mapImg.height) {
                        mapImg.y = config.clientHeight() - mapImg.height
                    }
                }
            })

        app.stage.addChild(mapImg)
    }

    render() {
        return <div className="map-main" id="map-main"></div>
    }
}

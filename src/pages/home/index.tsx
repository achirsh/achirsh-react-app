import "./index.css"
import { useEffect } from "react"
import * as config from "src/config"
import * as PIXI from "pixi.js"
import { Spine } from "pixi-spine"
import * as api from "src/api"

import json from "./spinebody.json"
import json1 from "./gebulin.json"
import json2 from "./pixie.json"

import iP4_BGtile from "./iP4_BGtile.jpeg"
import iP4_ground from "./iP4_ground.png"

const images = [
    {
        img: require("src/assets/images/bili/bg/left-top.jpg"),
        width: 1680,
        height: 1976,
    },
    {
        img: require("src/assets/images/bili/bg/left-bottom.jpg"),
        width: 1680,
        height: 1606,
    },
    {
        img: require("src/assets/images/bili/bg/right-top.jpg"),
        width: 2120,
        height: 1976,
    },
    {
        img: require("src/assets/images/bili/bg/right-bottom.jpg"),
        width: 2120,
        height: 1606,
    },
]

export default function Home(): JSX.Element {
    useEffect(() => {
        // init()
        init1()
    }, [])

    const init = () => {
        const c: any = document.getElementById("myCanvas")
        const ctx = c.getContext("2d")
        const dpr = window.devicePixelRatio

        c.width = (1680 + 2120) * dpr
        c.height = (1976 + 1606) * dpr
        c.style.width = (1680 + 2120) / 3 + "px"
        c.style.height = (1976 + 1606) / 3 + "px"

        drawingBg(0, ctx, dpr)
    }

    const init1 = () => {
        const app = new PIXI.Application()
        document.body.appendChild(app.view)

        // load spine data
        app.loader.add("goblins", "goblins.json").load(onAssetsLoaded)

        app.stage.interactive = true
        app.stage.buttonMode = true

        function onAssetsLoaded(loader: any, res: any) {
            const goblin = new Spine(res.goblins.spineData)

            // set current skin
            goblin.skeleton.setSkinByName("goblin")
            goblin.skeleton.setSlotsToSetupPose()

            // set the position
            goblin.x = 400
            goblin.y = 600

            goblin.scale.set(1.5)

            // play animation
            goblin.state.setAnimation(0, "walk", true)

            app.stage.addChild(goblin)

            app.stage.on("pointertap", () => {
                // change current skin
                const currentSkinName = goblin.skeleton.skin.name
                const newSkinName = currentSkinName === "goblin" ? "goblingirl" : "goblin"
                goblin.skeleton.setSkinByName(newSkinName)
                goblin.skeleton.setSlotsToSetupPose()
            })
        }
    }

    // 绘制背景
    const drawingBg = (n: number, ctx: any, dpr: number) => {
        const len = images.length

        if (n < len) {
            const img = new Image()
            img.src = images[n].img
            img.onload = () => {
                const imgWidth = images[n].width * dpr
                const imgHeight = images[n].height * dpr

                if (n === 0) {
                    ctx.drawImage(img, 0, 0, imgWidth, imgHeight)
                } else if (n === 1) {
                    ctx.drawImage(img, 0, 1976 * dpr, imgWidth, imgHeight)
                } else if (n === 2) {
                    ctx.drawImage(img, 1680 * dpr, 0, imgWidth, imgHeight)
                } else if (n === 3) {
                    ctx.drawImage(img, 1680 * dpr, 1976 * dpr, imgWidth, imgHeight)
                }

                drawingBg(n + 1, ctx, dpr)
            }
        }
    }

    return (
        <div className="main" id="main">
            {/* <canvas id="myCanvas"  className='myCanvas'>
            您的浏览器不支持 HTML5 canvas 标签。
        </canvas> */}
        </div>
    )
}

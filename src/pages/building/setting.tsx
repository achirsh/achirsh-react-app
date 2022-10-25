import "./index.scss"
import { useEffect, Component } from "react"
import * as config from "src/config"
import * as PIXI from "pixi.js"
import { Spine } from "pixi-spine"
import { useNavigate } from "react-router-dom"

const roomRatio = config.clientWidth() / 1500

export default function Building(): JSX.Element {
    const navigate = useNavigate()

    return (
        <div className="building-setting-main">
            <img alt="" src={String(PUBLIC_PATH) + "assets/pixi/building/setting.png"} className="setting" />

            <div
                className="back"
                onClick={() => {
                    navigate(-1)
                }}
            ></div>
        </div>
    )
}

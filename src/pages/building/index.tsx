import "./index.scss"
import { useEffect, Component, useState } from "react"
import * as config from "src/config"
import * as PIXI from "pixi.js"
import { Spine } from "pixi-spine"
import { useNavigate } from "react-router-dom"
import Popup from "antd-mobile/es/components/popup"

const roomRatio = config.clientWidth() / 1500

export default function Building(): JSX.Element {
    const navigate = useNavigate()
    const [visible, setVisible] = useState<boolean>(false)

    return (
        <div className="building-main">
            <img
                alt=""
                src={String(PUBLIC_PATH) + "assets/pixi/building/business_type.png"}
                className="business_type"
            />
            <div
                className="back"
                onClick={() => {
                    navigate(-1)
                }}
            ></div>

            <div
                className="collar"
                style={{
                    top: `${320 * roomRatio}px`,
                    right: `${160 * roomRatio}px`,
                }}
                onClick={() => setVisible(true)}
            ></div>

            <div
                className="setting"
                style={{
                    top: `${40 * roomRatio}px`,
                    right: `${180 * roomRatio}px`,
                }}
                onClick={() => {
                    navigate(String(PUBLIC_PATH) + "home/building/setting")
                }}
            ></div>

            <div
                className="go-three"
                style={{
                    top: `${2130 * roomRatio}px`,
                    right: `${100 * roomRatio}px`,
                    height: `${180 * roomRatio}px`,
                }}
                onClick={() => {
                    navigate(String(PUBLIC_PATH) + "home/three")
                    // window.open("https://threejs.org/examples/webgl_panorama_cube.html")
                }}
            ></div>

            <Popup
                visible={visible}
                onMaskClick={() => {
                    setVisible(false)
                }}
            >
                <img alt="" src={String(PUBLIC_PATH) + "assets/pixi/building/popup.png"} className="popup" />
                <div className="close" onClick={() => setVisible(false)}></div>
            </Popup>
        </div>
    )
}

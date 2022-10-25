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
                    top: `${1020 * roomRatio}px`,
                    right: `${120 * roomRatio}px`,
                }}
                onClick={() => setVisible(true)}
            ></div>

            <div
                className="setting"
                style={{
                    top: `${200 * roomRatio}px`,
                    right: `${70 * roomRatio}px`,
                }}
                onClick={() => {
                    navigate(String(PUBLIC_PATH) + "home/building/setting")
                }}
            ></div>

            <Popup
                visible={visible}
                onMaskClick={() => {
                    setVisible(false)
                }}
            >
                <img alt="" src={String(PUBLIC_PATH) + "assets/pixi/building/popup.png"} className="popup" />
            </Popup>
        </div>
    )
}

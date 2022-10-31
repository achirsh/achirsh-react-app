import "./index.scss"
import { useNavigate } from "react-router-dom"
import { useState, useEffect, CSSProperties } from "react"
import * as config from "src/config"

const roomRatio = config.clientWidth() / 1500

const btn1style = {
    top: `${144 * roomRatio}px`,
    height: `${381 * roomRatio}px`,
}

const btn2style = {
    top: `${527 * roomRatio}px`,
    height: `${318 * roomRatio}px`,
}

const btn3style = {
    top: `${1146 * roomRatio}px`,
    height: `${282 * roomRatio}px`,
}

export default function SquareRelease(): JSX.Element {
    const navigate = useNavigate()

    const [first, setFirst] = useState<string>("dynamic")

    useEffect(() => {
        console.log()
    }, [])

    const btn1 = () => {
        setFirst("dynamic")
    }

    const btn2 = () => {
        setFirst("chat")
    }

    const btn3 = () => {
        setFirst("setting")
    }

    return (
        <div className="tribal-main">
            <div
                className="dynamic-main common-main"
                style={{
                    zIndex: first === "dynamic" ? 2 : 1,
                    opacity: first === "dynamic" ? 1 : 0,
                }}
            >
                <img alt="" src={String(PUBLIC_PATH) + "assets/pixi/tribal/dynamic.png"} className="common-img" />
                <div className="button-2" onClick={btn2} style={{ ...btn2style }}></div>
                <div className="button-3" onClick={btn3} style={{ ...btn3style }}></div>
            </div>

            <div
                className="chat-main common-main"
                style={{
                    zIndex: first === "chat" ? 2 : 1,
                    opacity: first === "chat" ? 1 : 0,
                }}
            >
                <img alt="" src={String(PUBLIC_PATH) + "assets/pixi/tribal/chat.png"} className="common-img" />
                <div className="button-1" onClick={btn1} style={{ ...btn1style }}></div>
                <div className="button-3" onClick={btn3} style={{ ...btn3style }}></div>

                <div
                    className="go-chat"
                    style={{
                        height: `${roomRatio * 900}px`,
                        top: `${roomRatio * 580}px`,
                        right: 0,
                    }}
                    onClick={() => {
                        navigate(String(PUBLIC_PATH) + "home/tribal/chat")
                    }}
                ></div>
            </div>

            <div
                className="setting-main common-main"
                style={{
                    zIndex: first === "setting" ? 2 : 1,
                    opacity: first === "setting" ? 1 : 0,
                }}
            >
                <img alt="" src={String(PUBLIC_PATH) + "assets/pixi/tribal/setting.jpeg"} className="common-img" />
                <div className="button-1" onClick={btn1} style={{ ...btn1style }}></div>
                <div className="button-2" onClick={btn2} style={{ ...btn2style }}></div>
                {first === "setting" && (
                    <img className="icon-1" src={String(PUBLIC_PATH) + "assets/pixi/tribal/icon-1.png"} alt="" />
                )}
            </div>

            <div
                className="back"
                onClick={() => {
                    navigate(-1)
                }}
            ></div>
        </div>
    )
}

import "./index.scss"
import { useNavigate } from "react-router-dom"

export default function Square(): JSX.Element {
    const navigate = useNavigate()

    return (
        <div className="square-main">
            <img alt="" src={String(PUBLIC_PATH) + "assets/pixi/square/index.jpg"} className="square" />

            <div
                className="back"
                onClick={() => {
                    navigate(-1)
                }}
            ></div>

            <img
                alt=""
                className="release"
                onClick={() => {
                    navigate(String(PUBLIC_PATH) + "home/square/release")
                }}
                src={String(PUBLIC_PATH) + "assets/pixi/square/release.png"}
            />
        </div>
    )
}

import "./index.scss"
import { useNavigate } from "react-router-dom"

export default function Square(): JSX.Element {
    const navigate = useNavigate()

    return (
        <div className="wishing-well-main">
            <img alt="" src={String(PUBLIC_PATH) + "assets/pixi/wishing-well.png"} className="wishing-well" />

            <div
                className="back"
                onClick={() => {
                    navigate(-1)
                }}
            ></div>

            <img alt="" src={String(PUBLIC_PATH) + "assets/pixi/wish-button.png"} className="wish-button" />
        </div>
    )
}

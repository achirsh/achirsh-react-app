import "./index.scss"
import { useNavigate } from "react-router-dom"

export default function SquareRelease(): JSX.Element {
    const navigate = useNavigate()

    return (
        <div className="square-main">
            <img alt="" src={String(PUBLIC_PATH) + "assets/pixi/square/release-page.png"} className="square" />

            <div
                className="back"
                onClick={() => {
                    navigate(-1)
                }}
            ></div>
        </div>
    )
}

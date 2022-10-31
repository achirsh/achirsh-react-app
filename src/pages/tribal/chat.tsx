import "./index.scss"
import { useNavigate } from "react-router-dom"

export default function SquareRelease(): JSX.Element {
    const navigate = useNavigate()

    return (
        <div
            className="tribal-main"
            style={{
                overflow: "auto",
            }}
        >
            <img alt="" src={String(PUBLIC_PATH) + "assets/pixi/tribal/circle.png"} className="tribal" />

            <div
                className="back"
                onClick={() => {
                    navigate(-1)
                }}
            ></div>
        </div>
    )
}

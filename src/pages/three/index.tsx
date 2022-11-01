import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

// const url = "https://threejs.org/examples/webgl_panorama_cube.html"
const url = "https://manors.sit.shanhai.team/static/three/#/"

export default function ComplaintsPage(): JSX.Element {
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <iframe
                style={{
                    width: "100%",
                    height: "100%",
                    overflow: "visible",
                    border: "none",
                }}
                src={url}
            />
        </div>
    )
}

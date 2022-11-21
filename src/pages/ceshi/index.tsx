import { Component } from "react"
import * as PIXI from "pixi.js"
import * as config from "src/config"
import "./index.scss"

class Projector extends PIXI.DisplayObject {
    private content: any
    private originalTransform: any
    private boundary: any
    private worldTransform: any

    constructor() {
        super()

        this.content = new PIXI.Container()
        this.originalTransform = new PIXI.Matrix()

        this.boundary = new PIXI.EventBoundary(this.content)
        this.boundary.copyMouseData = (from, to) => {
            PIXI.EventBoundary.prototype.copyMouseData.call(this.boundary, from, to)

            this.worldTransform.applyInverse(to.global, to.global)

            to.target = this.boundary.hitTest(to.global.x, to.global.y)
        }

        ;["pointerdown", "pointerup", "pointermove", "pointerover", "pointerout", "wheel"].forEach(event => {
            this.addEventListener(event, e => this.boundary.mapEvent(e))
        })

        this.interactive = true
    }

    calculateBounds() {
        const contentBounds = this.content.getBounds()

        this._bounds.addFrameMatrix(
            this.worldTransform,
            contentBounds.x,
            contentBounds.y,
            contentBounds.width,
            contentBounds.height
        )
    }

    containsPoint(point) {
        return !!this.boundary.hitTest(point.x, point.y)
    }

    render(renderer) {
        renderer.batch.flush()

        const projectionSystem = renderer.projection
        const renderTextureSystem = renderer.renderTexture

        projectionSystem.transform = projectionSystem.transform || new PIXI.Matrix()
        projectionSystem.transform.copyTo(this.originalTransform)
        projectionSystem.transform.append(this.worldTransform)
        projectionSystem.update(null, null, 1, !renderTextureSystem.current)

        this.content.render(renderer)

        renderer.batch.flush()

        projectionSystem.transform.copyFrom(this.originalTransform)

        projectionSystem.update(null, null, 1, !renderTextureSystem.current)
    }

    updateTransform() {
        super.updateTransform()

        this.content.enableTempParent()
        this.content.updateTransform()
        this.content.disableTempParent(null)
    }
}

export default class Ceshi extends Component {
    componentDidMount(): void {
        this.init()
    }

    init() {
        const app = new PIXI.Application({
            antialias: true,
            background: "#1099bb",
        })

        document.getElementById("bili-main")?.appendChild(app.view)

        const projector = app.stage
    }

    render() {
        return <div className="bili-main" id="bili-main"></div>
    }
}

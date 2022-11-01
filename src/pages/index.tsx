import "./index.css"
import * as config from "src/config"
import loadable from "@loadable/component"
import { useLocation, Routes, Route, useNavigationType } from "react-router-dom"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { cloneElement, useMemo, useState, useEffect } from "react"

const CommonPage = loadable((props: any) => import(`../pages/${props.page}`), {
    cacheKey: (props: any) => props.page,
})

const DEFAULT_SCENE_CONFIG = { enter: "forward", exit: "back" }

export default function PageIndex(): JSX.Element {
    const location = useLocation()
    const navigationType = useNavigationType()
    const [oldLocation, setOldLocation] = useState<any>(null)

    useEffect(() => {
        setOldLocation(location)
    }, [location])

    const getSceneConfig = (location: any) => {
        const pathname = location.pathname.split("?")[0] // 防止？参数影响匹配

        const matchedRoute: any = config.routes.find((config: any) => {
            return new RegExp(`^${String(PUBLIC_PATH)}${config.page}$`).test(pathname)
        })
        return (matchedRoute && matchedRoute.sceneConfig) || DEFAULT_SCENE_CONFIG
    }

    const getClassNames = useMemo(() => {
        if (navigationType === "PUSH") {
            return getSceneConfig(location).enter
        } else if (navigationType === "POP" && oldLocation) {
            return getSceneConfig(oldLocation).exit
        } else if (navigationType === "REPLACE") {
            // 淡入淡出
            return getSceneConfig(location).enter
        }
        return ""
    }, [navigationType, location, oldLocation])

    return (
        <TransitionGroup
            className="router-wrapper"
            childFactory={child => cloneElement(child, { classNames: getClassNames })}
        >
            <CSSTransition timeout={400} key={location.pathname}>
                <Routes location={location}>
                    <Route path={String(PUBLIC_PATH)}>
                        {config.routes.map(item => {
                            return (
                                <Route
                                    path={item.url || item.page}
                                    key={`route-${item.page}`}
                                    element={<CommonPage page={item.page} />}
                                />
                            )
                        })}
                        <Route path="*" element={<div>404</div>} />
                    </Route>
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    )
}

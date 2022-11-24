import "./index.css"
import * as config from "src/config"
import loadable from "@loadable/component"
import { useLocation, Routes, Route } from "react-router-dom"

const CommonPage = loadable((props: any) => import(`../pages/${props.page}`), {
    cacheKey: (props: any) => props.page,
})

export default function PageIndex(): JSX.Element {
    const location = useLocation()

    return (
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
    )
}

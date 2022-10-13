import * as config from "src/config"
import loadable from "@loadable/component"
import { useLocation, Routes, Route, useNavigationType } from "react-router-dom"

const CommonPage = loadable((props: { page: string }) => import(`../pages/${props.page}`), {
    cacheKey: props => props.page,
})

export default function PageIndex(): JSX.Element {
    const location = useLocation()

    return (
        <Routes location={location}>
            <Route path={"/"}>
                {config.routes.map(item => {
                    return (
                        <Route path={item.page} key={`route-${item.page}`} element={<CommonPage page={item.page} />} />
                    )
                })}
                <Route path="*" element={<div>404</div>} />
            </Route>
        </Routes>
    )
}

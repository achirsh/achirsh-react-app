import "./root.scss"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import Index from "./pages"
import { Provider } from "react-redux"
import store from "src/redux/store"
import { AliveScope } from "react-activation"

const rootElement: any = document.getElementById("root")

const root = createRoot(rootElement)

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <AliveScope>
                <Index />
            </AliveScope>
        </BrowserRouter>
    </Provider>
)

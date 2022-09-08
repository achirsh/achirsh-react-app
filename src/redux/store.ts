import { configureStore } from "@reduxjs/toolkit"
import init from "./reducers/init"

const store = configureStore({
    reducer: {
        init
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
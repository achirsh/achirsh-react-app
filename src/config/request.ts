import axios from "axios"
import type { AxiosRequestConfig } from "axios"

export const requestIns = axios.create()

requestIns.defaults.timeout = 360000
requestIns.defaults.withCredentials = true

requestIns.interceptors.request.use(async (config: AxiosRequestConfig | any) => {
    const token = window.localStorage.getItem("static-web-token")
    if (token && token !== "" && config.url !== "/platform/oauth/token") {
        config.headers["Authorization"] = `Bearer ${token}`
    }

    return config

    return config
})

requestIns.interceptors.response.use(
    response => {
        if (response.status >= 400) {
            return Promise.reject(response.data)
        }

        return response
    },
    async error => {
        const {
            response: { status, data },
        } = error

        return Promise.reject(data)
    }
)

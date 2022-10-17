import * as config from "src/config"

const {
    requestIns: { get },
} = config

export async function geJson() {
    const response = (
        await get(`https://shsk-shverse-sit.s3.cn-north-1.amazonaws.com.cn/topic/files/0521600f86000000.json`)
    ).data

    return response
}

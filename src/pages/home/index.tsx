import "./index.scss"
import AMap from "@amap/amap-jsapi-loader"
import { Component, CSSProperties } from "react"
import Popup from "antd-mobile/es/components/popup"
import Mask from "antd-mobile/es/components/mask"

const zoomsData = [4, 8, 18]

// normal decorate not-up

const adcodes = [
    {
        name: "黑龙江",
        title: "黑龙江省",
        code: "230000",
        center: [127.701579, 46.013537],
        centerQ: [127.701579, 46.013537],
        pixel: { x: -20, y: -80 },
        province: "#000",
        depth: 0,
        zooms: [zoomsData[0], zoomsData[0]],
        city: {
            zoom: 5.3,
            provincial: "哈尔滨",
            number: {
                shg: 1,
                lxs: 6,
            },
            哈尔滨: {
                center: [126.53505, 45.802981],
                shg: [
                    {
                        name: "哈尔滨店",
                        center: [126.622703, 45.761447],
                        address: "哈尔滨市道里区抚顺街26号",
                        status: "normal",
                        fire: 100,
                    },
                ],
                lxs: [
                    {
                        name: "福瑞国旅哈尔滨分公司会展营业部",
                        center: [126.70863, 45.75739],
                        address: "黑龙江省哈尔滨市南岗区泰海花园小区16栋门市 黄河路115-5号",
                        status: "normal",
                        fire: 0,
                    },
                    {
                        name: "大连福慧国际旅行社有限公司哈尔滨分公司",
                        center: [126.582436, 45.733995],
                        address: "黑龙江省哈尔滨市道里区工农大街1-9号",
                        status: "normal",
                        fire: 50,
                    },
                    {
                        name: "大连福慧国际旅行社有限公司哈尔滨分公司珠江路营业部",
                        center: [126.687639, 45.737867],
                        address: "黑龙江省哈尔滨市香坊区嵩山路珠江路交叉口嵩山路027号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连福慧国际旅行社有限公司哈尔滨分公司抚顺街营业部",
                        center: [126.621998, 45.761091],
                        address: "黑龙江省哈尔滨市道里区抚顺街35号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "福瑞国旅哈尔滨分公司建国街营业部",
                        center: [126.600217, 45.751468],
                        address: "黑龙江省哈尔滨市道里区建国北四道街103号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "哈尔滨福瑞国际旅行社有限责任公司",
                        center: [126.66707, 45.771135],
                        address: "黑龙江省哈尔滨市南岗区花园街10号",
                        status: "normal",
                        fire: 100,
                    },
                ],
            },
        },
    },
    {
        name: "吉林",
        title: "吉林省",
        code: "220000",
        center: [125.916489, 43.883454],
        centerQ: [125.916489, 43.883454],
        pixel: { x: -20, y: -60 },
        province: "#000",
        depth: 0,
        zooms: [zoomsData[0], zoomsData[0]],
        city: {
            zoom: 5.7,
            provincial: "长春",
            number: {
                shg: 2,
                lxs: 17,
            },
            长春: {
                center: [125.323643, 43.816996],
                shg: [
                    {
                        name: "长春店",
                        center: [125.348023, 43.841022],
                        address: "长春市南关区繁荣路与东岭南街交汇处",
                        status: "normal",
                        fire: 100,
                    },
                ],
                lxs: [
                    {
                        name: "山海慧大药房",
                        center: [125.217687, 43.884086],
                        address: "长春市绿园区景阳大路1783号",
                        status: "normal",
                        fire: 0,
                    },
                    {
                        name: "福慧国旅",
                        center: [125.283183, 43.893683],
                        address: "长春市绿园区辽阳街526号",
                        status: "normal",
                        fire: 50,
                    },
                    {
                        name: "福慧国旅",
                        center: [125.360358, 43.898873],
                        address: "长春市二道区东莱南街601号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "福慧国旅",
                        center: [125.371357, 43.884766],
                        address: "二道区荣光路与和顺街交汇长江花园",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "福慧国旅",
                        center: [125.219161, 43.859038],
                        address: "绿园区支农大街与飞跃路交汇博众新城2期23栋105门市",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "福慧国旅",
                        center: [125.37078, 43.923064],
                        address: "太和东街与同康路交汇香水湾1期门市",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "福慧国旅",
                        center: [125.288199, 43.860616],
                        address: "朝阳区长安路387号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "福慧国旅",
                        center: [125.339926, 43.841856],
                        address: "亚太大街与净水路交汇，东南阳光小区1号楼北门",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "福慧国旅",
                        center: [125.325465, 43.935468],
                        address: "北人民大街与庆丰路交汇地铁名典B区",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连山海居家养老服务有限公司长春分公司",
                        center: [125.343326, 43.838561],
                        address: "南关区繁锦路与荣锦街交汇，虹馆领尚居北门门市",
                        status: "normal",
                        fire: 100,
                    },
                ],
                // ky: [
                //     {
                //         name: '长春洛城生活会馆',
                //         center: [],
                //         address: '',
                //         status: 'decorate'
                //     },
                // ]
            },
            吉林: {
                center: [126.549719, 43.838132],
                shg: [
                    {
                        name: "吉林店",
                        center: [126.540427, 43.837751],
                        address: "吉林市船营区北京路永吉小区163号楼",
                        status: "normal",
                        fire: 100,
                    },
                ],
                lxs: [
                    {
                        name: "福慧国旅吉林长春路营业部",
                        center: [126.519296, 43.827121],
                        address: "吉林省吉林市西城首府28号楼1层12号",
                        status: "normal",
                        fire: 0,
                    },
                    {
                        name: "福慧国旅吉林泰山路营业部",
                        center: [126.560487, 43.815481],
                        address: "吉林省吉林市丰满区泰山路烽火C区H2号楼4号网点",
                        status: "normal",
                        fire: 50,
                    },
                    {
                        name: "福慧国旅吉林宜山路营业部",
                        center: [126.573615, 43.819207],
                        address: "吉林省吉林市丰满区宜山路11号楼7号网点",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "福慧国旅吉林嫩江街营业部",
                        center: [126.586822, 43.848758],
                        address: "吉林省吉林市昌邑区嫩江街胜昌小区3号楼1层1号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "福慧国旅吉林辽宁路营业部",
                        center: [126.579365, 43.85437],
                        address: "吉林省吉林市昌邑区格林印象b2号楼4号网点",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "福慧国旅吉林农林街营业部",
                        center: [126.526952, 43.81637],
                        address: "吉林省吉林市船营区农林街鸿博锦绣花园51号楼1011号网点",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "福慧国旅吉林通江街营业部",
                        center: [126.575401, 43.876097],
                        address: "吉林省吉林市通江街 家逸生活小区二号楼六号网点",
                        status: "normal",
                        fire: 100,
                    },
                ],
            },
        },
    },
    {
        name: "辽宁",
        title: "辽宁省",
        code: "210000",
        center: [122.39047, 41.76365],
        centerQ: [122.39047, 41.76365],
        pixel: { x: -40, y: -70 },
        province: "#000",
        depth: 0,
        zooms: [zoomsData[0], zoomsData[0]],
        city: {
            zoom: 6.3,
            provincial: "沈阳",
            number: {
                shg: 4,
                lxs: 44,
                ky: 11,
                sx: 8,
                bld: 3,
                sc: 1,
                yd: 12,
            },
            沈阳: {
                center: [123.464675, 41.677576],
                shg: [
                    {
                        name: "沈阳店",
                        center: [123.389986, 41.7993],
                        address: "沈阳市铁西区兴工北街41号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "沈阳店",
                        center: [123.384304, 41.790434],
                        address: "沈阳市铁西区兴工北街121号",
                        status: "decorate",
                        fire: 100,
                    },
                ],
                lxs: [
                    {
                        name: "大连福慧国际旅行社有限公司沈阳分公司",
                        center: [123.384635, 41.791681],
                        address: "沈阳市铁西区兴工北街124号（7门）",
                        status: "normal",
                        fire: 0,
                    },
                    {
                        name: "大连福慧国际旅行社有限公司沈阳鸭绿江街营业部",
                        center: [123.461259, 41.839485],
                        address: "沈阳市皇姑区鸭绿江东街6-23号（12门、13门）",
                        status: "normal",
                        fire: 50,
                    },
                    {
                        name: "大连福慧国际旅行社有限公司沈阳滂江街营业部",
                        center: [123.484164, 41.791191],
                        address: "沈阳市大东区滂江街185甲1号（3-4轴）",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连福慧国际旅行社有限公司沈阳南顺城路营业部",
                        center: [123.461347, 41.792693],
                        address: "沈阳市沈河区南顺城路83号1-23轴",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连福慧国际旅行社有限公司沈阳银卡路营业部",
                        center: [123.462903, 41.731985],
                        address: "沈阳市浑南区银卡路13号（9门）",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连福慧国际旅行社有限公司沈阳保工南街营业部",
                        center: [123.343323, 41.781231],
                        address: "沈阳市铁西区保工南街127号（2门）",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连福慧国际旅行社有限公司汪河路营业部",
                        center: [123.361023, 41.756998],
                        address: "沈阳市于洪区汪河路33号（7门）",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "沈阳逸清国际旅行社有限公司",
                        center: [123.296623, 41.79159],
                        address: "沈阳市于洪区黄海路57-2号（5门）",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "沈阳逸清国际旅行社有限公司北固山路营业部",
                        center: [123.404612, 41.863567],
                        address: "沈阳市于洪区北固山路16-13号（3门）",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "沈阳逸清国际旅行社有限公司沈洲路营业部",
                        center: [123.440088, 41.792514],
                        address: "沈阳市沈河区沈洲路181号5-7轴",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "沈阳逸清国际旅行社有限公司桦山路营业部",
                        center: [123.395282, 41.821802],
                        address: "沈阳市皇姑区华山路107号（3门）",
                        status: "normal",
                        fire: 100,
                    },
                ],
                ky: [
                    {
                        name: "山海福慧健康生活馆",
                        center: [123.36006, 41.806319],
                        address: "沈阳市铁西区保工北街52号3门山海福慧健康生活馆",
                        status: "normal",
                        fire: 100,
                    },
                ],
                sx: [
                    {
                        name: "巨惠生鲜",
                        center: [123.38202, 41.791248],
                        address: "辽宁省沈阳市铁西区兴工北街124号",
                        status: "normal",
                        fire: 100,
                    },
                ],
            },
            大连: {
                center: [121.614786, 38.913962],
                shg: [
                    {
                        name: "奥林店",
                        center: [121.60872, 38.909687],
                        address: "辽宁省大连市西岗区奥林匹克广场负二层C区02-05号",
                        status: "normal",
                        fire: 100,
                    },
                ],
                lxs: [
                    {
                        name: "大连福慧国际旅行社有限公司庄河分公司",
                        center: [122.968859, 39.690083],
                        address: "辽宁省大连市庄河市城关街道财政委昌盛花园18#1层5号二层门市",
                        status: "normal",
                        fire: 0,
                    },
                    {
                        name: "大连福慧国际旅行社有限公司青堆子分公司",
                        center: [123.259071, 39.829124],
                        address: "辽宁省大连市庄河市青堆镇双河大街4号楼-4-101",
                        status: "normal",
                        fire: 50,
                    },
                    {
                        name: "大连福慧国际旅行社有限公司花园口分公司",
                        center: [122.63938, 39.555893],
                        address: "辽宁省大连市庄河市明阳街道锦苑学府5栋3公建",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连福慧国际旅行社",
                        center: [121.614862, 38.919818],
                        address: "辽宁省大连市西岗区久寿街36号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连鑫辉煌珠宝有限公司",
                        center: [121.608551, 38.918266],
                        address: "大连市西岗区信诚街3号长江路与长春路交叉路口东方国际大厦公建",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连福慧国际旅行社有限公司黄河路分公司",
                        center: [121.619592, 38.916478],
                        address: "辽宁省大连西岗区黄河路131号公建",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连福慧国际旅行社有限公司西岗区永丰街营业部",
                        center: [121.608141, 38.917423],
                        address: "辽宁省大连市西岗区永丰街57号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连福慧国旅",
                        center: [121.584103, 38.983679],
                        address: "大连市甘井子区山东路107-5 ",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连福慧国际旅行社",
                        center: [121.637925, 39.016056],
                        address: "大连市甘井子区泉水B4区2-8号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连山海",
                        center: [121.609824, 38.916066],
                        address: "大连市西岗区长春路50号1层1号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连福慧国际旅行社有限公司开发区高成山营业部",
                        center: [121.819578, 39.065356],
                        address: "辽宁省大连市经济技术开发区怡海街1栋-2-2-1号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连福慧国际旅行社有限公司开发区黄海西路分公司",
                        center: [121.880066, 39.058531],
                        address: "辽宁省大连经济技术开发区黄海西路371号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连福慧国际旅行社有限公司大连湾分公司",
                        center: [121.712906, 39.025337],
                        address: "辽宁省大连市甘井子区大连湾街391-12号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连福慧国际旅行社有限公司前关分公司",
                        center: [121.659766, 39.037682],
                        address: "辽宁省大连市甘井子区博艺南园30-10号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连福慧国际旅行社有限公司开发区湾里营业部",
                        center: [121.857674, 39.065988],
                        address: "辽宁省大连市经济技术开发区湾里南50栋-1号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连福慧国际旅行社有限公司普兰店铁西分公司",
                        center: [121.97262, 39.400801],
                        address: "辽宁省大连市普兰店区孛兰路16-5号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "福慧旅行社金州站前营业部",
                        center: [121.724142, 39.088035],
                        address: "辽宁省大连市金州区盛滨花园41号楼D区",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连福慧国际旅行社有限公司前关南园营业部",
                        center: [121.53518, 38.887399],
                        address: "辽宁省大连市甘井子区前关南园34号楼2号车库",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连福慧国际旅行社有限公司开发区分公司",
                        center: [121.801295, 39.026417],
                        address: "辽宁省大连经济技术开发区鹏运家园38-10号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连福慧国际旅行社有限公司福佳分公司",
                        center: [121.711273, 39.096728],
                        address: "金州福佳新天地西门",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连福慧国际旅行社有限公司开发区东城营业部",
                        center: [121.843871, 39.063955],
                        address: "辽宁省大连经济技术开发区东城园98-15号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连福慧国际旅行社连山街营业部",
                        center: [121.566175, 38.88712],
                        address: "大连市沙河口区连山街40号福慧国际旅行社",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连福慧国际旅行社",
                        center: [121.24833, 38.819718],
                        address: "辽宁省大连市旅顺口区光荣街道 五一路37号大连福慧国际旅行社2楼",
                        status: "normal",
                        fire: 100,
                    },
                ],
                ky: [
                    {
                        name: "财神岛海岛酒店",
                        center: [122.30536, 39.19997],
                        address: "大连市长海县广鹿岛财神岛度假村",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "山海康养休闲广场",
                        center: [121.800747, 39.025179],
                        address: "大连市开发区金马路411号山海康养休闲广场",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "山海慧假日酒店",
                        center: [121.800747, 39.025179],
                        address: "大连市开发区金马路411号山海慧假日酒店",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "开元曼居酒店",
                        center: [121.638731, 38.917132],
                        address: "大连市西岗区建设街12号开元曼居酒店",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "山海泓通温泉山庄",
                        center: [122.298564, 39.827454],
                        address: "辽宁省大连市普兰店区安波镇山海泓通温泉山庄",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "山海慧乐椿轩",
                        center: [121.210534, 38.819825],
                        address: "辽宁省大连市旅顺口区革新街18号山海慧乐椿轩",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "山海职业技术学校",
                        center: [116.506725, 39.795253],
                        address: "大连市经济技术开发区学府大街25号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "山海福慧健康生活馆",
                        center: [116.48229, 39.88822],
                        address: "大连市旅顺口区五一路43号山海福慧健康生活馆",
                        status: "normal",
                        fire: 100,
                    },
                    // {
                    //     name: "巴比伦养生会馆",
                    //     center: [],
                    //     address: "",
                    //     status: 'decorate'
                    // },
                ],
                sx: [
                    {
                        name: "武昌店",
                        center: [121.645178, 38.90687],
                        address: "辽宁省大连市中山区武昌南巷6号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "侯二店",
                        center: [121.582681, 38.929595],
                        address: "辽宁省大连市沙河口区丝绸路18-20号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "五一广场店",
                        center: [121.650452, 38.915592],
                        address: "辽宁省大连市沙河口区长江路76号1-2层",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "旅顺五一路",
                        center: [121.24855, 38.82129],
                        address: "辽宁省大连市旅顺口区五一路23—8.35号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "旅顺长江路",
                        center: [121.26474, 38.808644],
                        address: "辽宁省大连市旅顺口区长江路15号一层",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连湾",
                        center: [121.707482, 39.03443],
                        address: "辽宁省大连市甘井子区大连湾街道大连湾G2-3;G2-4",
                        status: "normal",
                        fire: 100,
                    },
                ],
                bld: [
                    {
                        name: "普兰店",
                        center: [121.97262, 39.400801],
                        address: "辽宁省大连市普兰店区孛兰路16-5号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "东城园",
                        center: [121.843442, 39.06342],
                        address: "辽宁省大连市开发区东城园98-15号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "三八店",
                        center: [121.654488, 38.919736],
                        address: "辽宁省大连市中山区鲁迅路29-4号1层西侧（花样年华一期）",
                        status: "normal",
                        fire: 100,
                    },
                ],
                sc: [
                    {
                        name: "开发区银帆",
                        center: [121.800897, 39.025736],
                        address: "辽宁省大连市开发区金马路409号地下一层",
                        status: "normal",
                        fire: 100,
                    },
                ],
                yd: [
                    {
                        name: "大连山海慧药房金地艺境店",
                        center: [121.661742, 39.037897],
                        address: "大连市甘井子区大连湾街道博艺街30-10号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连山海慧药房天河路店",
                        center: [121.584461, 38.983556],
                        address: "大连市甘井子区山东路107-5号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连山海慧药房五一路店",
                        center: [121.540802, 38.952988],
                        address: "大连市沙河口区五一路203",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连山海慧药房更新街店",
                        center: [121.622956, 38.915698],
                        address: "大连市西岗区更新街18号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连山海慧药房黄河路店",
                        center: [121.619565, 38.916519],
                        address: "大连市西岗区黄河路133号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连山海慧药房武昌街店",
                        center: [121.643982, 38.906311],
                        address: "大连市中山区武昌街南巷6号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连山海慧药房福佳店",
                        center: [121.711273, 39.096728],
                        address: "大连市金州区北山路1416号（福佳新天地西门）",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连山海慧药房金源北里店",
                        center: [121.821175, 39.059333],
                        address: "大连市金州区金源北里63-23号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连山海慧药房东城天下店",
                        center: [121.843321, 39.063336],
                        address: "大连市金州区大连开发区东城天下3栋-14号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连山海慧药房大连湾店",
                        center: [121.710604, 39.030197],
                        address: "大连市甘井子区大连湾中学颐泊湾小区391-12",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连山海慧药房忠诚街店",
                        center: [121.26706, 38.810723],
                        address: "大连市旅顺口区忠诚街81号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连山海慧药房水师营店",
                        center: [121.246546, 38.85288],
                        address: "大连市旅顺口区水师营街公交车终点站",
                        status: "normal",
                        fire: 100,
                    },
                ],
            },
            丹东: {
                center: [124.354419, 40.000646],
                shg: [
                    {
                        name: "丹东店",
                        center: [124.368277, 40.094657],
                        address: "辽宁省丹东市振兴区月亮岛大街17号楼",
                        status: "decorate",
                        fire: 100,
                    },
                ],
                lxs: [
                    {
                        name: "丹东宏昇国际旅行社有限公司",
                        center: [124.383865, 40.116935],
                        address: "辽宁省丹东市振兴区兴五路26-2-10号",
                        status: "normal",
                        fire: 100,
                    },
                ],
                sx: [
                    {
                        name: "京渔鲜生",
                        center: [124.356116, 40.105791],
                        address: "辽宁省丹东市振兴区帽盔山街道春三路红房小学对面",
                        status: "normal",
                        fire: 100,
                    },
                ],
            },
            盘锦: {
                center: [122.170729, 40.71956],
                lxs: [
                    {
                        name: "山海集团福慧国际旅行社盘锦分公司",
                        center: [122.098817, 41.127703],
                        address: "辽宁省盘锦市兴隆台区振兴街道蟠龙小区西门商网",
                        status: "normal",
                        fire: 100,
                    },
                ],
            },
            海城: {
                center: [122.685176, 40.882548],
                lxs: [
                    {
                        name: "山海集团福慧国际旅行社海城分公司",
                        center: [119.662403, 29.12357],
                        address: "辽宁省海城市北关老金华小吃部旁",
                        status: "normal",
                        fire: 100,
                    },
                ],
            },
            抚顺: {
                center: [123.957053, 41.881311],
                lxs: [
                    {
                        name: "大连福慧国际旅行社有限公司抚顺分公司",
                        center: [116.660974, 39.897995],
                        address: "抚顺市顺城区新城东路15号楼3号门市",
                        status: "normal",
                        fire: 100,
                    },
                ],
            },
            本溪: {
                center: [123.684984, 41.486834],
                lxs: [
                    {
                        name: "辽宁逸清国际旅行社有限公司",
                        center: [123.785786, 41.289787],
                        address: "本溪市平山区前进街平东园公建1层5号、2层5号",
                        status: "normal",
                        fire: 100,
                    },
                ],
                // ky: [
                //     {
                //         name: "清泉山康养基地",
                //         center: [],
                //         address: '',
                //         status: 'decorate'
                //     },
                // ]
            },
            瓦房店: {
                center: [121.979463, 39.62701],
                lxs: [
                    {
                        name: "大连山海福慧国旅瓦房店分公司站前店",
                        center: [122.010706, 39.624385],
                        address: "瓦房店市铁东办事处水果街18-9号",
                        status: "normal",
                        fire: 100,
                    },
                ],
            },
            鞍山: {
                center: [122.994183, 41.108239],
                lxs: [
                    {
                        name: "山海集团福慧国际旅行社鞍山分公司",
                        center: [123.003223, 41.118137],
                        address: "鞍山市铁东区胜利宾馆东1-12-115-6",
                        status: "normal",
                        fire: 100,
                    },
                ],
            },
            大石桥: {
                center: [122.509006, 40.644482],
                lxs: [
                    {
                        name: "福慧国际旅行社",
                        center: [122.5138, 40.631168],
                        address: "大石桥市新开路福慧国际旅行社",
                        status: "normal",
                        fire: 100,
                    },
                ],
            },
            营口: {
                center: [122.219148, 40.625027],
                lxs: [
                    {
                        name: "山海福慧国际旅行社",
                        center: [122.22367, 40.677844],
                        address: "营口市西市区清华路10号福慧旅行社",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连鹏驰国旅鲅鱼圈分公司",
                        center: [122.137116, 40.253841],
                        address: "辽宁省营口市鲅鱼圈绿色时代西区3#楼6#门市",
                        status: "normal",
                        fire: 100,
                    },
                ],
            },
        },
    },
    {
        name: "北京",
        title: "北京",
        code: "110000",
        center: [116.41647, 39.90347],
        centerQ: [116.41647, 39.90347],
        pixel: { x: -35, y: -80 },
        province: "#000",
        depth: 0,
        zooms: [zoomsData[0], zoomsData[0]],
        city: {
            zoom: 8,
            provincial: "北京",
            number: {
                shg: 1,
                lxs: 14,
                ky: 1,
            },
            北京: {
                center: [116.41647, 39.90347],
                shg: [
                    {
                        name: "山海阁",
                        center: [116.476046, 39.865105],
                        address: "北京市朝阳区十八里店乡周庄嘉园东里南侧底商甲3号一层-二层",
                        status: "normal",
                        fire: 50,
                    },
                ],
                lxs: [
                    {
                        name: "鼎泰旅游",
                        center: [115.988131, 39.695272],
                        address: "北京市房山区西潞街道良乡中心小学北侧三层商业楼6号鼎泰旅游",
                        status: "normal",
                        fire: 0,
                    },
                    {
                        name: "鹏驰旅游",
                        center: [116.443407, 39.859879],
                        address: "北京市丰台区紫芳园六区四号楼公建底商103室",
                        status: "normal",
                        fire: 50,
                    },
                    {
                        name: "鹏驰鹏驰国旅",
                        center: [116.438962, 40.068264],
                        address: "北京市昌平区白坊路天通苑东二区1号楼底商 109室",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "鹏驰国旅",
                        center: [116.477631, 39.881864],
                        address: "北京市朝阳区西大望路鸿坤花语墅底42号9-1鹏驰国旅",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "鼎泰旅游",
                        center: [116.629917, 40.129302],
                        address: "北京市顺义区石门街石门苑社区18号楼底商山海鼎泰旅游公司",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "鹏驰鹏驰国旅",
                        center: [116.351367, 40.079917],
                        address: "北京市昌平区龙泽园街道北回归线336号院2号楼105",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "北京丰台区马家堡海上海花园底商10-15",
                        center: [116.334376, 39.820248],
                        address: "北京市朝阳区西大望路鸿坤花语墅底42号9-1鹏驰国旅",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "鹏驰国际旅行社",
                        center: [116.395715, 39.954696],
                        address: "北京市东城区鼓楼外大街52号楼首层北侧",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "鹏驰国旅",
                        center: [116.682094, 39.901427],
                        address: "北京通州二店通州区玉带河东街155号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连鹏驰旅游",
                        center: [116.240361, 39.898742],
                        address: "北京市石景山远洋山水南区34-10底商",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "鹏驰国旅",
                        center: [116.498286, 39.791393],
                        address: "亦庄店：北京市经济技术开发区天宝园五里二区1号楼1层鹏驰国旅",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "鹏驰国旅",
                        center: [116.497963, 39.791073],
                        address: "黄村店：北京市大兴区兴华北路78号131号1层彩虹新城底商鹏驰国旅",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "鹏驰国旅",
                        center: [116.445412, 39.80351],
                        address: "北京市大兴区旧宫镇清逸园32号楼底商 物美斜对面 鹏驰国旅",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连鹏驰国旅",
                        center: [116.143112, 39.809284],
                        address: "北京市丰台区云岗西路28号院二区9号楼1层116",
                        status: "normal",
                        fire: 100,
                    },
                ],
                ky: [
                    {
                        name: "山海福慧健康生活馆",
                        center: [116.48229, 39.88822],
                        address: "北京市朝阳区劲松街道珠江帝景D区302号楼山海福慧健康生活馆",
                        status: "normal",
                        fire: 100,
                    },
                ],
            },
        },
    },
    {
        name: "河北",
        title: "河北省",
        code: "130000",
        center: [116.933895, 40.864895],
        centerQ: [114.625221, 37.953045],
        pixel: { x: -30, y: -70 },
        province: "#000",
        depth: 0,
        zooms: [zoomsData[0], zoomsData[0]],
        city: {
            zoom: 6.3,
            provincial: "石家庄",
            number: {
                shg: 5,
                lxs: 20,
            },
            石家庄: {
                center: [114.514976, 38.042007],
                shg: [
                    {
                        name: "石家庄店",
                        center: [114.451449, 38.025567],
                        address: "河北省石家庄市桥西区友谊南大街106号",
                        status: "decorate",
                        fire: 100,
                    },
                ],
                lxs: [
                    {
                        name: "石家庄乐溯国旅",
                        center: [114.497558, 38.022242],
                        address: "河北省石家庄市桥西区槐安东路89号1层109室",
                        status: "normal",
                        fire: 0,
                    },
                    {
                        name: "乐溯国旅谈固店",
                        center: [114.562783, 38.030687],
                        address: "河北省石家庄市裕华区槐中路576号国际城底商59-5号",
                        status: "normal",
                        fire: 50,
                    },
                    {
                        name: "乐溯国际旅行社",
                        center: [114.451445, 38.025566],
                        address: "河北省石家庄市桥西区友谊南大街106号顶峰汗蒸世界酒店一楼底商东南角1号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "乐溯国旅水上公园店",
                        center: [114.461673, 38.079493],
                        address: "河北省石家庄市新华区联盟西路641号水悦雅居底商01号",
                        status: "normal",
                        fire: 100,
                    },
                ],
            },
            沧州: {
                center: [116.838715, 38.304676],
                shg: [
                    {
                        name: "沧州店",
                        center: [116.857361, 38.309321],
                        address: "河北省沧州市运河区水月寺大街东侧恒顺世纪中心2#B区104、105、106铺",
                        status: "normal",
                        fire: 100,
                    },
                ],
                lxs: [
                    {
                        name: "大连鹏驰国旅",
                        center: [116.126125, 38.849715],
                        address: "河北省沧州市运河区康宁路泰和星耀城底商铺102",
                        status: "normal",
                        fire: 100,
                    },
                ],
            },
            廊坊: {
                center: [116.683546, 39.538304],
                shg: [
                    {
                        name: "廊坊店",
                        center: [116.679413, 39.545008],
                        address: "廊坊市广阳区永兴路幸福城欣园底商S1-103",
                        status: "normal",
                        fire: 100,
                    },
                ],
                lxs: [
                    {
                        name: "大连鹏驰国际旅行社有限公司廊坊分公司",
                        center: [116.707942, 39.527855],
                        address: "河北省廊坊市广阳区尚都金茂A座底商42甲-4",
                        status: "normal",
                        fire: 0,
                    },
                    {
                        name: "大连鹏驰国际旅行社有限公司固安营业部",
                        center: [116.315013, 39.456999],
                        address: "廊坊市固安县永定路西侧、英国宫二期S1#1-103号商铺",
                        status: "normal",
                        fire: 50,
                    },
                    {
                        name: "大连鹏驰国际旅行社有限公司香河服务网点",
                        center: [117.004824, 39.765264],
                        address: "河北省廊坊市香河县新华大街路北新华嘉园底商80-8",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连鹏驰国际旅行社有限公司霸州营业部",
                        center: [116.382005, 39.124792],
                        address: "河北省廊坊市霸州市迎宾西道底商114号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连鹏驰国际旅行社有限公司廊坊幸福城欣园分公司",
                        center: [116.680799, 39.543622],
                        address: "河北省廊坊市广阳区幸福城欣园底商1-11",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连鹏驰国际旅行社廊坊市安次区第一分公司",
                        center: [116.69606, 39.501546],
                        address: "河北省廊坊市安次区南苑小区146-4",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "大连鹏驰国际旅行社有限公司廊坊万庄服务网点",
                        center: [116.627036, 39.576357],
                        address: "廊坊市广阳区万庄华油华兴矿区爱卫路西街9号",
                        status: "normal",
                        fire: 100,
                    },
                ],
                // ky: [
                //     {
                //         name: '廊坊生活馆',
                //         center: [],
                //         address: '',
                //         status: 'decorate'
                //     },
                // ],
            },
            唐山: {
                center: [118.180149, 39.63068],
                shg: [
                    {
                        name: "唐山店",
                        center: [118.201085, 39.625079],
                        address: "河北省唐山市路北区龙泽北路绿景园西门131号",
                        status: "normal",
                        fire: 100,
                    },
                ],
                lxs: [
                    {
                        name: "鹏驰国际旅行社有限公司唐山市丰润分公司",
                        center: [118.154133, 39.823224],
                        address: "河北省唐山市丰润区华龙嘉苑1号楼商业4号",
                        status: "normal",
                        fire: 0,
                    },
                    {
                        name: "鹏驰国际旅行社有限公司唐山路南分公司",
                        center: [118.154348, 39.624988],
                        address: "河北省唐山市路南区南新西道已100-4号",
                        status: "normal",
                        fire: 50,
                    },
                    {
                        name: "鹏驰国际旅行社有限公司唐山路北分公司",
                        center: [118.154348, 39.624988],
                        address: "河北省唐山市路北区部东里金色玺园1楼1单元长宁道12-8号",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "鹏驰国际旅行社有限公司迁安分公司",
                        center: [118.691386, 40.011283],
                        address: "河北省唐山市迁安市永顺街道阜安大路东侧西关村24号",
                        status: "normal",
                        fire: 100,
                    },
                ],
            },
            保定: {
                center: [115.464523, 38.874476],
                shg: [
                    {
                        name: "保定店",
                        center: [115.530672, 38.853539],
                        address: "河北省保定市莲池区裕华东路655号",
                        status: "normal",
                        fire: 100,
                    },
                ],
                lxs: [
                    {
                        name: "鹏驰国旅",
                        center: [115.480258, 38.873205],
                        address: "河北省保定市竞秀区东风路仁和公寓底商1806号",
                        status: "normal",
                        fire: 0,
                    },
                    {
                        name: "鹏驰国旅",
                        center: [115.4734, 38.894818],
                        address: "河北省保定市复兴中路3108号康泰国际3-701室",
                        status: "normal",
                        fire: 50,
                    },
                    {
                        name: "览越旅游",
                        center: [115.507936, 38.848773],
                        address: "河北省保定市莲池区联盟街道办事处清河街62号府河美岸底商",
                        status: "normal",
                        fire: 100,
                    },
                    {
                        name: "鹏驰旅行社",
                        center: [115.99861, 39.486552],
                        address: "河北省保定市涿州市金品时代底商范阳西路37号",
                        status: "normal",
                        fire: 100,
                    },
                ],
            },
        },
    },
]

const cityItems = [
    {
        title: "全国",
        view: [{ title: "全国地图", key: "countries" }],
    },
    {
        title: "辽宁省",
        view: [
            { title: "沈阳", key: "shenyang" },
            { title: "大连", key: "dalian" },
            { title: "丹东", key: "dandong" },
            { title: "盘锦", key: "panjin" },
            { title: "海城", key: "haicheng" },
            { title: "抚顺", key: "fushun" },
            { title: "本溪", key: "benxi" },
            { title: "瓦房店", key: "wafangdian" },
            { title: "鞍山", key: "anshan" },
            { title: "大石桥", key: "dashiqiao" },
            { title: "营口", key: "yingkou" },
        ],
    },
    {
        title: "黑龙江省",
        view: [{ title: "哈尔滨", key: "haerbin" }],
    },
    {
        title: "北京",
        view: [{ title: "北京", key: "beijing" }],
    },
    {
        title: "吉林省",
        view: [
            { title: "长春", key: "changchun" },
            { title: "吉林", key: "jilin" },
        ],
    },
    {
        title: "河北省",
        view: [
            { title: "石家庄", key: "shijiazhuang" },
            { title: "沧州", key: "cangzhou" },
            { title: "廊坊", key: "langfang" },
            { title: "唐山", key: "tangshan" },
            { title: "保定", key: "baoding" },
        ],
    },
]

interface IAreaFill {
    adcode: string
    depth: number
    style: {
        fill?: string
        province?: string
        county?: string
        city?: string
    }
}
export default class Home extends Component<any> {
    private map: any
    private mapLoader: any
    private zoom = 4
    private disProvinces: any = []
    private firstMarker: any = []
    private selectCity: any
    private markerCity: any = []
    private thirdMarkerCity: any = []

    state = {
        visible: false,
        visible1: false,
        visible2: true,
        searchStatus: "show",
        city: "全国地图",
    }

    componentDidMount() {
        this.init()
    }

    async init() {
        window._AMapSecurityConfig = {
            securityJsCode: "99e676d44942a16176e54a4053fccd05",
            // 例如 ：serviceHost:'http://1.1.1.1:80/_AMapService',
        }

        this.mapLoader = await AMap.load({
            key: "259b0027f2e11456d32a085761d3bf38",
            version: "2.0",
            plugins: [
                "AMap.DistrictLayer",
                "AMap.CitySearch",
                "AMap.Geolocation",
                "AMap.DistrictSearch",
                "AMap.Geocoder",
            ],
        })

        this.map = new this.mapLoader.Map("container", {
            viewMode: "3D",
            zoom: 4,
            center: [116.47609, 39.865086],
            zooms: [zoomsData[0], zoomsData[2]],
            terrain: true,
            zoomEnable: true,
            rotateEnable: false,
            pitchEnable: true,
            pitch: 0,
            showLabel: true,
            doubleClickZoom: false,
            scrollWheel: false,
            touchZoom: false,
        })

        // this.dingwei()
        this.insertFlag()
        this.mapFn()

        setTimeout(() => {
            this.setState({ visible2: false })
        }, 7500)
    }

    // 地图区域颜色填充
    areaOfFill(params: IAreaFill) {
        const disProvince = new this.mapLoader.DistrictLayer.Province({
            zIndex: 12,
            adcode: [params.adcode],
            depth: params.depth,
            styles: {
                fill: params.style.fill || "rgb(151, 208, 146)",
                "province-stroke": params.style.province,
                "city-stroke": params.style.city,
                "county-stroke": params.style.county,
            },
        })

        disProvince.setMap(this.map)

        this.disProvinces.push(disProvince)
    }

    // 绘制行政区边界
    drawArea(item: any, districtSearch: any) {
        districtSearch.search(item.name, (status: any, result: any) => {
            const bounds = result.districtList[0].boundaries
            if (bounds) {
                for (let i = 0; i < bounds.length; i++) {
                    const polygon = new this.mapLoader.Polygon({
                        strokeWeight: 0.5,
                        path: bounds[i],
                        fillOpacity: 1,
                        fillColor: "rgb(151, 208, 146)",
                        strokeColor: "#000",
                    })

                    polygon.setMap(this.map)
                }
            }
        })
    }

    // 插旗
    insertFlag() {
        adcodes.forEach((item, idx) => {
            // const districtSearch = new this.mapLoader.DistrictSearch({
            //     level: 'city',
            //     subdistrict: 0,
            //     extensions: 'all',
            // })

            setTimeout(() => {
                // this.drawArea(item, districtSearch)

                this.areaOfFill({
                    adcode: item.code,
                    depth: item.depth,
                    style: {
                        province: item.province,
                    },
                })

                const flagMarkerContent =
                    "" +
                    `<div class="flag-animation" id=${item.code}>` +
                    `   <div class="flag-animation-text">${item.name}</div>` +
                    "</div>"

                const flagMarker = new this.mapLoader.Marker({
                    position: item.centerQ,
                    content: flagMarkerContent,
                    offset: new this.mapLoader.Pixel(item.pixel?.x, item.pixel?.y),
                    zooms: item.zooms,
                    bubble: true,
                })

                this.firstMarker.push(flagMarker)

                this.map.add(flagMarker)
            }, 1600 * idx)
        })
    }

    // 定位
    dingwei() {
        const geolocation = new this.mapLoader.Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 10000, //超过10秒后停止定位，默认：无穷大
            maximumAge: 0, //定位结果缓存0毫秒，默认：0
            convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true, //显示定位按钮，默认：true
            buttonPosition: "RB", //定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new this.mapLoader.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: false, //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: false, //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        })

        // this.map.addControl(geolocation);
        // geolocation.getCurrentPosition()
    }

    // 地图事件
    mapFn() {
        const geocoder = new this.mapLoader.Geocoder({
            city: "010", //城市设为北京，默认：“全国”
            radius: 1000, //范围，默认：500
        })

        this.map.on("click", (e: any) => {
            if (this.map.getZoom() === zoomsData[0]) {
                geocoder.getAddress([e.lnglat.lng, e.lnglat.lat], (status: any, result: any) => {
                    if (status === "complete" && result.regeocode) {
                        const address = result.regeocode.formattedAddress

                        const center = adcodes.filter(x => address.includes(x.name))

                        if (center.length) {
                            this.map.setZoomAndCenter(center[0].city.zoom, center[0].center)
                            this.selectCity = center[0]
                        }
                    }
                })
            }
        })

        this.map.on("zoomend", () => {
            const { selectCity } = this
            const { city, code } = selectCity
            const behalf = city[city.provincial]

            // 在二级放大区域
            if (this.map.getZoom() > zoomsData[0] && this.map.getZoom() < zoomsData[2]) {
                // 在二级区域时清除一级区域的填充颜色
                this.clearAllLayout()

                if (selectCity) {
                    // 给二级区域填充颜色
                    this.areaOfFill({
                        adcode: code,
                        depth: 1,
                        style: {
                            fill: "rgba(110, 181, 226, 0.3)",
                            city: "#045f99",
                        },
                    })

                    this.setState({ city: selectCity.city.provincial }, () => {
                        // 给二级区域打marker
                        if (behalf.shg) {
                            this.addMarkerToSecond(behalf.shg, "shg", "#e24c0b")
                        }
                        if (behalf.lxs) {
                            this.addMarkerToSecond(behalf.lxs, "lxs", "#4ead2d")
                        }
                        if (behalf.ky) {
                            this.addMarkerToSecond(behalf.ky, "ky", "#e02fae")
                        }
                        if (behalf.sx) {
                            this.addMarkerToSecond(behalf.sx, "sx", "#266bf1")
                        }
                        if (behalf.bld) {
                            this.addMarkerToSecond(behalf.bld, "bld", "#fd9800")
                        }
                        if (behalf.sc) {
                            this.addMarkerToSecond(behalf.sc, "sc", "#901bc2")
                        }
                        if (behalf.yd) {
                            this.addMarkerToSecond(behalf.yd, "yd", "#2998ff")
                        }
                    })
                }
            }
        })

        this.map.on("zoomend", () => {
            // if (this.map.getZoom() > zoomsData[0] && this.map.getZoom() < zoomsData[1] && this.zoom === zoomsData[0]) {
            //     // this.map.setZoomAndCenter(zoomsData[1], [116.47609, 39.865086])
            //     this.zoom = zoomsData[1]
            // } else if (this.map.getZoom() > zoomsData[1] && this.map.getZoom() < zoomsData[2] && this.zoom === zoomsData[1]) {
            //     // this.map.setZoomAndCenter(zoomsData[2], [116.47609, 39.865086])
            //     this.zoom = zoomsData[2]
            // } else if (this.zoom === zoomsData[2] && this.map.getZoom() < zoomsData[2] && this.map.getZoom() > zoomsData[1]) {
            //     // this.map.setZoomAndCenter(zoomsData[1], [116.47609, 39.865086])
            //     this.zoom = zoomsData[1]
            // } else if (this.map.getZoom() > zoomsData[0] && this.map.getZoom() < zoomsData[1] && this.zoom === zoomsData[1]) {
            //     // this.map.setZoomAndCenter(zoomsData[0], [116.47609, 39.865086])
            //     this.zoom = zoomsData[0]
            // }
            // if (this.map.getZoom() < zoomsData[2]) {
            //     this.map.setZoom(zoomsData[0])
            // }
            if (this.map.getZoom() >= zoomsData[2]) {
                this.map.setPitch(50)
                this.map.setRotation(10)
            }
            if (this.map.getPitch() !== 0 && this.map.getZoom() < zoomsData[2]) {
                this.map.setPitch(0)
                this.map.setRotation(0)
            }
        })
    }

    // 给二级区域打marker
    addMarkerToSecond(data: any, key: string, color: string) {
        const { selectCity } = this

        const markerContent =
            "" +
            '<div class="city-marker">' +
            `   <img src=${require(`src/assets/images/city/${key}.png`)} alt="" />` +
            `   <div class="city-formats-number" style="background: ${color}">${selectCity.city.number[key]}</div>` +
            "</div>"

        const marker = new this.mapLoader.Marker({
            content: markerContent,
            position: data[0].center,
            offset: new this.mapLoader.Pixel(0, 0),
            zooms: [selectCity.city.zoom, 18],
            anchor: "bottom-center",
        })

        this.markerCity.push(marker)

        marker.on("click", () => {
            this.clearAllLayout()
            this.map.setZoomAndCenter(zoomsData[2], selectCity.city[selectCity.city.provincial].center)
            this.buildThird(selectCity.city.provincial)
        })

        this.map.add(marker)
    }

    // 搜索框点击事件
    searchClickFn() {
        this.setState({ searchStatus: "show", visible: true })
    }

    // popup隐藏事件
    hidePopup() {
        this.setState({ visible: false }, () => {
            setTimeout(() => {
                this.setState({ searchStatus: "hide" })
            }, 200)
        })
    }

    // 搜索框Render
    searchRender(style?: CSSProperties) {
        return (
            <div className="search-main" style={{ ...style }} onClick={() => this.searchClickFn()}>
                <div className="search-main-content">
                    <img alt="" src={require("src/assets/images/search/search.png")} className="search-icon" />
                    <span className="search-text">输入你想去的地方</span>
                    <img alt="" src={require("src/assets/images/search/scan.png")} className="scan-icon" />
                    <img alt="" src={require("src/assets/images/search/voice.png")} className="voice-icon" />
                </div>
            </div>
        )
    }

    // 三级区域建筑
    buildThird(cityName: string) {
        const thridBuilds = this.selectCity.city[cityName]

        if (thridBuilds.shg) {
            thridBuilds.shg.forEach((item: any) => {
                this.commonThirdBuild(item, "shg")
            })
        }

        if (thridBuilds.lxs) {
            thridBuilds.lxs.forEach((item: any) => {
                this.commonThirdBuild(item, "lxs")
            })
        }

        if (thridBuilds.ky) {
            thridBuilds.ky.forEach((item: any) => {
                this.commonThirdBuild(item, "ky")
            })
        }

        if (thridBuilds.sx) {
            thridBuilds.sx.forEach((item: any) => {
                this.commonThirdBuild(item, "sx")
            })
        }

        if (thridBuilds.bld) {
            thridBuilds.bld.forEach((item: any) => {
                this.commonThirdBuild(item, "bld")
            })
        }

        if (thridBuilds.sc) {
            thridBuilds.sc.forEach((item: any) => {
                this.commonThirdBuild(item, "sc")
            })
        }

        if (thridBuilds.yd) {
            thridBuilds.yd.forEach((item: any) => {
                this.commonThirdBuild(item, "yd")
            })
        }
    }

    // 三级
    commonThirdBuild(item: any, key: string) {
        const markerContent =
            "" +
            `<div class="custom-content-marker" style="height: ${item.status === "decorate" ? "122px" : "152px"}">` +
            `   <div class="dialog">
                    <div class="dialog-title">${item.name}</div>
                    ${
                        item.status === "decorate" || item.status === "not-up"
                            ? `<div class="dialog-desc">
                            <img alt="" src=${require(`src/assets/images/${item.status}.png`)} class="icon1" />
                            <span class="desc1">${item.status === "decorate" ? "待开业" : "待点亮"}</span>
                        </div>`
                            : `<div class="dialog-desc1">
                            <img alt="" src=${require(`src/assets/images/thermal_${
                                item.fire > 0 ? 100 : 0
                            }.png`)} class="icon2" />
                            <div class="w3-light-grey">
                                <div class="w3-container" style="width:${item.fire}%"></div>
                            </div>
                        </div>`
                    }
                </div>` +
            `<div class="build">
                    ${
                        item.status === "normal" &&
                        `<img src=${require(`src/assets/images/build/${key}-not-up.png`)} class="build-image" />`
                    }
                    <img src=${require(`src/assets/images/build/${key}-${item.status}.png`)} class="build-image" style="margin-top: ${
                item.status === "decorate" ? "-30px" : "0"
            };opacity: ${item.fire / 100}" />
                </div>` +
            "</div>"

        const marker = new this.mapLoader.Marker({
            position: item.center,
            content: markerContent,
            offset: new this.mapLoader.Pixel(30, 10),
            zooms: [zoomsData[2], zoomsData[2]],
            anchor: "bottom-center",
        })
        this.thirdMarkerCity.push(marker)
        this.map.add(marker)
    }

    hidePopup1() {
        this.setState({ visible1: false })
    }

    // 清空一级、二级、三级图层
    clearAllLayout() {
        if (this.disProvinces && this.disProvinces.length) {
            // 清除区域颜色
            this.disProvinces.map((item: any) => {
                item.setMap(null)
            })
            this.disProvinces = []
        }
        if (this.firstMarker && this.firstMarker.length) {
            this.map.remove(this.firstMarker)
            this.firstMarker = []
        }
        if (this.markerCity && this.markerCity.length) {
            this.map.remove(this.markerCity)
            this.markerCity = []
        }
        if (this.thirdMarkerCity && this.thirdMarkerCity.length) {
            this.map.remove(this.thirdMarkerCity)
            this.thirdMarkerCity = []
        }
    }

    // 选择城市
    selectCityFn(params: any, parentTitle: string) {
        if (this.state.city === params.title) return

        this.setState({ city: params.title, visible1: false }, () => {
            this.clearAllLayout()
            if (params.title === "全国地图") {
                this.map.setZoomAndCenter(zoomsData[0], [116.47609, 39.865086])
                this.map.setPitch(0)
                this.map.setRotation(0)
                this.insertFlag()
                setTimeout(() => {
                    this.setState({ visible2: false })
                }, 7500)
            } else {
                const data: any = adcodes.filter(x => x.title === parentTitle)
                if (data.length) {
                    this.selectCity = data[0]
                    this.map.setZoomAndCenter(zoomsData[2], data[0].city[params.title].center)
                    this.buildThird(params.title)
                }
            }
        })
    }

    render() {
        return (
            <div className="container" id="container">
                {this.searchRender()}

                <div className="locate-main">
                    <img alt="" src={require("src/assets/images/locate.png")} />
                    <span>我的位置</span>
                </div>

                <div
                    className="locate-main"
                    style={{ bottom: "141px" }}
                    onClick={() => this.setState({ visible1: true })}
                >
                    <img alt="" src={require("src/assets/images/national.png")} />
                    <span>城市选择</span>
                </div>

                <Popup
                    visible={this.state.visible}
                    onMaskClick={() => this.hidePopup()}
                    bodyStyle={{ height: "508px" }}
                    maskStyle={{ background: "transparent" }}
                >
                    <div className="popup-content" style={{ opacity: this.state.searchStatus === "show" ? 1 : 0 }}>
                        {this.searchRender({
                            position: "absolute",
                            top: 0,
                        })}
                        <img alt="" src={require("src/assets/images/search/operating.png")} className="operating" />
                    </div>
                </Popup>

                <Popup
                    visible={this.state.visible1}
                    onMaskClick={() => this.hidePopup1()}
                    bodyStyle={{ height: "100%" }}
                >
                    <div className="select-city-main">
                        <div className="title">
                            <span>选择城市</span>
                            <span onClick={() => this.hidePopup1()}>X</span>
                        </div>
                        <div className="content">
                            <div className="my-address-main">
                                <div className="my-address-title">我的位置</div>
                                <div className="my-address-content">
                                    <div className="my-address-content-item">北京市</div>
                                </div>
                            </div>
                            {cityItems.map((item, idx) => {
                                return (
                                    <div className="my-address-main" key={`city-${idx}`}>
                                        <div className="my-address-title">{item.title}</div>
                                        <div className="my-address-content">
                                            {item.view.map((n, i) => {
                                                return (
                                                    <div
                                                        className={`my-address-content-item ${
                                                            n.title === this.state.city &&
                                                            "my-address-content-item-active"
                                                        }`}
                                                        key={`city-view-${i}`}
                                                        onClick={() => {
                                                            this.selectCityFn(n, item.title)
                                                        }}
                                                        style={{
                                                            color:
                                                                n.title === this.state.city
                                                                    ? "rgba(26, 131, 228, 1)"
                                                                    : "#000",
                                                            backgroundColor:
                                                                n.title === this.state.city
                                                                    ? "rgba(26, 131, 228, .1)"
                                                                    : "#f0f0f0",
                                                        }}
                                                    >
                                                        {n.title}
                                                        {n.title === this.state.city && (
                                                            <div className="isselect"></div>
                                                        )}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </Popup>

                <Mask visible={this.state.visible2} opacity={0} />
            </div>
        )
    }
}

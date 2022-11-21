// eslint-disable-next-line no-undef
module.exports = {
    plugins: {
        autoprefixer: {},
        "postcss-pxtorem": {
            rootValue: 16 * 3.45, //结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
            propList: ["*"], //是一个存储哪些将被转换的属性列表，这里设置为['*']全部，假设需要仅对边框进行设置，可以写['*', '!border*']
            unitPrecision: 5, //保留rem小数点多少位
            replace: true,
            mediaQuery: false, //媒体查询( @media screen 之类的)中不生效
            minPixelValue: 12, //px小于12的不会被转换
            exclude: ["node_modules"],
        },
    },
}

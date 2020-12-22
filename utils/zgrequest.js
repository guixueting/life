// url是请求路劲，data是请求参数
export function requestGet(url, data) {
    return new Promise((reslove, reject) => {
        wx.request({
            // 请求地址
            url:"https://locally.uieee.com"+url,
            // 请求方式
            method: "get",
            // 请求参数
            data: data,
            // 请求头
            header: {},
            // 请求返回结果的数据类型
            dataType: "json",
            // 请求成功的回调
            // 注意：需要勾选详情---》不校验····
            success: function (res) {
                console.log("请求成功", res);
                reslove(res)
            },
            fail:function(err){
                reject(err)
            }
        })
    })
}
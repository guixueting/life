// 使用 封装的工具类时导入
import {
  requestGet
} from "../../utils/zgrequest.js"
import regeneratorRuntime from "../../lib/runtime/runtime"

Page({
  data: {
    swiperd: [],
    gongge: []
  },

  onLoad: function (options) {
    // 把this备份一份,在下面的回调函数中不能通过 this 获取当前页面对象
    // var _this=this;
    // 在页面加载的时候向 接口发送 request 请求
    // -------------------------------------请求轮播------------------------------
    requestGet("/slides").then((res) => {
      this.setData({
        swiperd: res.data
      })
    }),
    // 调用async的异步方法
    this.getSlides();
  },
     // -------------------------------------请求宫格------------------------------
    //在utils文件夹中封装一个request请求，用async和await来写
    // 要先引入之前的lib中的 runtime 文件，再导入
    async getSlides(){
      let result=await requestGet("/categories");
      this.setData({
        gongge: result.data
      })
      console.log(result.data);
        
    } 

  
   
  
    // wx.request({
    //   // 请求地址
    //   url: "https://locally.uieee.com/slides",
    //   // 请求方式
    //   method: "get",
    //   // 请求参数
    //   data: {},
    //   // 请求头
    //   header: {},
    //   // 请求返回结果的数据类型
    //   dataType: "json",
    //   // 请求成功的回调
    //   // 注意：需要勾选详情---》不校验····
    //   success: function (res) {
    //     console.log("请求成功", res);
    //     console.log(this);//undefined 可能请求数据是异步的
    //     _this.setData({
    //       swiperd:res.data
    //     })
    //     console.log(res.data);
    //   }
    // })
    
  

})
import {
  requestGet
} from "../../utils/zgrequest.js"
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({
  data: {
    id:"",
    shuju:{}
  },
  onLoad: function (options) {
    // 拿到 list.wxml中传来的url后面的参数
    console.log(options);
    let id=parseInt(options.id)
    // 保存id,根据id请求数据
    this.setData({
      id:id
    })
    this.getDetail();
  },
  async getDetail(){
    let result=await requestGet(`/shops/${this.data.id}`);
    
    this.setData({
      shuju:result.data
    })
    console.log(result.data,"wwwwwwww");
  },
  // 图片预览
  preview(e){
    wx.previewImage({
      // 传入的参数
      // current当前要显示的图片
      current: e.currentTarget.dataset.src,
       // url当前要显示的图片的数组
      urls:  e.currentTarget.dataset.images,
    });
      
  }

  
})
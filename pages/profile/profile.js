// pages/profile/profile.js
Page({
  data: {
    imgpath:'/assets/images/avatar.png',
    canIUse:wx.canIUse("button.open-type.getUserInfo") 
  },
  touLogin:function(e){
    // 登陆  buton开发能力获取用户信息
    this.setData({
      imgpath:e.detail.userInfo.avatarUrl
    })
  }
})
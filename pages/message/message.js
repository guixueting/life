// pages/message/message.js
Page({
  data: {
    messages:[]
  },
  onLoad: function (options) {
    // 数据源
    const messages = this.data.messages
    for (var i = 0; i < 18; i++) {
      messages.push({
        title: '免费送票！超有内涵的门票。',
        date: i + ' September',
        image: 'https://unsplash.it/400/300',
        summary: '最糟糕的，也许就是最幸运的。'
      })
    }

    this.setData({
      messages
    })
  },
  onReady(){
    // 页面载入时滚动到页面底部
    const query=wx.createSelectorQuery();
    var bottom=query.select(".bottom");
    console.log(bottom);
    // 获取区域的位置信息 里面与偶一个top 距离顶部距离
    bottom.boundingClientRect(function(rext){
      console.log(rext);
    })
    // 获取所有请求 执行bottom 让页面滚动到底部
    query.exec((res)=>{
      // res为bottom.boundingClientRect()执行的结果
      console.log(res);
      wx.pageScrollTo({
        scrollTop: res[0].top,
        duration: 300
      });
        
    });
  }

})
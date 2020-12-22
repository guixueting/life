import {
  requestGet
} from "../../utils/zgrequest.js"
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({
  data: {
    id: "",
    value: "",
    list: [],
    pageIndex: 1, //当前页码
    pageSize: 10, //每页5条
    starvalue: 3, //默认评分三颗心
    hasMore: true, //控制是否有跟多数据
  },
  onLoad: function (options) {
    // 当从 index的宫格跳转时，传入的？后面参数会 拿到-----》id
    console.log(options);
    // 保存传入的id,再list中写列表样式的展示
    this.setData({
        id: options.id
      }),
      this.getListData();
  },
  // 发请求拿数据
  async getListData() {
    // this.data.id从上一个页面传来的参数
    // { _page: this.data.pageIndex, _limit: this.data.pageSize }为参数 是分页和页码
    let result = await requestGet(`/categories/${this.data.id}/shops`, {
      _page: this.data.pageIndex,
      _limit: this.data.pageSize
    });
    this.setData({
      list: [...this.data.list, ...result.data], //之前的与新加载的拼接，防止盖住之前的
      totalCount: parseInt(result.header['x-total-count']) //获取总数据条数，所有的数据而不是加载的（80），由此来得出总页数
    })
    console.log(result.header['x-total-count']); //80
  },
  onSearch() {
    console.log("onSearch", this.data.value);
    // 可根据拿到的数据 搜素
  },
  onCancel() {
    console.log("onCancel", this.data.value);
    // 点击取消置空
    this.setData({
      value: ""
    })
  },
  // 当数据源改变实现双向绑定
  onChange(e) {
    this.setData({
      value: e.detail
    })
  },
  // 评分星星
  onChangeStar(event) {
    this.setData({
      starvalue: event.detail,
    });
  },
  // 当拉到距离底部多远时触发，再json中配置 "onReachBottomDistance":20
  onReachBottom() {
    let totalPage = Math.ceil(this.data.totalCount / this.data.pageSize); //当前页码
    // 加载第二页数据
    this.data.pageIndex++;
    this.setData({
      pageIndex: this.data.pageIndex
    })
    if (this.data.pageIndex < totalPage) {
      // 调用请求数据的方法
      this.getListData();
    } else {
      this.setData({
        // 此时显示  我是有底线的···
        hasMore: false
      })
    }

    //响应头headers中有总数居条数 X-Total-Count
  },
  // 下拉刷新时触发，json中配置 "enablePullDownRefresh":true
  onPullDownRefresh:async function() {
    // 重置数据源
    this.setData({
      pageIndex:1,
      list:[],
      hasMore:true
    })
    // 加载第一页数据
    await this.getListData();
    // 关闭下拉刷新
    wx.stopPullDownRefresh();
  }
})
// pages/posts/posts.js
var postsData = require('../../data/posts-data.js')
const swiperPostsId = [3, 4, 5]

Page({
  data: {
    // 用来做数据初始化，而这个动作是在onLoad函数执行之后发生的，如果变量已经存在，则跳过变量初始化
    swiperPostsList: [],
    postsList: []
  },

  onLoad: function(options) {
    var swiperPostsList = []
    for (var idx in swiperPostsId) {
      var postId = swiperPostsId[idx]
      var swiperPost = {
        postId: postId,
        imgSrc: postsData.postsList.find(item => {
          return item.postId == postId
        }).imgSrc
      }
      swiperPostsList.push(swiperPost)
    }
    this.setData({
      swiperPostsList: swiperPostsList,
      postsList: postsData.postsList
    })
  },

  onPostTap: function(event) {
    var postId = event.currentTarget.dataset.postid
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  },

  onSwiperTap: function(event) {
    // target和currentTarget
    // target指的是当前点击的组件，currentTarget指的是事件捕获的组件
    // target这里指的是image，而currentTarget指的是 swiper
    var postId = event.target.dataset.postid
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    })
  }
})
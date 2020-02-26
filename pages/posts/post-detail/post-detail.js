// pages/posts/post-detail/post-detail.js
var postsData = require('../../../data/posts-data.js')
var app = getApp()

Page({
  data: {
    postData: {},
    postCollected: false,
    isPlayingMusic: false
  },

  onLoad: function(options) {
    var postId = options.id
    var postData = postsData.postsList.find(item => {
      return item.postId == postId
    })
    this.setData({
      postData: postData
    })

    var postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected) {
      var postCollected = postsCollected[postId]
      if (postCollected) {
        this.setData({
          postCollected: postCollected
        })
      }
    } else {
      postsCollected = {}
      wx.setStorageSync('posts_collected', postsCollected)
    }

    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId == postId) {
      this.setData({
        isPlayingMusic: true
      })
    }
    this.setMusicMonitor()
  },

  setMusicMonitor: function() {
    var that = this
    var backgroundAudioManager = wx.getBackgroundAudioManager()

    backgroundAudioManager.onPlay(function() {
      if (app.globalData.g_currentMusicPostId == that.data.postData.postId) {
        that.setData({
          isPlayingMusic: true
        })
      }
      app.globalData.g_isPlayingMusic = true
    })

    backgroundAudioManager.onPause(function() {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false
    })

    backgroundAudioManager.onEnded(function() {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false
    })
  },

  onMusicTap: function(event) {
    var isPlayingMusic = this.data.isPlayingMusic
    var postData = this.data.postData
    var backgroundAudioManager = wx.getBackgroundAudioManager()
    if (isPlayingMusic) {
      backgroundAudioManager.pause()
      this.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false
    } else {
      //设置 title,src 等属性不能放在外部, 否则可能会造成无法停止播放
      backgroundAudioManager.title = postData.music.title
      backgroundAudioManager.singer = postData.music.singer
      backgroundAudioManager.coverImgUrl = postData.music.coverImg
      // 设置了 src 之后会自动播放
      backgroundAudioManager.src = postData.music.url
      backgroundAudioManager.play()
      this.setData({
        isPlayingMusic: true
      })
      app.globalData.g_currentMusicPostId = postData.postId
      app.globalData.g_isPlayingMusic = true
    }
  },

  onCollectionTap: function(event) {
    this.getPostsCollectedSyc()
    // this.getPostsCollectedAsy()
  },

  getPostsCollectedAsy: function() {
    var that = this
    wx.getStorage({
      key: "posts_collected",
      success: function(res) {
        var postsCollected = res.data
        var postCollected = postsCollected[that.data.postData.postId]
        // 收藏变成未收藏，未收藏变成收藏
        postCollected = !postCollected
        postsCollected[that.data.postData.postId] = postCollected
        that.showToast(postsCollected, postCollected)
      }
    })
  },

  getPostsCollectedSyc: function() {
    var postsCollected = wx.getStorageSync('posts_collected')
    var postCollected = postsCollected[this.data.postData.postId]
    // 收藏变成未收藏，未收藏变成收藏
    postCollected = !postCollected
    postsCollected[this.data.postData.postId] = postCollected
    this.showToast(postsCollected, postCollected)
    // this.showModal(postsCollected, postCollected)
  },

  showToast: function(postsCollected, postCollected) {
    // 更新文章收藏是否的缓存值
    wx.setStorageSync('posts_collected', postsCollected)
    // 更新数据绑定变量，从而实现切换图片
    this.setData({
      postCollected: postCollected
    })
    wx.showToast({
      title: postCollected ? '收藏成功' : '取消成功',
      duration: 1000,
      icon: "success"
    })
  },

  showModal: function(postsCollected, postCollected) {
    var that = this
    wx.showModal({
      title: "收藏",
      content: postCollected ? "收藏该文章？" : "取消收藏该文章？",
      showCancel: "true",
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确认",
      confirmColor: "#405f80",
      success: function(res) {
        if (res.confirm) {
          // 更新文章收藏是否的缓存值
          wx.setStorageSync('posts_collected', postsCollected)
          // 更新数据绑定变量，从而实现切换图片
          that.setData({
            postCollected: postCollected
          })
        }
      }
    })
  },

  onShareTap: function(event) {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function(res) {
        wx.showModal({
          title: '用户 ' + itemList[res.tapIndex],
          content: "现在无法实现分享功能，什么时候能支持呢"
        })
      }
    })
  }
})
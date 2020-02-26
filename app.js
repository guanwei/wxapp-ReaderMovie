App({
  globalData: {
    g_currentMusicPostId: null,
    g_isPlayingMusic: false,
    doubanBase: "http://t.yushu.im",
    // doubanBase: "https://douban.uieee.com",
    // doubanApiKey: "0df993c66c0c636e29ecbb5344252a4a"
  },

  onLaunch: function(options) {
    console.log(options)
  }
})
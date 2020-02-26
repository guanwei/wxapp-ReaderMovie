Page({
  onTap: function(event) {
    // wx.redirectTo({
    //   url: '../posts/posts'
    // })
    wx.switchTab({
      url: '../posts/posts'
    })
  }
})
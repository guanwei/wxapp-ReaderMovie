// pages/example/example.js
Page({
  data: {
  },

  onLoad: function (options) {
  },

  chooseAddress: function(event) {
    wx.chooseAddress({
      success: function(res) {
        console.log(res)
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },

  getUserInfo: function(event) {
    wx.login({
      success: function(res) {
        wx.getUserInfo({
          withCredential: false,
          success: function(res) {
            console.log(res)
          },
          fail: function(res) {
            console.log(res)
          }
        })
      }
    })
  },

  checkSession: function(event) {
    wx.checkSession({
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },

  openSetting: function(event) {
    wx.openSetting({
      success: (res) => {
        console.log(res)
      }
    })
  },

  startRecord: function(event) {
    wx.startRecord({
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },

  showShare: function(event) {
    wx.showShareMenu({
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },

  hideShare: function(event) {
    wx.hideShareMenu({
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        console.log(res)
      }
    })
  }
})
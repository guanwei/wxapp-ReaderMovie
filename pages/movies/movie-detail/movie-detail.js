// pages/movies/movie-detail/movie-detail.js
import { Movie } from '../../../utils/Movie.js'
var app = getApp()

Page({
  data: {
    movie: {}
  },

  onLoad: function(options) {
    var movieId = options.id
    var url = app.globalData.doubanBase +
      "/v2/movie/subject/" + movieId + "?apikey=" + app.globalData.doubanApiKey
    var movie = new Movie(url)
    movie.getMovieData((movie) => {
      this.setData({
        movie: movie
      })
    })
  },

  /*查看图片*/
  viewMoviePostImg: function(event) {
    var src = event.currentTarget.dataset.src
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  }
})
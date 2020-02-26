// pages/movies/more-movie/more-movie.js
import { Movies } from '../../../utils/Movies.js'
var app = getApp()
const count = 20

Page({
  data: {
    movies: [],
    requestUrl: "",
    start: 0
  },

  onLoad: function(options) {
    var category = options.category
    wx.setNavigationBarTitle({
      title: category
    })

    var dataUrl = ""
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/in_theaters?apikey=" + app.globalData.doubanApiKey + 
          "&count=" + count
        break
      case "即将上映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/coming_soon?apikey=" + app.globalData.doubanApiKey +
          "&count=" + count
        break
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/top250?apikey=" + app.globalData.doubanApiKey +
          "&count=" + count
        break
    }
    this.data.requestUrl = dataUrl

    var movies = new Movies(dataUrl)
    movies.getMoviesData((movies) => {
      this.setData({
        movies: movies
      })
    })
    this.data.start += count
  },

  onMovieTap: function(event) {
    var movieId = event.currentTarget.dataset.movieid
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId
    })
  },

  onPullDownRefresh: function(event) {
    this.data.movies = {}
    this.data.start = 0

    var movies = new Movies(this.data.requestUrl)
    movies.getMoviesData((movies) => {
      this.setData({
        movies: movies
      })
    })
    this.data.start += count
    wx.stopPullDownRefresh()
  },

  onReachBottom: function (event) {
    var url = this.data.requestUrl + "&start=" + this.data.start

    var movies = new Movies(url)
    movies.getMoviesData((movies) => {
      if (movies.length > 0) {
        // setData函数主要用于将逻辑层数据发送到视图层，同时对应的改变this.data.x的值
        this.setData({
          // 如果要绑定新加载的数据，那么需要同旧有的数据合并在一起
          movies: this.data.movies.concat(movies)
        })
        this.data.start += count
      }
    })
  }
})
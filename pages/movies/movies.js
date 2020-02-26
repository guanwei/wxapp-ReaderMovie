// pages/movies/movies.js
import { Movies } from '../../utils/Movies.js'
var app = getApp()

Page({
  data: {
    inTheaters: {
      categoryTitle: "正在热映",
      movies: []
    },
    comingSoon: {
      categoryTitle: "即将上映",
      movies: []
    },
    top250: {
      categoryTitle: "豆瓣Top250",
      movies: []
    },
    containerShow: true,
    searchPanelShow: false,
    searchValue: "",
    searchResult: {}
  },

  onLoad: function(options) {
    var inTheatersUrl = app.globalData.doubanBase +
      "/v2/movie/in_theaters?apikey=" + app.globalData.doubanApiKey + "&count=3"
    var comingSoonUrl = app.globalData.doubanBase +
      "/v2/movie/coming_soon?apikey=" + app.globalData.doubanApiKey + "&count=3"
    var top250Url = app.globalData.doubanBase +
      "/v2/movie/top250?apikey=" + app.globalData.doubanApiKey + "&count=3"

    var inTheatersMovies = new Movies(inTheatersUrl)
    inTheatersMovies.getMoviesData((movies) => {
      this.setData({
        ["inTheaters.movies"]: movies
      })
    })

    var comingSoonMovies = new Movies(comingSoonUrl)
    comingSoonMovies.getMoviesData((movies) => {
      this.setData({
        ["comingSoon.movies"]: movies
      })
    })

    var top250Movies = new Movies(top250Url)
    top250Movies.getMoviesData((movies) => {
      this.setData({
        ["top250.movies"]: movies
      })
    })
  },

  onMoreTap: function(event) {
    var category = event.currentTarget.dataset.category
    wx.navigateTo({
      url: "more-movie/more-movie?category=" + category
    })
  },

  onMovieTap: function(event) {
    var movieId = event.currentTarget.dataset.movieid
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id=' + movieId
    })
  },

  onBindFocus: function (event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },

  onBindConfirm: function (event) {
    var text = event.detail.value
    var searchUrl = app.globalData.doubanBase +
      "/v2/movie/search?apikey=" + app.globalData.doubanApiKey + "&q=" + text
    
    var searchMovies = new Movies(searchUrl)
    searchMovies.getMoviesData((movies) => {
      this.setData({
        ["searchResult.movies"]: movies
      })
    })
  },

  onCancelImgTap: function(event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchValue: "",
      searchResult: {}
    })
  }
})
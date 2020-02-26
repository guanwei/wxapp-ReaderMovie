// es6: module, class, promise, =>
var util = require('util.js')

class Movies {
  constructor(url) {
    this.url = url
  }

  getMoviesData(cb) {
    this.cb = cb
    wx.showNavigationBarLoading()
    util.http(this.url, this.processDoubanData.bind(this))
  }

  processDoubanData(data) {
    wx.hideNavigationBarLoading()
    if (!data) {
      return
    }
    var movies = []
    for (var idx in data.subjects) {
      var subject = data.subjects[idx]
      var title = subject.title
      if (title.length >= 6) {
        title = title.substring(0, 6) + "..."
      }
      var movie = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        score: subject.rating.average,
        movieImg: subject.images.large,
        movieId: subject.id
      }
      movies.push(movie)
    }
    this.cb(movies)
  }
}

export {
  Movies
}
// 返回一个包含5个数字的数组，例如[1,1,1,0,0]，1代表全星，0代表空星
function convertToStarsArray(stars) {
  var num = stars.toString().substring(0, 1)
  var array = []
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1)
    }
    else {
      array.push(0)
    }
  }
  return array
}

function convertToCastString(casts) {
  var castsjoin = ""
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / "
  }
  return castsjoin.substring(0, castsjoin.length - 3)
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast)
  }
  return castsArray
}

function http(url, callBack) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      // content-type为'application/json'时返回错误码999，改成任意值可以解决此问题,例如'json'
      'content-type': 'json'
    },
    success: function(res) {
      callBack(res.data)
    },
    fail: function(error) {
      console.log(error)
    }
  })
}

module.exports = {
  http: http,
  convertToStarsArray: convertToStarsArray,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos
}
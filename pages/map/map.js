// pages/map/map.js
Page({
  data: {
    markers: [{
      iconPath: "/images/location.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/images/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },

  markertap(event) {
    wx.openLocation({
      latitude: 23.099994,
      longitude: 113.324520,
    })
  },

  regionchange(event) {
    console.log(event.type)
  },

  controltap(event) {
    console.log(event.controlId)
  }
})

// openlayers
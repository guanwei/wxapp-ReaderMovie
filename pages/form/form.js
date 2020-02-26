// pages/form/form.js
Page({
  data: {
  },

  onLoad: function (options) {
  },

  onBindChange: function(event) {
    console.log(event.detail.value)
  },

  onRaidoChange: function(event) {
    console.log(event.detail.value)
  },

  onCheckboxChange: function(event) {
    console.log(event.detail.value)
  },

  formSubmit: function(event) {
    console.log("form发生了submit事件，携带的数据为：", event.detail.value)
  },

  formReset: function(event) {
    console.log("form发生了reset事件")
  }
})
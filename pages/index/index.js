//获取应用实例
var app = getApp()
var util = require('../../utils/util.js');
var WXBizDataCrypt = require('../../utils/cryptojs/RdWXBizDataCrypt.js');
var appId = '你的微信appid';
var secret = '你的微信secret';
Page({

 
  onLoad: function (options) {
    var that = this
    setInterval(function () {
      that.setData({
        nowTemp: app.globalData.nowTemp,
      })
    }, 1000) //循环时间 这里是1
  
    wx.login({
      success: res => {
        //发起网络请求，这里可能需要服务器来求情https://api.weixin.qq.com/sns/jscode2session，不过刚才我试了试，开发者模式下也能获取到，好久不玩微信小程序了，不知道现在更新成什么样，你试一下
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: appId,
            secret: secret,
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: 'GET',
          success: function (res) {
            var pc = new WXBizDataCrypt(appId, res.data.session_key)
            wx.getUserInfo({
              success: function (res) {
                var data = pc.decryptData(res.encryptedData, res.iv)
                app.globalData.unionid = data.unionId
                //解密后的id
                console.log('解密后 unionid: ', app.globalData.unionid)
              }
            })


          },
          fail: function (res) { },
          complete: function (res) { }
        });
      }
    })
  },
  

})



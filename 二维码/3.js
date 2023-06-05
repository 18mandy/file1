const app = getApp()
Page({
  data: {
  //在这里面定义一下你二维码里面的字段
    show: "",
    description:"",
    instruction:"",
    riskLevel:"",
    processMethod:"",
    d:''
  },
  onLoad: function () {
    template.tabbar("tabBar", 0, this);
    console.log('onLoad')
  },
  scanCode: function (options) {
    var that = this;
    var show;
    wx.scanCode({
      success: (res) => {
        // this.show = "结果:" + res.result + "二维码类型:" + res.scanType + "字符集:" + res.charSet + "路径:" + res.path;
        that.setData({
          result:res.result
        })
        var userInfo=wx.getStorageSync('user');
        var username=userInfo.username;
        var txt =that.data.result;
        //此处是扫码成功的核心，用一个“？”来分隔请求和数据，该符号后面的使我们需要的参数，也就是d[1]
        var d = txt.split('?');
        var e =d[1];
        console.log(e);
        wx.showToast({
          title: '扫码成功',
          icon: 'success',
          duration: 2000
        })
        wx.request({
          url:'http://localhost:8080/scan/productionAdd?'+e,
          method: 'GET',
   success: function (res) {
    var result = res.statusCode;
    var toastText = "请求成功";
    if (result != 200) {
      toastText = "请求失败";
    } 
    wx.showToast({
      title: toastText,
      icon: '',
      duration: 2000
    });
    
    },
}),
        wx.request({
          url: 'http://localhost:8080/scan/connect?username=' + username + '&&' + e,
          method: 'GET',
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '请选择二维码类型的图片',
          icon: 'success',
          duration: 2000
        })
      },
      complete: (res) => {
      }
    })
  }
})

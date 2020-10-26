import React from "./ReactWX.js";

function Global(...args) {
  this.globalData = {
    version: '1.3.0.22',
    appid: 'wx5e7524c02dade60a',
    // api: 'http://127.0.0.1:8081/yeweihui-api',
    // api: 'http://47.111.24.218:8089/yeweihui-api',
    api: 'https://jmkj.weixinwangluo.com/yeweihui-api',
    // api: 'https://wx.weixinwangluo.com/yeweihui-api',
    selectedMembers: {},
    // 各个模块选择的成员
    refreshFlags: {},
    // 各个模块列表刷新标志，默认刷新
    requestData2Sign: {} // 传至签名请求数据

    /** storge存储
     * userInfo,
     * token,
     * openid: '',
     * sessionKey
     * uid
     * mobile
     * realname,
     * roomNum
     * avatarUrl,
     * role_id,
     * role_code,
     * role_name,
     * zone_id,
     * zone_name,
     * zone_address
     * verify_status
     */
    ,
    buildType: "wx"
  };
}

Global = React.toClass(Global, React.Component, {
  onLaunch: function () {
    //针对快应用的全局getApp补丁
    if (this.$data && typeof global === 'object') {
      var ref = Object.getPrototypeOf(global) || global;

      var _this = this;

      ref.getApp = function () {
        return _this;
      };
    }
  },
  classUid: "c6514"
}, {});
Global.config = {
  window: {
    navigationBarTitleText: '业委汇',
    backgroundColor: '#ffffff',
    backgroundTextStyle: 'light'
  },
  tabBar: {
    color: '#000000',
    borderStyle: 'white',
    backgroundColor: '#ffffff',
    list: [{
      pagePath: 'pages/index',
      iconPath: 'assets/images/home01.png',
      selectedIconPath: 'assets/images/home02.png',
      text: '首页'
    }, // {
    //     pagePath: 'pages/info/index',
    //     iconPath: 'assets/images/home01.png',
    //     selectedIconPath: 'assets/images/home02.png',
    //     text: '信息'
    // },
    {
      pagePath: 'pages/my/index',
      iconPath: 'assets/images/mine01.png',
      selectedIconPath: 'assets/images/mine02.png',
      text: '我的'
    }]
  }
};
export default App(new Global());
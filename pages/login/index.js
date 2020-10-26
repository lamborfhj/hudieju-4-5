import regeneratorRuntime from "../../npm/regenerator-runtime/runtime.js";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import React from "../../ReactWX.js";
import { request, storgeUser } from "../../common/utils";
var app = React.getApp();

function Login() {
  this.handleChange = e => {
    this.setState({
      isNotAgree: !e.target.value[0]
    });
  };

  this.handleGoto = () => {
    React.api.navigateTo({
      url: '/pages/agreement/index'
    });
  };

  this.getScrect = wxCode => {
    return React.api.request({
      url: app.globalData.api + "/wx/user/" + app.globalData.appid + "/login",
      method: 'GET',
      data: {
        appid: app.globalData.appid,
        code: wxCode
      }
    });
  };

  this.getWxCode = () => {
    return new Promise((resolve, reject) => {
      React.api.login({
        success: function (res) {
          resolve(res.code);
        }
      });
    });
  };

  this.handleGetUserInfo = e => {
    if (e.detail.userInfo) {
      React.api.setStorageSync('userInfo', e);
      this.login();
    }
  };

  this.state = {
    isNotAgree: true
  };
}

Login = React.toClass(Login, React.Component, {
  login: function () {
    var _ref = _asyncToGenerator(function* () {
      let wxCode = yield this.getWxCode();
      let screct = yield this.getScrect(wxCode);
      React.api.setStorageSync("openid", screct.data.loginResult.session.openid);
      React.api.setStorageSync("sessionKey", screct.data.loginResult.session.sessionKey); // 不存在该openid用户，跳转到手机验证绑定

      if (!screct.data.loginResult.token) {
        React.api.navigateTo({
          url: '/pages/bindphone/index'
        });
      } else {
        React.api.setStorageSync("token", screct.data.loginResult.token);
        yield storgeUser();
        console.log(React.api.getStorageSync('userInfo'));
        React.api.showToast({
          title: '授权成功！'
        }).then(() => {
          setInterval(() => {
            request({
              url: app.globalData.api + "/api/jmkj/updateTime",
              method: 'get',
              data: {
                time: 60
              }
            });
          }, 60000);
          setTimeout(() => {
            request({
              url: app.globalData.api + "/api/jmkj/updateNum",
              method: 'get',
              data: {}
            });
            request({
              url: app.globalData.api + "/api/user/updateAvatar",
              method: 'POST',
              data: {
                avatarUrl: React.api.getStorageSync('userInfo').userInfo.avatarUrl
              }
            });
            React.api.switchTab({
              url: '/pages/index'
            });
          }, 1500);
        });
      }
    });

    return function login() {
      return _ref.apply(this, arguments);
    };
  }(),
  render: function () {
    var h = React.createElement;
    return h("view", null, h("view", {
      class: "header"
    }, h("image", {
      src: "https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/wx_login.png"
    })), h("view", {
      class: "content"
    }, h("view", null, "\u7533\u8BF7\u83B7\u53D6\u4EE5\u4E0B\u6743\u9650"), h("text", null, "\u83B7\u5F97\u4F60\u7684\u516C\u5F00\u4FE1\u606F(\u6635\u79F0\uFF0C\u5934\u50CF\u7B49)"), h("view", {
      style: "margin-top: 40rpx;"
    }, h("checkbox-group", {
      onChange: this.handleChange,
      "data-change-uid": "e98_28",
      "data-beacon-uid": "default"
    }, h("label", null, h("checkbox", {
      value: !this.state.isNotAgree
    }), "\u9605\u8BFB\u5E76\u540C\u610F", h("text", {
      style: "color:#4385f5;",
      catchTap: this.handleGoto,
      "data-tap-uid": "e100_93",
      "data-beacon-uid": "default"
    }, "\u300A\u7528\u6237\u534F\u8BAE\u300B"))))), h("button", {
      class: "bottom",
      type: "primary",
      "open-type": "getUserInfo",
      lang: "zh_CN",
      disabled: this.state.isNotAgree,
      onGetUserInfo: this.handleGetUserInfo,
      "data-getuserinfo-uid": "e110_10",
      "data-beacon-uid": "default"
    }, "\u6388\u6743"));;
  },
  classUid: "c3355"
}, {});
Login.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '授权',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F2f2f2'
};
Page(React.registerPage(Login, "pages/login/index"));
export default Login;
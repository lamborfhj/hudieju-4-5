import React from "../../ReactWX.js";
import { storgeUser } from "../../common/utils";
var app = React.getApp();

function Index() {
  this.handleChange = e => {
    this.setState({
      phone: e.target.value
    });
  };

  this.handleGetCaptcha = () => {
    if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.state.phone)) {
      React.api.showToast({
        title: '请输入正确的手机号！',
        icon: 'none'
      });
      return;
    }

    this.setState({
      second: 60
    }, () => {
      this.countDown();
    });
    React.api.request({
      url: app.globalData.api + "/api/common/sendVerifyCode",
      method: 'GET',
      data: {
        phone: this.state.phone
      }
    }).then(res => {
      if (res && res.data.msg === 'success') {
        React.api.showToast({
          title: '验证码发送成功！'
        });
      } else {
        React.api.showToast({
          title: '验证码发送失败,请稍后再试！',
          icon: 'none'
        });
      }
    }).catch(error => {
      React.api.showToast({
        title: '验证码发送失败,请稍后再试！',
        icon: 'none'
      });
    });
  };

  this.countDown = () => {
    const timer = setInterval(() => {
      if (this.state.second == 0) {
        clearInterval(timer);
      } else {
        this.setState({
          second: this.state.second - 1
        });
      }
    }, 1000);
  };

  this.handleSubmit = e => {
    if (e.value.phone == '') {
      React.api.showToast({
        title: '请输入手机号！',
        icon: 'none'
      });
      return false;
    }

    if (e.value.verifyCode == '') {
      React.api.showToast({
        title: '请输入验证码！',
        icon: 'none'
      });
      return false;
    }

    React.api.request({
      url: app.globalData.api + "/api/common/checkVerifyCode",
      method: 'GET',
      data: e.value
    }).then(res => {
      if (res && res.data.msg === 'success') {
        this.updateUser();
      } else {
        React.api.showToast({
          title: res.data.msg,
          icon: 'none'
        });
      }
    }).catch(error => {
      React.api.showToast({
        title: '验证失败,请稍后再试！',
        icon: 'none'
      });
    });
  };

  this.updateUser = () => {
    const userInfo = React.api.getStorageSync('userInfo');
    const sessionKey = React.api.getStorageSync('sessionKey');
    React.api.request({
      url: app.globalData.api + "/wx/user/" + app.globalData.appid + "/info",
      method: 'GET',
      data: {
        appid: app.globalData.appid,
        encryptedData: userInfo.encryptedData,
        iv: userInfo.iv,
        rawData: userInfo.rawData.toString(),
        signature: userInfo.signature,
        sessionKey: sessionKey,
        phone: this.state.phone
      }
    }).then(res => {
      if (res && res.data.msg === 'success') {
        storgeUser().then(() => {
          if (res.data.userEntity.zoneId == null) {
            React.api.navigateTo({
              url: '/pages/bind/index'
            });
          } else {
            React.api.showToast({
              title: '验证成功！'
            }).then(() => {
              setTimeout(() => {
                React.api.switchTab({
                  url: '/pages/index'
                });
              }, 1500);
            });
          }
        });
      } else {
        React.api.showToast({
          title: '验证失败,请稍后再试！',
          icon: 'none'
        });
      }
    }).catch(error => {
      React.api.showToast({
        title: '验证失败,请稍后再试！',
        icon: 'none'
      });
    });
  };

  this.state = {
    phone: '',
    second: 0
  };
}

Index = React.toClass(Index, React.Component, {
  render: function () {
    var h = React.createElement;
    return h("view", {
      class: "page"
    }, h("view", {
      class: "page__bd"
    }, h("form", {
      onSubmit: this.handleSubmit,
      "data-submit-uid": "e131_16",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-cells weui-cells_after-title"
    }, h("view", {
      class: "weui-cell weui-cell_input"
    }, h("view", {
      class: "weui-cell__hd"
    }, h("view", {
      class: "weui-label"
    }, h("text", {
      class: "icon_star"
    }, "*"), "\u624B\u673A\u53F7")), h("view", {
      class: "weui-cell__bd"
    }, h("input", {
      name: "phone",
      class: "weui-input",
      value: this.state.phone,
      onInput: this.handleChange,
      "data-input-uid": "e138_82",
      "data-beacon-uid": "default"
    })), h("view", {
      class: "weui-cell__ft"
    }, this.state.second == 0 ? h("view", {
      class: "weui-vcode-btn",
      onTap: this.handleGetCaptcha,
      "data-tap-uid": "e142_49",
      "data-beacon-uid": "default"
    }, "\u83B7\u53D6\u9A8C\u8BC1\u7801") : h("view", {
      class: "weui-vcode-btn",
      style: "color:#666666"
    }, this.state.second, "\u79D2"))), h("view", {
      class: "weui-cell weui-cell_input"
    }, h("view", {
      class: "weui-cell__hd"
    }, h("view", {
      class: "weui-label"
    }, h("text", {
      class: "icon_star"
    }, "*"), "\u9A8C\u8BC1\u7801")), h("view", {
      class: "weui-cell__bd"
    }, h("input", {
      name: "verifyCode",
      class: "weui-input"
    }))), h("view", {
      class: "weui-cell"
    }), h("view", {
      class: "bottom_btn_area"
    }, h("button", {
      formType: "submit"
    }, "\u63D0\u4EA4"))))));;
  },
  classUid: "c5091"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '手机验证',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5'
};
Page(React.registerPage(Index, "pages/bindphone/index"));
export default Index;
import React from "../../ReactWX.js";
import { request } from "../../common/utils";
var app = React.getApp();

function Index() {
  this.handleChange = e => {
    this.setState({
      mobile: e.target.value
    });
  };

  this.handleGetCaptcha = () => {
    if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.state.mobile)) {
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
        phone: this.state.mobile
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
    if (e.value.mobile == '') {
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

    if (e.value.password == '') {
      React.api.showToast({
        title: '请输入密码！',
        icon: 'none'
      });
      return false;
    }

    if (e.value.password2 == '') {
      React.api.showToast({
        title: '请输入确认密码！',
        icon: 'none'
      });
      return false;
    }

    if (e.value.password !== e.value.password2) {
      React.api.showToast({
        title: '密码不一致，请重新输入！',
        icon: 'none'
      });
      return false;
    }

    React.api.showLoading({
      title: '修改中...'
    });
    React.api.request({
      url: app.globalData.api + "/api/user/modifyPassword",
      method: 'POST',
      data: e.value
    }).then(res => {
      React.api.hideLoading();

      if (res && res.data.msg === 'success') {
        React.api.showToast({
          title: '修改成功！'
        }).then(() => {
          setTimeout(() => {
            React.api.navigateBack();
          }, 1000);
        });
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

  this.state = {
    mobile: '',
    second: 0
  };
}

Index = React.toClass(Index, React.Component, {
  onShow: function () {},
  render: function () {
    var h = React.createElement;
    return h("view", {
      class: "page"
    }, h("view", {
      class: "page__bd"
    }, h("form", {
      onSubmit: this.handleSubmit,
      "data-submit-uid": "e118_16",
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
      name: "mobile",
      class: "weui-input",
      value: this.state.mobile,
      onInput: this.handleChange,
      "data-input-uid": "e125_84",
      "data-beacon-uid": "default"
    })), h("view", {
      class: "weui-cell__ft"
    }, this.state.second == 0 ? h("view", {
      class: "weui-vcode-btn",
      onTap: this.handleGetCaptcha,
      "data-tap-uid": "e129_49",
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
      class: "weui-cell weui-cell_input"
    }, h("view", {
      class: "weui-cell__hd"
    }, h("view", {
      class: "weui-label"
    }, h("text", {
      class: "icon_star"
    }, "*"), "\u5BC6\u7801")), h("view", {
      class: "weui-cell__bd"
    }, h("input", {
      type: "password",
      name: "password",
      class: "weui-input"
    }))), h("view", {
      class: "weui-cell weui-cell_input"
    }, h("view", {
      class: "weui-cell__hd"
    }, h("view", {
      class: "weui-label"
    }, h("text", {
      class: "icon_star"
    }, "*"), "\u786E\u8BA4\u5BC6\u7801")), h("view", {
      class: "weui-cell__bd"
    }, h("input", {
      type: "password",
      name: "password2",
      class: "weui-input"
    }))), h("view", {
      class: "weui-cell"
    }), h("view", {
      class: "bottom_btn_area"
    }, h("button", {
      formType: "submit"
    }, "\u63D0\u4EA4"))))));;
  },
  classUid: "c5310"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '修改密码',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5',
  enablePullDownRefresh: true
};
Page(React.registerPage(Index, "pages/password/index"));
export default Index;
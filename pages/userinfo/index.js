import React from "../../ReactWX.js";
import { request } from "../../common/utils";
var app = React.getApp();

function Index() {
  this.handleGoto = () => {
    React.api.navigateTo({
      url: "/pages/password/index"
    });
  };

  this.handleLogout = () => {
    React.api.showLoading({
      title: '退出中...'
    });
    request({
      url: app.globalData.api + "/api/user/logout",
      method: 'POST'
    }).then(res => {
      React.api.hideLoading();

      if (res.data.msg === 'success') {
        React.api.showToast({
          title: '退出成功！'
        }).then(() => {
          React.api.clearStorage();
          setTimeout(() => {
            React.api.switchTab({
              url: "/pages/index"
            });
          }, 1000);
        });
      } else {
        React.api.showToast({
          title: res.data.msg,
          icon: 'none'
        });
      }
    });
  };

  this.state = {
    avatarUrl: '',
    realname: '',
    gender: '',
    roleName: '',
    roomNum: '',
    mobile: ''
  };
}

Index = React.toClass(Index, React.Component, {
  onShow: function () {
    this.setState({
      avatarUrl: React.api.getStorageSync('avatarUrl'),
      realname: React.api.getStorageSync('realname'),
      gender: React.api.getStorageSync('gender') == 1 ? '男' : '女',
      roleName: React.api.getStorageSync('role_name'),
      roomNum: React.api.getStorageSync('roomNum'),
      mobile: React.api.getStorageSync('mobile')
    });
  },
  render: function () {
    var h = React.createElement;
    return h("view", {
      class: "page"
    }, h("view", {
      class: "page__bd"
    }, h("view", {
      class: "weui-panel"
    }, h("view", {
      class: "weui-panel__bd"
    }, h("view", {
      class: "weui-cells weui-cells_after-title"
    }, h("view", {
      class: "weui-cell weui-cell_without_border"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("view", {
      style: "color:#999999"
    }, "\u5934\u50CF")), h("view", {
      class: "weui-cell__ft"
    }, h("image", {
      src: this.state.avatarUrl,
      class: "avatar"
    }))), h("view", {
      class: "weui-cell weui-cell_without_border"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("view", {
      style: "color:#999999"
    }, "\u59D3\u540D")), h("view", {
      class: "weui-cell__ft"
    }, this.state.realname)), h("view", {
      class: "weui-cell weui-cell_without_border"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("view", {
      style: "color:#999999"
    }, "\u6027\u522B")), h("view", {
      class: "weui-cell__ft"
    }, this.state.gender)), h("view", {
      class: "weui-cell weui-cell_without_border"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("view", {
      style: "color:#999999"
    }, "\u89D2\u8272")), h("view", {
      class: "weui-cell__ft"
    }, this.state.roleName)), this.state.roomNum && h("view", {
      class: "weui-cell weui-cell_without_border"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("view", {
      style: "color:#999999"
    }, "\u623F\u95F4\u53F7")), h("view", {
      class: "weui-cell__ft"
    }, this.state.roomNum)), h("view", {
      class: "weui-cell weui-cell_without_border"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("view", {
      style: "color:#999999"
    }, "\u624B\u673A")), h("view", {
      class: "weui-cell__ft"
    }, this.state.mobile))))), h("view", {
      class: "weui-panel"
    }, h("view", {
      class: "weui-panel__bd"
    }, h("view", {
      class: "weui-cells weui-cells_after-title"
    }, h("view", {
      class: "weui-cell weui-cell_without_border",
      onTap: this.handleGoto,
      "data-tap-uid": "e122_65",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("view", null, "\u4FEE\u6539\u5BC6\u7801")), h("view", {
      class: "weui-cell__ft weui-cell__ft_in-access"
    }))))), h("view", {
      class: "weui-panel",
      style: "margin-top:50px;"
    }, h("view", {
      class: "weui-panel__bd",
      style: "text-align:center;padding: 10px 0;color:red;",
      onTap: this.handleLogout,
      "data-tap-uid": "e133_94",
      "data-beacon-uid": "default"
    }, "\u9000\u51FA\u767B\u5F55"))));;
  },
  classUid: "c4756"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '个人资料',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5',
  enablePullDownRefresh: true
};
Page(React.registerPage(Index, "pages/userinfo/index"));
export default Index;
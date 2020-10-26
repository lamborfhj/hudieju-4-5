import React from "../../ReactWX.js";
import { checkAuth, modules } from "../../common/utils";
var app = React.getApp();

function Index() {
  this.load = () => {
    this.setState({
      avatarUrl: React.api.getStorageSync('avatarUrl'),
      realname: React.api.getStorageSync('realname'),
      roleName: React.api.getStorageSync('role_name'),
      mobile: React.api.getStorageSync('mobile'),
      authority: React.api.getStorageSync('authority').my || {}
    }, () => {
      this.setState({
        modules: modules.filter(item => this.state.authority.list.includes(item.action))
      });
    });
  };

  this.handleGotoLogin = () => {
    React.api.navigateTo({
      url: "/pages/login/index"
    });
  };

  this.handleGotoDetail = () => {
    React.api.navigateTo({
      url: "/pages/userinfo/index"
    });
  };

  this.handleGoto = action => {
    if (action == "我的组织") {
      React.api.navigateTo({
        url: "/pages/org/index"
      });
    } else if (action == "版本信息") {
      React.api.navigateTo({
        url: "/pages/version/index"
      });
    } else {
      React.api.navigateTo({
        url: "/pages/mylist/index?action=" + action
      });
    }
  };

  this.state = {
    avatarUrl: '',
    realname: '',
    roleName: '',
    mobile: '',
    authority: {},
    modules: []
  };
}

Index = React.toClass(Index, React.Component, {
  onShow: function () {
    checkAuth(this.load);
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
    }, this.state.realname && this.state.realname != '' ? h("view", {
      class: "weui-cell weui-cell_without_border",
      onTap: this.handleGotoDetail,
      "data-tap-uid": "e80_67",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-cell__hd",
      style: "margin-right: 10px;"
    }, h("image", {
      src: this.state.avatarUrl,
      class: "avatar"
    })), h("view", {
      class: "weui-cell__bd"
    }, h("view", null, this.state.realname), h("view", {
      style: "font-size: 13px;"
    }, this.state.roleName + " \u7535\u8BDD:" + this.state.mobile)), h("view", {
      class: "weui-cell__ft weui-cell__ft_in-access"
    })) : h("view", {
      class: "weui-cell weui-cell_without_border"
    }, h("view", {
      class: "weui-cell__hd",
      style: "margin-right: 10px;"
    }, h("image", {
      src: "https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/icon_16.png",
      class: "avatar"
    })), h("view", {
      class: "weui-cell__bd"
    }, h("view", null, h("button", {
      class: "weui-btn mini-btn",
      type: "primary",
      size: "mini",
      style: "line-height:1.8",
      onTap: this.handleGotoLogin,
      "data-tap-uid": "e102_26",
      "data-beacon-uid": "default"
    }, "\u767B\u5F55"))))))), h("view", {
      class: "weui-panel"
    }, h("view", {
      class: "weui-panel__bd"
    }, h("view", {
      class: "weui-cells weui-cells_after-title"
    }, this.state.modules.map((item, i3540) => h("view", {
      key: item.myName,
      class: "weui-cell",
      onTap: () => this.handleGoto(item.myName),
      "data-tap-uid": 'e118_60_' + i3540,
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-cell__hd"
    }, h("image", {
      src: item.img2,
      style: "margin-right: 5px;vertical-align: middle;width:30px; height: 30px;"
    })), h("view", {
      class: "weui-cell__bd"
    }, item.myName), h("view", {
      class: "weui-cell__ft weui-cell__ft_in-access"
    }))))))));;
  },
  classUid: "c4310"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '我的',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5',
  enablePullDownRefresh: true
};
Page(React.registerPage(Index, "pages/my/index"));
export default Index;
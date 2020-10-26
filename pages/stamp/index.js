import React from "../../ReactWX.js";
var app = React.getApp();

function Index() {
  this.handleGoto = action => {
    React.api.navigateTo({
      url: "/pages/mystamp/index?action=" + action
    });
  };

  this.handleGotoCreate = () => {
    if (React.api.getStorageSync('uid')) {
      React.api.navigateTo({
        url: '/pages/submitstamp/index'
      });
    } else {
      React.api.showToast({
        title: "您还未登录，请先登录!",
        icon: 'none'
      });
    }
  };

  this.state = {
    waits: null
  };
}

Index = React.toClass(Index, React.Component, {
  onShow: function () {
    if (React.api.getStorageSync('uid')) {
      React.api.request({
        url: app.globalData.api + "/api/mainPage/mainPage1",
        method: 'POST',
        data: {
          uid: React.api.getStorageSync('uid')
        }
      }).then(res => {
        if (res.data.msg === 'success') {
          this.setState({
            waits: res.data.mainPage1VO
          });
        } else {
          React.api.showToast({
            title: res.data.msg,
            icon: 'none'
          });
        }
      });
    }
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
      class: "weui-flex"
    }, h("view", {
      class: "weui-flex__item",
      style: "text-align: center;padding: 10px 0;",
      onTap: () => this.handleGoto('approve'),
      "data-tap-uid": "e65_18",
      "data-beacon-uid": "default"
    }, h("image", {
      src: "https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/shenpi.png",
      class: "img_small"
    }), h("view", null, this.state.waits && this.state.waits.waitRequestVerifyCount > 0 && h("text", {
      style: "color: #c8894e;margin-right: 5px;"
    }, this.state.waits.waitRequestVerifyCount), h("text", null, "\u6211\u5BA1\u6279\u7684"))), h("view", {
      class: "weui-flex__item",
      style: "text-align: center;padding: 10px 0;",
      onTap: () => this.handleGoto('initiate'),
      "data-tap-uid": "e78_18",
      "data-beacon-uid": "default"
    }, h("image", {
      src: "https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/icon_06.png",
      class: "img_small"
    }), h("view", null, h("text", null, "\u6211\u53D1\u8D77\u7684"))), h("view", {
      class: "weui-flex__item",
      style: "text-align: center;padding: 10px 0;",
      onTap: () => this.handleGoto('copy'),
      "data-tap-uid": "e86_18",
      "data-beacon-uid": "default"
    }, h("image", {
      src: "https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/icon_07.png",
      class: "img_small"
    }), h("view", null, h("text", null, "\u6284\u9001\u6211\u7684")))))), h("view", {
      class: "weui-panel"
    }, h("view", {
      class: "weui-panel__bd"
    }, h("view", {
      style: "width: 100px;text-align: center;padding: 10px 0;",
      onTap: this.handleGotoCreate,
      "data-tap-uid": "e99_16",
      "data-beacon-uid": "default"
    }, h("image", {
      src: "https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/icon_08.png",
      class: "img_small"
    }), h("view", null, h("text", null, "\u7533\u8BF7\u7528\u7AE0")))))));;
  },
  classUid: "c3521"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '用章审批',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5'
};
Page(React.registerPage(Index, "pages/stamp/index"));
export default Index;
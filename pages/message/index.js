function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "../../ReactWX.js";
import { request } from "../../common/utils";
var app = React.getApp();

function Index() {
  this.setDistance = () => {
    var that = this;
    React.api.getSystemInfo({
      success: function (res) {
        that.setState({
          scrollHeight: res.windowHeight
        });
      }
    });
  };

  this.loadList = () => {
    this.fetchList({
      uid: React.api.getStorageSync('uid'),
      page: 1,
      limit: 20
    }, 'list1', 'nextPage1', true);
  };

  this.loadMore = () => {
    this.fetchList({
      uid: React.api.getStorageSync('uid'),
      page: this.state.nextPage1,
      limit: 20
    }, 'list1', 'nextPage1', false);
  };

  this.fetchList = (params, listName, pageName, isFirst) => {
    if (isFirst == false && this.state[pageName] == -1) {
      React.api.showToast({
        title: '已全部加载！',
        icon: 'none'
      });
      return;
    }

    request({
      url: app.globalData.api + "/api/message/list",
      method: 'POST',
      data: params
    }).then(res => {
      const obj = {};
      const nextPage = res.data.pages.currPage + 1;
      const content = res.data.pages.list.map(o => {
        return _objectSpread({}, o, {
          message: JSON.parse(o.message)
        });
      });
      obj[listName] = isFirst ? content : this.state[listName].concat(content);
      obj[pageName] = nextPage > res.data.pages.totalPage ? -1 : nextPage;
      this.setState(obj);
    });
  };

  this.handleNext = () => {
    this.loadMore();
  };

  this.handleGoto = pagepath => {
    React.api.navigateTo({
      url: "/" + pagepath
    });
  };

  this.state = {
    scrollHeight: 0,
    nextPage1: 1,
    list1: []
  };
}

Index = React.toClass(Index, React.Component, {
  componentDidMount: function () {
    this.setDistance();
    this.loadList();
  },
  render: function () {
    var h = React.createElement;
    return h("view", {
      class: "page"
    }, h("view", {
      class: "page__bd"
    }, h("scroll-view", {
      "scroll-y": "true",
      onScrollToLower: this.handleNext,
      style: "height:" + this.state.scrollHeight + "px;",
      "data-scrolltolower-uid": "e90_39",
      "data-beacon-uid": "default"
    }, this.state.list1.map(function (item, index) {
      return h("view", {
        class: "weui-panel weui-panel_access",
        key: item.id,
        onTap: () => this.handleGoto(item.message.miniprogram.pagepath),
        "data-tap-uid": 'e93_73_' + index,
        "data-beacon-uid": "default"
      }, h("view", {
        class: "weui-panel__hd"
      }, item.message.data.first.value), item.type == "meeting" ? h("view", {
        class: "weui-panel__bd"
      }, h("view", {
        class: "weui-cells weui-cells_after-title weui-cells_without_border"
      }, h("view", {
        class: "weui-cell"
      }, h("view", {
        class: "weui-cell__hd"
      }, "\u4F1A\u8BAE\u540D\u79F0\uFF1A"), h("view", {
        class: "weui-cell__bd"
      }, item.message.data.keyword1.value)), h("view", {
        class: "weui-cell"
      }, h("view", {
        class: "weui-cell__hd"
      }, "\u4F1A\u8BAE\u65F6\u95F4\uFF1A"), h("view", {
        class: "weui-cell__bd"
      }, item.message.data.keyword2.value)))) : h("view", {
        class: "weui-panel__bd"
      }, h("view", {
        class: "weui-cells weui-cells_after-title weui-cells_without_border"
      }, h("view", {
        class: "weui-cell"
      }, h("view", {
        class: "weui-cell__hd"
      }, "\u6D41\u7A0B\u540D\u79F0\uFF1A"), h("view", {
        class: "weui-cell__bd"
      }, item.message.data.keyword1.value)), h("view", {
        class: "weui-cell"
      }, h("view", {
        class: "weui-cell__hd"
      }, "\u53D1\u8D77\u4EBA\uFF1A"), h("view", {
        class: "weui-cell__bd"
      }, item.message.data.keyword2.value)), h("view", {
        class: "weui-cell"
      }, h("view", {
        class: "weui-cell__hd"
      }, "\u53D1\u8D77\u65F6\u95F4\uFF1A"), h("view", {
        class: "weui-cell__bd"
      }, item.message.data.keyword3.value)))), h("view", {
        class: "weui-panel__ft"
      }, h("view", {
        class: "weui-cell weui-cell_access weui-cell_link"
      }, h("view", {
        class: "weui-cell__bd"
      }, "\u67E5\u770B\u8BE6\u60C5"), h("view", {
        class: "weui-cell__ft weui-cell__ft_in-access"
      }))));
    }, this))));;
  },
  classUid: "c4802"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '历史消息',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5',
  enablePullDownRefresh: true
};
Page(React.registerPage(Index, "pages/message/index"));
export default Index;
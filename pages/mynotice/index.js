function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "../../ReactWX.js";
import { request } from "../../common/utils";
import { noticelist } from "../../common/data";
var app = React.getApp();

function Index() {
  this.setDistance = () => {
    var that = this;
    React.api.getSystemInfo({
      success: function (res) {
        that.setState({
          scrollHeight: res.windowHeight - 46
        });
      }
    });
  };

  this.loadList = () => {
    this.fetchList({
      zoneId: React.api.getStorageSync('zone_id'),
      page: 1,
      limit: 20
    }, 'list1', 'nextPage1', true);
  };

  this.loadMore = () => {
    this.fetchList({
      zoneId: React.api.getStorageSync('zone_id'),
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

    if (React.api.getStorageSync('uid')) {
      request({
        url: app.globalData.api + "/api/operation/notice/list",
        method: 'POST',
        data: params
      }).then(res => {
        this.parseData(res, listName, pageName, isFirst);
      });
    } else {
      this.parseData(noticelist, listName, pageName, isFirst);
    }
  };

  this.parseData = (res, listName, pageName, isFirst) => {
    const obj = {};
    const nextPage = res.data.page.currPage + 1;
    obj[listName] = isFirst ? res.data.page.list : this.state[listName].concat(res.data.page.list);
    obj[pageName] = nextPage > res.data.page.totalPage ? -1 : nextPage;
    this.setState(obj);
  };

  this.handleNext = () => {
    this.loadMore();
  };

  this.handleGoto = id => {
    React.api.navigateTo({
      url: "/pages/noticedetail/index?id=" + id
    });
    this.setState({
      list1: this.state.list1.map(o => {
        if (o.id == id) {
          o.memberStatus = 2;
        }

        return o;
      })
    });
  };

  this.handleCreate = () => {
    if (React.api.getStorageSync('uid')) {
      React.api.navigateTo({
        url: "/pages/submitnotice/index"
      });
    } else {
      React.api.showToast({
        title: "您还未登录，请先登录!",
        icon: 'none'
      });
    }
  };

  this.state = {
    scrollHeight: 0,
    nextPage1: 1,
    list1: []
  };
}

Index = React.toClass(Index, React.Component, {
  onShow: function () {
    this.setDistance();
    const refreshFlag = app.globalData.refreshFlags["myNotice"];

    if (refreshFlag === false) {
      app.globalData.refreshFlags = _objectSpread({}, app.globalData.refreshFlags, {
        myNotice: true
      });
    } else {
      this.loadList();
    }
  },
  render: function () {
    var h = React.createElement;
    return h("view", {
      class: "page"
    }, h("view", {
      class: "page__bd",
      style: "padding-bottom:0;"
    }, h("scroll-view", {
      "scroll-y": "true",
      onScrollToLower: this.handleNext,
      style: "height:" + this.state.scrollHeight + "px;",
      "data-scrolltolower-uid": "e124_39",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-cells weui-cells_after-title"
    }, this.state.list1.map(function (item, index) {
      return h("view", {
        class: "weui-cell",
        key: item.id,
        onTap: () => this.handleGoto(item.id),
        "data-tap-uid": 'e128_56_' + index,
        "data-beacon-uid": "default"
      }, h("view", {
        class: "weui-cell__bd"
      }, item.creatorGroup == "小区业主" || item.creatorGroup == "业主委员会" ? h("view", {
        style: "color: green;"
      }, item.title) : item.creatorGroup == "物业公司" ? h("view", {
        style: "color: purple;"
      }, item.title) : h("view", {
        style: "color: red;"
      }, item.title), h("view", {
        style: "font-size: 13px;color: #888888;"
      }, h("text", null, item.createTime), h("image", {
        src: "https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/eye.png",
        style: "width: 14px;height: 10px;margin: 0 3px 0 15px;"
      }), h("text", null, item.readCount || 0))), item.memberStatus == 1 && h("view", {
        class: "weui-cell__ft"
      }, h("view", {
        class: "weui-badge weui-badge_dot",
        style: "font-size:10px;"
      })));
    }, this))), h("view", {
      class: "bottom_btn_area"
    }, h("button", {
      onTap: this.handleCreate,
      "data-tap-uid": "e154_20",
      "data-beacon-uid": "default"
    }, "\u53D1\u5E03\u516C\u544A"))));;
  },
  classUid: "c4871"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '通知公告',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5',
  enablePullDownRefresh: true
};
Page(React.registerPage(Index, "pages/mynotice/index"));
export default Index;
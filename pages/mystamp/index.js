function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "../../ReactWX.js";
import { request } from "../../common/utils";
import { stamplist } from "../../common/data";
var app = React.getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

function Index() {
  this.setDistance = () => {
    var that = this;
    React.api.getSystemInfo({
      success: function (res) {
        that.setState({
          sliderLeft: (res.windowWidth / that.state.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.state.tabs.length * that.state.activeIndex,
          scrollHeight: that.props.query.action == 'approve' ? res.windowHeight - 51 : res.windowHeight
        });
      }
    });
  };

  this.setTitle = () => {
    let title = '';

    switch (this.props.query.action) {
      case 'approve':
        title = '我审批的';
        break;

      case 'initiate':
        title = '我发起的';
        break;

      case 'copy':
        title = '抄送我的';
        break;

      default:
        break;
    }

    React.api.setNavigationBarTitle({
      title
    });
  };

  this.loadList = () => {
    if (this.props.query.action == 'approve') {
      this.fetchList({
        requestStatusList: [0, 1, 3],
        requestMemberStatusList: [0],
        requestMemberType: 1,
        verifyUid: React.api.getStorageSync('uid'),
        page: 1,
        limit: 20,
        zoneId: React.api.getStorageSync('zone_id')
      }, 'list1', 'nextPage1', true);
      this.fetchList({
        requestMemberStatusList: [1, 2, 3],
        requestMemberType: 1,
        verifyUid: React.api.getStorageSync('uid'),
        page: 1,
        limit: 20,
        zoneId: React.api.getStorageSync('zone_id')
      }, 'list2', 'nextPage2', true);
    }

    if (this.props.query.action == 'initiate') {
      this.fetchList({
        uid: React.api.getStorageSync('uid'),
        page: 1,
        limit: 20,
        zoneId: React.api.getStorageSync('zone_id')
      }, 'list1', 'nextPage1', true);
    }

    if (this.props.query.action == 'copy') {
      this.fetchList({
        requestMemberType: 2,
        verifyUid: React.api.getStorageSync('uid'),
        page: 1,
        limit: 20,
        zoneId: React.api.getStorageSync('zone_id')
      }, 'list1', 'nextPage1', true);
    }
  };

  this.loadMore = () => {
    if (this.props.query.action == 'approve') {
      if (this.state.activeIndex == 0) {
        this.fetchList({
          requestStatusList: [0, 1, 3],
          requestMemberStatusList: [0],
          requestMemberType: 1,
          verifyUid: React.api.getStorageSync('uid'),
          page: this.state.nextPage1,
          limit: 20,
          zoneId: React.api.getStorageSync('zone_id')
        }, 'list1', 'nextPage1', false);
      }

      if (this.state.activeIndex == 1) {
        this.fetchList({
          requestMemberStatusList: [1, 2, 3],
          requestMemberType: 1,
          verifyUid: React.api.getStorageSync('uid'),
          page: this.state.nextPage2,
          limit: 20,
          zoneId: React.api.getStorageSync('zone_id')
        }, 'list2', 'nextPage2', false);
      }
    }

    if (this.props.query.action == 'initiate') {
      this.fetchList({
        uid: React.api.getStorageSync('uid'),
        page: this.state.nextPage1,
        limit: 20,
        zoneId: React.api.getStorageSync('zone_id')
      }, 'list1', 'nextPage1', false);
    }

    if (this.props.query.action == 'copy') {
      this.fetchList({
        requestMemberType: 2,
        verifyUid: React.api.getStorageSync('uid'),
        page: this.state.nextPage1,
        limit: 20,
        zoneId: React.api.getStorageSync('zone_id')
      }, 'list1', 'nextPage1', false);
    }
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
        url: app.globalData.api + "/api/operation/request/list",
        method: 'POST',
        data: params
      }).then(res => {
        this.parseData(res, listName, pageName, isFirst);
      });
    } else {
      this.parseData(stamplist, listName, pageName, isFirst);
    }
  };

  this.parseData = (res, listName, pageName, isFirst) => {
    const obj = {};
    const nextPage = res.data.page.currPage + 1;
    obj[listName] = isFirst ? res.data.page.list : this.state[listName].concat(res.data.page.list);
    obj[pageName] = nextPage > res.data.page.totalPage ? -1 : nextPage;
    this.setState(obj);
  };

  this.handleTap = e => {
    this.setState({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  };

  this.handleNext = () => {
    this.loadMore();
  };

  this.handleGoto = id => {
    React.api.navigateTo({
      url: "/pages/stampdetail/index?id=" + id
    });
  };

  this.state = {
    tabs: ["待我审批的", "我已审批的"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    scrollHeight: 0,
    nextPage1: 1,
    list1: [],
    // 已审批 我发起的 抄送我的
    nextPage2: 1,
    list2: [] // 未审批

  };
}

Index = React.toClass(Index, React.Component, {
  onShow: function () {
    this.setDistance();
    this.setTitle();
    const refreshFlag = app.globalData.refreshFlags["myStamp"];

    if (refreshFlag === false) {
      app.globalData.refreshFlags = _objectSpread({}, app.globalData.refreshFlags, {
        myStamp: true
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
    }, this.props.query.action == 'approve' ? h("view", {
      class: "weui-tab"
    }, h("view", {
      class: "weui-navbar"
    }, this.state.tabs.map((item, index) => h("block", {
      key: item
    }, h("view", {
      id: index,
      class: this.state.activeIndex == index ? "weui-navbar__item weui-bar__item_on" : "weui-navbar__item",
      onTap: this.handleTap,
      "data-tap-uid": 'e206_139_' + index,
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-navbar__title"
    }, item)))), h("view", {
      class: "weui-navbar__slider",
      style: "left: " + this.state.sliderLeft + "px; transform: translateX(" + this.state.sliderOffset + "px); -webkit-transform: translateX(" + this.state.sliderOffset + "px);"
    })), h("view", {
      class: "weui-tab__panel"
    }, h("view", {
      class: "weui-tab__content",
      hidden: this.state.activeIndex != 0
    }, h("scroll-view", {
      "scroll-y": "true",
      onScrollToLower: this.handleNext,
      style: "height:" + this.state.scrollHeight + "px;",
      "data-scrolltolower-uid": "e215_47",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-cells weui-cells_after-title"
    }, this.state.list1.map(function (item, index) {
      return h("view", {
        class: "weui-cell",
        key: item.id,
        onTap: () => this.handleGoto(item.id),
        "data-tap-uid": 'e219_64_' + index,
        "data-beacon-uid": "default"
      }, h("view", {
        class: "weui-cell__hd",
        style: "margin-right: 10px;"
      }, h("image", {
        src: item.avatarUrl,
        class: "avatar"
      })), h("view", {
        class: "weui-cell__bd"
      }, h("view", null, item.uname, "\u7684\u7528\u7AE0\u7533\u8BF7"), h("view", {
        style: "font-size: 13px;color: #888888;"
      }, "\u4F7F\u7528\u65E5\u671F: " + item.useDate), h("view", {
        style: "font-size: 13px;color: #c8894e;"
      }, item.statusCn)));
    }, this)))), h("view", {
      class: "weui-tab__content",
      hidden: this.state.activeIndex != 1
    }, h("scroll-view", {
      "scroll-y": "true",
      onScrollToLower: this.handleNext,
      style: "height:" + this.state.scrollHeight + "px;",
      "data-scrolltolower-uid": "e235_47",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-cells weui-cells_after-title"
    }, this.state.list2.map(function (item, index) {
      return h("view", {
        class: "weui-cell",
        key: item.id,
        onTap: () => this.handleGoto(item.id),
        "data-tap-uid": 'e239_64_' + index,
        "data-beacon-uid": "default"
      }, h("view", {
        class: "weui-cell__hd",
        style: "margin-right: 10px;"
      }, h("image", {
        src: item.avatarUrl,
        class: "avatar"
      })), h("view", {
        class: "weui-cell__bd"
      }, h("view", null, item.uname, "\u7684\u7528\u7AE0\u7533\u8BF7"), h("view", {
        style: "font-size: 13px;color: #888888;"
      }, "\u4F7F\u7528\u65E5\u671F: " + item.useDate), h("view", {
        style: "font-size: 13px;color: #c8894e;"
      }, item.statusCn)));
    }, this)))))) : null, this.props.query.action == 'initiate' || this.props.query.action == 'copy' ? h("scroll-view", {
      "scroll-y": "true",
      onScrollToLower: this.handleNext,
      style: "height:" + this.state.scrollHeight + "px;",
      "data-scrolltolower-uid": "e259_41",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-cells weui-cells_after-title"
    }, this.state.list1.map(function (item, index) {
      return h("view", {
        class: "weui-cell",
        key: item.id,
        onTap: () => this.handleGoto(item.id),
        "data-tap-uid": 'e263_58_' + index,
        "data-beacon-uid": "default"
      }, h("view", {
        class: "weui-cell__hd",
        style: "margin-right: 10px;"
      }, h("image", {
        src: item.avatarUrl,
        class: "avatar"
      })), h("view", {
        class: "weui-cell__bd"
      }, h("view", null, item.uname, "\u7684\u7528\u7AE0\u7533\u8BF7"), h("view", {
        style: "font-size: 13px;color: #888888;"
      }, "\u4F7F\u7528\u65E5\u671F: " + item.useDate), h("view", {
        style: "font-size: 13px;color: #c8894e;"
      }, item.statusCn)));
    }, this))) : null));;
  },
  classUid: "c10388"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5',
  enablePullDownRefresh: true
};
Page(React.registerPage(Index, "pages/mystamp/index"));
export default Index;
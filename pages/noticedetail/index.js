function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "../../ReactWX.js";
import { request } from "../../common/utils";
var app = React.getApp();

function Index() {
  this.handleGoto = () => {
    React.api.navigateTo({
      url: "/pages/noticereader/index?id=" + this.props.query.id
    });
  };

  this.state = {
    detail: {},
    isAuditor: false // 是否收件人或行业主管

  };
}

Index = React.toClass(Index, React.Component, {
  componentDidMount: function () {
    app.globalData.refreshFlags = _objectSpread({}, app.globalData.refreshFlags, {
      myNotice: false
    });
  },
  onShow: function () {
    if (React.api.getStorageSync('uid')) {
      request({
        url: app.globalData.api + "/api/operation/notice/info/" + (this.props.query.type ? "history/" : "") + this.props.query.id,
        method: 'POST',
        data: {
          id: parseInt(this.props.query.id)
        }
      }).then(res => {
        const uid = React.api.getStorageSync('uid');
        this.setState({
          detail: res.data.notice,
          isAuditor: typeof res.data.notice.noticeMemberEntityList.find(item => item.uid == uid) != 'undefined' || React.api.getStorageSync('role_id') == 39
        });
      });
    } else {
      React.api.request({
        url: app.globalData.api + "/api/operation/notice/info/" + (this.props.query.type ? "history/" : "") + this.props.query.id,
        method: 'POST',
        data: {
          id: parseInt(this.props.query.id)
        }
      }).then(res => {
        this.setState({
          detail: res.data.notice,
          isAuditor: false
        });
      });
    }
  },
  render: function () {
    var h = React.createElement;
    return h("view", {
      class: "page"
    }, h("view", {
      class: "page__bd",
      style: "padding-bottom:56px;"
    }, h("view", {
      class: "weui-panel"
    }, h("view", {
      class: "weui-panel__bd"
    }, h("view", {
      class: "weui-cells weui-cells_after-title weui-cells_without_border"
    }, h("view", {
      class: "weui-cell",
      style: "padding: 20px 15px"
    }, h("view", {
      class: "weui-cell__bd",
      style: "text-align: center;"
    }, h("view", null, this.state.detail.title)), this.state.isAuditor ? h("view", {
      class: "weui-cell__ft",
      style: "font-size: 10px;color: blue;position:absolute;right:15px;bottom:5px;",
      onTap: this.handleGoto,
      "data-tap-uid": "e77_125",
      "data-beacon-uid": "default"
    }, this.state.detail.readCount || 0, "\u6B21\u9605\u8BFB") : h("view", {
      class: "weui-cell__ft",
      style: "font-size: 10px;color: #888888;position:absolute;right:15px;bottom:5px;"
    }, this.state.detail.readCount || 0, "\u6B21\u9605\u8BFB")), h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("rich-text", {
      nodes: this.state.detail.content
    }))))))));;
  },
  classUid: "c3204"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '公告详情',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5',
  enablePullDownRefresh: true
};
Page(React.registerPage(Index, "pages/noticedetail/index"));
export default Index;
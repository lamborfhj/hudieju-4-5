function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "../../ReactWX.js";
import moment from "../../npm/moment/moment.js";
import { request } from "../../common/utils";
import { historyVoteDetail } from "../../common/data";
var app = React.getApp();

function Index() {
  this.getChartWidth = () => {
    let _this = this;

    React.api.getSystemInfo({
      success(res) {
        _this.setState({
          loading: false,
          sWidth: Number(res.screenWidth)
        });
      }

    });
  };

  this.state = {
    detail: {},
    sWidth: null,
    // canvas展示区域
    areaData: [],
    houseData: [],
    voteInfo: {}
  };
}

Index = React.toClass(Index, React.Component, {
  componentDidMount: function () {
    app.globalData.refreshFlags = _objectSpread({}, app.globalData.refreshFlags, {
      history: true
    });
  },
  onShow: function () {
    if (React.api.getStorageSync("uid") && React.api.getStorageSync("zone_id")) {
      // 已登录选择小区
      React.api.request({
        url: app.globalData.api + "/api/operation/vote/result/" + this.props.query.id,
        method: "POST"
      }).then(res => {
        this.setState({
          detail: res.data.result,
          voteInfo: res.data.result.bflyStatVoteList[0]
        });
      });
    } else {
      this.setState({
        detail: historyVoteDetail
      });
    }

    this.getChartWidth();
  },
  render: function () {
    var h = React.createElement;
    // console.log(this.state.detail,'detail')
    return h("view", {
      class: "page"
    }, this.state.detail ? h("view", {
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
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, this.state.detail.title)), h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("text", {
      style: "color:#898989"
    }, "\u53C2\u4F1A\u5F00\u59CB\u65F6\u95F4\uFF1A", this.state.detail.meetingStartTime))), h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("text", {
      style: "color:#898989"
    }, "\u53C2\u4F1A\u7ED3\u675F\u65F6\u95F4\uFF1A", this.state.detail.meetingEndTime))), h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("text", {
      style: "color:#898989"
    }, "\u6295\u7968\u5F00\u59CB\u65F6\u95F4\uFF1A", this.state.detail.voteStartTime))), h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("text", {
      style: "color:#898989"
    }, "\u6295\u7968\u7ED3\u675F\u65F6\u95F4\uFF1A", this.state.detail.voteEndTime))), h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("text", {
      style: "color:#898989"
    }, "\u5C0F\u533A\u603B\u6237\u6570\uFF1A", this.state.voteInfo.totalVoteQuantity, "\u6237"))), h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("text", {
      style: "color:#898989"
    }, "\u5C0F\u533A\u603B\u9762\u79EF\uFF1A", this.state.voteInfo.totalVoteArea, "m\xB2"))), h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    })), this.state.detail.offlineVoteResultUrl ? h("view", {
      style: React.toStyle({
        padding: '30px'
      }, this.props, 'style8708')
    }, h("view", null, "\u6700\u7EC8\u7EBF\u4E0B\u6295\u7968\u7ED3\u679C"), h("image", {
      class: "resultPic",
      src: this.state.detail.offlineVoteResultUrl
    })) : null, this.state.detail.bflyStatVoteList && this.state.detail.bflyStatVoteList.length > 0 ? h("view", null, h("view", {
      class: "title"
    }, "\u6700\u7EC8\u7EBF\u4E0A\u6295\u7968\u7ED3\u679C"), this.state.detail.bflyStatVoteList.map((historyItem, index) => {
      return h("view", {
        class: "weui-cell__bd",
        key: historyItem.id
      }, h("view", {
        class: "weui-cell__bd title"
      }, "\u5B50\u8868\u51B3", index + 1, ":", " ", historyItem.bflySubVoteTitle), h("view", {
        class: "tableTitle"
      }, historyItem.totalVoteQuantity ? "\u5C0F\u533A\u603B\u6237\u6570\uFF1A" + historyItem.totalVoteQuantity : null, " ", historyItem.totalVoteArea ? "小区总面积：" + historyItem.totalVoteArea + "m²" : null), h(React.useComponent, {
        data: historyItem,
        is: "VoteTable",
        "data-instance-uid": 'i156_28_' + index
      }));
    })) : null)))) : null);;
  },
  classUid: "c6543"
}, {});
Index.config = {
  backgroundTextStyle: "light",
  navigationBarTextStyle: "white",
  navigationBarTitleText: "业主大会详情",
  navigationBarBackgroundColor: "#292929",
  backgroundColor: "#F5f5f5",
  enablePullDownRefresh: true
};
Page(React.registerPage(Index, "pages/historyVoteDetail/index"));
export default Index;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "../../ReactWX.js";
import { request } from "../../common/utils";
var app = React.getApp();

function Index() {
  this.handlePreviewImage = url => {
    React.api.previewImage({
      urls: this.state.imgs,
      current: url
    });
  };

  this.handlePreviewSign = url => {
    if (url) {
      React.api.previewImage({
        urls: [url],
        current: url
      });
    }
  };

  this.handleDisagree = () => {
    React.api.showModal({
      title: '拒绝申请',
      content: '确认拒绝该报销吗？'
    }).then(res => {
      if (res.confirm) {
        app.globalData.refreshFlags = _objectSpread({}, app.globalData.refreshFlags, {
          myBill: true
        });
        app.globalData.requestData2Sign = {
          url: app.globalData.api + "/api/operation/bill/verify",
          data: {
            bid: parseInt(this.state.detail.id),
            billMemberStatusEnum: 2,
            uid: React.api.getStorageSync('uid')
          }
        };
        React.api.navigateTo({
          url: '/pages/signature/index'
        });
      }
    });
  };

  this.handleAgree = () => {
    React.api.showModal({
      title: '同意申请',
      content: '确认同意该报销吗？'
    }).then(res => {
      if (res.confirm) {
        app.globalData.refreshFlags = _objectSpread({}, app.globalData.refreshFlags, {
          myBill: true
        });
        app.globalData.requestData2Sign = {
          url: app.globalData.api + "/api/operation/bill/verify",
          data: {
            bid: parseInt(this.state.detail.id),
            billMemberStatusEnum: 1,
            uid: React.api.getStorageSync('uid')
          }
        };
        React.api.navigateTo({
          url: '/pages/signature/index'
        });
      }
    });
  };

  this.state = {
    detail: {},
    imgs: [],
    isAuditor: false // 是否审核员

  };
}

Index = React.toClass(Index, React.Component, {
  componentDidMount: function () {
    app.globalData.refreshFlags = _objectSpread({}, app.globalData.refreshFlags, {
      myBill: false
    });
  },
  onShow: function () {
    if (React.api.getStorageSync('uid')) {
      request({
        url: app.globalData.api + "/api/operation/bill/info/" + (this.props.query.type ? "history/" : "") + this.props.query.id,
        method: 'POST',
        data: {
          id: parseInt(this.props.query.id)
        }
      }).then(res => {
        const uid = React.api.getStorageSync('uid');
        this.setState({
          detail: res.data.bill,
          imgs: res.data.bill.fileList.map(file => file.url),
          isAuditor: typeof res.data.bill.verifyMemberEntityList.find(item => item.uid == uid) != 'undefined'
        });
      });
    } else {
      React.api.request({
        url: app.globalData.api + "/api/operation/bill/info/" + (this.props.query.type ? "history/" : "") + this.props.query.id,
        method: 'POST',
        data: {
          id: parseInt(this.props.query.id)
        }
      }).then(res => {
        this.setState({
          detail: res.data.bill,
          imgs: res.data.bill.fileList.map(file => file.url),
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
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__hd",
      style: "margin-right: 10px;"
    }, h("image", {
      src: this.state.detail.avatarUrl,
      class: "avatar"
    })), h("view", {
      class: "weui-cell__bd"
    }, h("view", null, this.state.detail.name, "\u7684\u62A5\u9500\u7533\u8BF7"), h("view", {
      style: "font-size: 13px;color: #c8894e;"
    }, this.state.detail.statusCn))), h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("text", {
      style: "color:#898989"
    }, "\u7533\u8BF7\u4EBA\uFF1A"), h("text", null, this.state.detail.name))), h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("text", {
      style: "color:#898989"
    }, "\u53D1\u751F\u65E5\u671F\uFF1A"), h("text", null, this.state.detail.happenDate))), h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("text", {
      style: "color:#898989"
    }, "\u91D1\u989D\uFF1A"), h("text", null, "\xA5", this.state.detail.money))), h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("text", {
      style: "color:#898989"
    }, "\u62A5\u9500\u5185\u5BB9\uFF1A"), h("text", null, this.state.detail.content))), this.state.imgs.length && h("view", {
      class: "weui-cell"
    }, h("view", {
      class: "weui-cell__bd"
    }, this.state.imgs.map((url, i5329) => h("view", {
      class: "weui-uploader__file",
      key: url,
      onTap: () => this.handlePreviewImage(url),
      "data-tap-uid": 'e169_26_' + i5329,
      "data-beacon-uid": "default"
    }, h("image", {
      src: url,
      class: "img_small"
    })))))))), h("view", {
      class: "weui-panel"
    }, h("view", {
      class: "weui-panel__hd"
    }, "\u5BA1\u6279\u4EBA"), h("view", {
      class: "weui-panel__bd"
    }, h("view", {
      class: "weui-cells weui-cells_after-title weui-cells_without_border"
    }, this.state.detail.verifyMemberEntityList && this.state.detail.verifyMemberEntityList.map(function (item, index) {
      return h(React.Fragment, null, h("view", {
        class: "weui-cell weui-cell_without_border",
        key: item.id
      }, h("view", {
        class: "weui-cell__hd",
        style: "margin-right: 10px;",
        onTap: () => this.handlePreviewSign(member.verifyUrl),
        "data-tap-uid": 'e189_80_' + index,
        "data-beacon-uid": "default"
      }, h("image", {
        src: item.avatarUrl,
        class: "avatar"
      })), h("view", {
        class: "weui-cell__bd"
      }, h("view", null, item.memberRealname), h("view", {
        style: "font-size: 13px;color: #888888;"
      }, item.verifyTime && "\u5BA1\u6838\u65F6\u95F4:" + item.verifyTime), h("view", {
        style: "font-size: 13px;color: #c8894e;"
      }, item.statusCn))), this.state.detail.verifyMemberEntityList && this.state.detail.verifyMemberEntityList.length > index + 1 ? h("view", {
        style: "background-color:black;width:1px;height:30px;margin-left:40px;"
      }) : null);
    }, this)))), h("view", {
      class: "weui-panel"
    }, h("view", {
      class: "weui-panel__hd"
    }, "\u6284\u9001\u4EBA"), h("view", {
      class: "weui-panel__bd"
    }, this.state.detail.copyToMemberEntityList && this.state.detail.copyToMemberEntityList.length && h("view", {
      class: "weui-cell weui-cell_without_border"
    }, h("view", {
      class: "weui-cell__bd"
    }, this.state.detail.copyToMemberEntityList.map((member, i7728) => h("view", {
      class: "weui-uploader__file",
      key: member.id,
      style: "text-align:center;width:60px;"
    }, h("view", null, h("image", {
      src: member.avatarUrl,
      class: "avatar_small"
    })), h("view", null, h("text", {
      style: "font-size:14px;text-overflow:ellipsis;"
    }, member.memberRealname)))))))), this.state.isAuditor && this.state.detail.memberStatus == 0 && h("view", {
      class: "bottom_btn_area"
    }, h("button", {
      onTap: this.handleDisagree,
      "data-tap-uid": "e231_22",
      "data-beacon-uid": "default"
    }, "\u4E0D\u540C\u610F"), h("button", {
      onTap: this.handleAgree,
      "data-tap-uid": "e232_22",
      "data-beacon-uid": "default"
    }, "\u540C\u610F"))));;
  },
  classUid: "c8772"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '报销详情',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5',
  enablePullDownRefresh: true
};
Page(React.registerPage(Index, "pages/billdetail/index"));
export default Index;
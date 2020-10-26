function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "../../ReactWX.js";
import { request } from "../../common/utils";
var app = React.getApp();

function Index() {
  this.handlePreviewImage = url => {
    if (!this.state.detail.memberStatus || this.state.detail.memberStatus == 0) {
      React.api.showToast({
        title: '您还未签收，请先签收！',
        icon: 'none'
      });
    } else {
      React.api.previewImage({
        urls: this.state.imgs.map(file => file.url),
        current: url
      });
    }
  };

  this.handlePreviewFile = url => {
    if (!this.state.detail.memberStatus || this.state.detail.memberStatus == 0) {
      React.api.showToast({
        title: '您还未签收，请先签收！',
        icon: 'none'
      });
    } else {
      React.api.showLoading({
        title: '加载中...'
      });
      React.api.downloadFile({
        url: url,
        success: function (res) {
          React.api.hideLoading();
          React.api.openDocument({
            filePath: res.tempFilePath
          });
        }
      });
    }
  };

  this.handlePreviewSign = url => {
    if (url) {
      React.api.previewImage({
        urls: [url],
        current: url
      });
    }
  };

  this.handleSign = () => {
    app.globalData.refreshFlags = _objectSpread({}, app.globalData.refreshFlags, {
      myPaper: true
    });
    app.globalData.requestData2Sign = {
      url: app.globalData.api + "/api/operation/paper/paperSign",
      data: {
        pid: parseInt(this.state.detail.id),
        uid: React.api.getStorageSync('uid')
      }
    };
    React.api.navigateTo({
      url: '/pages/signature/index'
    });
  };

  this.state = {
    detail: {},
    imgs: [],
    files: [],
    isAuditor: false // 是否收件人

  };
}

Index = React.toClass(Index, React.Component, {
  componentDidMount: function () {
    app.globalData.refreshFlags = _objectSpread({}, app.globalData.refreshFlags, {
      myPaper: false
    });
  },
  onShow: function () {
    if (React.api.getStorageSync('uid')) {
      request({
        url: app.globalData.api + "/api/operation/paper/info/" + (this.props.query.type ? "history/" : "") + this.props.query.id,
        method: 'POST',
        data: {
          id: parseInt(this.props.query.id)
        }
      }).then(res => {
        const uid = React.api.getStorageSync('uid');
        this.setState({
          detail: res.data.paper,
          imgs: res.data.paper.fileList.filter(file => file.url.toLowerCase().match(/\.(jpeg|jpg|gif|png|ico)$/) != null),
          files: res.data.paper.fileList.filter(file => file.url.toLowerCase().match(/\.(jpeg|jpg|gif|png|ico)$/) == null),
          isAuditor: typeof res.data.paper.paperMemberEntityList.find(item => item.uid == uid) != 'undefined'
        });
      });
    } else {
      React.api.request({
        url: app.globalData.api + "/api/operation/paper/info/" + (this.props.query.type ? "history/" : "") + this.props.query.id,
        method: 'POST',
        data: {
          id: parseInt(this.props.query.id)
        }
      }).then(res => {
        this.setState({
          detail: res.data.paper,
          imgs: res.data.paper.fileList.filter(file => file.url.toLowerCase().match(/\.(jpeg|jpg|gif|png|ico)$/) != null),
          files: res.data.paper.fileList.filter(file => file.url.toLowerCase().match(/\.(jpeg|jpg|gif|png|ico)$/) == null),
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
    }, h("view", null, this.state.detail.title), h("view", {
      style: "font-size: 13px;color: #c8894e;"
    }, this.state.detail.statusCn))), h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("text", {
      style: "color:#898989"
    }, "\u53D1\u51FD\u65E5\u671F\uFF1A"), h("text", null, this.state.detail.createTime))), h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("text", {
      style: "color:#898989"
    }, "\u51FD\u4EF6\u5185\u5BB9\uFF1A"), h("text", null, this.state.detail.content))), this.state.files.length && h("view", {
      class: "weui-cell"
    }, h("view", {
      class: "weui-cell__bd"
    }, this.state.files.map((file, i4974) => h("view", {
      style: "font-size:14px;color:blue;",
      onTap: () => this.handlePreviewFile(file.url),
      "data-tap-uid": 'e153_26_' + i4974,
      "data-beacon-uid": "default"
    }, file.name)))), this.state.imgs.length && h("view", {
      class: "weui-cell"
    }, h("view", {
      class: "weui-cell__bd"
    }, this.state.imgs.map((file, i5524) => h("view", {
      class: "weui-uploader__file",
      key: file.url,
      onTap: () => this.handlePreviewImage(file.url),
      "data-tap-uid": 'e167_26_' + i5524,
      "data-beacon-uid": "default"
    }, h("image", {
      src: file.url,
      class: "img_small"
    })))))))), h("view", {
      class: "weui-panel"
    }, h("view", {
      class: "weui-panel__hd"
    }, "\u6536\u4EF6\u4EBA"), h("view", {
      class: "weui-panel__bd"
    }, h("view", {
      class: "weui-cells weui-cells_after-title weui-cells_without_border"
    }, this.state.detail.paperMemberEntityList && this.state.detail.paperMemberEntityList.map(function (item, index) {
      return h(React.Fragment, null, h("view", {
        class: "weui-cell weui-cell_without_border",
        key: item.id
      }, h("view", {
        class: "weui-cell__hd",
        style: "margin-right: 10px;",
        onTap: () => this.handlePreviewSign(item.verifyUrl),
        "data-tap-uid": 'e187_80_' + index,
        "data-beacon-uid": "default"
      }, h("image", {
        src: item.avatarUrl,
        class: "avatar"
      })), h("view", {
        class: "weui-cell__bd"
      }, h("view", null, item.realname), h("view", {
        style: "font-size: 13px;color: #888888;"
      }, item.signTime && "\u7B7E\u6536\u65F6\u95F4:" + item.signTime), h("view", {
        style: "font-size: 13px;color: #c8894e;"
      }, item.statusCn))), this.state.detail.paperMemberEntityList && this.state.detail.paperMemberEntityList.length > index + 1 ? h("view", {
        style: "background-color:black;width:1px;height:30px;margin-left:40px;"
      }) : null);
    }, this)))), this.state.isAuditor && this.state.detail.memberStatus == 0 && h("view", {
      class: "bottom_btn_area"
    }, h("button", {
      onTap: this.handleSign,
      "data-tap-uid": "e208_22",
      "data-beacon-uid": "default"
    }, "\u7B7E\u6536"))));;
  },
  classUid: "c7924"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '函件详情',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5',
  enablePullDownRefresh: true
};
Page(React.registerPage(Index, "pages/paperdetail/index"));
export default Index;
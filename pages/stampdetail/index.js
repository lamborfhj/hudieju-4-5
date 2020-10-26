function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "../../ReactWX.js";
import moment from "../../npm/moment/moment.js";
import { request } from "../../common/utils";
var app = React.getApp();

function Index() {
  this.handlePreviewImage = url => {
    React.api.previewImage({
      urls: this.state.imgs.map(file => file.url),
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

  this.handlePreviewFile = url => {
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
  };

  this.handleDisagree = () => {
    React.api.showModal({
      title: '拒绝申请',
      content: '确认拒绝该用章申请吗？'
    }).then(res => {
      if (res.confirm) {
        app.globalData.refreshFlags = _objectSpread({}, app.globalData.refreshFlags, {
          myStamp: true
        });
        app.globalData.requestData2Sign = {
          url: app.globalData.api + "/api/operation/request/verify",
          data: {
            requestId: parseInt(this.state.detail.id),
            requestMemberVerifyStatusEnum: '未通过',
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
      content: '确认同意该用章申请吗？'
    }).then(res => {
      if (res.confirm) {
        app.globalData.refreshFlags = _objectSpread({}, app.globalData.refreshFlags, {
          myStamp: true
        });
        app.globalData.requestData2Sign = {
          url: app.globalData.api + "/api/operation/request/verify",
          data: {
            requestId: parseInt(this.state.detail.id),
            requestMemberVerifyStatusEnum: '通过',
            uid: React.api.getStorageSync('uid')
          }
        };
        React.api.navigateTo({
          url: '/pages/signature/index'
        });
      }
    });
  };

  this.handleRevoke = () => {
    React.api.showModal({
      title: '撤销申请',
      content: '确认撤销该用章申请吗？'
    }).then(res => {
      if (res.confirm) {
        request({
          url: app.globalData.api + "/api/operation/request/requestCancel",
          method: 'POST',
          data: {
            rid: parseInt(this.state.detail.id),
            uid: React.api.getStorageSync('uid')
          }
        }).then(res => {
          if (res.data.msg === 'success') {
            React.api.showToast({
              title: '撤销成功！'
            }).then(() => {
              app.globalData.refreshFlags = _objectSpread({}, app.globalData.refreshFlags, {
                myStamp: true
              });
              setTimeout(() => {
                React.api.navigateBack();
              }, 1500);
            });
          } else {
            React.api.showToast({
              title: res.data.msg,
              icon: 'none'
            });
          }
        });
      }
    });
  };

  this.state = {
    detail: {},
    imgs: [],
    files: [],
    isValidStatus: false,
    isAuditor: false,
    // 是否审核员
    isOriginator: false,
    // 是否发起人
    isBeforeEndtime: false
  };
}

Index = React.toClass(Index, React.Component, {
  componentDidMount: function () {
    app.globalData.refreshFlags = _objectSpread({}, app.globalData.refreshFlags, {
      myStamp: false
    });
  },
  onShow: function () {
    if (React.api.getStorageSync('uid')) {
      request({
        url: app.globalData.api + "/api/operation/request/info/" + (this.props.query.type ? "history/" : "") + this.props.query.id,
        method: 'POST',
        data: {
          id: parseInt(this.props.query.id)
        }
      }).then(res => {
        const uid = React.api.getStorageSync('uid');
        this.setState({
          detail: res.data.request,
          imgs: res.data.request.fileList.filter(file => file.url.toLowerCase().match(/\.(jpeg|jpg|gif|png|ico)$/) != null),
          files: res.data.request.fileList.filter(file => file.url.toLowerCase().match(/\.(jpeg|jpg|gif|png|ico)$/) == null),
          isValidStatus: [0, 1, 3].includes(res.data.request.status),
          isAuditor: typeof res.data.request.verifyMemberEntityList.find(item => item.uid == uid) != 'undefined',
          isOriginator: res.data.request.uid == uid,
          isBeforeEndtime: moment().isBefore(moment(res.data.request.useDate).add(1, 'days'))
        });
      });
    } else {
      React.api.request({
        url: app.globalData.api + "/api/operation/request/info/" + (this.props.query.type ? "history/" : "") + this.props.query.id,
        method: 'POST',
        data: {
          id: parseInt(this.props.query.id)
        }
      }).then(res => {
        this.setState({
          detail: res.data.request,
          imgs: res.data.request.fileList.filter(file => file.url.toLowerCase().match(/\.(jpeg|jpg|gif|png|ico)$/) != null),
          files: res.data.request.fileList.filter(file => file.url.toLowerCase().match(/\.(jpeg|jpg|gif|png|ico)$/) == null),
          isValidStatus: false,
          isAuditor: false,
          isOriginator: false,
          isBeforeEndtime: moment().isBefore(moment(res.data.request.useDate).add(1, 'days'))
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
    }, h("view", null, this.state.detail.uname, "\u7684\u7528\u7AE0\u7533\u8BF7"), h("view", {
      style: "font-size: 13px;color: #c8894e;"
    }, this.state.detail.statusCn))), h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("text", {
      style: "color:#898989"
    }, "\u7ECF\u529E\u4EBA\uFF1A"), h("text", null, this.state.detail.uname))), h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("text", {
      style: "color:#898989"
    }, "\u622A\u6B62\u65E5\u671F\uFF1A"), h("text", null, this.state.detail.useDate))), h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("text", {
      style: "color:#898989"
    }, "\u7528\u7AE0\u6587\u4EF6\u540D\uFF1A"), h("text", null, this.state.detail.documentName))), h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("text", {
      style: "color:#898989"
    }, "\u6587\u4EF6\u4EFD\u6570\uFF1A"), h("text", null, this.state.detail.num))), h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("text", {
      style: "color:#898989"
    }, "\u6587\u4EF6\u7C7B\u522B\uFF1A"), h("text", null, this.state.detail.fileTypeCn))), h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("text", {
      style: "color:#898989"
    }, "\u52A0\u76D6\u4F55\u79CD\u516C\u7AE0\uFF1A"), h("text", null, this.state.detail.sealCn))), h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("text", {
      style: "color:#898989"
    }, "\u8BE6\u60C5\uFF1A"), h("text", null, this.state.detail.notice))), this.state.files.length && h("view", {
      class: "weui-cell"
    }, h("view", {
      class: "weui-cell__bd"
    }, this.state.files.map((file, i8420) => h("view", {
      style: "font-size:14px;color:blue;",
      onTap: () => this.handlePreviewFile(file.url),
      "data-tap-uid": 'e251_26_' + i8420,
      "data-beacon-uid": "default"
    }, file.name)))), this.state.imgs.length && h("view", {
      class: "weui-cell"
    }, h("view", {
      class: "weui-cell__bd"
    }, this.state.imgs.map((file, i8970) => h("view", {
      class: "weui-uploader__file",
      key: file.url,
      onTap: () => this.handlePreviewImage(file.url),
      "data-tap-uid": 'e265_26_' + i8970,
      "data-beacon-uid": "default"
    }, h("image", {
      src: file.url,
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
        onTap: () => this.handlePreviewSign(item.verifyUrl),
        "data-tap-uid": 'e285_80_' + index,
        "data-beacon-uid": "default"
      }, h("image", {
        src: item.avatarUrl,
        class: "avatar"
      })), h("view", {
        class: "weui-cell__bd"
      }, h("view", null, item.realname), h("view", {
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
    }, this.state.detail.copyToMemberEntityList.map((member, i11377) => h("view", {
      class: "weui-uploader__file",
      key: member.id,
      style: "text-align:center;width:60px;"
    }, h("view", null, h("image", {
      src: member.avatarUrl,
      class: "avatar_small"
    })), h("view", null, h("text", {
      style: "font-size:14px;text-overflow:ellipsis;"
    }, member.realname)))))))), this.state.isBeforeEndtime && h("view", {
      class: "bottom_btn_area"
    }, this.state.isAuditor && this.state.isValidStatus && this.state.detail.memberStatus == 0 && h(React.Fragment, null, h("button", {
      onTap: this.handleDisagree,
      "data-tap-uid": "e330_26",
      "data-beacon-uid": "default"
    }, "\u4E0D\u540C\u610F"), h("button", {
      onTap: this.handleAgree,
      "data-tap-uid": "e331_26",
      "data-beacon-uid": "default"
    }, "\u540C\u610F")), this.state.isOriginator && this.state.detail.status == 0 && h("button", {
      onTap: this.handleRevoke,
      "data-tap-uid": "e335_24",
      "data-beacon-uid": "default"
    }, "\u64A4\u9500"))));;
  },
  classUid: "c12816"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '用章详情',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5',
  enablePullDownRefresh: true
};
Page(React.registerPage(Index, "pages/stampdetail/index"));
export default Index;
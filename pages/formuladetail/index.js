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

  this.handlePreviewImage2 = url => {
    React.api.previewImage({
      urls: this.state.detail.publicityFileList.map(file => file.url),
      current: url
    });
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

  this.handleGotoFinish = () => {
    React.api.navigateTo({
      url: "/pages/submitformulafinish/index?id=" + this.props.query.id
    });
    app.globalData.refreshFlags = _objectSpread({}, app.globalData.refreshFlags, {
      formula: true
    });
  };

  this.handleRevoke = () => {
    React.api.showModal({
      title: '撤销申请',
      content: '确认撤销该公示吗？'
    }).then(res => {
      if (res.confirm) {
        request({
          url: app.globalData.api + "/api/operation/announce/revoke",
          method: 'POST',
          data: {
            aid: parseInt(this.state.detail.id),
            opeName: 'revoke',
            uid: React.api.getStorageSync('uid')
          }
        }).then(res => {
          if (res.data.msg === 'success') {
            React.api.showToast({
              title: '撤销成功！'
            }).then(() => {
              app.globalData.refreshFlags = _objectSpread({}, app.globalData.refreshFlags, {
                formula: true
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
    isAuditor: false,
    // 是否参会人员
    isOriginator: false,
    // 是否发起人
    isBeforeEndtime: false
  };
}

Index = React.toClass(Index, React.Component, {
  componentDidMount: function () {
    app.globalData.refreshFlags = _objectSpread({}, app.globalData.refreshFlags, {
      formula: false
    });
  },
  onShow: function () {
    if (React.api.getStorageSync('uid')) {
      request({
        url: app.globalData.api + "/api/operation/announce/info/" + (this.props.query.type ? "history/" : "") + this.props.query.id,
        method: 'POST',
        data: {
          id: parseInt(this.props.query.id)
        }
      }).then(res => {
        const uid = React.api.getStorageSync('uid');
        this.setState({
          detail: res.data.announce,
          imgs: res.data.announce.fileList.filter(file => file.url.toLowerCase().match(/\.(jpeg|jpg|gif|png|ico)$/) != null),
          files: res.data.announce.fileList.filter(file => file.url.toLowerCase().match(/\.(jpeg|jpg|gif|png|ico)$/) == null),
          isAuditor: typeof res.data.announce.memberEntityList.find(item => item.uid == uid) != 'undefined',
          isOriginator: res.data.announce.uid == uid,
          isBeforeEndtime: moment().isBefore(moment(res.data.announce.endTime))
        });
      });
    } else {
      React.api.request({
        url: app.globalData.api + "/api/operation/announce/info/" + (this.props.query.type ? "history/" : "") + this.props.query.id,
        method: 'POST',
        data: {
          id: parseInt(this.props.query.id)
        }
      }).then(res => {
        this.setState({
          detail: res.data.announce,
          imgs: res.data.announce.fileList.filter(file => file.url.toLowerCase().match(/\.(jpeg|jpg|gif|png|ico)$/) != null),
          files: res.data.announce.fileList.filter(file => file.url.toLowerCase().match(/\.(jpeg|jpg|gif|png|ico)$/) == null),
          isAuditor: false,
          isOriginator: false,
          isBeforeEndtime: moment().isBefore(moment(res.data.announce.endTime))
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
    }, "\u516C\u793A\u4EBA\uFF1A"), h("text", null, this.state.detail.manager))), h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("text", {
      style: "color:#898989"
    }, "\u7ECF\u529E\u4EBA\uFF1A"), h("text", null, this.state.detail.realname))), h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("text", {
      style: "color:#898989"
    }, "\u5F00\u59CB\u65E5\u671F\uFF1A"), h("text", null, this.state.detail.startTime))), h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("text", {
      style: "color:#898989"
    }, "\u622A\u6B62\u65E5\u671F\uFF1A"), h("text", null, this.state.detail.endTime))), this.state.files.length && h("view", {
      class: "weui-cell"
    }, h("view", {
      class: "weui-cell__bd"
    }, this.state.files.map((file, i6340) => h("view", {
      style: "font-size:14px;color:blue;",
      onTap: () => this.handlePreviewFile(file.url),
      "data-tap-uid": 'e189_26_' + i6340,
      "data-beacon-uid": "default"
    }, file.name))))))), h("view", {
      class: "weui-panel"
    }, h("view", {
      class: "weui-panel__hd"
    }, "\u8BE6\u60C5"), h("view", {
      class: "weui-panel__bd",
      style: "padding: 5px 15px"
    }, h("rich-text", {
      nodes: this.state.detail.content
    }))), this.state.imgs.length && h("view", {
      class: "weui-panel"
    }, h("view", {
      class: "weui-panel__hd"
    }, "\u56FE\u7247\u8BE6\u60C5"), h("view", {
      class: "weui-panel__bd",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cells weui-cells_after-title weui-cells_without_border"
    }, this.state.imgs.map(function (file, i7955) {
      return h("view", {
        class: "weui-cell",
        key: file.url
      }, h("view", {
        class: "weui-cell__hd",
        style: "margin-right: 10px;",
        onTap: () => this.handlePreviewImage(file.url),
        "data-tap-uid": 'e230_80_' + i7955,
        "data-beacon-uid": "default"
      }, h("image", {
        src: file.url,
        class: "img_small"
      })), h("view", {
        class: "weui-cell__bd"
      }, h("view", {
        style: "font-size: 13px;color: #888888;"
      }, "\u4E0A\u4F20\u65F6\u95F4: " + file.createTime)));
    }, this)))), h("view", {
      class: "weui-panel"
    }, h("view", {
      class: "weui-panel__hd"
    }, "\u5B8C\u6210\u60C5\u51B5\u8BF4\u660E"), h("view", {
      class: "weui-panel__bd"
    }, h("view", {
      class: "weui-cells weui-cells_after-title weui-cells_without_border"
    }, this.state.detail.remark && h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, this.state.detail.remark || "")), this.state.detail.publicityFileList && this.state.detail.publicityFileList.map(function (file, i9189) {
      return h("view", {
        class: "weui-cell weui-cell_without_border",
        key: file.url
      }, h("view", {
        class: "weui-cell__hd",
        style: "margin-right: 10px;",
        onTap: () => this.handlePreviewImage2(file.url),
        "data-tap-uid": 'e256_78_' + i9189,
        "data-beacon-uid": "default"
      }, h("image", {
        src: file.url,
        class: "img_small"
      })), h("view", {
        class: "weui-cell__bd"
      }, h("view", {
        style: "font-size: 13px;color: #888888;"
      }, "\u4E0A\u4F20\u65F6\u95F4: " + file.createTime)));
    }, this)))), h("view", {
      class: "weui-panel"
    }, h("view", {
      class: "weui-panel__hd"
    }, "\u6536\u4EF6\u4EBA"), h("view", {
      class: "weui-panel__bd"
    }, this.state.detail.memberEntityList && this.state.detail.memberEntityList.length && h("view", {
      class: "weui-cell weui-cell_without_border"
    }, h("view", {
      class: "weui-cell__bd"
    }, this.state.detail.memberEntityList.map((member, i10943) => h("view", {
      class: "weui-uploader__file",
      key: member.id,
      style: "text-align:center;width:60px;"
    }, h("view", null, h("image", {
      src: member.avatarUrl,
      class: "avatar_small"
    })), h("view", null, h("text", {
      style: "font-size:14px;text-overflow:ellipsis;"
    }, member.realname)))))))), h("view", {
      class: "bottom_btn_area"
    }, !this.state.isBeforeEndtime && this.state.detail.status == 0 && this.state.isAuditor && h("button", {
      onTap: this.handleGotoFinish,
      "data-tap-uid": "e305_22",
      "data-beacon-uid": "default"
    }, "\u5B8C\u6210\u516C\u793A"), this.state.isBeforeEndtime && this.state.detail.status == 0 && this.state.isOriginator && h("button", {
      onTap: this.handleRevoke,
      "data-tap-uid": "e308_22",
      "data-beacon-uid": "default"
    }, "\u64A4\u9500"))));;
  },
  classUid: "c12112"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '公示详情',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5',
  enablePullDownRefresh: true
};
Page(React.registerPage(Index, "pages/formuladetail/index"));
export default Index;
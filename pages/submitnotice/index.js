function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "../../ReactWX.js";
import { request } from "../../common/utils";
var app = React.getApp();

function Index() {
  this.handleReady = () => {
    this;
    React.api.createSelectorQuery().select('#editor').context(res => {
      console.log(res, 'res111111');
      this.setState({
        editorCtx: res.context
      });
    }).exec();
  };

  this.handleInsertImage = () => {
    const that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        React.api.uploadFile({
          url: app.globalData.api + "/api/common/upload",
          name: 'file',
          filePath: res.tempFilePaths[0],

          success(res) {
            that.state.editorCtx.insertImage({
              src: JSON.parse(res.data).url,
              width: '100%'
            });
          }

        });
      }
    });
  };

  this.handleGoto = () => {
    React.api.navigateTo({
      url: '/pages/member/index?selectMode=true&service=noticeAddressees'
    });
  };

  this.handleSubmit = e => {
    const that = this;

    if (e.value.title == '') {
      React.api.showToast({
        title: '请输入公告标题！',
        icon: 'none'
      });
      return false;
    }

    console.log(that.state, 'that.state.editorCtx');
    that.state.editorCtx.getContents({
      success(res) {
        if (res.text == '\n') {
          React.api.showToast({
            title: '请输入公告内容！',
            icon: 'none'
          });
          return false;
        }

        React.api.showLoading({
          title: '创建公告中...'
        });
        that.setState({
          disabled: true
        });
        request({
          url: app.globalData.api + "/api/operation/notice/save",
          method: 'POST',
          data: _objectSpread({}, e.value, {
            content: res.html.replace(/"/g, "'"),
            noticeMemberEntityList: that.state.addressees.map(item => {
              return {
                uid: item.id
              };
            }),
            uid: React.api.getStorageSync('uid'),
            zoneIdSet: [React.api.getStorageSync('zone_id')]
          })
        }).then(res => {
          React.api.hideLoading();
          that.setState({
            disabled: false
          });

          if (res.data.msg === 'success') {
            app.globalData.selectedMembers = _objectSpread({}, app.globalData.selectedMembers, {
              noticeAddressees: []
            });
            app.globalData.refreshFlags = _objectSpread({}, app.globalData.refreshFlags, {
              myNotice: true
            });
            React.api.showToast({
              title: '创建成功！'
            }).then(() => {
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
    disabled: false,
    toolbarStatus: {},
    editorCtx: {},
    addressees: [] // 收件人

  };
}

Index = React.toClass(Index, React.Component, {
  onShow: function () {
    this.setState({
      addressees: app.globalData.selectedMembers['noticeAddressees'] || []
    });
  },
  handleFormat: function (name, value) {
    const status = this.state.toolbarStatus;
    status[name + value] = status[name + value] ? false : true;
    this.setState({
      toolbarStatus: status
    });
    this.state.editorCtx.format(name, status[name + value] ? value : "");
  },
  render: function () {
    var h = React.createElement;
    console.log(this.state.editorCtx, 'this.state.editorCtx111');
    return h("view", {
      class: "page"
    }, h("view", {
      class: "page__bd",
      style: "padding-bottom:56px;"
    }, h("form", {
      onSubmit: this.handleSubmit,
      "data-submit-uid": "e135_16",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-cells weui-cells_after-title"
    }, h("view", {
      class: "weui-cell weui-cell_input"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("input", {
      name: "title",
      class: "weui-input",
      placeholder: "\u8BF7\u8F93\u5165\u516C\u544A\u6807\u9898"
    }))), h("view", {
      class: "weui-cell",
      style: "padding: 0 15px;"
    }, h("view", {
      class: "weui-cell__bd",
      style: "width: 100%;"
    }, h("view", {
      class: "toolbar"
    }, h("view", {
      class: "iconfont icon-charutupian",
      onTap: this.handleInsertImage,
      "data-tap-uid": "e146_58",
      "data-beacon-uid": "default"
    }), h("view", {
      class: "iconfont icon-format-header-2 " + (this.state.toolbarStatus["header2"] ? "ql-active" : ""),
      onTap: () => this.handleFormat("header", "2"),
      "data-tap-uid": "e147_121",
      "data-beacon-uid": "default"
    }), h("view", {
      class: "iconfont icon-format-header-3 " + (this.state.toolbarStatus["header3"] ? "ql-active" : ""),
      onTap: () => this.handleFormat("header", "3"),
      "data-tap-uid": "e148_121",
      "data-beacon-uid": "default"
    }), h("view", {
      class: "iconfont icon-zitijiacu " + (this.state.toolbarStatus["bold"] ? "ql-active" : ""),
      onTap: () => this.handleFormat("bold", ""),
      "data-tap-uid": "e149_112",
      "data-beacon-uid": "default"
    }), h("view", {
      class: "iconfont icon-zitixieti " + (this.state.toolbarStatus["italic"] ? "ql-active" : ""),
      onTap: () => this.handleFormat("italic", ""),
      "data-tap-uid": "e150_114",
      "data-beacon-uid": "default"
    }), h("view", {
      class: "iconfont icon-zitixiahuaxian " + (this.state.toolbarStatus["underline"] ? "ql-active" : ""),
      onTap: () => this.handleFormat("underline", ""),
      "data-tap-uid": "e151_122",
      "data-beacon-uid": "default"
    }), h("view", {
      class: "iconfont icon--checklist " + (this.state.toolbarStatus["listcheck"] ? "ql-active" : ""),
      onTap: () => this.handleFormat("list", "check"),
      "data-tap-uid": "e152_118",
      "data-beacon-uid": "default"
    }), h("view", {
      class: "iconfont icon-youxupailie " + (this.state.toolbarStatus["listordered"] ? "ql-active" : ""),
      onTap: () => this.handleFormat("list", "ordered"),
      "data-tap-uid": "e153_121",
      "data-beacon-uid": "default"
    }), h("view", {
      class: "iconfont icon-wuxupailie " + (this.state.toolbarStatus["listbullet"] ? "ql-active" : ""),
      onTap: () => this.handleFormat("list", "bullet"),
      "data-tap-uid": "e154_119",
      "data-beacon-uid": "default"
    })), h("view", null, h("view", {
      id: "editor",
      class: "ql-container",
      style: "height:400px",
      onReady: this.handleReady,
      "data-ready-uid": "e162_22",
      "data-beacon-uid": "default"
    })))), h("view", {
      class: "weui-cell"
    }, h("view", {
      class: "weui-cell__hd"
    }, h("text", {
      class: "icon_star"
    }, "*"), h("text", null, "\u6536\u4EF6\u4EBA"))), h("view", {
      class: "weui-cell weui-cell_without_border"
    }, h("view", {
      class: "weui-cell__bd"
    }, this.state.addressees.map((member, i6434) => h("view", {
      class: "weui-uploader__file",
      key: member.id,
      style: "text-align:center;width:60px;"
    }, h("view", null, h("image", {
      src: member.avatarUrl,
      class: "avatar_small"
    })), h("view", null, h("text", {
      style: "font-size:14px;text-overflow:ellipsis;"
    }, member.realname)))), h("view", {
      class: "weui-uploader__file",
      onTap: this.handleGoto,
      style: "text-align:center;width:60px;",
      "data-tap-uid": "e182_52",
      "data-beacon-uid": "default"
    }, h("view", null, h("image", {
      src: "https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/add.png",
      class: "avatar_small"
    }))))), h("view", {
      class: "bottom_btn_area"
    }, h("button", {
      formType: "submit",
      disabled: this.state.disabled
    }, "\u63D0\u4EA4"))))));;
  },
  classUid: "c7510"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '发布公告',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5',
  enablePullDownRefresh: true
};
Page(React.registerPage(Index, "pages/submitnotice/index"));
export default Index;
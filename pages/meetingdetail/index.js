function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "../../ReactWX.js";
import { request } from "../../common/utils";
var app = React.getApp();

function Index() {
  this.load = () => {
    if (React.api.getStorageSync('uid')) {
      request({
        url: app.globalData.api + "/api/operation/meeting/info/" + (this.props.query.type ? "history/" : "") + this.props.query.id,
        method: 'POST',
        data: {
          id: parseInt(this.props.query.id)
        }
      }).then(res => {
        const uid = React.api.getStorageSync('uid');
        const meeting = res.data.meeting;
        const {
          meetingLogEntityList
        } = meeting;
        meetingLogEntityList.forEach(item => {
          item.imageList = item.fileList.filter(file => file.url.toLowerCase().match(/\.(jpeg|jpg|gif|png|ico)$/) != null);
          item.fileList = item.fileList.filter(file => file.url.toLowerCase().match(/\.(jpeg|jpg|gif|png|ico)$/) == null);
        });
        this.setState({
          detail: res.data.meeting,
          isAuditor: typeof res.data.meeting.meetingMemberEntityList.find(item => item.uid == uid) != 'undefined',
          isOriginator: res.data.meeting.uid == uid
        });
      });
    } else {
      React.api.request({
        url: app.globalData.api + "/api/operation/meeting/info/" + (this.props.query.type ? "history/" : "") + this.props.query.id,
        method: 'POST',
        data: {
          id: parseInt(this.props.query.id)
        }
      }).then(res => {
        const meeting = res.data.meeting;
        const {
          meetingLogEntityList
        } = meeting;
        meetingLogEntityList.forEach(item => {
          item.imageList = item.fileList.filter(file => file.url.toLowerCase().match(/\.(jpeg|jpg|gif|png|ico)$/) != null);
          item.fileList = item.fileList.filter(file => file.url.toLowerCase().match(/\.(jpeg|jpg|gif|png|ico)$/) == null);
        });
        this.setState({
          detail: res.data.meeting,
          isAuditor: false,
          isOriginator: false
        });
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

  this.handlePreviewImage = (files, url) => {
    const imgs = files.map(item => item.url);
    React.api.previewImage({
      urls: imgs,
      current: url
    });
  };

  this.handlePreviewImage2 = url => {
    React.api.previewImage({
      urls: [url],
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

  this.handleGoto = status => {
    React.api.navigateTo({
      url: "/pages/meetingParticipant/index?id=" + this.props.query.id + "&status=" + status
    });
  };

  this.handleCheckIn = () => {
    app.globalData.refreshFlags = _objectSpread({}, app.globalData.refreshFlags, {
      meeting: true
    });
    app.globalData.requestData2Sign = {
      url: app.globalData.api + "/api/operation/meeting/meetingSignIn",
      data: {
        mid: this.state.detail.id,
        uid: React.api.getStorageSync('uid')
      }
    };
    React.api.navigateTo({
      url: '/pages/signature/index'
    });
  };

  this.handleUploadCheckIn = () => {
    React.api.chooseImage({
      count: 1,
      sizeType: ['compressed']
    }).then(res => {
      React.api.uploadFile({
        url: app.globalData.api + "/api/common/upload",
        name: 'file',
        filePath: res.tempFilePaths[0]
      }).then(res => {
        request({
          url: app.globalData.api + "/api/operation/meeting/meetingSignIn",
          method: 'POST',
          data: {
            verifyUrl: JSON.parse(res.data).url,
            mid: this.state.detail.id,
            uid: React.api.getStorageSync('uid')
          }
        }).then(res => {
          if (res.data.msg === 'success') {
            React.api.showToast({
              title: '上传成功！'
            }).then(() => {
              app.globalData.refreshFlags = _objectSpread({}, app.globalData.refreshFlags, {
                meeting: true
              });
              setTimeout(() => {
                this.load();
              }, 1500);
            });
          } else {
            React.api.showToast({
              title: res.data.msg,
              icon: 'none'
            });
          }
        });
        console.log(res);
      });
    });
  };

  this.handleUpload = () => {
    React.api.navigateTo({
      url: "/pages/submitmeetingtext/index?id=" + this.state.detail.id
    });
  };

  this.handleSign = () => {
    React.api.showModal({
      title: '会议签字',
      content: '确认对该会议签字？'
    }).then(res => {
      if (res.confirm) {
        app.globalData.refreshFlags = _objectSpread({}, app.globalData.refreshFlags, {
          meeting: true
        });
        app.globalData.requestData2Sign = {
          url: app.globalData.api + "/api/operation/meeting/meetingSign",
          data: {
            mid: this.state.detail.id,
            uid: React.api.getStorageSync('uid')
          }
        };
        React.api.navigateTo({
          url: '/pages/signature/index?url=signEndUrl'
        });
      }
    });
  };

  this.handleEnd = () => {
    React.api.showModal({
      title: '结束会议',
      content: '确认结束会议？'
    }).then(res => {
      if (res.confirm) {
        request({
          url: app.globalData.api + "/api/operation/meeting/meetingEndSign",
          method: 'POST',
          data: {
            mid: this.state.detail.id,
            uid: React.api.getStorageSync('uid'),
            referUserSign: this.state.detail.uid == React.api.getStorageSync('uid')
          }
        }).then(res => {
          if (res.data.msg === 'success') {
            React.api.showToast({
              title: '操作成功！'
            }).then(() => {
              app.globalData.refreshFlags = _objectSpread({}, app.globalData.refreshFlags, {
                meeting: true
              });
              setTimeout(() => {
                this.load();
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
    timer: null,
    detail: {},
    isAuditor: false,
    // 是否参会人员
    isOriginator: false // 是否发起人

  };
}

Index = React.toClass(Index, React.Component, {
  onShow: function () {
    this.load();
  },
  componentDidMount: function () {
    this.setState({
      timer: setInterval(this.load, 30000)
    });
    app.globalData.refreshFlags = _objectSpread({}, app.globalData.refreshFlags, {
      meeting: false
    });
  },
  componentWillUnmount: function () {
    if (this.state.timer) clearInterval(this.state.timer);
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
    }, "\u5F00\u59CB\u65F6\u95F4\uFF1A"), h("text", null, this.state.detail.startAt))), h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("text", {
      style: "color:#898989"
    }, "\u4F1A\u8BAE\u5730\u70B9\uFF1A"), h("text", null, this.state.detail.location))), h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("text", {
      style: "color:#898989"
    }, "\u9884\u4F30\u65F6\u957F\uFF1A"), h("text", null, this.state.detail.spendTime))), h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("text", {
      style: "color:#898989"
    }, "\u53C2\u4F1A\u4EBA\u6570\uFF1A"), h("text", null, this.state.detail.meetingMemberEntityList && this.state.detail.meetingMemberEntityList.length, "\u4EBA"))), h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("text", {
      style: "color:#898989"
    }, "\u8BE6\u60C5\uFF1A"), h("text", null, this.state.detail.content)))))), this.state.detail.type == 0 && h(React.Fragment, null, h("view", {
      class: "weui-panel"
    }, h("view", {
      class: "weui-panel__hd",
      onTap: () => this.handleGoto("unattended"),
      "data-tap-uid": "e302_45",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-cell",
      style: "padding: 0"
    }, h("view", {
      class: "weui-cell__hd"
    }, "\u672A\u7B7E\u5230"), h("view", {
      class: "weui-cell__bd"
    }), h("view", {
      class: "weui-cell__ft weui-cell__ft_in-access"
    }))), h("view", {
      class: "weui-panel__bd"
    }, this.state.detail.meetingMemberEntityList && this.state.detail.meetingMemberEntityList.length && h("view", {
      class: "weui-cell weui-cell_without_border"
    }, h("view", {
      class: "weui-cell__bd"
    }, this.state.detail.meetingMemberEntityList.map((member, i10054) => member.status == 0 && h("view", {
      class: "weui-uploader__file",
      key: member.id,
      style: "text-align:center;width:60px;"
    }, h("view", null, h("image", {
      src: member.avatarUrl,
      class: "avatar_small"
    })), h("view", null, h("text", {
      style: "font-size:14px;text-overflow:ellipsis;"
    }, member.memberRealname)))))))), h("view", {
      class: "weui-panel"
    }, h("view", {
      class: "weui-panel__hd",
      onTap: () => this.handleGoto("attended"),
      "data-tap-uid": "e326_45",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-cell",
      style: "padding: 0"
    }, h("view", {
      class: "weui-cell__hd"
    }, "\u5DF2\u7B7E\u5230"), h("view", {
      class: "weui-cell__bd"
    }), h("view", {
      class: "weui-cell__ft weui-cell__ft_in-access"
    }))), h("view", {
      class: "weui-panel__bd"
    }, this.state.detail.meetingMemberEntityList && this.state.detail.meetingMemberEntityList.length && h("view", {
      class: "weui-cell weui-cell_without_border"
    }, h("view", {
      class: "weui-cell__bd"
    }, this.state.detail.meetingMemberEntityList.map((member, i11402) => member.status > 0 && h("view", {
      class: "weui-uploader__file",
      key: member.id,
      style: "text-align:center;width:60px;",
      onTap: () => this.handlePreviewSign(member.signInUrl),
      "data-tap-uid": 'e338_114_' + i11402,
      "data-beacon-uid": "default"
    }, h("view", null, h("image", {
      src: member.avatarUrl,
      class: "avatar_small"
    })), h("view", null, h("text", {
      style: "font-size:14px;text-overflow:ellipsis;"
    }, member.memberRealname))))))))), this.state.detail.type == 1 && h("view", {
      class: "weui-panel"
    }, h("view", {
      class: "weui-panel__hd"
    }, "\u7B7E\u5230\u8868"), h("view", {
      class: "weui-panel__bd"
    }, this.state.detail.meetingMemberEntityList && this.state.detail.meetingMemberEntityList.length && h("view", {
      class: "weui-cell"
    }, h("view", {
      class: "weui-cell__bd"
    }, this.state.detail.meetingMemberEntityList.map((member, i12523) => member.signInUrl && h("view", {
      class: "weui-uploader__file",
      key: member.id,
      onTap: () => this.handlePreviewImage2(member.signInUrl),
      "data-tap-uid": 'e361_26_' + i12523,
      "data-beacon-uid": "default"
    }, h("image", {
      src: member.signInUrl,
      class: "img_small"
    }))))))), h("view", {
      class: "weui-panel"
    }, h("view", {
      class: "weui-panel__hd",
      onTap: () => this.handleGoto("signed"),
      "data-tap-uid": "e374_41",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-cell",
      style: "padding: 0"
    }, h("view", {
      class: "weui-cell__hd"
    }, "\u5DF2\u7B7E\u5B57"), h("view", {
      class: "weui-cell__bd"
    }), h("view", {
      class: "weui-cell__ft weui-cell__ft_in-access"
    }))), h("view", {
      class: "weui-panel__bd"
    }, this.state.detail.meetingMemberEntityList && this.state.detail.meetingMemberEntityList.length && h("view", {
      class: "weui-cell weui-cell_without_border"
    }, h("view", {
      class: "weui-cell__bd"
    }, this.state.detail.meetingMemberEntityList.map((member, i13765) => member.status > 1 && h("view", {
      class: "weui-uploader__file",
      key: member.id,
      style: "text-align:center;width:60px;",
      onTap: () => this.handlePreviewSign(member.signEndUrl),
      "data-tap-uid": 'e386_110_' + i13765,
      "data-beacon-uid": "default"
    }, h("view", null, h("image", {
      src: member.avatarUrl,
      class: "avatar_small"
    })), h("view", null, h("text", {
      style: "font-size:14px;text-overflow:ellipsis;"
    }, member.memberRealname)))))))), h("view", {
      class: "weui-panel"
    }, h("view", {
      class: "weui-panel__hd"
    }, "\u4F1A\u8BAE\u7EAA\u8981"), h("view", {
      class: "weui-panel__bd"
    }, h("view", {
      class: "weui-cells weui-cells_after-title weui-cells_without_border"
    }, this.state.detail.meetingLogEntityList && this.state.detail.meetingLogEntityList.map(function (item, index) {
      return h(React.Fragment, null, h("view", {
        class: "weui-cell weui-cell_without_border",
        key: item.id
      }, h("view", {
        class: "weui-cell__hd",
        style: "margin-right: 10px;"
      }, h("image", {
        src: item.meetingLogMemberAvatarUrl,
        class: "avatar"
      })), h("view", {
        class: "weui-cell__bd"
      }, h("view", null, item.memberRealname), h("view", {
        style: "font-size: 13px;color: #898989;"
      }, item.createTime), h("view", {
        style: "font-size: 13px;"
      }, item.content), item.fileList.length && item.fileList.map((file, i15422) => h("view", {
        style: "font-size: 13px;color:blue;",
        onTap: () => this.handlePreviewFile(file.url),
        "data-tap-uid": 'e415_30_' + index + '-' + i15422,
        "data-beacon-uid": "default"
      }, file.name)), item.imageList.length && h("view", {
        style: "padding: 5px 0px"
      }, item.imageList.map((file, i15910) => h("view", {
        class: "weui-uploader__file",
        key: file.url,
        onTap: () => this.handlePreviewImage(item.imageList, file.url),
        "data-tap-uid": 'e425_34_' + index + '-' + i15910,
        "data-beacon-uid": "default"
      }, h("image", {
        src: file.url,
        class: "img_small"
      })))))), this.state.detail.meetingLogEntityList && this.state.detail.meetingLogEntityList.length > index + 1 ? h("view", {
        style: "background-color:black;width:1px;height:30px;margin-left:40px;"
      }) : null);
    }, this)))), this.state.detail.type == 0 && h("view", {
      class: "bottom_btn_area"
    }, this.state.isAuditor && this.state.detail.memberStatus == 0 && this.state.detail.status < 2 && h("button", {
      onTap: this.handleCheckIn,
      "data-tap-uid": "e453_24",
      "data-beacon-uid": "default"
    }, "\u7B7E\u5230"), this.state.isAuditor && this.state.detail.memberStatus == 1 && this.state.detail.status == 1 && h("button", {
      onTap: this.handleUpload,
      "data-tap-uid": "e456_24",
      "data-beacon-uid": "default"
    }, "\u4E0A\u4F20\u7EAA\u8981"), this.state.isOriginator && this.state.detail.memberStatus == 1 && this.state.detail.status == 1 && h("button", {
      onTap: this.handleEnd,
      "data-tap-uid": "e459_24",
      "data-beacon-uid": "default"
    }, "\u7ED3\u675F"), this.state.isAuditor && this.state.detail.memberStatus == 1 && this.state.detail.status == 2 && h("button", {
      onTap: this.handleSign,
      "data-tap-uid": "e462_24",
      "data-beacon-uid": "default"
    }, "\u7B7E\u5B57")), this.state.detail.type == 1 && h("view", {
      class: "bottom_btn_area"
    }, this.state.isAuditor && this.state.detail.memberStatus == 0 && this.state.detail.status < 2 && h("button", {
      onTap: this.handleUploadCheckIn,
      "data-tap-uid": "e469_24",
      "data-beacon-uid": "default"
    }, "\u4E0A\u4F20\u7EB8\u8D28\u7B7E\u5230"), this.state.isAuditor && this.state.detail.memberStatus <= 1 && this.state.detail.status == 1 && h("button", {
      onTap: this.handleUpload,
      "data-tap-uid": "e472_24",
      "data-beacon-uid": "default"
    }, "\u4E0A\u4F20\u7EAA\u8981"), this.state.isOriginator && this.state.detail.memberStatus <= 1 && this.state.detail.status == 1 && h("button", {
      onTap: this.handleEnd,
      "data-tap-uid": "e475_24",
      "data-beacon-uid": "default"
    }, "\u7ED3\u675F"), this.state.isAuditor && this.state.detail.memberStatus <= 1 && this.state.detail.status == 2 && h("button", {
      onTap: this.handleSign,
      "data-tap-uid": "e478_24",
      "data-beacon-uid": "default"
    }, "\u7B7E\u5B57"))));;
  },
  classUid: "c18979"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '会议详情',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5',
  enablePullDownRefresh: true
};
Page(React.registerPage(Index, "pages/meetingdetail/index"));
export default Index;
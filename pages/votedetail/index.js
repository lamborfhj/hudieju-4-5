function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "../../ReactWX.js";
import moment from "../../npm/moment/moment.js";
import { request } from "../../common/utils";
var app = React.getApp();

function Index() {
  this.getStatusVoters = users => {
    const voters = [];
    users = users.map(it => {
      if (it.voteTime === null && it.status === 3) {
        return _objectSpread(_objectSpread({}, it), {}, {
          statusCn: '超时弃权'
        });
      } else {
        return it;
      }
    });
    users.forEach(user => {
      const groupVoters = voters[user.status] || {
        status: user.statusCn,
        voters: []
      };
      groupVoters.voters.push({
        id: user.id,
        avatarUrl: user.memberAvatarUrl,
        name: user.memberRealname,
        verifyUrl: user.verifyUrl,
        updateTime: user.updateTime,
        status: user.status
      });
      voters[user.status] = groupVoters;
    });
    return voters;
  };

  this.getItemVoters = (detail, users) => {
    const voters = [];
    users = users.map(it => {
      if (it.voteTime === null && it.status === 3) {
        return _objectSpread(_objectSpread({}, it), {}, {
          statusCn: '超时弃权'
        });
      } else {
        return it;
      }
    });
    users.forEach(user => {
      if (user.status == 3) {
        const groupVoters = voters[4] || {
          item: user.statusCn,
          voters: []
        };
        groupVoters.voters.push({
          id: user.id,
          avatarUrl: user.memberAvatarUrl,
          name: user.memberRealname,
          verifyUrl: user.verifyUrl,
          updateTime: user.updateTime,
          status: user.status
        });
        voters[4] = groupVoters;
      }

      if (user.status == 5) {
        for (let i = 0; i < 4; i++) {
          if (user["item" + (i + 1)]) {
            const groupVoters = voters[i] || {
              item: detail["item" + (i + 1)],
              voters: []
            };
            groupVoters.voters.push({
              id: user.id,
              avatarUrl: user.memberAvatarUrl,
              name: user.memberRealname,
              verifyUrl: user.verifyUrl
            });
            voters[i] = groupVoters;
            break;
          }
        }
      }
    });
    return voters;
  };

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

  this.handleRadioChange = e => {
    const options = this.state.options.map(item => {
      return _objectSpread({}, item, {
        checked: item.value == e.detail.value
      });
    });
    this.setState({
      options
    });
  };

  this.handleTextBlur = e => {
    this.setState({
      remark: e.detail.value
    });
  };

  this.handleDisagree = () => {
    React.api.showModal({
      title: '反对表决',
      content: '确认反对该决议吗？'
    }).then(res => {
      if (res.confirm) {
        app.globalData.refreshFlags = _objectSpread({}, app.globalData.refreshFlags, {
          myVote: true
        });
        app.globalData.requestData2Sign = {
          url: app.globalData.api + "/api/operation/vote/vote",
          data: {
            status: 2,
            remark: this.state.remark,
            vid: parseInt(this.state.detail.id),
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
      title: '同意表决',
      content: '确认同意该决议吗？'
    }).then(res => {
      if (res.confirm) {
        app.globalData.refreshFlags = _objectSpread({}, app.globalData.refreshFlags, {
          myVote: true
        });
        app.globalData.requestData2Sign = {
          url: app.globalData.api + "/api/operation/vote/vote",
          data: {
            status: 1,
            remark: this.state.remark,
            vid: parseInt(this.state.detail.id),
            uid: React.api.getStorageSync('uid')
          }
        };
        React.api.navigateTo({
          url: '/pages/signature/index'
        });
      }
    });
  };

  this.handleWaiver = () => {
    React.api.showModal({
      title: '弃权表决',
      content: '确认弃权该决议吗？'
    }).then(res => {
      if (res.confirm) {
        app.globalData.refreshFlags = _objectSpread({}, app.globalData.refreshFlags, {
          myVote: true
        });
        app.globalData.requestData2Sign = {
          url: app.globalData.api + "/api/operation/vote/vote",
          data: {
            status: 3,
            remark: this.state.remark,
            vid: parseInt(this.state.detail.id),
            uid: React.api.getStorageSync('uid')
          }
        };
        React.api.navigateTo({
          url: '/pages/signature/index'
        });
      }
    });
  };

  this.handleConfirm = () => {
    let checked = false;
    const params = {};
    this.state.options.forEach(item => {
      checked = checked || item.checked;
      params[item.value] = item.checked ? 1 : 0;
    });

    if (typeof checked == "undefined" || checked == false) {
      React.api.showToast({
        title: '请选择选项！',
        icon: 'none'
      });
      return false;
    }

    React.api.showModal({
      title: '提交表决',
      content: '确认提交该决议吗？'
    }).then(res => {
      if (res.confirm) {
        app.globalData.refreshFlags = _objectSpread({}, app.globalData.refreshFlags, {
          myVote: true
        });
        app.globalData.requestData2Sign = {
          url: app.globalData.api + "/api/operation/vote/vote",
          data: _objectSpread({}, params, {
            remark: this.state.remark,
            vid: parseInt(this.state.detail.id),
            uid: React.api.getStorageSync('uid')
          })
        };
        React.api.navigateTo({
          url: '/pages/signature/index'
        });
      }
    });
  };

  this.handleRevoke = () => {
    React.api.showModal({
      title: '撤销表决',
      content: '确认撤销该决议吗？'
    }).then(res => {
      if (res.confirm) {
        request({
          url: app.globalData.api + "/api/operation/vote/voteCancel",
          method: 'POST',
          data: {
            vid: parseInt(this.state.detail.id),
            uid: React.api.getStorageSync('uid')
          }
        }).then(res => {
          if (res.data.msg === 'success') {
            React.api.showToast({
              title: '撤销成功！'
            }).then(() => {
              app.globalData.refreshFlags = _objectSpread({}, app.globalData.refreshFlags, {
                myVote: true
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
    options: [],
    // 选项
    remark: '',
    // 意见
    statusVoters: [],
    // 根据状态分组表决人
    itemVoters: [],
    // 根据选项分组表决人
    opinions: [],
    // 意见
    isAuditor: false,
    // 是否审核员
    isOriginator: false // 是否发起人

  };
}

Index = React.toClass(Index, React.Component, {
  componentDidMount: function () {
    app.globalData.refreshFlags = _objectSpread({}, app.globalData.refreshFlags, {
      myVote: false
    });
  },
  onShow: function () {
    if (React.api.getStorageSync('uid')) {
      request({
        url: app.globalData.api + "/api/operation/vote/info/" + (this.props.query.type ? "history/" : "") + this.props.query.id,
        method: 'POST',
        data: {
          id: parseInt(this.props.query.id)
        }
      }).then(res => {
        const uid = React.api.getStorageSync('uid');
        this.setState({
          detail: res.data.vote,
          imgs: res.data.vote.fileList.filter(file => file.url.toLowerCase().match(/\.(jpeg|jpg|gif|png|ico)$/) != null),
          files: res.data.vote.fileList.filter(file => file.url.toLowerCase().match(/\.(jpeg|jpg|gif|png|ico)$/) == null),
          options: [{
            name: res.data.vote.item1,
            value: 'item1'
          }, {
            name: res.data.vote.item2,
            value: 'item2'
          }, {
            name: res.data.vote.item3,
            value: 'item3'
          }, {
            name: res.data.vote.item4,
            value: 'item4'
          }],
          statusVoters: this.getStatusVoters(res.data.vote.voteMemberEntityList),
          itemVoters: this.getItemVoters(res.data.vote, res.data.vote.voteMemberEntityList),
          opinions: res.data.vote.voteMemberEntityList.filter(item => item.remark != ''),
          isAuditor: typeof res.data.vote.voteMemberEntityList.find(item => item.uid == uid) != 'undefined',
          isOriginator: res.data.vote.uid == uid,
          isBeforeEndtime: moment().isBefore(moment(res.data.vote.endTime).add(1, 'days'))
        });
      });
    } else {
      React.api.request({
        url: app.globalData.api + "/api/operation/vote/info/" + (this.props.query.type ? "history/" : "") + this.props.query.id,
        method: 'POST',
        data: {
          id: parseInt(this.props.query.id)
        }
      }).then(res => {
        this.setState({
          detail: res.data.vote,
          imgs: res.data.vote.fileList.filter(file => file.url.toLowerCase().match(/\.(jpeg|jpg|gif|png|ico)$/) != null),
          files: res.data.vote.fileList.filter(file => file.url.toLowerCase().match(/\.(jpeg|jpg|gif|png|ico)$/) == null),
          options: [{
            name: res.data.vote.item1,
            value: 'item1'
          }, {
            name: res.data.vote.item2,
            value: 'item2'
          }, {
            name: res.data.vote.item3,
            value: 'item3'
          }, {
            name: res.data.vote.item4,
            value: 'item4'
          }],
          statusVoters: this.getStatusVoters(res.data.vote.voteMemberEntityList),
          itemVoters: this.getItemVoters(res.data.vote, res.data.vote.voteMemberEntityList),
          opinions: res.data.vote.voteMemberEntityList.filter(item => item.remark != ''),
          isAuditor: false,
          isOriginator: false,
          isBeforeEndtime: moment().isBefore(moment(res.data.vote.endTime).add(1, 'days'))
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
      class: "weui-cell__bd"
    }, this.state.detail.title), h("view", {
      class: "weui-cell__ft",
      style: "color:#c8894e"
    }, this.state.detail.statusCn)), h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("text", {
      style: "color:#898989"
    }, "\u622A\u6B62\u65E5\u671F\uFF1A"), h("text", null, this.state.detail.endTime))), h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("text", {
      style: "color:#898989"
    }, "\u8868\u51B3\u5185\u5BB9\uFF1A"), h("text", null, this.state.detail.content))), this.state.files.length && h("view", {
      class: "weui-cell"
    }, h("view", {
      class: "weui-cell__bd"
    }, this.state.files.map((file, i10773) => h("view", {
      style: "font-size:14px;color:blue;",
      onTap: () => this.handlePreviewFile(file.url),
      "data-tap-uid": 'e311_26_' + i10773,
      "data-beacon-uid": "default"
    }, file.name)))), this.state.imgs.length && h("view", {
      class: "weui-cell"
    }, h("view", {
      class: "weui-cell__bd"
    }, this.state.imgs.map((file, i11323) => h("view", {
      class: "weui-uploader__file",
      key: file.url,
      onTap: () => this.handlePreviewImage(file.url),
      "data-tap-uid": 'e325_26_' + i11323,
      "data-beacon-uid": "default"
    }, h("image", {
      src: file.url,
      class: "img_small"
    })))))))), h("view", {
      class: "weui-panel"
    }, h("view", {
      class: "weui-panel__hd"
    }, h("view", {
      class: "weui-panel-title"
    }, h("view", {
      class: "weui-panel-title__bd"
    }, this.state.detail.typeCn, "\u8868\u51B3"), h("view", {
      class: "weui-panel-title__ft"
    }, "\u8868\u51B3\u4EBA\u6570: " + this.state.detail.num + "\u4EBA"))), h("view", {
      class: "weui-panel__bd"
    }, this.state.detail.itemType == 0 && this.state.statusVoters.map((item, i12251) => item.status && h(React.Fragment, {
      key: item.status
    }, h("view", {
      class: "weui-cell weui-cell_without_border",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, item.status + " " + item.voters.length + "\u4EBA")), this.state.detail.type != 2 && h("view", {
      class: "weui-cell weui-cell_without_border"
    }, h("view", {
      class: "weui-cell__bd"
    }, item.voters.map((member, i12769) => h("view", {
      class: "weui-uploader__file",
      key: member.id,
      style: "text-align:center;width:60px;"
    }, h("view", {
      onTap: () => this.handlePreviewSign(member.verifyUrl),
      "data-tap-uid": 'e354_34_' + i12251 + '-' + i12769,
      "data-beacon-uid": "default"
    }, h("image", {
      src: member.avatarUrl,
      class: "avatar_small"
    })), h("view", null, h("text", {
      style: "font-size:14px;text-overflow:ellipsis;"
    }, member.name)), h("view", null, h("text", {
      style: "font-size:10px;text-overflow:ellipsis;"
    }, member.status === 3 || member.status === 0 ? '' : member.updateTime)))))))), this.state.detail.itemType == 1 && this.state.itemVoters.map((item, i13420) => item.item && h(React.Fragment, {
      key: item.item
    }, h("view", {
      class: "weui-cell weui-cell_without_border",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, item.item + " " + item.voters.length + "\u4EBA")), this.state.detail.type != 2 && h("view", {
      class: "weui-cell weui-cell_without_border"
    }, h("view", {
      class: "weui-cell__bd"
    }, item.voters.map((member, i13930) => h("view", {
      class: "weui-uploader__file",
      key: member.id,
      style: "text-align:center;width:60px;"
    }, h("view", {
      onTap: () => this.handlePreviewSign(member.verifyUrl),
      "data-tap-uid": 'e373_34_' + i13420 + '-' + i13930,
      "data-beacon-uid": "default"
    }, h("image", {
      src: member.avatarUrl,
      class: "avatar_small"
    })), h("view", null, h("text", {
      style: "font-size:14px;text-overflow:ellipsis;"
    }, member.name)), h("view", null, h("text", {
      style: "font-size:10px;text-overflow:ellipsis;"
    }, member.status === 3 || member.status === 0 ? '' : member.updateTime)))))))))), h("view", {
      class: "weui-panel"
    }, h("view", {
      class: "weui-panel__hd"
    }, "\u6284\u9001\u4EBA"), h("view", {
      class: "weui-panel__bd"
    }, this.state.detail.copy2VoteMemberEntityList && this.state.detail.copy2VoteMemberEntityList.length && h("view", {
      class: "weui-cell weui-cell_without_border"
    }, h("view", {
      class: "weui-cell__bd"
    }, this.state.detail.copy2VoteMemberEntityList.map((member, i14951) => h("view", {
      class: "weui-uploader__file",
      key: member.id,
      style: "text-align:center;width:60px;"
    }, h("view", null, h("image", {
      src: member.memberAvatarUrl,
      class: "avatar_small"
    })), h("view", null, h("text", {
      style: "font-size:14px;text-overflow:ellipsis;"
    }, member.memberRealname)))))))), h("view", {
      class: "weui-panel"
    }, h("view", {
      class: "weui-panel__hd"
    }, "\u610F\u89C1\u6C47\u603B"), h("view", {
      class: "weui-panel__bd"
    }, h("view", {
      class: "weui-cells weui-cells_after-title weui-cells_without_border"
    }, this.state.opinions.map(function (item, index) {
      return h(React.Fragment, {
        key: item.id
      }, h("view", {
        class: "weui-cell weui-cell_without_border"
      }, h("view", {
        class: "weui-cell__hd",
        style: "margin-right: 10px;"
      }, h("image", {
        src: item.memberAvatarUrl,
        class: "avatar"
      })), h("view", {
        class: "weui-cell__bd"
      }, h("view", null, item.memberRealname), h("view", {
        style: "font-size: 13px;"
      }, item.remark))));
    }, this)))), this.state.detail.itemType == 1 && this.state.detail.memberStatus == 0 && h("view", {
      class: "weui-panel"
    }, h("view", {
      class: "weui-panel__hd"
    }, "\u8BF7\u9009\u62E9\u9009\u9879"), h("view", {
      class: "weui-panel__bd"
    }, h("view", {
      class: "weui-cells weui-cells_after-title .weui-cells_without_border"
    }, h("radio-group", {
      onChange: this.handleRadioChange,
      "data-change-uid": "e428_31",
      "data-beacon-uid": "default"
    }, this.state.options.map((item, i16922) => h(React.Fragment, null, item.name != '' && h("label", {
      key: item.value,
      class: "weui-cell weui-check__label",
      style: "padding: 5px 15px"
    }, h("radio", {
      class: "weui-check",
      value: item.value
    }), h("view", {
      class: "weui-cell__bd"
    }, item.name), item.checked && h("view", {
      class: "weui-cell__ft weui-cell__ft_in-radio"
    }, h("icon", {
      class: "weui-icon-radio",
      type: "success_no_circle",
      size: "16"
    }))))))))), this.state.detail.memberStatus == 0 && h("view", {
      class: "weui-panel"
    }, h("view", {
      class: "weui-panel__hd"
    }, "\u53D1\u8868\u610F\u89C1"), h("view", {
      class: "weui-panel__bd"
    }, h("view", {
      class: "weui-cells weui-cells_after-title weui-cells_without_border"
    }, h("view", {
      class: "weui-cell",
      style: "padding: 5px 15px"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("textarea", {
      class: "weui-textarea",
      placeholder: "\u8BF7\u8F93\u5165\u6587\u672C",
      style: "height: 3.3em",
      onBlur: this.handleTextBlur,
      "data-blur-uid": "e456_96",
      "data-beacon-uid": "default"
    })))))), this.state.isBeforeEndtime && h("view", {
      class: "bottom_btn_area"
    }, this.state.isAuditor && this.state.detail.status != 3 && this.state.detail.memberStatus == 0 && h(React.Fragment, null, this.state.detail.itemType == 0 && h(React.Fragment, null, h("button", {
      onTap: this.handleDisagree,
      "data-tap-uid": "e470_30",
      "data-beacon-uid": "default"
    }, "\u4E0D\u540C\u610F"), h("button", {
      onTap: this.handleAgree,
      "data-tap-uid": "e471_30",
      "data-beacon-uid": "default"
    }, "\u540C\u610F")), this.state.detail.itemType == 1 && h("button", {
      onTap: this.handleConfirm,
      "data-tap-uid": "e475_28",
      "data-beacon-uid": "default"
    }, "\u786E\u5B9A"), h("button", {
      onTap: this.handleWaiver,
      "data-tap-uid": "e477_26",
      "data-beacon-uid": "default"
    }, "\u5F03\u6743")), this.state.isOriginator && this.state.detail.status == 0 && h("button", {
      onTap: this.handleRevoke,
      "data-tap-uid": "e481_24",
      "data-beacon-uid": "default"
    }, "\u64A4\u9500"))));;
  },
  classUid: "c19748"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '表决详情',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5',
  enablePullDownRefresh: true
};
Page(React.registerPage(Index, "pages/votedetail/index"));
export default Index;
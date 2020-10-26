import regeneratorRuntime from "../../npm/regenerator-runtime/runtime.js";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "../../ReactWX.js";
import { request } from "../../common/utils";
var app = React.getApp();

function Index() {
  this.handleDatePickerChange = e => {
    this.setState({
      date: e.detail.value
    });
  };

  this.handleVoteTypePickerChange = e => {
    this.setState({
      voteTypeId: this.state.voteTypes[e.detail.value].id,
      voteTypeName: this.state.voteTypes[e.detail.value].value
    });
  };

  this.handleSelectTypePickerChange = e => {
    this.setState({
      selectTypeId: e.detail.value
    });
  };

  this.handleVoteApprovalTypePickerChange = e => {
    this.setState({
      voteApprovalTypeId: e.detail.value,
      voters: e.detail.value == 0 ? this.state.committee : []
    });
  };

  this.handleChooseImage = () => {
    React.api.chooseImage({
      count: this.state.maxImageNum - this.state.imgs.length,
      sizeType: ['compressed']
    }).then(res => {
      this.setState({
        imgs: this.state.imgs.concat(res.tempFilePaths)
      });
    });
  };

  this.handlePreviewImage = url => {
    React.api.previewImage({
      urls: this.state.imgs,
      current: url
    });
  };

  this.handleDeleteImage = url => {
    const {
      imgs
    } = this.state;
    React.api.showModal({
      title: '删除图片',
      content: '确认删除该图片？'
    }).then(res => {
      if (res.confirm) {
        this.setState({
          imgs: imgs.filter(item => item !== url)
        });
      }
    });
  };

  this.handleGoto = (action, isSingle = false) => {
    // voteApproval voteCopy
    React.api.navigateTo({
      url: "/pages/member/index?selectMode=true&service=" + action + "&isSingle=" + isSingle
    });
  };

  this.handleSubmit = e => {
    if (e.value.title == '') {
      React.api.showToast({
        title: '请输入表决主题！',
        icon: 'none'
      });
      return false;
    }

    if (this.state.voteTypeId == 0) {
      React.api.showToast({
        title: '请选择表决方式！',
        icon: 'none'
      });
      return false;
    }

    if (this.state.selectTypeId == 1) {
      if (e.value.item1 == '') {
        React.api.showToast({
          title: '请输入选项1！',
          icon: 'none'
        });
        return false;
      }

      if (e.value.item2 == '') {
        React.api.showToast({
          title: '请输入选项2！',
          icon: 'none'
        });
        return false;
      }
    }

    if (e.value.endTime == '') {
      React.api.showToast({
        title: '请选择截止日期！',
        icon: 'none'
      });
      return false;
    }

    if (e.value.content == '') {
      React.api.showToast({
        title: '请输入表决内容！',
        icon: 'none'
      });
      return false;
    }

    React.api.showLoading({
      title: '创建表决中...'
    });
    this.setState({
      disabled: true
    });
    this.getFileList().then(res => {
      request({
        url: app.globalData.api + "/api/operation/vote/save",
        method: 'POST',
        data: _objectSpread({}, e.value, {
          fileList: res.map(item => {
            return {
              url: JSON.parse(item.data).url
            };
          }),
          type: this.state.voteTypeId,
          itemType: parseInt(this.state.selectTypeId),
          verifyType: parseInt(this.state.voteApprovalTypeId),
          voteMemberEntityList: this.state.voters.map(item => {
            return {
              uid: item.id
            };
          }),
          copy2VoteMemberEntityList: this.state.copies.map(item => {
            return {
              uid: item.id
            };
          }),
          uid: React.api.getStorageSync('uid'),
          zoneId: React.api.getStorageSync('zone_id')
        })
      }).then(res => {
        React.api.hideLoading();
        this.setState({
          disabled: false
        });

        if (res.data.msg === 'success') {
          React.api.showToast({
            title: '创建成功！'
          }).then(() => {
            app.globalData.selectedMembers = _objectSpread({}, app.globalData.selectedMembers, {
              voteApproval: [],
              voteCopy: []
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
    });
  };

  this.state = {
    disabled: false,
    voteTypeId: 0,
    voteTypeName: '',
    voteTypes: [{
      id: 1,
      value: '实名'
    }, {
      id: 2,
      value: '匿名'
    }],
    voteApprovalTypeId: 0,
    voteApprovalTypes: ['业委会全体表决', '单人审批', '多人表决'],
    selectTypeId: 0,
    selectTypes: ["单项", "多选"],
    maxImageNum: 9,
    imgs: [],
    date: '',
    committee: [],
    voters: [],
    copies: []
  };
}

Index = React.toClass(Index, React.Component, {
  onShow: function () {
    if (this.state.voteApprovalTypeId == 0) {
      this.setState({
        voters: this.state.committee || [],
        copies: app.globalData.selectedMembers['voteCopy'] || []
      });
    } else {
      this.setState({
        voters: app.globalData.selectedMembers['voteApproval'] || [],
        copies: app.globalData.selectedMembers['voteCopy'] || []
      });
    }
  },
  componentDidMount: function () {
    React.api.request({
      url: app.globalData.api + "/api/user/simpleList",
      method: 'POST',
      data: {
        zoneId: React.api.getStorageSync('zone_id'),
        groupName: '业主委员会',
        status: 1,
        userVerifyStatus: 1
      }
    }).then(res => {
      this.setState({
        committee: res.data.userEntityList || [],
        voters: res.data.userEntityList || []
      });
    });
  },
  getFileList: function () {
    var _ref = _asyncToGenerator(function* () {
      const res = yield Promise.all(this.state.imgs.map( /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(function* (localpath) {
          return yield React.api.uploadFile({
            url: app.globalData.api + "/api/common/upload",
            name: 'file',
            filePath: localpath
          });
        });

        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }()));
      return res;
    });

    return function getFileList() {
      return _ref.apply(this, arguments);
    };
  }(),
  render: function () {
    var h = React.createElement;
    return h("view", {
      class: "page"
    }, h("view", {
      class: "page__bd",
      style: "padding-bottom:56px;"
    }, h("form", {
      onSubmit: this.handleSubmit,
      "data-submit-uid": "e213_16",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-cells weui-cells_after-title"
    }, h("view", {
      class: "weui-cell weui-cell_input"
    }, h("view", {
      class: "weui-cell__hd"
    }, h("view", {
      class: "weui-label"
    }, h("text", {
      class: "icon_star"
    }, "*"), "\u8868\u51B3\u4E3B\u9898")), h("view", {
      class: "weui-cell__bd"
    }, h("input", {
      name: "title",
      class: "weui-input",
      placeholder: "\u8BF7\u8F93\u5165\u8868\u51B3\u4E3B\u9898"
    }))), h("view", {
      class: "weui-cell weui-cell_select"
    }, h("view", {
      class: "weui-cell__hd weui-cell__hd_in-select-after"
    }, h("view", {
      class: "weui-label"
    }, h("text", {
      class: "icon_star"
    }, "*"), "\u8868\u51B3\u65B9\u5F0F")), h("view", {
      class: "weui-cell__bd"
    }, h("picker", {
      range: this.state.voteTypes,
      "range-key": "value",
      onChange: this.handleVoteTypePickerChange,
      "data-change-uid": "e230_73",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-select"
    }, this.state.voteTypeName)))), h("view", {
      class: "weui-cell weui-cell_select"
    }, h("view", {
      class: "weui-cell__hd weui-cell__hd_in-select-after"
    }, h("view", {
      class: "weui-label"
    }, h("text", {
      class: "icon_star"
    }, "*"), "\u8868\u51B3\u7C7B\u522B")), h("view", {
      class: "weui-cell__bd"
    }, h("picker", {
      range: this.state.selectTypes,
      onChange: this.handleSelectTypePickerChange,
      "data-change-uid": "e240_57",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-select"
    }, this.state.selectTypes[this.state.selectTypeId])))), this.state.selectTypeId == 1 && h(React.Fragment, null, h("view", {
      class: "weui-cell weui-cell_select"
    }, h("view", {
      class: "weui-cell__hd weui-cell__hd_in-select-after"
    }, h("view", {
      class: "weui-label"
    }, h("text", {
      class: "icon_star"
    }, "*"), "\u9009\u98791")), h("view", {
      class: "weui-cell__bd"
    }, h("input", {
      name: "item1",
      class: "weui-input",
      placeholder: "\u8BF7\u8F93\u5165\u9009\u98791"
    }))), h("view", {
      class: "weui-cell weui-cell_select"
    }, h("view", {
      class: "weui-cell__hd weui-cell__hd_in-select-after"
    }, h("view", {
      class: "weui-label"
    }, h("text", {
      class: "icon_star"
    }, "*"), "\u9009\u98792")), h("view", {
      class: "weui-cell__bd"
    }, h("input", {
      name: "item2",
      class: "weui-input",
      placeholder: "\u8BF7\u8F93\u5165\u9009\u98792"
    }))), h("view", {
      class: "weui-cell weui-cell_select"
    }, h("view", {
      class: "weui-cell__hd weui-cell__hd_in-select-after"
    }, h("view", {
      class: "weui-label"
    }, "\u9009\u98793")), h("view", {
      class: "weui-cell__bd"
    }, h("input", {
      name: "item3",
      class: "weui-input",
      placeholder: "\u8BF7\u8F93\u5165\u9009\u98793"
    })))), h("view", {
      class: "weui-cell weui-cell_input"
    }, h("view", {
      class: "weui-cell__hd"
    }, h("view", {
      class: "weui-label"
    }, h("text", {
      class: "icon_star"
    }, "*"), "\u622A\u6B62\u65E5\u671F")), h("view", {
      class: "weui-cell__bd"
    }, h("picker", {
      name: "endTime",
      mode: "date",
      start: "2015-01-01",
      end: "2030-09-01",
      onChange: this.handleDatePickerChange,
      "data-change-uid": "e278_89",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-input"
    }, this.state.date)))), h("view", {
      class: "weui-cell weui-cell_select"
    }, h("view", {
      class: "weui-cell__hd weui-cell__hd_in-select-after"
    }, h("view", {
      class: "weui-label"
    }, h("text", {
      class: "icon_star"
    }, "*"), "\u5BA1\u6279\u65B9\u5F0F")), h("view", {
      class: "weui-cell__bd"
    }, h("picker", {
      range: this.state.voteApprovalTypes,
      onChange: this.handleVoteApprovalTypePickerChange,
      "data-change-uid": "e288_63",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-select"
    }, this.state.voteApprovalTypes[this.state.voteApprovalTypeId])))), h("view", {
      class: "weui-cell"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("textarea", {
      name: "content",
      class: "weui-textarea",
      placeholder: "\u8BF7\u8F93\u5165\u8868\u51B3\u5185\u5BB9"
    }))), h("view", {
      class: "weui-cell weui-cell_without_border"
    }, h("view", {
      class: "weui-cell__bd"
    }, this.state.imgs.map((url, i10279) => h("view", {
      class: "weui-uploader__file",
      key: url,
      onTap: () => this.handlePreviewImage(url),
      onLongpress: () => this.handleDeleteImage(url),
      "data-tap-uid": 'e303_22_' + i10279,
      "data-beacon-uid": "default",
      "data-longpress-uid": 'e304_22_' + i10279
    }, h("image", {
      src: url,
      class: "img_small"
    }))), this.state.maxImageNum - this.state.imgs.length > 0 && h("view", {
      class: "weui-uploader__file",
      onTap: this.handleChooseImage,
      "data-tap-uid": "e310_54",
      "data-beacon-uid": "default"
    }, h("image", {
      src: "https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/avatar.png",
      class: "img_small"
    })))), h("view", {
      class: "weui-cell"
    }, h("view", {
      class: "weui-cell__hd"
    }, h("text", {
      class: "icon_star"
    }, "*"), h("text", null, "\u8868\u51B3\u4EBA"))), h("view", {
      class: "weui-cell weui-cell_without_border"
    }, h("view", {
      class: "weui-cell__bd"
    }, this.state.voters.map((member, i11385) => h("view", {
      class: "weui-uploader__file",
      key: member.id,
      style: "text-align:center;width:60px;"
    }, h("view", null, h("image", {
      src: member.avatarUrl,
      class: "avatar_small"
    })), h("view", null, h("text", {
      style: "font-size:14px;text-overflow:ellipsis;"
    }, member.realname)))), this.state.voteApprovalTypeId > 0 && this.state.voters && h("view", {
      class: "weui-uploader__file",
      onTap: () => this.handleGoto('voteApproval', this.state.voteApprovalTypeId == 1),
      style: "text-align:center;width:60px;",
      "data-tap-uid": "e331_54",
      "data-beacon-uid": "default"
    }, h("view", null, h("image", {
      src: "https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/add.png",
      class: "avatar_small"
    }))))), h("view", {
      class: "weui-cell"
    }, h("view", {
      class: "weui-cell__hd"
    }, h("text", null, "\u6284\u9001\u4EBA[\u8868\u51B3\u540E\u4F1A\u901A\u77E5\u6284\u9001\u4EBA]"))), h("view", {
      class: "weui-cell weui-cell_without_border"
    }, h("view", {
      class: "weui-cell__bd"
    }, this.state.copies.map((member, i12569) => h("view", {
      class: "weui-uploader__file",
      key: member.id,
      style: "text-align:center;width:60px;"
    }, h("view", null, h("image", {
      src: member.avatarUrl,
      class: "avatar_small"
    })), h("view", null, h("text", {
      style: "font-size:14px;"
    }, member.realname)))), h("view", {
      class: "weui-uploader__file",
      onTap: () => this.handleGoto('voteCopy'),
      style: "text-align:center;width:60px;",
      "data-tap-uid": "e350_52",
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
  classUid: "c13636"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '发起表决',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5',
  enablePullDownRefresh: true
};
Page(React.registerPage(Index, "pages/submitvote/index"));
export default Index;
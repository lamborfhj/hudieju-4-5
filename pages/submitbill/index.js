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

  this.handleApprovalTypePickerChange = e => {
    this.setState({
      approvalTypeId: this.state.approvalTypes[e.detail.value].id,
      approvalTypeName: this.state.approvalTypes[e.detail.value].value,
      approveres: e.detail.value == 0 ? this.state.committee.filter(item => item.roleName == '主任') : this.state.committee.concat()
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

  this.handleGoto = () => {
    // billCopy
    React.api.navigateTo({
      url: "/pages/member/index?selectMode=true&service=billCopy"
    });
  };

  this.handleSubmit = e => {
    if (e.value.name == '') {
      React.api.showToast({
        title: '请输入报销人！',
        icon: 'none'
      });
      return false;
    }

    if (e.value.money == '') {
      React.api.showToast({
        title: '请输入报销金额！',
        icon: 'none'
      });
      return false;
    }

    if (e.value.happenDate == '') {
      React.api.showToast({
        title: '请选择发生日期！',
        icon: 'none'
      });
      return false;
    }

    if (this.state.approvalTypeId == 0) {
      React.api.showToast({
        title: '请选择表决方式！',
        icon: 'none'
      });
      return false;
    }

    if (e.value.content == '') {
      React.api.showToast({
        title: '请输入报销说明！',
        icon: 'none'
      });
      return false;
    }

    if (this.state.imgs.length <= 0) {
      React.api.showToast({
        title: '请选择图片！',
        icon: 'none'
      });
      return false;
    }

    if (this.state.approveres.length <= 0) {
      React.api.showToast({
        title: '没有该角色审批人员，请联系小区管理员！',
        icon: 'none'
      });
      return false;
    }

    React.api.showLoading({
      title: '创建申请中...'
    });
    this.setState({
      disabled: true
    });
    this.getFileList().then(res => {
      request({
        url: app.globalData.api + "/api/operation/bill/save",
        method: 'POST',
        data: _objectSpread({}, e.value, {
          type: this.state.approvalTypeId,
          fileList: res.map(item => {
            return {
              url: JSON.parse(item.data).url
            };
          }),
          verifyMemberEntityList: this.state.approveres.map(item => {
            return {
              uid: item.id,
              type: 1
            };
          }),
          copyToMemberEntityList: this.state.copies.map(item => {
            return {
              uid: item.id,
              type: 2
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
          app.globalData.selectedMembers = _objectSpread({}, app.globalData.selectedMembers, {
            billCopy: []
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
    });
  };

  this.state = {
    disabled: false,
    approvalTypeId: 0,
    approvalTypeName: '',
    approvalTypes: [{
      id: 1,
      value: '金额较小[主任审批]'
    }, {
      id: 2,
      value: '金额较大[业委会审批]'
    }],
    name: '',
    date: '',
    maxImageNum: 9,
    imgs: [],
    committee: [],
    // 业委会全体成员
    approveres: [],
    // 审核人
    copies: []
  };
}

Index = React.toClass(Index, React.Component, {
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
        committee: res.data.userEntityList,
        name: React.api.getStorageSync('realname')
      });
    });
  },
  onShow: function () {
    this.setState({
      copies: app.globalData.selectedMembers['billCopy'] || []
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
      class: "page",
      style: "padding-bottom:56px;"
    }, h("view", {
      class: "page__bd",
      style: "padding-bottom:56px;"
    }, h("form", {
      onSubmit: this.handleSubmit,
      "data-submit-uid": "e191_16",
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
    }, "*"), "\u62A5\u9500\u4EBA")), h("view", {
      class: "weui-cell__bd"
    }, h("input", {
      name: "name",
      class: "weui-input",
      value: this.state.name
    }))), h("view", {
      class: "weui-cell weui-cell_input"
    }, h("view", {
      class: "weui-cell__hd"
    }, h("view", {
      class: "weui-label"
    }, h("text", {
      class: "icon_star"
    }, "*"), "\u62A5\u9500\u91D1\u989D")), h("view", {
      class: "weui-cell__bd"
    }, h("input", {
      type: "digit",
      name: "money",
      class: "weui-input",
      placeholder: "\u8BF7\u8F93\u5165\u62A5\u9500\u91D1\u989D"
    }))), h("view", {
      class: "weui-cell weui-cell_input"
    }, h("view", {
      class: "weui-cell__hd"
    }, h("view", {
      class: "weui-label"
    }, h("text", {
      class: "icon_star"
    }, "*"), "\u53D1\u751F\u65E5\u671F")), h("view", {
      class: "weui-cell__bd"
    }, h("picker", {
      name: "happenDate",
      mode: "date",
      start: "2015-01-01",
      end: "2030-09-01",
      onChange: this.handleDatePickerChange,
      "data-change-uid": "e215_92",
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
      range: this.state.approvalTypes,
      "range-key": "value",
      onChange: this.handleApprovalTypePickerChange,
      "data-change-uid": "e225_77",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-select"
    }, this.state.approvalTypeName)))), h("view", {
      class: "weui-cell"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("textarea", {
      name: "content",
      class: "weui-textarea",
      placeholder: "\u8BF7\u8F93\u5165\u62A5\u9500\u8BF4\u660E\u300C\u5FC5\u586B\u300D",
      style: "height: 3.3em"
    }))), h("view", {
      class: "weui-cell weui-cell_without_border"
    }, h("view", {
      class: "weui-cell__bd"
    }, this.state.imgs.map((url, i7582) => h("view", {
      class: "weui-uploader__file",
      key: url,
      onTap: () => this.handlePreviewImage(url),
      onLongpress: () => this.handleDeleteImage(url),
      "data-tap-uid": 'e240_22_' + i7582,
      "data-beacon-uid": "default",
      "data-longpress-uid": 'e241_22_' + i7582
    }, h("image", {
      src: url,
      class: "img_small"
    }))), this.state.maxImageNum - this.state.imgs.length > 0 && h("view", {
      class: "weui-uploader__file",
      onTap: this.handleChooseImage,
      "data-tap-uid": "e247_54",
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
    }, "*"), h("text", null, "\u5BA1\u6279\u4EBA"))), h("view", {
      class: "weui-cell weui-cell_without_border"
    }, h("view", {
      class: "weui-cell__bd"
    }, this.state.approveres.map((member, i8688) => h("view", {
      class: "weui-uploader__file",
      key: member.id,
      style: "text-align:center;width:60px;"
    }, h("view", null, h("image", {
      src: member.avatarUrl,
      class: "avatar_small"
    })), h("view", null, h("text", {
      style: "font-size:14px;text-overflow:ellipsis;"
    }, member.realname)))))), h("view", {
      class: "weui-cell"
    }, h("view", {
      class: "weui-cell__hd"
    }, h("text", null, "\u6284\u9001\u4EBA"))), h("view", {
      class: "weui-cell weui-cell_without_border"
    }, h("view", {
      class: "weui-cell__bd"
    }, this.state.copies.map((member, i9426) => h("view", {
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
      onTap: () => this.handleGoto('meetingCopy'),
      style: "text-align:center;width:60px;",
      "data-tap-uid": "e282_52",
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
  classUid: "c10497"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '发起报销',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5',
  enablePullDownRefresh: true
};
Page(React.registerPage(Index, "pages/submitbill/index"));
export default Index;
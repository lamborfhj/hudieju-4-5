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

  this.handleFileTypePickerChange = e => {
    this.setState({
      fileTypeId: this.state.fileTypes[e.detail.value].id,
      fileTypeName: this.state.fileTypes[e.detail.value].value
    });
  };

  this.handleSealTypePickerChange = e => {
    this.setState({
      sealTypeId: this.state.sealTypes[e.detail.value].id,
      sealTypeName: this.state.sealTypes[e.detail.value].value
    });
  };

  this.handleApprovalTypePickerChange = e => {
    this.setState({
      approvalTypeId: this.state.approvalTypes[e.detail.value].id,
      approvalTypeName: this.state.approvalTypes[e.detail.value].value,
      approveres: e.detail.value == 0 ? this.state.committee : app.globalData.selectedMembers['stampApproval'] || []
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

  this.handleGoto = action => {
    // stampApproval stampCopy
    React.api.navigateTo({
      url: "/pages/member/index?selectMode=true&service=" + action
    });
  };

  this.handleSubmit = e => {
    if (e.value.uname == '') {
      React.api.showToast({
        title: '请输入经办人！',
        icon: 'none'
      });
      return false;
    }

    if (e.value.useDate == '') {
      React.api.showToast({
        title: '请选择日期！',
        icon: 'none'
      });
      return false;
    }

    if (e.value.documentName == '') {
      React.api.showToast({
        title: '请输入文件名！',
        icon: 'none'
      });
      return false;
    }

    if (e.value.num == '') {
      React.api.showToast({
        title: '请输入份数！',
        icon: 'none'
      });
      return false;
    }

    if (this.state.fileTypeId == 0) {
      React.api.showToast({
        title: '请选择文件类型！',
        icon: 'none'
      });
      return false;
    }

    if (this.state.sealTypeId == 0) {
      React.api.showToast({
        title: '请选择印章种类！',
        icon: 'none'
      });
      return false;
    }

    if (this.state.approvalTypeId == 0) {
      React.api.showToast({
        title: '请选择审批类型！',
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
        url: app.globalData.api + "/api/operation/request/save",
        method: 'POST',
        data: _objectSpread({}, e.value, {
          fileType: this.state.fileTypeId,
          seal: this.state.sealTypeId,
          verifyType: this.state.approvalTypeId,
          fileList: res.map(item => {
            return {
              url: JSON.parse(item.data).url
            };
          }),
          verifyMemberEntityList: this.state.approveres.map(item => {
            return {
              uid: item.id
            };
          }),
          copyToMemberEntityList: this.state.copies.map(item => {
            return {
              uid: item.id
            };
          }),
          num: parseInt(e.value.num),
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
    fileTypeId: 0,
    fileTypeName: '',
    fileTypes: [{
      id: 1,
      value: '合同类'
    }, {
      id: 2,
      value: '公告类'
    }, {
      id: 3,
      value: '发函类'
    }, {
      id: 4,
      value: '其他'
    }],
    sealTypeId: 0,
    sealTypeName: '',
    sealTypes: [{
      id: 1,
      value: '业委会公章'
    }, {
      id: 2,
      value: '业主大会公章'
    }, {
      id: 3,
      value: '财务专用章'
    }, {
      id: 4,
      value: '其他'
    }],
    approvalTypeId: 0,
    approvalTypeName: '',
    approvalTypes: [{
      id: 1,
      value: '全体业委会审批'
    }, {
      id: 2,
      value: '自定义审批人'
    }],
    uname: '',
    date: '',
    maxImageNum: 9,
    imgs: [],
    committee: [],
    approveres: [],
    // 审核人
    copies: []
  };
}

Index = React.toClass(Index, React.Component, {
  onShow: function () {
    if (this.state.approvalTypeId == 1) {
      this.setState({
        approveres: this.state.committee || [],
        copies: app.globalData.selectedMembers['stampCopy'] || []
      });
    }

    if (this.state.approvalTypeId == 2) {
      this.setState({
        approveres: app.globalData.selectedMembers['stampApproval'] || [],
        copies: app.globalData.selectedMembers['stampCopy'] || []
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
        uname: React.api.getStorageSync('realname')
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
  componentWillUnmount: function () {
    app.globalData.selectedMembers = _objectSpread({}, app.globalData.selectedMembers, {
      stampApproval: [],
      stampCopy: []
    });
  },
  render: function () {
    var h = React.createElement;
    return h("view", {
      class: "page"
    }, h("view", {
      class: "page__bd",
      style: "padding-bottom:56px;"
    }, h("form", {
      onSubmit: this.handleSubmit,
      "data-submit-uid": "e225_16",
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
    }, "*"), "\u7ECF\u529E\u4EBA")), h("view", {
      class: "weui-cell__bd"
    }, h("input", {
      name: "uname",
      class: "weui-input",
      value: this.state.uname
    }))), h("view", {
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
      name: "useDate",
      mode: "date",
      start: "2015-01-01",
      end: "2030-09-01",
      onChange: this.handleDatePickerChange,
      "data-change-uid": "e241_89",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-input"
    }, this.state.date)))), h("view", {
      class: "weui-cell weui-cell_input"
    }, h("view", {
      class: "weui-cell__hd"
    }, h("view", {
      class: "weui-label"
    }, h("text", {
      class: "icon_star"
    }, "*"), "\u7528\u7AE0\u6587\u4EF6\u540D")), h("view", {
      class: "weui-cell__bd"
    }, h("input", {
      name: "documentName",
      class: "weui-input",
      placeholder: "\u8BF7\u8F93\u5165\u7528\u7AE0\u6587\u4EF6\u540D"
    }))), h("view", {
      class: "weui-cell weui-cell_input"
    }, h("view", {
      class: "weui-cell__hd"
    }, h("view", {
      class: "weui-label"
    }, h("text", {
      class: "icon_star"
    }, "*"), "\u6587\u4EF6\u4EFD\u6570")), h("view", {
      class: "weui-cell__bd"
    }, h("input", {
      type: "number",
      name: "num",
      class: "weui-input",
      placeholder: "\u8BF7\u8F93\u5165\u6587\u4EF6\u4EFD\u6570"
    }))), h("view", {
      class: "weui-cell weui-cell_select"
    }, h("view", {
      class: "weui-cell__hd weui-cell__hd_in-select-after"
    }, h("view", {
      class: "weui-label"
    }, h("text", {
      class: "icon_star"
    }, "*"), "\u6587\u4EF6\u7C7B\u578B")), h("view", {
      class: "weui-cell__bd"
    }, h("picker", {
      range: this.state.fileTypes,
      "range-key": "value",
      onChange: this.handleFileTypePickerChange,
      "data-change-uid": "e267_73",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-select"
    }, this.state.fileTypeName)))), h("view", {
      class: "weui-cell weui-cell_select"
    }, h("view", {
      class: "weui-cell__hd weui-cell__hd_in-select-after"
    }, h("view", {
      class: "weui-label"
    }, h("text", {
      class: "icon_star"
    }, "*"), "\u5370\u7AE0\u79CD\u7C7B")), h("view", {
      class: "weui-cell__bd"
    }, h("picker", {
      range: this.state.sealTypes,
      "range-key": "value",
      onChange: this.handleSealTypePickerChange,
      "data-change-uid": "e277_74",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-select"
    }, this.state.sealTypeName)))), h("view", {
      class: "weui-cell weui-cell_select"
    }, h("view", {
      class: "weui-cell__hd weui-cell__hd_in-select-after"
    }, h("view", {
      class: "weui-label"
    }, h("text", {
      class: "icon_star"
    }, "*"), "\u9009\u62E9\u5BA1\u6279\u4EBA")), h("view", {
      class: "weui-cell__bd"
    }, h("picker", {
      range: this.state.approvalTypes,
      "range-key": "value",
      onChange: this.handleApprovalTypePickerChange,
      "data-change-uid": "e287_78",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-select"
    }, this.state.approvalTypeName)))), h("view", {
      class: "weui-cell"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("textarea", {
      name: "notice",
      class: "weui-textarea",
      placeholder: "\u8BF7\u8F93\u5165\u66F4\u591A\u8BE6\u60C5"
    }))), h("view", {
      class: "weui-cell weui-cell_without_border"
    }, h("view", {
      class: "weui-cell__bd"
    }, this.state.imgs.map((url, i10178) => h("view", {
      class: "weui-uploader__file",
      key: url,
      onTap: () => this.handlePreviewImage(url),
      onLongpress: () => this.handleDeleteImage(url),
      "data-tap-uid": 'e302_22_' + i10178,
      "data-beacon-uid": "default",
      "data-longpress-uid": 'e303_22_' + i10178
    }, h("image", {
      src: url,
      class: "img_small"
    }))), this.state.maxImageNum - this.state.imgs.length > 0 && h("view", {
      class: "weui-uploader__file",
      onTap: this.handleChooseImage,
      "data-tap-uid": "e309_54",
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
    }, this.state.approveres.map((member, i11284) => h("view", {
      class: "weui-uploader__file",
      key: member.id,
      style: "text-align:center;width:60px;"
    }, h("view", null, h("image", {
      src: member.avatarUrl,
      class: "avatar_small"
    })), h("view", null, h("text", {
      style: "font-size:14px;text-overflow:ellipsis;"
    }, member.realname)))), this.state.approvalTypeId > 1 && h("view", {
      class: "weui-uploader__file",
      onTap: () => this.handleGoto('stampApproval'),
      style: "text-align:center;width:60px;",
      "data-tap-uid": "e330_54",
      "data-beacon-uid": "default"
    }, h("view", null, h("image", {
      src: "https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/add.png",
      class: "avatar_small"
    }))))), h("view", {
      class: "weui-cell"
    }, h("view", {
      class: "weui-cell__hd"
    }, h("text", null, "\u6284\u9001\u4EBA[\u5BA1\u6279\u540E\u4F1A\u901A\u77E5\u6284\u9001\u4EBA]"))), h("view", {
      class: "weui-cell weui-cell_without_border"
    }, h("view", {
      class: "weui-cell__bd"
    }, this.state.copies.map((member, i12412) => h("view", {
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
      onTap: () => this.handleGoto('stampCopy'),
      style: "text-align:center;width:60px;",
      "data-tap-uid": "e349_52",
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
  classUid: "c13481"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '申请用章',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5',
  enablePullDownRefresh: true
};
Page(React.registerPage(Index, "pages/submitstamp/index"));
export default Index;
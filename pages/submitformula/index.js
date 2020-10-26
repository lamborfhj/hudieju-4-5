import regeneratorRuntime from "../../npm/regenerator-runtime/runtime.js";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "../../ReactWX.js";
import moment from "../../npm/moment/moment.js";
import { request } from "../../common/utils";
var app = React.getApp();

function Index() {
  this.handleStartDatePickerChange = e => {
    this.setState({
      startDate: e.detail.value
    });
  };

  this.handleEndDatePickerChange = e => {
    this.setState({
      endDate: e.detail.value
    });
  };

  this.handleChooseImage = () => {
    React.api.chooseImage({
      count: this.state.maxImageNum - this.state.imgs.length,
      sizeType: ['compressed']
    }).then(res => {
      this.setState({
        imgs: this.state.imgs.concat(res.tempFilePaths.map(path => {
          return {
            path,
            createTime: moment().format("YYYY-MM-DD HH:mm:ss")
          };
        }))
      });
    });
  };

  this.handlePreviewImage = url => {
    React.api.previewImage({
      urls: this.state.imgs.map(img => img.path),
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
          imgs: imgs.filter(item => item.path !== url)
        });
      }
    });
  };

  this.handleGoto = action => {
    // formulaCopy
    React.api.navigateTo({
      url: "/pages/member/index?selectMode=true&service=formulaCopy"
    });
  };

  this.handleSubmit = e => {
    if (e.value.manager == '') {
      React.api.showToast({
        title: '请输入公示人！',
        icon: 'none'
      });
      return false;
    }

    if (e.value.title == '') {
      React.api.showToast({
        title: '请输入公示主题！',
        icon: 'none'
      });
      return false;
    }

    if (e.value.startTime == '') {
      React.api.showToast({
        title: '请选择开始日期！',
        icon: 'none'
      });
      return false;
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
        title: '请输入详情！',
        icon: 'none'
      });
      return false;
    }

    if (this.state.addressees.length == 0) {
      React.api.showToast({
        title: '请选择收件人！',
        icon: 'none'
      });
      return false;
    }

    React.api.showLoading({
      title: '创建中...'
    });
    this.setState({
      disabled: true
    });
    this.getFileList().then(res => {
      request({
        url: app.globalData.api + "/api/operation/announce/save",
        method: 'POST',
        data: _objectSpread({}, e.value, {
          startTime: e.value.startTime + " 00:00:00",
          endTime: e.value.endTime + " 00:00:00",
          memberEntityList: this.state.addressees.map(item => {
            return {
              uid: item.id
            };
          }),
          fileList: res,
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
              formulaCopy: []
            });
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
    });
  };

  this.state = {
    disabled: false,
    manager: '',
    startDate: '',
    endDate: '',
    maxImageNum: 9,
    imgs: [],
    addressees: [] // 收件人

  };
}

Index = React.toClass(Index, React.Component, {
  onShow: function () {
    let addressees = app.globalData.selectedMembers['formulaCopy'] || [];
    if (!addressees.find(item => item.id == React.api.getStorageSync('uid'))) addressees = [{
      id: React.api.getStorageSync('uid'),
      realname: React.api.getStorageSync('realname'),
      avatarUrl: React.api.getStorageSync('avatarUrl')
    }, ...addressees];
    this.setState({
      addressees
    });
  },
  componentDidMount: function () {
    this.setState({
      manager: React.api.getStorageSync('realname')
    });
  },
  getFileList: function () {
    var _ref = _asyncToGenerator(function* () {
      const res = yield Promise.all(this.state.imgs.map( /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(function* (img) {
          return yield React.api.uploadFile({
            url: app.globalData.api + "/api/common/upload",
            name: 'file',
            filePath: img.path
          }).then(res => {
            return {
              url: JSON.parse(res.data).url,
              createTime: img.createTime
            };
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
      "data-submit-uid": "e190_16",
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
    }, "*"), "\u516C\u793A\u4EBA")), h("view", {
      class: "weui-cell__bd"
    }, h("input", {
      name: "manager",
      class: "weui-input",
      placeholder: "\u8BF7\u8F93\u5165\u516C\u793A\u4EBA"
    }))), h("view", {
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
      name: "realname",
      class: "weui-input",
      placeholder: "\u8BF7\u8F93\u5165\u7ECF\u529E\u4EBA",
      value: this.state.manager,
      disabled: true
    }))), h("view", {
      class: "weui-cell weui-cell_input"
    }, h("view", {
      class: "weui-cell__hd"
    }, h("view", {
      class: "weui-label"
    }, h("text", {
      class: "icon_star"
    }, "*"), "\u516C\u793A\u4E3B\u9898")), h("view", {
      class: "weui-cell__bd"
    }, h("input", {
      name: "title",
      class: "weui-input",
      placeholder: "\u8BF7\u8F93\u5165\u516C\u793A\u4E3B\u9898"
    }))), h("view", {
      class: "weui-cell weui-cell_input"
    }, h("view", {
      class: "weui-cell__hd"
    }, h("view", {
      class: "weui-label"
    }, h("text", {
      class: "icon_star"
    }, "*"), "\u5F00\u59CB\u65E5\u671F")), h("view", {
      class: "weui-cell__bd"
    }, h("picker", {
      name: "startTime",
      mode: "date",
      start: "2015-01-01",
      end: "2030-09-01",
      onChange: this.handleStartDatePickerChange,
      "data-change-uid": "e221_91",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-input"
    }, this.state.startDate)))), h("view", {
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
      onChange: this.handleEndDatePickerChange,
      "data-change-uid": "e231_89",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-input"
    }, this.state.endDate)))), h("view", {
      class: "weui-cell"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("textarea", {
      name: "content",
      class: "weui-textarea",
      placeholder: "\u8BF7\u8F93\u5165\u66F4\u591A\u8BE6\u60C5",
      style: "height: 3.3em"
    }))), h("view", {
      class: "weui-cell weui-cell_without_border"
    }, h("view", {
      class: "weui-cell__bd"
    }, this.state.imgs.map((img, i7695) => h("view", {
      class: "weui-uploader__file",
      key: img.path,
      onTap: () => this.handlePreviewImage(img.path),
      onLongpress: () => this.handleDeleteImage(img.path),
      "data-tap-uid": 'e246_22_' + i7695,
      "data-beacon-uid": "default",
      "data-longpress-uid": 'e247_22_' + i7695
    }, h("image", {
      src: img.path,
      class: "img_small"
    }))), this.state.maxImageNum - this.state.imgs.length > 0 && h("view", {
      class: "weui-uploader__file",
      onTap: this.handleChooseImage,
      "data-tap-uid": "e253_54",
      "data-beacon-uid": "default"
    }, h("image", {
      src: "https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/avatar.png",
      class: "img_small"
    })), h("view", {
      style: "float:left;line-height:40px;font-size:14px;color:gray;"
    }, "\u8BF7\u4E0A\u4F20\u7EB8\u8D28\u516C\u793A\u7684\u5E26\u6C34\u5370\u56FE\u7247\u6C38\u4E45\u4FDD\u5B58"))), h("view", {
      class: "weui-cell"
    }, h("view", {
      class: "weui-cell__hd"
    }, h("text", {
      class: "icon_star"
    }, "*"), h("text", null, "\u6536\u4EF6\u4EBA"))), h("view", {
      class: "weui-cell weui-cell_without_border"
    }, h("view", {
      class: "weui-cell__bd"
    }, this.state.addressees.map((member, i8933) => h("view", {
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
      "data-tap-uid": "e274_52",
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
  classUid: "c10039"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '新建公示',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5',
  enablePullDownRefresh: true
};
Page(React.registerPage(Index, "pages/submitformula/index"));
export default Index;
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

  this.handleSubmit = e => {
    if (e.value.remark == '') {
      React.api.showToast({
        title: '请输入完成内容！',
        icon: 'none'
      });
      return false;
    }

    React.api.showLoading({
      title: '提交内容中...'
    });
    this.setState({
      disabled: true
    });
    this.getFileList().then(res => {
      request({
        url: app.globalData.api + "/api/operation/announce/finish",
        method: 'POST',
        data: _objectSpread({}, e.value, {
          opeName: 'finish',
          urls: res.map(item => {
            return JSON.parse(item.data).url;
          }).join(),
          aid: this.props.query.id,
          uid: React.api.getStorageSync('uid')
        })
      }).then(res => {
        React.api.hideLoading();
        this.setState({
          disabled: false
        });

        if (res.data.msg === 'success') {
          React.api.showToast({
            title: '操作成功！'
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
    maxImageNum: 9,
    imgs: []
  };
}

Index = React.toClass(Index, React.Component, {
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
      "data-submit-uid": "e108_16",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-cells weui-cells_after-title"
    }, h("view", {
      class: "weui-cell"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("textarea", {
      name: "remark",
      class: "weui-textarea",
      placeholder: "\u8BF7\u586B\u5199\u5B8C\u6210\u516C\u793A\u5185\u5BB9"
    }))), h("view", {
      class: "weui-cell weui-cell_without_border"
    }, h("view", {
      class: "weui-cell__bd"
    }, this.state.imgs.map((url, i3087) => h("view", {
      class: "weui-uploader__file",
      key: url,
      onTap: () => this.handlePreviewImage(url),
      onLongpress: () => this.handleDeleteImage(url),
      "data-tap-uid": 'e120_22_' + i3087,
      "data-beacon-uid": "default",
      "data-longpress-uid": 'e121_22_' + i3087
    }, h("image", {
      src: url,
      class: "img_small"
    }))), this.state.maxImageNum - this.state.imgs.length > 0 ? h("view", {
      class: "weui-uploader__file",
      onTap: this.handleChooseImage,
      "data-tap-uid": "e126_54",
      "data-beacon-uid": "default"
    }, h("image", {
      src: "https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/avatar.png",
      class: "img_small"
    })) : null))), h("view", {
      class: "bottom_btn_area"
    }, h("button", {
      formType: "submit",
      disabled: this.state.disabled
    }, "\u63D0\u4EA4")))));;
  },
  classUid: "c4197"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '完成公示',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5'
};
Page(React.registerPage(Index, "pages/submitformulafinish/index"));
export default Index;
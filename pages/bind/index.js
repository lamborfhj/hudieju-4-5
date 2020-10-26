import regeneratorRuntime from "../../npm/regenerator-runtime/runtime.js";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import React from "../../ReactWX.js";
import { request, storgeUser } from "../../common/utils";
var app = React.getApp();

function Index() {
  this.handlePickerChange = e => {
    this.setState({
      roleId: this.state.roles[e.detail.value].roleId,
      roleName: this.state.roles[e.detail.value].roleName,
      group: this.state.roles[e.detail.value].group
    });
  };

  this.updatePwd = userinfo => {
    return request({
      url: app.globalData.api + "/api/user/authAddPassword",
      method: 'POST',
      data: {
        password: userinfo.password
      }
    });
  };

  this.updateBasic = userinfo => {
    return React.api.request({
      url: app.globalData.api + "/api/user/inviteToZones",
      method: 'POST',
      data: {
        openId: React.api.getStorageSync('openid'),
        realname: userinfo.realname,
        inviteCode: userinfo.inviteCode,
        roomNum: userinfo.roomNum,
        roleId: this.state.roleId
      }
    });
  };

  this.handleSubmit = e => {
    if (e.value.realname == '') {
      React.api.showToast({
        title: '请输入真实姓名！',
        icon: 'none'
      });
      return false;
    }

    if (e.value.inviteCode == '') {
      React.api.showToast({
        title: '请输入邀请码！',
        icon: 'none'
      });
      return false;
    }

    if (this.state.roleId == 0) {
      React.api.showToast({
        title: '请选择角色！',
        icon: 'none'
      });
      return false;
    }

    if (typeof e.value.roomNum != 'undefined' && e.value.roomNum == '') {
      React.api.showToast({
        title: '请输入房号！',
        icon: 'none'
      });
      return false;
    }

    if (e.value.password == '') {
      React.api.showToast({
        title: '请输入密码！',
        icon: 'none'
      });
      return false;
    }

    if (e.value.password2 == '') {
      React.api.showToast({
        title: '请输入确认密码！',
        icon: 'none'
      });
      return false;
    }

    if (e.value.password !== e.value.password2) {
      React.api.showToast({
        title: '密码不一致，请重新输入！',
        icon: 'none'
      });
      return false;
    } //两次密码比较


    this.updateUser(e.value);
  };

  this.state = {
    roleId: 0,
    roleName: '',
    group: '',
    // "业主委员会""物业公司""小区业主"
    roles: []
  };
}

Index = React.toClass(Index, React.Component, {
  componentDidMount: function () {
    request({
      url: app.globalData.api + "/api/user/sysRoleList",
      method: 'POST',
      data: {
        sysRoleQueryParam: {}
      }
    }).then(res => {
      if (res && res.data.msg === 'success') {
        this.setState({
          roles: res.data.sysRoleEntityList.filter(item => item.roleId != 1)
        });
      }
    });
  },
  updateUser: function () {
    var _ref = _asyncToGenerator(function* (userinfo) {
      const res1 = yield this.updateBasic(userinfo);

      if (!res1 || res1.data.msg !== 'success') {
        React.api.showToast({
          title: res1.data.msg,
          icon: 'none'
        });
        return;
      }

      const res2 = yield this.updatePwd(userinfo);

      if (!res2 || res2.data.msg !== 'success') {
        React.api.showToast({
          title: res2.data.msg,
          icon: 'none'
        });
        return;
      }

      storgeUser().then(() => {
        React.api.showToast({
          title: '绑定成功！'
        }).then(() => {
          setTimeout(() => {
            React.api.switchTab({
              url: '/pages/index'
            });
          }, 1500);
        });
      });
    });

    return function updateUser(_x) {
      return _ref.apply(this, arguments);
    };
  }(),
  render: function () {
    var h = React.createElement;
    return h("view", {
      class: "page"
    }, h("view", {
      class: "page__bd"
    }, h("form", {
      onSubmit: this.handleSubmit,
      "data-submit-uid": "e132_16",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-panel"
    }, h("view", {
      class: "weui-panel__hd"
    }, "\u57FA\u672C\u4FE1\u606F\u8BBE\u7F6E"), h("view", {
      class: "weui-panel__bd"
    }, h("view", {
      class: "weui-cells weui-cells_after-title weui-cells_without_border"
    }, h("view", {
      class: "weui-cell weui-cell_input"
    }, h("view", {
      class: "weui-cell__hd"
    }, h("view", {
      class: "weui-label"
    }, h("text", {
      class: "icon_star"
    }, "*"), "\u771F\u5B9E\u59D3\u540D")), h("view", {
      class: "weui-cell__bd"
    }, h("input", {
      name: "realname",
      class: "weui-input"
    }))), h("view", {
      class: "weui-cell weui-cell_input"
    }, h("view", {
      class: "weui-cell__hd"
    }, h("view", {
      class: "weui-label"
    }, h("text", {
      class: "icon_star"
    }, "*"), "\u9080\u8BF7\u7801")), h("view", {
      class: "weui-cell__bd"
    }, h("input", {
      name: "inviteCode",
      class: "weui-input"
    }))), h("view", {
      class: "weui-cell weui-cell_select"
    }, h("view", {
      class: "weui-cell__hd weui-cell__hd_in-select-after"
    }, h("view", {
      class: "weui-label"
    }, h("text", {
      class: "icon_star"
    }, "*"), "\u89D2\u8272")), h("view", {
      class: "weui-cell__bd"
    }, h("picker", {
      range: this.state.roles,
      "range-key": "roleName",
      onChange: this.handlePickerChange,
      "data-change-uid": "e158_76",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-select"
    }, this.state.roleName)))), (this.state.group == '业主委员会' || this.state.group == '小区业主') && h("view", {
      class: "weui-cell weui-cell_input"
    }, h("view", {
      class: "weui-cell__hd"
    }, h("view", {
      class: "weui-label"
    }, h("text", {
      class: "icon_star"
    }, "*"), "\u623F\u53F7")), h("view", {
      class: "weui-cell__bd"
    }, h("input", {
      name: "roomNum",
      class: "weui-input"
    })))))), h("view", {
      class: "weui-panel"
    }, h("view", {
      class: "weui-panel__hd"
    }, "\u5BC6\u7801\u8BBE\u7F6E"), h("view", {
      class: "weui-panel__bd"
    }, h("view", {
      class: "weui-cells weui-cells_after-title weui-cells_without_border"
    }, h("view", {
      class: "weui-cell weui-cell_input"
    }, h("view", {
      class: "weui-cell__hd"
    }, h("view", {
      class: "weui-label"
    }, h("text", {
      class: "icon_star"
    }, "*"), "\u5BC6\u7801")), h("view", {
      class: "weui-cell__bd"
    }, h("input", {
      type: "password",
      name: "password",
      class: "weui-input"
    }))), h("view", {
      class: "weui-cell weui-cell_input"
    }, h("view", {
      class: "weui-cell__hd"
    }, h("view", {
      class: "weui-label"
    }, h("text", {
      class: "icon_star"
    }, "*"), "\u786E\u8BA4\u5BC6\u7801")), h("view", {
      class: "weui-cell__bd"
    }, h("input", {
      type: "password",
      name: "password2",
      class: "weui-input"
    })))))), h("view", {
      class: "weui-panel"
    }), h("view", {
      class: "bottom_btn_area"
    }, h("button", {
      formType: "submit"
    }, "\u63D0\u4EA4")))));;
  },
  classUid: "c7103"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '用户绑定',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5'
};
Page(React.registerPage(Index, "pages/bind/index"));
export default Index;
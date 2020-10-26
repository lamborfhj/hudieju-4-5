import regeneratorRuntime from "../npm/regenerator-runtime/runtime.js";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "../ReactWX.js";
var app = React.getApp();
export function request(params) {
  return React.api.request(_objectSpread({}, params, {
    header: {
      token: React.api.getStorageSync('token') || '00000000000000000000000000000000' // token:"05568436e3974c1fa8e5cc0140880c56"

    }
  })).then(res => {
    if (res.data.msg === 'token失效，请重新登录') {
      return new Promise(resolve => {
        React.api.login({
          success: function (result) {
            resolve(result);
          }
        });
      }).then(result => {
        return React.api.request({
          url: app.globalData.api + "/wx/user/" + app.globalData.appid + "/login",
          method: 'GET',
          data: {
            appid: app.globalData.appid,
            code: result.code
          }
        });
      }).then(result => {
        app.globalData.token = result.data.loginResult.token;
        React.api.setStorageSync("token", result.data.loginResult.token);
        return request(_objectSpread({}, params, {
          header: {
            token: result.data.loginResult.token
          }
        }));
      });
    } else {
      console.log(res, 'res');
      return res;
    }
  });
}
export function storgeUser() {
  return request({
    url: app.globalData.api + "/api/user/userInfo",
    method: 'GET'
  }).then(res => {
    React.api.setStorageSync('uid', parseInt(res.data.user.id));
    React.api.setStorageSync('mobile', parseInt(res.data.user.mobile));
    React.api.setStorageSync('realname', res.data.user.realname);
    React.api.setStorageSync('gender', res.data.user.gender);
    React.api.setStorageSync('roomNum', res.data.user.roomNum);
    React.api.setStorageSync('avatarUrl', res.data.user.avatarUrl);
    React.api.setStorageSync('verify_status', res.data.user.verifyStatus);
    React.api.setStorageSync('status', res.data.user.status);

    if (res.data.user.zoneId > 0 && !React.api.getStorageSync('zone_id')) {
      React.api.setStorageSync('zone_id', res.data.user.zoneId);
      React.api.request({
        url: app.globalData.api + "/api/zones/info/" + res.data.user.zoneId,
        method: 'POST',
        data: {
          id: res.data.user.zoneId
        }
      }).then(res => {
        React.api.setStorageSync('zone_name', res.data.zones.name);
        React.api.setStorageSync('zone_address', res.data.zones.address);
        React.api.setStorageSync('zoneInviteCode', res.data.zones.inviteCode);
        React.api.setStorageSync('enableUseTime', res.data.zones.enableUseTime);
      });
    }

    if (res.data.user.roleId) {
      React.api.setStorageSync('role_id', res.data.user.roleId);
      React.api.setStorageSync('role_code', res.data.user.roleCode);
      React.api.setStorageSync('role_name', res.data.user.roleNameList[0]);
      request({
        url: app.globalData.api + "/api/mainPage/modules",
        method: 'POST',
        data: {
          uid: res.data.user.id
        }
      }).then(res => {
        React.api.setStorageSync('authority', res.data.menuMap);
        console.log('res.data.menuMap',res.data.menuMap);
      });
    }
  });
}

function storgeMockUser() {
  // React.api.setStorageSync('uid', parseInt(res.data.user.id));
  // React.api.setStorageSync('mobile', parseInt(res.data.user.mobile));
  // React.api.setStorageSync('realname', res.data.user.realname);
  // React.api.setStorageSync('gender', res.data.user.gender);
  // React.api.setStorageSync('roomNum', res.data.user.roomNum);
  // React.api.setStorageSync('avatarUrl', res.data.user.avatarUrl);
  // React.api.setStorageSync('verify_status', res.data.user.verifyStatus);
  // React.api.setStorageSync('status', res.data.user.status);
  // React.api.setStorageSync('zone_id', res.data.user.zoneId);
  React.api.setStorageSync('zone_name', "示例小区");
  React.api.setStorageSync('zone_address', "xx市xx区xx路xx号"); // React.api.setStorageSync('role_id', res.data.user.roleId);
  // React.api.setStorageSync('role_code', res.data.user.roleCode);
  // React.api.setStorageSync('role_name', res.data.user.roleNameList[0]);

  React.api.setStorageSync('authority', {
    index: {
      quick: ["mystamp", "myvote"],
      grid: ["stamp", "vote", "meeting", "mypaper", "mybill", "mynotice", "formula", "history", "expenditure", "added"]
    },
    history: {
      list: ["stamp", "vote", "meeting", "mypaper", "mybill", "mynotice", "formula", "ownmeeting", "expenditure"]
    },
    my: {
      list: ["stamp", "vote", "meeting", "mypaper", "mybill", "mynotice", "formula", "org", "expenditure", "version"]
    }
  });
}

export function checkAuth(_x) {
  return _checkAuth.apply(this, arguments);
} // export async function checkAuth(func) {
//   // 是否登录
//   if (!React.api.getStorageSync('uid')) {
//     React.api.navigateTo({ url: '/pages/guide/index' });
//     return;
//   }
//   // 是否绑定小区
//   if (!React.api.getStorageSync('zone_id') || React.api.getStorageSync('zone_id') == 0) {
//     React.api.navigateTo({ url: '/pages/bind/index' });
//     return;
//   }
//   // 更新用户信息
//   await storgeUser();
//   // 用户是否审核中
//   if (!React.api.getStorageSync('verify_status') || React.api.getStorageSync('verify_status') == 0) {
//     React.api.navigateTo({ url: '/pages/waiting/index' });
//     return;
//   }
//   // 用户是否有效
//   if (!React.api.getStorageSync('status') || React.api.getStorageSync('status') == 0) {
//     React.api.navigateTo({ url: '/pages/forbidden/index' });
//     return;
//   }
//   if(func) func()
// }

function _checkAuth() {
  _checkAuth = _asyncToGenerator(function* (func) {
    // 是否登录
    if (React.api.getStorageSync('uid')) {
      // 是否绑定小区
      if (!React.api.getStorageSync('zone_id') || React.api.getStorageSync('zone_id') == 0) {
        React.api.navigateTo({
          url: '/pages/bind/index'
        });
        return;
      } // 更新用户信息


      yield storgeUser(); // 用户是否审核中

      if (!React.api.getStorageSync('verify_status') || React.api.getStorageSync('verify_status') == 0) {
        React.api.navigateTo({
          url: '/pages/waiting/index'
        });
        return;
      } // 用户是否有效


      if (!React.api.getStorageSync('status') || React.api.getStorageSync('status') == 0) {
        React.api.navigateTo({
          url: '/pages/forbidden/index'
        });
        return;
      }
    } else {
      storgeMockUser();
    }

    if (func) func();
  });
  return _checkAuth.apply(this, arguments);
}

export const modules = [{
  img: 'https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/icon_02.png',
  img2: 'https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/icon_02.png',
  myName: '我的组织',
  action: 'org',
  field: null
}, {
  img: 'https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/biaojue.png',
  img2: 'https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/biaojue.png',
  name: '事项表决',
  historyName: '历史表决',
  myName: '我的表决',
  action: 'vote',
  field: 'waitVoteVerifyCount'
}, {
  img: 'https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/icon_01.png',
  img2: 'https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/icon_01.png',
  name: '用章审批',
  historyName: '历史用章',
  myName: '我的用章',
  action: 'stamp',
  field: 'waitRequestVerifyCount'
}, {
  img: 'https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/icon_10.png',
  img2: 'https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/icon_10.png',
  name: '费用报销',
  historyName: '历史报销',
  myName: '我的报销',
  action: 'mybill',
  field: 'waitBillVerifyCount'
}, {
  img: 'https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/icon_03.png',
  img2: 'https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/icon_03.png',
  name: '业委会议',
  historyName: '历史会议',
  myName: '我的会议',
  action: 'meeting',
  field: 'waitJoinMeetingCount'
}, {
  img: '../assets/images/icon_101.png',
  img2: '../../assets/images/icon_101.png',
  name: '公共收支',
  historyName: '历史收支',
  myName: '我的收支',
  action: 'expenditure',
  field: null
}, {
  img: 'https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/icon_12.png',
  img2: 'https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/icon_12.png',
  name: '历史查询',
  action: 'history',
  field: null
}, {
  img: 'https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/icon_05.png',
  img2: 'https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/icon_05.png',
  name: '网上发函',
  historyName: '历史发函',
  myName: '我的发函',
  action: 'mypaper',
  field: 'waitPaperVerifyCount'
}, {
  img: 'https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/icon_15.png',
  img2: 'https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/icon_15.png',
  name: '通知公告',
  historyName: '历史公告',
  myName: '我的公告',
  action: 'mynotice',
  field: 'unreadNoticeCount',
  public: true
}, {
  img: 'https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/icon_13.png',
  img2: 'https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/icon_13.png',
  name: '公示记录',
  historyName: '历史公示',
  myName: '我的公示',
  action: 'formula',
  field: 'noticedAnnounce',
  public: true
}, {
  img: '../assets/images/icon_110.png',
  img2: '../../assets/images/icon_110.png',
  name: '履职数据',
  action: 'added',
  field: null
},{
  img: '../assets/images/set.png',
  img2: '../../assets/images/set.png',
  name: '版本信息',
  myName: '版本信息',
  action: 'version',
  field: null
}, {
  img: 'https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/icon_14.png',
  img2: 'https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/icon_14.png',
  name: '小区信息',
  action: 'zone',
  field: null
}, {
  img: 'https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/icon_17.png',
  img2: 'https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/icon_17.png',
  // name: '业主大会',
  historyName: '业主大会',
  action: 'ownmeeting',
  field: null // field: 'noticedAnnounce',
  // public: true,

}];
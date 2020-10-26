import regeneratorRuntime from "../npm/regenerator-runtime/runtime.js";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import React from "../ReactWX.js";
import { request, checkAuth, modules } from "../common/utils";
import { meetinglist, noticelist, formulalist } from "../common/data";
var app = React.getApp();

function Index() {
  this.loadUnread = () => {
    return React.api.request({
      url: app.globalData.api + "/api/mainPage/mainPage1",
      method: 'POST',
      data: {
        uid: React.api.getStorageSync('uid')
      }
    }).then(res => {
      if (res.data.msg === 'success') {
        this.setState({
          waits: res.data.mainPage1VO
        });
      } else {
        React.api.showToast({
          title: res.data.msg,
          icon: 'none'
        });
      }
    });
  };

  this.loadList = () => {
    request({
      url: app.globalData.api + "/api/operation/notice/list",
      method: 'POST',
      data: {
        zoneId: React.api.getStorageSync('zone_id'),
        page: 1,
        limit: 10
      }
    }).then(res => {
      this.setState({
        notices: res.data.page.list
      });
    });

    if (React.api.getStorageSync('role_id') != 39) {
      request({
        url: app.globalData.api + "/api/operation/announce/list",
        method: 'POST',
        data: {
          receiverUid: React.api.getStorageSync('uid'),
          status: 0,
          zoneId: React.api.getStorageSync('zone_id'),
          page: 1,
          limit: 20
        }
      }).then(res => {
        this.setState({
          formulas: res.data.announce.list
        });
      });
      request({
        url: app.globalData.api + "/api/operation/meeting/list",
        method: 'POST',
        data: {
          meetingMemberType: 1,
          participateMeetingUid: React.api.getStorageSync('uid'),
          zoneId: React.api.getStorageSync('zone_id'),
          page: 1,
          limit: 20
        }
      }).then(res => {
        this.setState({
          meetings: res.data.page.list
        });
      });
    }
  };

  this.handleGoto = (type, action) => {
    console.log(type)
    // if(type === "added"){
    //   wx.showModal({
    //     title:'温馨提示',
    //     content: '开发中......',        
    //   })
    // }else {
      let url = "/pages/" + type + "/index";
      if (type == 'mystamp' || type == 'myvote') url += "?action=" + action;
      React.api.navigateTo({
        url
      });
    // }
  };

  this.handleGotoDetail = (id, page) => {
    React.api.navigateTo({
      url: "/pages/" + page + "/index?id=" + id
    });
  };

  this.state = {
    zoneName: '',
    // 小区名
    zoneAddress: '',
    // 小区地址
    authority: {},
    modules: [],
    waits: null,
    notices: [],
    formulas: [],
    meetings: []
  };
}

Index = React.toClass(Index, React.Component, {
  onShow: function () {
    checkAuth(() => this.load());
  },
  onPullDownRefresh: function () {
    this.load().then(() => {
      React.api.stopPullDownRefresh();
      React.api.showToast({
        title: '页面刷新成功！'
      });
    });
  },
  load: function () {
    var _ref = _asyncToGenerator(function* () {
      React.api.setNavigationBarTitle({
        title: React.api.getStorageSync('zone_name')
      });
      this.setState({
        zoneName: React.api.getStorageSync('zone_name'),
        // 小区名
        zoneAddress: React.api.getStorageSync('zone_address'),
        // 小区地址
        authority: React.api.getStorageSync('authority').index || {}
      }, () => {
        console.log(React.api.getStorageSync('authority'));
        console.log(this.state.authority.grid, 'auth');
        this.setState({
          modules: modules.filter(item => this.state.authority.grid.includes(item.action))
        });
      });

      if (React.api.getStorageSync('uid')) {
        yield this.loadUnread();
        yield this.loadList();
      } else {
        this.setState({
          notices: noticelist.data.page.list,
          formulas: formulalist.data.announce.list,
          meetings: meetinglist.data.page.list
        });
      }
    });

    return function load() {
      return _ref.apply(this, arguments);
    };
  }(),
  render: function () {
    var h = React.createElement;
    return h("view", {
      class: "page"
    }, h("view", {
      class: "page__bd",
      style: "padding-bottom: 0;"
    }, h("view", {
      class: "page-section page-section-spacing swiper"
    }, h("swiper", {
      autoplay: true,
      interval: 3000,
      style: "height: 35vh;"
    }, h("swiper-item", null, h("image", {
      src: "https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/index_1.jpg",
      style: "height:100%;width:100%;object-fit:cover;"
    })), h("swiper-item", null, h("image", {
      src: "https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/index_2_new.jpg",
      style: "height:100%;width:100%;object-fit:cover;"
    })), h("swiper-item", null, h("image", {
      src: "https://ywh-hdj.oss-cn-hangzhou.aliyuncs.com/2.png",
      style: "height:100%;width:100%;object-fit:cover;"
    })))), h("view", {
      class: "weui-panel"
    }, h("view", {
      class: "weui-panel__bd"
    }, h("view", {
      class: "weui-grids"
    }, this.state.modules.map((item, i7107) => h("view", {
      key: item.name,
      class: "weui-grid my-grid",
      "hover-class": "weui-grid_active",
      onTap: () => this.handleGoto(item.action),
      "data-tap-uid": 'e207_101_' + i7107,
      "data-beacon-uid": "default"
    }, h("image", {
      class: "weui-grid__icon img_small",
      src: item.img
    }), this.state.waits && this.state.waits[item.field] > 0 && h("view", {
      class: "weui-badge",
      style: "position: absolute;top: 0.5em;left: 55%;"
    }, this.state.waits[item.field]), h("view", {
      class: "weui-grid__label my_label"
    }, item.name)))))), h("view", {
      class: "weui-panel"
    }, h("view", {
      class: "weui-panel__hd"
    }, "\u6700\u65B0\u6D88\u606F"), h("view", {
      class: "weui-panel__bd"
    }, h("view", {
      class: "weui-cells weui-cells_after-title weui-cells_without_border"
    }, this.state.notices.map(function (item, index) {
      return h("view", {
        class: "weui-cell",
        key: item.id,
        onTap: () => this.handleGotoDetail(item.id, 'noticedetail'),
        "data-tap-uid": 'e225_58_' + index,
        "data-beacon-uid": "default"
      }, h("view", {
        class: "weui-cell__bd"
      }, item.creatorGroup == "小区业主" || item.creatorGroup == "业主委员会" ? h("view", {
        style: "color: green;"
      }, item.title) : item.creatorGroup == "物业公司" ? h("view", {
        style: "color: purple;"
      }, item.title) : h("view", {
        style: "color: red;"
      }, item.title), h("view", {
        style: "font-size: 13px;color: #888888;"
      }, h("text", null, item.createTime), h("image", {
        src: "https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/eye.png",
        style: "width: 14px;height: 10px;margin: 0 3px 0 15px;"
      }), h("text", null, item.readCount || 0))), item.memberStatus == 1 && h("view", {
        class: "weui-cell__ft"
      }, h("view", {
        class: "weui-badge weui-badge_dot",
        style: "font-size:10px;"
      })));
    }, this), this.state.formulas.map(function (item, index) {
      return h("view", {
        class: "weui-cell",
        key: item.id,
        onTap: () => this.handleGotoDetail(item.id, 'formuladetail'),
        "data-tap-uid": 'e250_58_' + index,
        "data-beacon-uid": "default"
      }, h("view", {
        class: "weui-cell__hd",
        style: "margin-right: 10px;"
      }, h("image", {
        src: item.avatarUrl,
        class: "avatar"
      })), h("view", {
        class: "weui-cell__bd"
      }, h("view", null, item.title), h("view", {
        style: "font-size: 13px;color: #888888;"
      }, "\u622A\u6B62\u65E5\u671F: " + item.endTime), h("view", {
        style: "font-size: 13px;color: #c8894e;"
      }, item.statusCn)));
    }, this), this.state.meetings.map(function (item, index) {
      return h("view", {
        class: "weui-cell",
        key: item.id,
        onTap: () => this.handleGotoDetail(item.id, 'meetingdetail'),
        "data-tap-uid": 'e264_58_' + index,
        "data-beacon-uid": "default"
      }, h("view", {
        class: "weui-cell__hd",
        style: "margin-right: 10px;"
      }, h("image", {
        src: item.avatarUrl,
        class: "avatar"
      })), h("view", {
        class: "weui-cell__bd"
      }, h("view", null, item.title), h("view", {
        style: "font-size: 13px;color: #888888;"
      }, "\u4F1A\u8BAE\u65E5\u671F: " + item.startAt), h("view", {
        style: "font-size: 13px;color: #c8894e;"
      }, item.statusCn)));
    }, this))))));;
  },
  classUid: "c11364"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5',
  enablePullDownRefresh: true
};
Page(React.registerPage(Index, "pages/index"));
export default Index;
import React from "../../ReactWX.js";
import { request } from "../../common/utils";
import { billlist } from "../../common/data";
var app = React.getApp();
var sliderWidth = 96;

function Index() {
  this.setDistance = () => {
    var that = this;
    React.api.getSystemInfo({
      success: function (res) {
        that.setState({
          sliderLeft: (res.windowWidth / that.state.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.state.tabs.length * that.state.activeIndex,
          scrollHeight: res.windowHeight - 51
        });
      }
    });
  };

  this.loadInfo = () => {
    this.setState({
      zoneName: React.api.getStorageSync('zone_name'),
      // 小区名
      zoneAddress: React.api.getStorageSync('zone_address') // 小区地址

    });
  };

  this.loadList = () => {
    if (React.api.getStorageSync('uid')) {
      request({
        url: app.globalData.api + "/api/user/simpleListDivide",
        method: 'POST',
        data: {
          zoneId: React.api.getStorageSync('zone_id'),
          status: 1,
          userVerifyStatus: 1
        }
      }).then(res => {
        if (res.data.msg === 'success') {
          this.setState({
            members: res.data.userListDivideGroupList
          });
        }
      });
    }
  };

  this.handleTap = e => {
    this.setState({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  };

  this.handleCall = mobile => {
    React.api.makePhoneCall({
      phoneNumber: mobile
    });
  };

  this.copy = () => {
    if (!this.state.code) {
      return;
    }

    wx.setClipboardData({
      data: this.state.code,

      success(res) {}

    });
  };

  this.state = {
    tabs: ["人员信息", "项目信息"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    scrollHeight: 0,
    isShowPhone: false,
    members: [],
    zoneName: '',
    code: '',
    time: '',
    // 小区名
    zoneAddress: '' // 小区地址

  };
}

Index = React.toClass(Index, React.Component, {
  onShow: function () {
    this.setDistance();
    this.setState({
      authority: React.api.getStorageSync('authority').member || {},
      code: React.api.getStorageSync('zoneInviteCode'),
      time: React.api.getStorageSync('enableUseTime')
    }, () => {
      this.setState({
        isShowPhone: this.state.authority.item && this.state.authority.item.includes("phone")
      });
    });
    this.loadList();
    this.loadInfo();
  },
  render: function () {
    var h = React.createElement;
    return h("view", {
      class: "page"
    }, h("view", {
      class: "page__bd",
      style: "padding-bottom:0;"
    }, h("view", {
      class: "weui-tab"
    }, h("view", {
      class: "weui-navbar"
    }, this.state.tabs.map((item, index) => h("block", {
      key: item
    }, h("view", {
      id: index,
      class: this.state.activeIndex == index ? "weui-navbar__item weui-bar__item_on" : "weui-navbar__item",
      onTap: this.handleTap,
      "data-tap-uid": 'e105_137_' + index,
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-navbar__title"
    }, item)))), h("view", {
      class: "weui-navbar__slider",
      style: "left: " + this.state.sliderLeft + "px; transform: translateX(" + this.state.sliderOffset + "px); -webkit-transform: translateX(" + this.state.sliderOffset + "px);"
    })), h("view", {
      class: "weui-tab__panel"
    }, h("view", {
      class: "weui-tab__content",
      hidden: this.state.activeIndex != 0
    }, this.state.members.map((group, i3332) => h(React.Fragment, null, group.userEntityList.length > 0 ? h("view", {
      key: group.groupName
    }, h("view", {
      class: "weui-cells__title"
    }, group.groupName), h("view", {
      class: "weui-cells weui-cells_after-title"
    }, group.userEntityList.map((member, i3690) => h("view", {
      key: member.id,
      class: "weui-cell",
      onTap: () => this.handleTap(group.groupName, member.id),
      "data-tap-uid": 'e121_69_' + i3332 + '-' + i3690,
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-cell__hd",
      style: "margin-right: 10px;"
    }, h("image", {
      src: member.avatarUrl,
      class: "avatar"
    })), h("view", {
      class: "weui-cell__bd"
    }, h("view", null, member.realname), h("view", {
      style: "font-size: 13px;color: #888888;"
    }, h("view", {
      style: "float: left;margin-right: 10px;"
    }, h("text", null, member.roleName)), this.state.isShowPhone && h("view", {
      style: "float: left;"
    }, h("text", null, group.groupName === '行业主管' ? '' : '电话：'), h("text", {
      style: "color: #65a5ff;",
      catchTap: () => this.handleCall(member.mobile),
      "data-tap-uid": 'e132_70_' + i3332 + '-' + i3690,
      "data-beacon-uid": "default"
    }, group.groupName === '行业主管' ? '' : member.mobile)))))))) : null))), h("view", {
      class: "weui-tab__content",
      hidden: this.state.activeIndex != 1
    }, h("view", {
      class: "weui-panel"
    }, h("view", {
      class: "weui-panel__bd"
    }, h("view", {
      style: "margin-top: 5px;padding-left:10px;"
    }, h("text", {
      style: "color: #c8894e;margin-right: 10px;"
    }, "[\u5C0F\u533A\u4F4D\u7F6E]"), h("text", {
      style: "font-weight: 500;"
    }, this.state.zoneName)), h("view", {
      style: "color:#898989;font-size:14px;margin: 5px 0;padding-left:10px;"
    }, "\u5730\u5740: " + this.state.zoneAddress), h("view", {
      style: "color:#898989;font-size:14px;margin: 5px 0;padding-left:10px;",
      catchTap: () => this.copy(),
      "data-tap-uid": "e182_96",
      "data-beacon-uid": "default"
    }, "\u6CE8\u518C\u9080\u8BF7\u7801\uFF1A", h("text", {
      style: "color:#04be02;"
    }, this.state.code), h("image", {
      src: "../../assets/images/far.svg",
      style: "width:15px;height:15px;margin-left:10px"
    })), h("view", {
      style: "color:#898989;font-size:14px;margin: 5px 0;padding-left:10px;"
    }, "\u6709\u6548\u4F7F\u7528\u622A\u6B62\u65F6\u95F4\uFF1A" + this.state.time))))))));;
  },
  classUid: "c6039"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '我的组织',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5',
  enablePullDownRefresh: true
};
Page(React.registerPage(Index, "pages/org/index"));
export default Index;
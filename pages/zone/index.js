import React from "../../ReactWX.js";
import { request } from "../../common/utils";
var app = React.getApp();

function Index() {
  this.handleCall = mobile => {
    React.api.makePhoneCall({
      phoneNumber: mobile
    });
  };

  this.changeZone = zone => {
    React.api.setStorageSync('zone_id', zone.id);
    React.api.setStorageSync('zone_name', zone.name);
    React.api.setStorageSync('zone_address', zone.address);
    this.setState({
      currentZoneId: zone.id
    });
    React.api.showToast({
      title: '切换成功！'
    });
  };

  this.state = {
    zones: [],
    currentZoneId: null
  };
}

Index = React.toClass(Index, React.Component, {
  onShow: function () {
    request({
      url: app.globalData.api + "/api/zones/managerZoneList",
      method: 'POST'
    }).then(res => {
      if (res.data.msg === 'success') {
        this.setState({
          zones: res.data.zonesList,
          currentZoneId: React.api.getStorageSync('zone_id')
        });
      }
    });
  },
  render: function () {
    var h = React.createElement;
    return h("view", {
      class: "page"
    }, h("view", {
      class: "page__bd",
      style: "padding-bottom:56px;"
    }, h("view", {
      class: "weui-cells weui-cells_after-title"
    }, this.state.zones.map((zone, i1416) => h("view", {
      class: "weui-cell",
      key: zone.id
    }, h("view", {
      class: "weui-cell__hd",
      style: "margin-right: 10px;"
    }, h("image", {
      src: "https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/logo.png",
      class: "avatar"
    })), h("view", {
      class: "weui-cell__bd"
    }, h("view", null, zone.name), h("view", {
      style: "font-size: 13px;"
    }, zone.address), h("view", {
      style: "font-size: 13px;color: #65a5ff;",
      catchTap: () => this.handleCall(zone.tel),
      "data-tap-uid": 'e68_64_' + i1416,
      "data-beacon-uid": "default"
    }, zone.tel)), h("view", {
      class: "weui-cell__ft"
    }, h("button", {
      class: "weui-btn mini-btn",
      type: zone.id == this.state.currentZoneId ? "primary" : "warn",
      size: "mini",
      disabled: zone.id == this.state.currentZoneId,
      onTap: () => this.changeZone(zone),
      "data-tap-uid": 'e76_20_' + i1416,
      "data-beacon-uid": "default"
    }, "\u5207\u6362")))))));;
  },
  classUid: "c2692"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '小区信息',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5',
  enablePullDownRefresh: true
};
Page(React.registerPage(Index, "pages/zone/index"));
export default Index;
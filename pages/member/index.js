function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "../../ReactWX.js";
import { request } from "../../common/utils";
var app = React.getApp();

function Index() {
  this.handleCall = mobile => {
    React.api.makePhoneCall({
      phoneNumber: mobile
    });
  };

  this.handleTap = (groupName, id) => {
    const members = this.state.members.map(group => {
      if (group.groupName === groupName) {
        group.userEntityList.map(member => {
          if (member.id === id) {
            member.checked = member.checked ? false : true;
          } else {
            if (this.state.isSingle) {
              member.checked = false;
            }
          }

          return member;
        });
      }

      return group;
    });
    this.setState({
      members
    });
  };

  this.handleSelectAll = checked => {
    const members = this.state.members.map(group => {
      group.userEntityList.map(member => {
        member.checked = checked;
        return member;
      });
      return group;
    });
    this.setState({
      members
    });
  };

  this.handleSelect = () => {
    const selectedMembers = [];
    this.state.members.forEach(group => {
      group.userEntityList.forEach(member => {
        if (member.checked) {
          selectedMembers.push({
            id: member.id,
            avatarUrl: member.avatarUrl,
            realname: member.realname
          });
        }
      });
    });

    const obj = _objectSpread({}, app.globalData.selectedMembers);

    obj[this.props.query.service] = selectedMembers;
    app.globalData.selectedMembers = obj;
    React.api.navigateBack();
  };

  this.state = {
    members: [],
    selectMode: false,
    isSingle: false
  };
}

Index = React.toClass(Index, React.Component, {
  onShow: function () {
    if (this.props.query.selectMode == 'true') {
      this.setState({
        selectMode: true
      });
    }

    if (this.props.query.isSingle == 'true') {
      this.setState({
        isSingle: true
      });
    }
  },
  componentDidMount: function () {
    const zone_id = React.api.getStorageSync('zone_id');
    request({
      url: app.globalData.api + "/api/user/simpleListDivide",
      method: 'POST',
      data: {
        zoneId: zone_id,
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
  },
  render: function () {
    var h = React.createElement;
    return h("view", {
      class: "page"
    }, h("view", {
      class: "page__bd",
      style: "padding-bottom:56px;"
    }, this.state.members.map((group, i2689) => h(React.Fragment, null, group.userEntityList.length > 0 ? h("view", {
      key: group.groupName
    }, h("view", {
      class: "weui-cells__title"
    }, group.groupName), h("view", {
      class: "weui-cells weui-cells_after-title"
    }, group.userEntityList.map((member, i3011) => h("view", {
      key: member.id,
      class: "weui-cell",
      onTap: () => this.handleTap(group.groupName, member.id),
      "data-tap-uid": 'e122_63_' + i2689 + '-' + i3011,
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
    }, h("text", null, member.roleName)), h("view", {
      style: "float: left;"
    }, h("text", null, "\u7535\u8BDD:"), h("text", {
      style: "color: #65a5ff;",
      catchTap: () => this.handleCall(member.mobile),
      "data-tap-uid": 'e132_62_' + i2689 + '-' + i3011,
      "data-beacon-uid": "default"
    }, member.mobile)))), this.state.selectMode && h("view", {
      class: "weui-cell__ft"
    }, member.checked ? h("icon", {
      class: "weui-icon-checkbox_success",
      type: "success",
      size: "23"
    }) : h("icon", {
      class: "weui-icon-checkbox_circle",
      type: "circle",
      size: "23"
    })))))) : null)), this.state.selectMode && h("view", {
      class: "bottom_btn_area"
    }, !this.state.isSingle && h(React.Fragment, null, h("button", {
      onTap: () => this.handleSelectAll(true),
      "data-tap-uid": "e156_26",
      "data-beacon-uid": "default"
    }, "\u5168\u9009"), h("button", {
      onTap: () => this.handleSelectAll(false),
      "data-tap-uid": "e157_26",
      "data-beacon-uid": "default"
    }, "\u53D6\u6D88\u5168\u9009")), h("button", {
      onTap: this.handleSelect,
      "data-tap-uid": "e160_22",
      "data-beacon-uid": "default"
    }, "\u786E\u8BA4\u9009\u62E9"))));;
  },
  classUid: "c5232"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '人员信息',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5',
  enablePullDownRefresh: true
};
Page(React.registerPage(Index, "pages/member/index"));
export default Index;
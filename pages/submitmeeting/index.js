function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "../../ReactWX.js";
import moment from "../../npm/moment/moment.js";
import { request } from "../../common/utils";
var app = React.getApp();

function Index() {
  this.handleDatePickerChange = e => {
    this.setState({
      date: e.detail.value
    });
  };

  this.handleTimePickerChange = e => {
    this.setState({
      time: e.detail.value
    });
  };

  this.handleTypePickerChange = e => {
    this.setState({
      typeIndex: parseInt(e.detail.value)
    });
  };

  this.handleDurationTypePickerChange = e => {
    this.setState({
      durationIndex: e.detail.value
    });
  };

  this.handleGoto = action => {
    // meetingParticipants meetingCopy
    React.api.navigateTo({
      url: "/pages/member/index?selectMode=true&service=" + action
    });
  };

  this.handleSubmit = e => {
    if (this.state.participants.length <= 1) {
      React.api.showToast({
        title: '请选择其他参会人员！',
        icon: 'none'
      });
      return false;
    }

    if (e.value.title == '') {
      React.api.showToast({
        title: '请输入会议主题！',
        icon: 'none'
      });
      return false;
    }

    if (this.state.typeIndex == 0) {
      if (this.state.date == '') {
        React.api.showToast({
          title: '请选择日期！',
          icon: 'none'
        });
        return false;
      }

      if (this.state.time == '') {
        React.api.showToast({
          title: '请选择时间！',
          icon: 'none'
        });
        return false;
      }
    }

    if (e.value.location == '') {
      React.api.showToast({
        title: '请输入会议地点！',
        icon: 'none'
      });
      return false;
    }

    if (this.state.durations[this.state.durationIndex] == '') {
      React.api.showToast({
        title: '请选择时长！',
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
    const date = this.state.typeIndex == 0 ? this.state.date + " " + this.state.time + ":00" : moment().format("YYYY-MM-DD HH:mm:ss");
    request({
      url: app.globalData.api + "/api/operation/meeting/save",
      method: 'POST',
      data: _objectSpread({}, e.value, {
        meetingMemberEntityList: this.state.participants.map(item => {
          return {
            uid: item.id
          };
        }),
        startAt: date,
        spendTime: this.state.durations[this.state.durationIndex],
        copy2MeetingMemberEntityList: this.state.copies.map(item => {
          return {
            uid: item.id
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
        React.api.showToast({
          title: '创建成功！'
        }).then(() => {
          app.globalData.selectedMembers = _objectSpread({}, app.globalData.selectedMembers, {
            meetingParticipants: [],
            meetingCopy: []
          });
          app.globalData.refreshFlags = _objectSpread({}, app.globalData.refreshFlags, {
            meeting: true
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
  };

  this.state = {
    disabled: false,
    typeIndex: 0,
    type: ["预约开会", "现场开会"],
    durationIndex: 0,
    durations: ["半小时内", "1-2个小时", "3-5个小时", "其他"],
    participants: [],
    copies: [],
    date: '',
    time: ''
  };
}

Index = React.toClass(Index, React.Component, {
  onShow: function () {
    let participants = app.globalData.selectedMembers['meetingParticipants'] || [];
    if (!participants.find(item => item.id == React.api.getStorageSync('uid'))) participants = [{
      id: React.api.getStorageSync('uid'),
      realname: React.api.getStorageSync('realname'),
      avatarUrl: React.api.getStorageSync('avatarUrl')
    }, ...participants];
    this.setState({
      participants,
      copies: app.globalData.selectedMembers['meetingCopy'] || []
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
      "data-submit-uid": "e150_16",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-cells weui-cells_after-title"
    }, h("view", {
      class: "weui-cell"
    }, h("view", {
      class: "weui-cell__hd"
    }, h("text", {
      class: "icon_star"
    }, "*"), h("text", null, "\u53C2\u4F1A\u4EBA\u5458"))), h("view", {
      class: "weui-cell weui-cell_without_border"
    }, h("view", {
      class: "weui-cell__bd"
    }, this.state.participants.map((member, i4660) => h("view", {
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
      onTap: () => this.handleGoto('meetingParticipants'),
      style: "text-align:center;width:60px;",
      "data-tap-uid": "e166_52",
      "data-beacon-uid": "default"
    }, h("view", null, h("image", {
      src: "https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/add.png",
      class: "avatar_small"
    }))))), h("view", {
      class: "weui-cell weui-cell_input"
    }, h("view", {
      class: "weui-cell__hd"
    }, h("view", {
      class: "weui-label"
    }, h("text", {
      class: "icon_star"
    }, "*"), "\u4F1A\u8BAE\u4E3B\u9898")), h("view", {
      class: "weui-cell__bd"
    }, h("input", {
      name: "title",
      class: "weui-input",
      placeholder: "\u8BF7\u8F93\u5165\u4F1A\u8BAE\u4E3B\u9898"
    }))), h("view", {
      class: "weui-cell weui-cell_select"
    }, h("view", {
      class: "weui-cell__hd weui-cell__hd_in-select-after"
    }, h("view", {
      class: "weui-label"
    }, h("text", {
      class: "icon_star"
    }, "*"), "\u4F1A\u8BAE\u7C7B\u578B")), h("view", {
      class: "weui-cell__bd"
    }, h("picker", {
      name: "type",
      range: this.state.type,
      value: this.state.typeIndex,
      onChange: this.handleTypePickerChange,
      "data-change-uid": "e184_91",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-select"
    }, this.state.type[this.state.typeIndex])))), this.state.typeIndex == 0 && h(React.Fragment, null, h("view", {
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
      mode: "date",
      start: "2015-01-01",
      end: "2030-09-01",
      onChange: this.handleDatePickerChange,
      "data-change-uid": "e196_78",
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
    }, "*"), "\u5F00\u59CB\u65F6\u95F4")), h("view", {
      class: "weui-cell__bd"
    }, h("picker", {
      mode: "time",
      start: "08:01",
      end: "23:01",
      onChange: this.handleTimePickerChange,
      "data-change-uid": "e206_68",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-input"
    }, this.state.time))))), h("view", {
      class: "weui-cell weui-cell_input"
    }, h("view", {
      class: "weui-cell__hd"
    }, h("view", {
      class: "weui-label"
    }, h("text", {
      class: "icon_star"
    }, "*"), "\u4F1A\u8BAE\u5730\u70B9")), h("view", {
      class: "weui-cell__bd"
    }, h("input", {
      name: "location",
      class: "weui-input",
      placeholder: "\u8BF7\u8F93\u5165\u4F1A\u8BAE\u5730\u70B9"
    }))), h("view", {
      class: "weui-cell weui-cell_select"
    }, h("view", {
      class: "weui-cell__hd weui-cell__hd_in-select-after"
    }, h("view", {
      class: "weui-label"
    }, h("text", {
      class: "icon_star"
    }, "*"), "\u9884\u4F30\u65F6\u957F")), h("view", {
      class: "weui-cell__bd"
    }, h("picker", {
      range: this.state.durations,
      onChange: this.handleDurationTypePickerChange,
      "data-change-uid": "e226_55",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-select"
    }, this.state.durations[this.state.durationIndex])))), h("view", {
      class: "weui-cell"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("textarea", {
      name: "content",
      class: "weui-textarea",
      placeholder: "\u8BF7\u8F93\u5165\u66F4\u591A\u8BE6\u60C5",
      style: "height: 3.3em"
    }))), h("view", {
      class: "weui-cell"
    }, h("view", {
      class: "weui-cell__hd"
    }, h("text", null, "\u6284\u9001\u4EBA"))), h("view", {
      class: "weui-cell weui-cell_without_border"
    }, h("view", {
      class: "weui-cell__bd"
    }, this.state.copies.map((member, i9073) => h("view", {
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
      "data-tap-uid": "e249_52",
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
  classUid: "c10172"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '创建会议',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5',
  enablePullDownRefresh: true
};
Page(React.registerPage(Index, "pages/submitmeeting/index"));
export default Index;
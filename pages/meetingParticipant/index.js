import React from "../../ReactWX.js";
import { request } from "../../common/utils";
var app = React.getApp();

function Index() {
  this.state = {
    status: null,
    participants: [] // 人员

  };
}

Index = React.toClass(Index, React.Component, {
  onShow: function () {
    request({
      url: app.globalData.api + "/api/operation/meeting/info/" + this.props.query.id,
      method: 'POST',
      data: {
        id: parseInt(this.props.query.id)
      }
    }).then(res => {
      const status = this.props.query.status;
      let participants = [];
      if (status == 'unattended') participants = res.data.meeting.meetingMemberEntityList.filter(item => item.status == 0);
      if (status == 'attended') participants = res.data.meeting.meetingMemberEntityList.filter(item => item.status > 0);
      if (status == 'signed') participants = res.data.meeting.meetingMemberEntityList.filter(item => item.status > 1);
      this.setState({
        status: this.props.query.status,
        participants
      });
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
    }, this.state.participants.map((participant, i1470) => h("view", {
      key: participant.id,
      class: "weui-cell"
    }, h("view", {
      class: "weui-cell__hd",
      style: "margin-right: 10px;"
    }, h("image", {
      src: participant.avatarUrl,
      class: "avatar"
    })), h("view", {
      class: "weui-cell__bd"
    }, h("view", null, participant.memberRealname), (this.state.status == 'attended' || this.state.status == 'unattended') && h("view", {
      style: "font-size: 13px;color: #888888;"
    }, participant.signTime && "\u7B7E\u5230\u65F6\u95F4:" + participant.signTime), this.state.status == 'signed' && h("view", {
      style: "font-size: 13px;color: #888888;"
    }, participant.signNameTime ? "\u7B7E\u5B57\u65F6\u95F4:" + participant.signNameTime : '超时签名通过')))))));;
  },
  classUid: "c2580"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '会议情况',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5',
  enablePullDownRefresh: true
};
Page(React.registerPage(Index, "pages/meetingParticipant/index"));
export default Index;
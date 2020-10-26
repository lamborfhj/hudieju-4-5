import React from "../../ReactWX.js";

function Meeting() {
  this.handleGoto = id => {
    React.api.navigateTo({
      url: "/pages/meetingdetail/index?id=" + id
    });
  };
}

Meeting = React.toClass(Meeting, React.Component, {
  render: function () {
    var h = React.createElement;
    return h("view", {
      class: "weui-cell",
      key: this.props.data.id,
      onTap: () => this.handleGoto(this.props.data.id),
      "data-tap-uid": "e17_55",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-cell__hd",
      style: "margin-right: 10px;"
    }, h("image", {
      src: this.props.data.avatarUrl,
      class: "avatar"
    })), h("view", {
      class: "weui-cell__bd"
    }, h("view", null, this.props.data.title), h("view", {
      style: "font-size: 13px;color: #888888;"
    }, "\u4F1A\u8BAE\u65E5\u671F: " + this.props.data.startAt), h("view", {
      style: "font-size: 13px;color: #c8894e;"
    }, this.props.data.statusCn)));;
  },
  classUid: "c894"
}, {});
Component(React.registerComponent(Meeting, "Meeting"));
export default Meeting;
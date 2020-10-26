import React from "../../ReactWX.js";

function Vote() {
  this.handleGoto = id => {
    React.api.navigateTo({
      url: "/pages/votedetail/index?id=" + id
    });
  };
}

Vote = React.toClass(Vote, React.Component, {
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
    }, "\u8868\u51B3\u65E5\u671F: " + this.props.data.endTime), h("view", {
      style: "font-size: 13px;color: #c8894e;"
    }, this.props.data.statusCn)));;
  },
  classUid: "c880"
}, {});
Component(React.registerComponent(Vote, "Vote"));
export default Vote;
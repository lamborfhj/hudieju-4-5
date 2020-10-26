import React from "../../ReactWX.js";

function Bill() {
  this.handleGoto = id => {
    React.api.navigateTo({
      url: "/pages/billdetail/index?id=" + id
    });
  };
}

Bill = React.toClass(Bill, React.Component, {
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
    }, h("view", null, this.props.data.name), h("view", null, "\xA5", this.props.data.money), h("view", {
      style: "font-size: 13px;color: #888888;"
    }, "\u62A5\u9500\u65E5\u671F: " + this.props.data.createTime)));;
  },
  classUid: "c841"
}, {});
Component(React.registerComponent(Bill, "Bill"));
export default Bill;
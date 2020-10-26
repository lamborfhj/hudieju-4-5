import React from "../../ReactWX.js";

function Formula() {
  this.handleGoto = id => {
    React.api.navigateTo({
      url: "/pages/formuladetail/index?id=" + id
    });
  };
}

Formula = React.toClass(Formula, React.Component, {
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
    }, "\u622A\u6B62\u65E5\u671F: " + this.props.data.endTime), h("view", {
      style: "font-size: 13px;color: #c8894e;"
    }, this.props.data.statusCn)));;
  },
  classUid: "c887"
}, {});
Component(React.registerComponent(Formula, "Formula"));
export default Formula;
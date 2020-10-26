import React from "../../ReactWX.js";

function Notice() {
  this.handleGoto = id => {
    React.api.navigateTo({
      url: "/pages/noticedetail/index?id=" + id
    });
  };
}

Notice = React.toClass(Notice, React.Component, {
  render: function () {
    var h = React.createElement;
    return h("view", {
      class: "weui-cell",
      key: this.props.data.id,
      onTap: () => this.handleGoto(this.props.data.id),
      "data-tap-uid": "e17_55",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-cell__bd"
    }, h("view", null, this.props.data.title), h("view", {
      style: "font-size: 13px;color: #888888;"
    }, h("text", null, this.props.data.createTime), h("image", {
      src: "https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/eye.png",
      style: "width: 14px;height: 10px;margin: 0 3px 0 15px;"
    }), h("text", null, this.props.data.readCount || 0))));;
  },
  classUid: "c881"
}, {});
Component(React.registerComponent(Notice, "Notice"));
export default Notice;
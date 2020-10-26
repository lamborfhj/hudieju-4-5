import React from "../../ReactWX.js";
import { request } from "../../common/utils";
var app = React.getApp();

function Index() {
  this.state = {
    readers: [] // 已读人员

  };
}

Index = React.toClass(Index, React.Component, {
  onShow: function () {
    request({
      url: app.globalData.api + "/api/operation/notice/readMembers",
      method: 'GET',
      data: {
        id: parseInt(this.props.query.id)
      }
    }).then(res => {
      this.setState({
        readers: res.data.readMembers
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
    }, this.state.readers.map((reader, i966) => h("view", {
      key: reader.id,
      class: "weui-cell"
    }, h("view", {
      class: "weui-cell__hd",
      style: "margin-right: 10px;"
    }, h("image", {
      src: reader.avatarUrl,
      class: "avatar"
    })), h("view", {
      class: "weui-cell__bd"
    }, h("view", null, reader.realname), h("view", {
      style: "font-size: 13px;color: #888888;"
    }, reader.readTime && "\u9605\u8BFB\u65F6\u95F4:" + reader.readTime)))))));;
  },
  classUid: "c2834"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '已读情况',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5',
  enablePullDownRefresh: true
};
Page(React.registerPage(Index, "pages/noticereader/index"));
export default Index;
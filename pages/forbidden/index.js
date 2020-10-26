import React from "../../ReactWX.js"; // import './index.less';

function Index() {}

Index = React.toClass(Index, React.Component, {
  render: function () {
    var h = React.createElement;
    return h("view", {
      class: "page"
    }, h("view", {
      class: "page__bd",
      style: "text-align:center;"
    }, h("view", {
      class: "icon-box",
      style: "padding: 20px 0;"
    }, h("icon", {
      type: "warn",
      size: "93"
    }), h("view", {
      class: "icon-box__ctn",
      style: "margin: 20px 0 0 0;"
    }, h("view", {
      class: "icon-box__title"
    }, "\u7981\u7528\u4E2D"), h("view", {
      class: "icon-box__desc"
    }, "\u60A8\u7684\u8D26\u53F7\u5DF2\u7981\u7528\uFF0C\u8BF7\u8054\u7CFB\u5C0F\u533A\u7BA1\u7406\u5458")))));;
  },
  classUid: "c857"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '审核中',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5'
};
Page(React.registerPage(Index, "pages/forbidden/index"));
export default Index;
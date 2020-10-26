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
      type: "waiting",
      size: "93"
    }), h("view", {
      class: "icon-box__ctn",
      style: "margin: 20px 0 0 0;"
    }, h("view", {
      class: "icon-box__title"
    }, "\u5BA1\u6838\u4E2D"), h("view", {
      class: "icon-box__desc"
    }, "\u5DF2\u63D0\u4EA4\u7BA1\u7406\u5458\u5BA1\u6838\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85")))));;
  },
  classUid: "c858"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '审核中',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5'
};
Page(React.registerPage(Index, "pages/waiting/index"));
export default Index;
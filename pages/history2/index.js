import React from "../../ReactWX.js";
import { modules } from "../../common/utils";

function Index() {
  this.handleGoto = action => {
    React.api.navigateTo({
      url: "/pages/historylist2/index?action=" + action
    });
  };

  this.state = {
    authority: {},
    modules: []
  };
}

Index = React.toClass(Index, React.Component, {
  onShow: function () {
    this.setState({
      modules: modules.filter(item => item.public === true)
    });
  },
  render: function () {
    var h = React.createElement;
    return h("view", {
      class: "page"
    }, h("view", {
      class: "page__bd"
    }, this.state.modules.map((item, i763) => h("view", {
      key: item.historyName,
      class: "weui-panel"
    }, h("view", {
      class: "weui-panel__bd"
    }, h("view", {
      class: "weui-cell",
      onTap: () => this.handleGoto(item.historyName),
      "data-tap-uid": 'e41_40_' + i763,
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-cell__hd",
      style: "margin-right: 10px;"
    }, h("image", {
      src: item.img2,
      style: "width: 50px; height: 50px;"
    })), h("view", {
      class: "weui-cell__bd"
    }, h("view", null, item.historyName)), h("view", {
      class: "weui-cell__ft weui-cell__ft_in-access"
    })))))));;
  },
  classUid: "c1603"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '公式公告',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5'
};
Page(React.registerPage(Index, "pages/history2/index"));
export default Index;
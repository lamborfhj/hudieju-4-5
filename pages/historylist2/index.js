import React from "../../ReactWX.js";
import { noticelist, formulalist } from "../../common/data";
var app = React.getApp();

function Index() {
  this.setDistance = () => {
    var that = this;
    React.api.getSystemInfo({
      success: function (res) {
        that.setState({
          scrollHeight: res.windowHeight
        });
      }
    });
  };

  this.getFlagKey = () => {
    let key = '';

    switch (this.props.query.action) {
      case '历史公告':
        key = "myNotice";
        break;

      case '历史公示':
        key = "formula";
        break;

      default:
        break;
    }

    return key;
  };

  this.loadList = () => {
    if (this.props.query.action == '历史公告') {
      this.fetchList({
        whole: true,
        page: 1,
        limit: 20
      }, 'notice', true);
    }

    if (this.props.query.action == '历史公示') {
      this.fetchList({
        page: 1,
        limit: 20
      }, 'announce', true);
    }
  };

  this.loadMore = () => {
    if (this.props.query.action == '历史公告') {
      this.fetchList({
        whole: true,
        page: this.state.nextPage1,
        limit: 20
      }, 'notice', false);
    }

    if (this.props.query.action == '历史公示') {
      this.fetchList({
        page: this.state.nextPage1,
        limit: 20
      }, 'announce', false);
    }
  };

  this.fetchList = (params, action, isFirst) => {
    if (this.state.isLoading1) return;

    if (isFirst == false && this.state.nextPage1 == -1) {
      React.api.showToast({
        title: '已全部加载！',
        icon: 'none'
      });
      return;
    }

    this.setState({
      isLoading1: true
    }, () => {
      React.api.request({
        url: app.globalData.api + "/api/operation/" + action + "/list",
        method: 'POST',
        data: params
      }).then(res => {
        this.parseData(res, isFirst, action);
      });
    });
  };

  this.parseData = (res, isFirst, action) => {
    if (action == 'announce') {
      const nextPage = res.data.announce.currPage + 1;
      this.setState({
        list1: isFirst ? res.data.announce.list : this.state.list1.concat(res.data.announce.list),
        nextPage1: nextPage > res.data.announce.totalPage ? -1 : nextPage,
        isLoading1: false
      });
    } else {
      const nextPage = res.data.page.currPage + 1;
      this.setState({
        list1: isFirst ? res.data.page.list : this.state.list1.concat(res.data.page.list),
        nextPage1: nextPage > res.data.page.totalPage ? -1 : nextPage,
        isLoading1: false
      });
    }
  };

  this.handleNext = () => {
    this.loadMore();
  };

  this.handleGoto = id => {
    let page = '';

    switch (this.props.query.action) {
      case '历史公告':
        page = "noticedetail";
        break;

      case '历史公示':
        page = "formuladetail";
        break;

      default:
        break;
    }

    React.api.navigateTo({
      url: "/pages/" + page + "/index?id=" + id + "&type=history"
    });
  };

  this.state = {
    scrollHeight: 0,
    nextPage1: 1,
    list1: [],
    isLoading1: false
  };
}

Index = React.toClass(Index, React.Component, {
  onShow: function () {
    React.api.setNavigationBarTitle({
      title: this.props.query.action
    });
    this.setDistance();
    const flagKey = this.getFlagKey();
    const refreshFlag = app.globalData.refreshFlags[flagKey];

    if (refreshFlag === false) {
      app.globalData.refreshFlags[flagKey] = true;
    } else {
      this.loadList();
    }
  },
  render: function () {
    var h = React.createElement;
    return h("view", {
      class: "page"
    }, h("view", {
      class: "page__bd",
      style: "padding-bottom:0;"
    }, h("scroll-view", {
      "scroll-y": "true",
      onScrollToLower: this.handleNext,
      style: "height:" + this.state.scrollHeight + "px;",
      "data-scrolltolower-uid": "e149_39",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-cells weui-cells_after-title"
    }, this.props.query.action == '历史公告' && this.state.list1.map(function (item, index) {
      return h("view", {
        class: "weui-cell",
        key: item.id,
        onTap: () => this.handleGoto(item.id),
        "data-tap-uid": 'e153_56_' + index,
        "data-beacon-uid": "default"
      }, h("view", {
        class: "weui-cell__bd"
      }, h("view", null, item.title), h("view", {
        style: "font-size: 13px;color: #888888;"
      }, h("text", null, item.createTime), h("image", {
        src: "https://yeweihui-mini.oss-cn-shanghai.aliyuncs.com/mini/eye.png",
        style: "width: 14px;height: 10px;margin: 0 3px 0 15px;"
      }), h("text", null, item.readCount || 0))));
    }, this), this.props.query.action == '历史公示' && this.state.list1.map(function (item, index) {
      return h("view", {
        class: "weui-cell",
        key: item.id,
        onTap: () => this.handleGoto(item.id),
        "data-tap-uid": 'e167_56_' + index,
        "data-beacon-uid": "default"
      }, h("view", {
        class: "weui-cell__hd",
        style: "margin-right: 10px;"
      }, h("image", {
        src: item.avatarUrl,
        class: "avatar"
      })), h("view", {
        class: "weui-cell__bd"
      }, h("view", null, item.title), h("view", {
        style: "font-size: 13px;color: #888888;"
      }, "\u622A\u6B62\u65E5\u671F: " + item.endTime), h("view", {
        style: "font-size: 13px;color: #c8894e;"
      }, item.statusCn)));
    }, this)))));;
  },
  classUid: "c5544"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5'
};
Page(React.registerPage(Index, "pages/historylist2/index"));
export default Index;
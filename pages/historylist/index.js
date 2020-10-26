import React from "../../ReactWX.js";
import { request } from "../../common/utils";
import { votelist, stamplist, billlist, meetinglist, paperlist, noticelist, formulalist, historyVoteList } from "../../common/data";
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
      case '历史用章':
        key = "myStamp";
        break;

      case '历史表决':
        key = "myVote";
        break;

      case '历史会议':
        key = "meeting";
        break;

      case '历史报销':
        key = "myBill";
        break;

      case '历史发函':
        key = "myPaper";
        break;

      case '历史公告':
        key = "myNotice";
        break;

      case '历史公示':
        key = "formula";
        break;

      case '业主大会':
        key = "ownmetting";
        break;
      //修改

      default:
        break;
    }

    return key;
  };

  this.loadList = () => {
    if (this.props.query.action == '历史用章') {
      this.fetchList({
        zoneId: React.api.getStorageSync('zone_id'),
        page: 1,
        limit: 20
      }, 'request', true);
    }

    if (this.props.query.action == '历史表决') {
      this.fetchList({
        zoneId: React.api.getStorageSync('zone_id'),
        voteStatusList: [1, 2, 3, 4, 5],
        page: 1,
        limit: 20
      }, 'vote', true);
    }

    if (this.props.query.action == '历史会议') {
      this.fetchList({
        zoneId: React.api.getStorageSync('zone_id'),
        page: 1,
        limit: 20
      }, 'meeting', true);
    }

    if (this.props.query.action == '历史报销') {
      this.fetchList({
        zoneId: React.api.getStorageSync('zone_id'),
        page: 1,
        limit: 20
      }, 'bill', true);
    }

    if (this.props.query.action == '历史发函') {
      this.fetchList({
        zoneId: React.api.getStorageSync('zone_id'),
        page: 1,
        limit: 20
      }, 'paper', true);
    }

    if (this.props.query.action == '历史公告') {
      this.fetchList({
        zoneId: React.api.getStorageSync('zone_id'),
        whole: true,
        page: 1,
        limit: 20
      }, 'notice', true);
    }

    if (this.props.query.action == '历史公示') {
      this.fetchList({
        zoneId: React.api.getStorageSync('zone_id'),
        page: 1,
        limit: 20
      }, 'announce', true);
    }

    if (this.props.query.action == '业主大会') {
      // this.fetchList({
      //   zoneId: React.api.getStorageSync('zone_id'),
      //   page: this.state.nextPage1,
      //   limit: 20,
      // }, 'announce', false);
      if (React.api.getStorageSync('zone_id')) {
        request({
          url: app.globalData.api + "/api/operation/vote/historyVote/" + React.api.getStorageSync('zone_id'),
          // 小区id
          method: 'POST'
        }).then(res => {
          this.setState({
            list1: res.data.result
          });
        });
      } else {
        this.setState({
          list1: historyVoteList
        });
      }
    }
  };

  this.loadMore = () => {
    if (this.props.query.action == '历史用章') {
      this.fetchList({
        zoneId: React.api.getStorageSync('zone_id'),
        page: this.state.nextPage1,
        limit: 20
      }, 'request', false);
    }

    if (this.props.query.action == '历史表决') {
      this.fetchList({
        zoneId: React.api.getStorageSync('zone_id'),
        voteStatusList: [1, 2, 3, 4, 5],
        page: this.state.nextPage1,
        limit: 20
      }, 'vote', false);
    }

    if (this.props.query.action == '历史会议') {
      this.fetchList({
        zoneId: React.api.getStorageSync('zone_id'),
        page: this.state.nextPage1,
        limit: 20
      }, 'meeting', false);
    }

    if (this.props.query.action == '历史报销') {
      this.fetchList({
        zoneId: React.api.getStorageSync('zone_id'),
        page: this.state.nextPage1,
        limit: 20
      }, 'bill', false);
    }

    if (this.props.query.action == '历史发函') {
      this.fetchList({
        zoneId: React.api.getStorageSync('zone_id'),
        page: this.state.nextPage1,
        limit: 20
      }, 'paper', false);
    }

    if (this.props.query.action == '历史公告') {
      this.fetchList({
        zoneId: React.api.getStorageSync('zone_id'),
        whole: true,
        page: this.state.nextPage1,
        limit: 20
      }, 'notice', false);
    }

    if (this.props.query.action == '历史公示') {
      this.fetchList({
        zoneId: React.api.getStorageSync('zone_id'),
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
      if (React.api.getStorageSync('uid')) {
        request({
          url: app.globalData.api + "/api/operation/" + action + "/list",
          method: 'POST',
          data: params
        }).then(res => {
          this.parseData(res, isFirst, action);
        });
      } else {
        let list = [];

        switch (this.props.query.action) {
          case '历史用章':
            list = stamplist;
            break;

          case '历史表决':
            list = votelist;
            break;

          case '历史会议':
            list = meetinglist;
            break;

          case '历史报销':
            list = billlist;
            break;

          case '历史发函':
            list = paperlist;
            break;

          case '历史公告':
            list = noticelist;
            break;

          case '历史公示':
            list = formulalist;
            break;

          default:
            break;
        }

        this.parseData(list, isFirst, action);
      }
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
      case '历史用章':
        page = "stampdetail";
        break;

      case '历史表决':
        page = "votedetail";
        break;

      case '历史会议':
        page = "meetingdetail";
        break;

      case '历史报销':
        page = "billdetail";
        break;

      case '历史发函':
        page = "paperdetail";
        break;

      case '历史公告':
        page = "noticedetail";
        break;

      case '历史公示':
        page = "formuladetail";
        break;

      case '业主大会':
        page = "historyVoteDetail";
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
      "data-scrolltolower-uid": "e272_39",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-cells weui-cells_after-title"
    }, this.props.query.action == '历史用章' && this.state.list1.map(function (item, index) {
      return h("view", {
        class: "weui-cell",
        key: item.id,
        onTap: () => this.handleGoto(item.id),
        "data-tap-uid": 'e276_56_' + index,
        "data-beacon-uid": "default"
      }, h("view", {
        class: "weui-cell__hd",
        style: "margin-right: 10px;"
      }, h("image", {
        src: item.avatarUrl,
        class: "avatar"
      })), h("view", {
        class: "weui-cell__bd"
      }, h("view", null, item.uname, "\u7684\u7528\u7AE0\u7533\u8BF7"), h("view", {
        style: "font-size: 13px;color: #888888;"
      }, "\u4F7F\u7528\u65E5\u671F: " + item.useDate), h("view", {
        style: "font-size: 13px;color: #c8894e;"
      }, item.statusCn)));
    }, this), this.props.query.action == '历史表决' && this.state.list1.map(function (item, index) {
      return h("view", {
        class: "weui-cell",
        key: item.id,
        onTap: () => this.handleGoto(item.id),
        "data-tap-uid": 'e290_56_' + index,
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
    }, this), this.props.query.action == '历史会议' && this.state.list1.map(function (item, index) {
      return h("view", {
        class: "weui-cell",
        key: item.id,
        onTap: () => this.handleGoto(item.id),
        "data-tap-uid": 'e304_56_' + index,
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
      }, "\u4F1A\u8BAE\u65E5\u671F: " + item.startAt), h("view", {
        style: "font-size: 13px;color: #c8894e;"
      }, item.statusCn)));
    }, this), this.props.query.action == '历史报销' && this.state.list1.map(function (item, index) {
      return h("view", {
        class: "weui-cell",
        key: item.id,
        onTap: () => this.handleGoto(item.id),
        "data-tap-uid": 'e318_56_' + index,
        "data-beacon-uid": "default"
      }, h("view", {
        class: "weui-cell__hd",
        style: "margin-right: 10px;"
      }, h("image", {
        src: item.avatarUrl,
        class: "avatar"
      })), h("view", {
        class: "weui-cell__bd"
      }, h("view", null, item.name), h("view", null, "\xA5", item.money), h("view", {
        style: "font-size: 13px;color: #888888;"
      }, "\u53D1\u751F\u65E5\u671F: " + item.happenDate)));
    }, this), this.props.query.action == '历史发函' && this.state.list1.map(function (item, index) {
      return h("view", {
        class: "weui-cell",
        key: item.id,
        onTap: () => this.handleGoto(item.id),
        "data-tap-uid": 'e332_56_' + index,
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
      }, "\u53D1\u51FD\u65E5\u671F: " + item.createTime), h("view", {
        style: "font-size: 13px;color: #c8894e;"
      }, item.statusCn)));
    }, this), this.props.query.action == '历史公告' && this.state.list1.map(function (item, index) {
      return h("view", {
        class: "weui-cell",
        key: item.id,
        onTap: () => this.handleGoto(item.id),
        "data-tap-uid": 'e346_56_' + index,
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
        "data-tap-uid": 'e360_56_' + index,
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
    }, this), this.props.query.action == '业主大会' && this.state.list1.map(function (item, index) {
      return h("view", {
        class: "weui-cell",
        key: item.id,
        onTap: () => this.handleGoto(item.id),
        "data-tap-uid": 'e374_56_' + index,
        "data-beacon-uid": "default"
      }, h("view", {
        class: "weui-cell__bd"
      }, h("view", null, item.title), item.voteEndTime ? h("view", {
        style: "font-size: 13px;color: #888888;"
      }, "\u7ED3\u675F\u65F6\u95F4: " + item.voteEndTime) : null));
    }, this)))));;
  },
  classUid: "c14131"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5'
};
Page(React.registerPage(Index, "pages/historylist/index"));
export default Index;
import React from "../../ReactWX.js";
import { request } from "../../common/utils";
var app = React.getApp();
var sliderWidth = 96;

function Index() {
  this.setDistance = () => {
    var that = this;
    React.api.getSystemInfo({
      success: function (res) {
        that.setState({
          sliderLeft: (res.windowWidth / that.state.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.state.tabs.length * that.state.activeIndex,
          scrollHeight: res.windowHeight - 51
        });
      }
    });
  };

  this.getFlagKey = () => {
    let key = '';

    switch (this.props.query.action) {
      case '我的用章':
        key = "myStamp";
        break;

      case '我的表决':
        key = "myVote";
        break;

      case '我的会议':
        key = "meeting";
        break;

      case '我的报销':
        key = "myBill";
        break;

      case '我的发函':
        key = "myPaper";
        break;

      case '我的公告':
        key = "myNotice";
        break;

      case '我的公示':
        key = "formula";
        break;

      default:
        break;
    }

    return key;
  };

  this.loadList = () => {
    if (this.props.query.action == '我的用章') {
      this.fetchList({
        requestStatusList: [0, 1, 3],
        requestMemberStatusList: [0],
        requestMemberType: 1,
        verifyUid: React.api.getStorageSync('uid'),
        page: 1,
        limit: 20,
        zoneId: React.api.getStorageSync('zone_id')
      }, 'request', 'list1', 'nextPage1', true);
      this.fetchList({
        requestMemberStatusList: [1, 2, 3],
        requestMemberType: 1,
        verifyUid: React.api.getStorageSync('uid'),
        page: 1,
        limit: 20,
        zoneId: React.api.getStorageSync('zone_id')
      }, 'request', 'list2', 'nextPage2', true);
      this.fetchList({
        zoneId: React.api.getStorageSync('zone_id'),
        page: 1,
        limit: 20
      }, 'request', 'list3', 'nextPage3', true);
      this.fetchList({
        uid: React.api.getStorageSync('uid'),
        page: 1,
        limit: 20,
        zoneId: React.api.getStorageSync('zone_id')
      }, 'request', 'list4', 'nextPage4', true);
    }

    if (this.props.query.action == '我的表决') {
      this.fetchList({
        voteStatusList: [0, 1, 2, 4, 5],
        voteMemberStatusList: [0],
        voteMemberType: 1,
        participateUid: React.api.getStorageSync('uid'),
        page: 1,
        limit: 20,
        zoneId: React.api.getStorageSync('zone_id')
      }, 'vote', 'list1', 'nextPage1', true);
      this.fetchList({
        voteMemberStatusList: [1, 2, 3, 4, 5],
        voteMemberType: 1,
        participateUid: React.api.getStorageSync('uid'),
        page: 1,
        limit: 20,
        zoneId: React.api.getStorageSync('zone_id')
      }, 'vote', 'list2', 'nextPage2', true);
      this.fetchList({
        zoneId: React.api.getStorageSync('zone_id'),
        voteStatusList: [1, 2, 3, 4, 5],
        page: 1,
        limit: 20
      }, 'vote', 'list3', 'nextPage3', true);
      this.fetchList({
        uid: React.api.getStorageSync('uid'),
        page: 1,
        limit: 20,
        zoneId: React.api.getStorageSync('zone_id')
      }, 'vote', 'list4', 'nextPage4', true);
    }

    if (this.props.query.action == '我的会议') {
      this.fetchList({
        zoneId: React.api.getStorageSync('zone_id'),
        meetingMemberStatusList: [0, 1],
        participateMeetingUid: React.api.getStorageSync('uid'),
        meetingMemberType: 1,
        page: 1,
        limit: 20
      }, 'meeting', 'list1', 'nextPage1', true);
      this.fetchList({
        zoneId: React.api.getStorageSync('zone_id'),
        meetingMemberStatusList: [2],
        participateMeetingUid: React.api.getStorageSync('uid'),
        meetingMemberType: 1,
        page: 1,
        limit: 20
      }, 'meeting', 'list2', 'nextPage2', true);
      this.fetchList({
        zoneId: React.api.getStorageSync('zone_id'),
        page: 1,
        limit: 20
      }, 'meeting', 'list3', 'nextPage3', true);
      this.fetchList({
        uid: React.api.getStorageSync('uid'),
        zoneId: React.api.getStorageSync('zone_id'),
        page: 1,
        limit: 20
      }, 'meeting', 'list4', 'nextPage4', true);
    }

    if (this.props.query.action == '我的报销') {
      this.fetchList({
        billStatusList: [0, 1, 2],
        billMemberStatusList: [0],
        verifyUid: React.api.getStorageSync('uid'),
        zoneId: React.api.getStorageSync('zone_id'),
        page: 1,
        limit: 20
      }, 'bill', 'list1', 'nextPage1', true);
      this.fetchList({
        billMemberStatusList: [1, 2],
        verifyUid: React.api.getStorageSync('uid'),
        zoneId: React.api.getStorageSync('zone_id'),
        page: 1,
        limit: 20
      }, 'bill', 'list2', 'nextPage2', true);
      this.fetchList({
        zoneId: React.api.getStorageSync('zone_id'),
        page: 1,
        limit: 20
      }, 'bill', 'list3', 'nextPage3', true);
      this.fetchList({
        uid: React.api.getStorageSync('uid'),
        zoneId: React.api.getStorageSync('zone_id'),
        page: 1,
        limit: 20
      }, 'bill', 'list4', 'nextPage4', true);
    }

    if (this.props.query.action == '我的发函') {
      this.fetchList({
        paperMemberStatus: 0,
        receiverUid: React.api.getStorageSync('uid'),
        zoneId: React.api.getStorageSync('zone_id'),
        page: 1,
        limit: 20
      }, 'paper', 'list1', 'nextPage1', true);
      this.fetchList({
        paperMemberStatus: 1,
        receiverUid: React.api.getStorageSync('uid'),
        zoneId: React.api.getStorageSync('zone_id'),
        page: 1,
        limit: 20
      }, 'paper', 'list2', 'nextPage2', true);
      this.fetchList({
        zoneId: React.api.getStorageSync('zone_id'),
        page: 1,
        limit: 20
      }, 'paper', 'list3', 'nextPage3', true);
      this.fetchList({
        uid: React.api.getStorageSync('uid'),
        zoneId: React.api.getStorageSync('zone_id'),
        page: 1,
        limit: 20
      }, 'paper', 'list4', 'nextPage4', true);
    }

    if (this.props.query.action == '我的公告') {
      this.fetchList({
        readUid: React.api.getStorageSync('uid'),
        noticeMemberStatus: 1,
        zoneId: React.api.getStorageSync('zone_id'),
        page: 1
      }, 'notice', 'list1', 'nextPage1', true);
      this.fetchList({
        readUid: React.api.getStorageSync('uid'),
        noticeMemberStatus: 2,
        zoneId: React.api.getStorageSync('zone_id'),
        page: 1
      }, 'notice', 'list2', 'nextPage2', true);
      this.fetchList({
        zoneId: React.api.getStorageSync('zone_id'),
        whole: true,
        page: 1
      }, 'notice', 'list3', 'nextPage3', true);
      this.fetchList({
        uid: React.api.getStorageSync('uid'),
        zoneId: React.api.getStorageSync('zone_id'),
        page: 1
      }, 'notice', 'list4', 'nextPage4', true);
    }

    if (this.props.query.action == '我的公示') {
      this.fetchList({
        receiverUid: React.api.getStorageSync('uid'),
        status: 0,
        zoneId: React.api.getStorageSync('zone_id'),
        page: 1
      }, 'announce', 'list1', 'nextPage1', true);
      this.fetchList({
        receiverUid: React.api.getStorageSync('uid'),
        status: 1,
        zoneId: React.api.getStorageSync('zone_id'),
        page: 1
      }, 'announce', 'list2', 'nextPage2', true);
      this.fetchList({
        zoneId: React.api.getStorageSync('zone_id'),
        page: 1
      }, 'announce', 'list3', 'nextPage3', true);
      this.fetchList({
        uid: React.api.getStorageSync('uid'),
        zoneId: React.api.getStorageSync('zone_id'),
        page: 1
      }, 'announce', 'list4', 'nextPage4', true);
    }
  };

  this.loadMore = () => {
    if (this.props.query.action == '我的用章') {
      if (this.state.activeIndex == 0) {
        this.fetchList({
          requestStatusList: [0, 1, 3],
          requestMemberStatusList: [0],
          requestMemberType: 1,
          verifyUid: React.api.getStorageSync('uid'),
          page: this.state.nextPage1,
          limit: 20,
          zoneId: React.api.getStorageSync('zone_id')
        }, 'request', 'list1', 'nextPage1', false);
      }

      if (this.state.activeIndex == 1) {
        this.fetchList({
          requestMemberStatusList: [1, 2, 3],
          requestMemberType: 1,
          verifyUid: React.api.getStorageSync('uid'),
          page: this.state.nextPage2,
          limit: 20,
          zoneId: React.api.getStorageSync('zone_id')
        }, 'request', 'list2', 'nextPage2', false);
      }

      if (this.state.activeIndex == 2) {
        this.fetchList({
          zoneId: React.api.getStorageSync('zone_id'),
          page: this.state.nextPage3,
          limit: 20
        }, 'request', 'list3', 'nextPage3', false);
      }

      if (this.state.activeIndex == 3) {
        this.fetchList({
          uid: React.api.getStorageSync('uid'),
          page: this.state.nextPage4,
          limit: 20,
          zoneId: React.api.getStorageSync('zone_id')
        }, 'request', 'list4', 'nextPage4', false);
      }
    }

    if (this.props.query.action == '我的表决') {
      if (this.state.activeIndex == 0) {
        this.fetchList({
          voteStatusList: [0, 1, 2, 4, 5],
          voteMemberStatusList: [0],
          voteMemberType: 1,
          participateUid: React.api.getStorageSync('uid'),
          page: this.state.nextPage1,
          limit: 20,
          zoneId: React.api.getStorageSync('zone_id')
        }, 'vote', 'list1', 'nextPage1', false);
      }

      if (this.state.activeIndex == 1) {
        this.fetchList({
          voteMemberStatusList: [1, 2, 3, 4, 5],
          voteMemberType: 1,
          participateUid: React.api.getStorageSync('uid'),
          page: this.state.nextPage2,
          limit: 20,
          zoneId: React.api.getStorageSync('zone_id')
        }, 'vote', 'list2', 'nextPage2', false);
      }

      if (this.state.activeIndex == 2) {
        this.fetchList({
          zoneId: React.api.getStorageSync('zone_id'),
          voteStatusList: [1, 2, 3, 4, 5],
          page: this.state.nextPage4,
          limit: 20
        }, 'vote', 'list3', 'nextPage3', false);
      }

      if (this.state.activeIndex == 3) {
        this.fetchList({
          uid: React.api.getStorageSync('uid'),
          page: this.state.nextPage3,
          limit: 20,
          zoneId: React.api.getStorageSync('zone_id')
        }, 'vote', 'list4', 'nextPage4', false);
      }
    }

    if (this.props.query.action == '我的会议') {
      if (this.state.activeIndex == 0) {
        this.fetchList({
          zoneId: React.api.getStorageSync('zone_id'),
          meetingMemberStatusList: [0, 1],
          participateMeetingUid: React.api.getStorageSync('uid'),
          meetingMemberType: 1,
          page: this.state.nextPage1,
          limit: 20
        }, 'meeting', 'list1', 'nextPage1', false);
      }

      if (this.state.activeIndex == 1) {
        this.fetchList({
          zoneId: React.api.getStorageSync('zone_id'),
          meetingMemberStatusList: [2],
          participateMeetingUid: React.api.getStorageSync('uid'),
          meetingMemberType: 1,
          page: this.state.nextPage2,
          limit: 20
        }, 'meeting', 'list2', 'nextPage2', true);
      }

      if (this.state.activeIndex == 2) {
        this.fetchList({
          zoneId: React.api.getStorageSync('zone_id'),
          page: this.state.nextPage3,
          limit: 20
        }, 'meeting', 'list3', 'nextPage3', false);
      }

      if (this.state.activeIndex == 3) {
        this.fetchList({
          uid: React.api.getStorageSync('uid'),
          zoneId: React.api.getStorageSync('zone_id'),
          page: this.state.nextPage4,
          limit: 20
        }, 'meeting', 'list4', 'nextPage4', false);
      }
    }

    if (this.props.query.action == '我的报销') {
      if (this.state.activeIndex == 0) {
        this.fetchList({
          billStatusList: [0, 1, 2],
          billMemberStatusList: [0],
          verifyUid: React.api.getStorageSync('uid'),
          zoneId: React.api.getStorageSync('zone_id'),
          page: this.state.nextPage1,
          limit: 20
        }, 'bill', 'list1', 'nextPage1', false);
      }

      if (this.state.activeIndex == 1) {
        this.fetchList({
          billMemberStatusList: [1, 2],
          verifyUid: React.api.getStorageSync('uid'),
          zoneId: React.api.getStorageSync('zone_id'),
          page: this.state.nextPage2,
          limit: 20
        }, 'bill', 'list2', 'nextPage2', false);
      }

      if (this.state.activeIndex == 2) {
        this.fetchList({
          zoneId: React.api.getStorageSync('zone_id'),
          page: this.state.nextPage3,
          limit: 20
        }, 'bill', 'list3', 'nextPage3', false);
      }

      if (this.state.activeIndex == 3) {
        this.fetchList({
          uid: React.api.getStorageSync('uid'),
          zoneId: React.api.getStorageSync('zone_id'),
          page: this.state.nextPage4,
          limit: 20
        }, 'bill', 'list4', 'nextPage4', false);
      }
    }

    if (this.props.query.action == '我的发函') {
      if (this.state.activeIndex == 0) {
        this.fetchList({
          paperMemberStatus: 0,
          receiverUid: React.api.getStorageSync('uid'),
          zoneId: React.api.getStorageSync('zone_id'),
          page: this.state.nextPage1,
          limit: 20
        }, 'paper', 'list1', 'nextPage1', false);
      }

      if (this.state.activeIndex == 1) {
        this.fetchList({
          paperMemberStatus: 1,
          receiverUid: React.api.getStorageSync('uid'),
          zoneId: React.api.getStorageSync('zone_id'),
          page: this.state.nextPage2,
          limit: 20
        }, 'paper', 'list2', 'nextPage2', false);
      }

      if (this.state.activeIndex == 2) {
        this.fetchList({
          zoneId: React.api.getStorageSync('zone_id'),
          page: this.state.nextPage3,
          limit: 20
        }, 'paper', 'list3', 'nextPage3', false);
      }

      if (this.state.activeIndex == 3) {
        this.fetchList({
          uid: React.api.getStorageSync('uid'),
          zoneId: React.api.getStorageSync('zone_id'),
          page: this.state.nextPage4,
          limit: 20
        }, 'paper', 'list4', 'nextPage4', false);
      }
    }

    if (this.props.query.action == '我的公告') {
      if (this.state.activeIndex == 0) {
        this.fetchList({
          readUid: React.api.getStorageSync('uid'),
          zoneId: React.api.getStorageSync('zone_id'),
          noticeMemberStatus: 1,
          page: this.state.nextPage1
        }, 'notice', 'list1', 'nextPage1', false);
      }

      if (this.state.activeIndex == 1) {
        this.fetchList({
          readUid: React.api.getStorageSync('uid'),
          zoneId: React.api.getStorageSync('zone_id'),
          noticeMemberStatus: 2,
          page: this.state.nextPage2
        }, 'notice', 'list2', 'nextPage2', false);
      }

      if (this.state.activeIndex == 2) {
        this.fetchList({
          zoneId: React.api.getStorageSync('zone_id'),
          whole: true,
          page: this.state.nextPage3
        }, 'notice', 'list3', 'nextPage3', false);
      }

      if (this.state.activeIndex == 3) {
        this.fetchList({
          uid: React.api.getStorageSync('uid'),
          zoneId: React.api.getStorageSync('zone_id'),
          page: this.state.nextPage4
        }, 'notice', 'list4', 'nextPage4', false);
      }
    }

    if (this.props.query.action == '我的公示') {
      this.fetchList({
        receiverUid: React.api.getStorageSync('uid'),
        status: 0,
        zoneId: React.api.getStorageSync('zone_id'),
        page: this.state.nextPage1
      }, 'announce', 'list1', 'nextPage1', false);
      this.fetchList({
        receiverUid: React.api.getStorageSync('uid'),
        status: 1,
        zoneId: React.api.getStorageSync('zone_id'),
        page: this.state.nextPage2
      }, 'announce', 'list2', 'nextPage2', false);
      this.fetchList({
        zoneId: React.api.getStorageSync('zone_id'),
        page: this.state.nextPage3
      }, 'announce', 'list3', 'nextPage3', false);
      this.fetchList({
        uid: React.api.getStorageSync('uid'),
        zoneId: React.api.getStorageSync('zone_id'),
        page: this.state.nextPage4
      }, 'announce', 'list4', 'nextPage4', false);
    }
  };

  this.fetchList = (params, action, listName, pageName, isFirst) => {
    if (isFirst == false && this.state[pageName] == -1) {
      React.api.showToast({
        title: '已全部加载！',
        icon: 'none'
      });
      return;
    }

    if (React.api.getStorageSync('uid')) {
      request({
        url: app.globalData.api + "/api/operation/" + action + "/list",
        method: 'POST',
        data: params
      }).then(res => {
        if (action == 'announce') {
          const obj = {};
          const nextPage = res.data.announce.currPage + 1;
          obj[listName] = isFirst ? res.data.announce.list : this.state[listName].concat(res.data.announce.list);
          obj[pageName] = nextPage > res.data.announce.totalPage ? -1 : nextPage;
          this.setState(obj);
        } else {
          const obj = {};
          const nextPage = res.data.page.currPage + 1;
          obj[listName] = isFirst ? res.data.page.list : this.state[listName].concat(res.data.page.list);
          obj[pageName] = nextPage > res.data.page.totalPage ? -1 : nextPage;
          this.setState(obj);
        }
      });
    }
  };

  this.handleTap = e => {
    this.setState({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  };

  this.handleNext = () => {
    this.loadMore();
  };

  this.state = {
    tabs: ["待办工作", "已办工作", "全部", "我发起的"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    scrollHeight: 0,
    nextPage1: 1,
    list1: [],
    nextPage2: 1,
    list2: [],
    nextPage3: 1,
    list3: [],
    nextPage4: 1,
    list4: []
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
    }, h("view", {
      class: "weui-tab"
    }, h("view", {
      class: "weui-navbar"
    }, this.state.tabs.map((item, index) => h("block", {
      key: item
    }, h("view", {
      id: index,
      class: this.state.activeIndex == index ? "weui-navbar__item weui-bar__item_on" : "weui-navbar__item",
      onTap: this.handleTap,
      "data-tap-uid": 'e408_137_' + index,
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-navbar__title"
    }, item)))), h("view", {
      class: "weui-navbar__slider",
      style: "left: " + this.state.sliderLeft + "px; transform: translateX(" + this.state.sliderOffset + "px); -webkit-transform: translateX(" + this.state.sliderOffset + "px);"
    })), h("view", {
      class: "weui-tab__panel"
    }, h("view", {
      class: "weui-tab__content",
      hidden: this.state.activeIndex != 0
    }, h("scroll-view", {
      "scroll-y": "true",
      onScrollToLower: this.handleNext,
      style: "height:" + this.state.scrollHeight + "px;",
      "data-scrolltolower-uid": "e417_45",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-cells weui-cells_after-title"
    }, this.props.query.action == '我的用章' && this.state.list1.map(function (item, index) {
      return h(React.useComponent, {
        data: item,
        is: "Stamp",
        "data-instance-uid": 'i419_113_' + index
      });
    }, this), this.props.query.action == '我的表决' && this.state.list1.map(function (item, index) {
      return h(React.useComponent, {
        data: item,
        is: "Vote",
        "data-instance-uid": 'i420_113_' + index
      });
    }, this), this.props.query.action == '我的会议' && this.state.list1.map(function (item, index) {
      return h(React.useComponent, {
        data: item,
        is: "Meeting",
        "data-instance-uid": 'i421_113_' + index
      });
    }, this), this.props.query.action == '我的报销' && this.state.list1.map(function (item, index) {
      return h(React.useComponent, {
        data: item,
        is: "Bill",
        "data-instance-uid": 'i422_113_' + index
      });
    }, this), this.props.query.action == '我的发函' && this.state.list1.map(function (item, index) {
      return h(React.useComponent, {
        data: item,
        is: "Paper",
        "data-instance-uid": 'i423_113_' + index
      });
    }, this), this.props.query.action == '我的公告' && this.state.list1.map(function (item, index) {
      return h(React.useComponent, {
        data: item,
        is: "Notice",
        "data-instance-uid": 'i424_113_' + index
      });
    }, this), this.props.query.action == '我的公示' && this.state.list1.map(function (item, index) {
      return h(React.useComponent, {
        data: item,
        is: "Formula",
        "data-instance-uid": 'i425_113_' + index
      });
    }, this)))), h("view", {
      class: "weui-tab__content",
      hidden: this.state.activeIndex != 1
    }, h("scroll-view", {
      "scroll-y": "true",
      onScrollToLower: this.handleNext,
      style: "height:" + this.state.scrollHeight + "px;",
      "data-scrolltolower-uid": "e430_45",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-cells weui-cells_after-title"
    }, this.props.query.action == '我的用章' && this.state.list2.map(function (item, index) {
      return h(React.useComponent, {
        data: item,
        is: "Stamp",
        "data-instance-uid": 'i432_113_' + index
      });
    }, this), this.props.query.action == '我的表决' && this.state.list2.map(function (item, index) {
      return h(React.useComponent, {
        data: item,
        is: "Vote",
        "data-instance-uid": 'i433_113_' + index
      });
    }, this), this.props.query.action == '我的会议' && this.state.list2.map(function (item, index) {
      return h(React.useComponent, {
        data: item,
        is: "Meeting",
        "data-instance-uid": 'i434_113_' + index
      });
    }, this), this.props.query.action == '我的报销' && this.state.list2.map(function (item, index) {
      return h(React.useComponent, {
        data: item,
        is: "Bill",
        "data-instance-uid": 'i435_113_' + index
      });
    }, this), this.props.query.action == '我的发函' && this.state.list2.map(function (item, index) {
      return h(React.useComponent, {
        data: item,
        is: "Paper",
        "data-instance-uid": 'i436_113_' + index
      });
    }, this), this.props.query.action == '我的公告' && this.state.list2.map(function (item, index) {
      return h(React.useComponent, {
        data: item,
        is: "Notice",
        "data-instance-uid": 'i437_113_' + index
      });
    }, this), this.props.query.action == '我的公示' && this.state.list2.map(function (item, index) {
      return h(React.useComponent, {
        data: item,
        is: "Formula",
        "data-instance-uid": 'i438_113_' + index
      });
    }, this)))), h("view", {
      class: "weui-tab__content",
      hidden: this.state.activeIndex != 2
    }, h("scroll-view", {
      "scroll-y": "true",
      onScrollToLower: this.handleNext,
      style: "height:" + this.state.scrollHeight + "px;",
      "data-scrolltolower-uid": "e443_45",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-cells weui-cells_after-title"
    }, this.props.query.action == '我的用章' && this.state.list3.map(function (item, index) {
      return h(React.useComponent, {
        data: item,
        is: "Stamp",
        "data-instance-uid": 'i445_113_' + index
      });
    }, this), this.props.query.action == '我的表决' && this.state.list3.map(function (item, index) {
      return h(React.useComponent, {
        data: item,
        is: "Vote",
        "data-instance-uid": 'i446_113_' + index
      });
    }, this), this.props.query.action == '我的会议' && this.state.list3.map(function (item, index) {
      return h(React.useComponent, {
        data: item,
        is: "Meeting",
        "data-instance-uid": 'i447_113_' + index
      });
    }, this), this.props.query.action == '我的报销' && this.state.list3.map(function (item, index) {
      return h(React.useComponent, {
        data: item,
        is: "Bill",
        "data-instance-uid": 'i448_113_' + index
      });
    }, this), this.props.query.action == '我的发函' && this.state.list3.map(function (item, index) {
      return h(React.useComponent, {
        data: item,
        is: "Paper",
        "data-instance-uid": 'i449_113_' + index
      });
    }, this), this.props.query.action == '我的公告' && this.state.list3.map(function (item, index) {
      return h(React.useComponent, {
        data: item,
        is: "Notice",
        "data-instance-uid": 'i450_113_' + index
      });
    }, this), this.props.query.action == '我的公示' && this.state.list3.map(function (item, index) {
      return h(React.useComponent, {
        data: item,
        is: "Formula",
        "data-instance-uid": 'i451_113_' + index
      });
    }, this)))), h("view", {
      class: "weui-tab__content",
      hidden: this.state.activeIndex != 3
    }, h("scroll-view", {
      "scroll-y": "true",
      onScrollToLower: this.handleNext,
      style: "height:" + this.state.scrollHeight + "px;",
      "data-scrolltolower-uid": "e456_45",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-cells weui-cells_after-title"
    }, this.props.query.action == '我的用章' && this.state.list4.map(function (item, index) {
      return h(React.useComponent, {
        data: item,
        is: "Stamp",
        "data-instance-uid": 'i458_113_' + index
      });
    }, this), this.props.query.action == '我的表决' && this.state.list4.map(function (item, index) {
      return h(React.useComponent, {
        data: item,
        is: "Vote",
        "data-instance-uid": 'i459_113_' + index
      });
    }, this), this.props.query.action == '我的会议' && this.state.list4.map(function (item, index) {
      return h(React.useComponent, {
        data: item,
        is: "Meeting",
        "data-instance-uid": 'i460_113_' + index
      });
    }, this), this.props.query.action == '我的报销' && this.state.list4.map(function (item, index) {
      return h(React.useComponent, {
        data: item,
        is: "Bill",
        "data-instance-uid": 'i461_113_' + index
      });
    }, this), this.props.query.action == '我的发函' && this.state.list4.map(function (item, index) {
      return h(React.useComponent, {
        data: item,
        is: "Paper",
        "data-instance-uid": 'i462_113_' + index
      });
    }, this), this.props.query.action == '我的公告' && this.state.list4.map(function (item, index) {
      return h(React.useComponent, {
        data: item,
        is: "Notice",
        "data-instance-uid": 'i463_113_' + index
      });
    }, this), this.props.query.action == '我的公示' && this.state.list4.map(function (item, index) {
      return h(React.useComponent, {
        data: item,
        is: "Formula",
        "data-instance-uid": 'i464_113_' + index
      });
    }, this))))))));;
  },
  classUid: "c24354"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5'
};
Page(React.registerPage(Index, "pages/mylist/index"));
export default Index;
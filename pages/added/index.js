function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "../../ReactWX.js";
import { request } from "../../common/utils";
import { timeList, areaList } from "../../common/data";
var app = React.getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

function Index() {
  this.resetTime = e => {
    console.log('时间', e);
    const nowTime = new Date();
    let start = new Date();
    let end = new Date();
    let year = nowTime.getFullYear();
    let month = nowTime.getMonth();

    switch (e) {
      case '上月':
        end = new Date(year, month).getTime() - 3600 * 60 * 24;

        if (month === 0) {
          month = 11;
          year--;
        }

        start = new Date(year, month - 1).getTime();
        break;

      case '一月':
        start = new Date(year, 0).getTime();
        end = new Date(year, 1).getTime() - 3600 * 60 * 24;
        break;

      case '二月':
        start = new Date(year, 1).getTime();
        end = new Date(year, 2).getTime() - 3600 * 60 * 24;
        break;

      case '三月':
        start = new Date(year, 2).getTime();
        end = new Date(year, 3).getTime() - 3600 * 60 * 24;
        break;

      case '四月':
        start = new Date(year, 3).getTime();
        end = new Date(year, 4).getTime() - 3600 * 60 * 24;
        break;

      case '五月':
        start = new Date(year, 4).getTime();
        end = new Date(year, 5).getTime() - 3600 * 60 * 24;
        break;

      case '六月':
        start = new Date(year, 5).getTime();
        end = new Date(year, 6).getTime() - 3600 * 60 * 24;
        break;

      case '七月':
        start = new Date(year, 6).getTime();
        end = new Date(year, 7).getTime() - 3600 * 60 * 24;
        break;

      case '八月':
        start = new Date(year, 7).getTime();
        end = new Date(year, 8).getTime() - 3600 * 60 * 24;
        break;

      case '九月':
        start = new Date(year, 8).getTime();
        end = new Date(year, 9).getTime() - 3600 * 60 * 24;
        break;

      case '十月':
        start = new Date(year, 9).getTime();
        end = new Date(year, 10).getTime() - 3600 * 60 * 24;
        break;

      case '十一月':
        start = new Date(year, 10).getTime();
        end = new Date(year, 11).getTime() - 3600 * 60 * 24;
        break;

      case '十二月':
        start = new Date(year, 11).getTime();
        end = new Date(year + 1, 0).getTime() - 3600 * 60 * 24;
        break;

      case '本年':
        start = new Date(year, 0).getTime();
        end = new Date(year + 1, 0).getTime() - 3600 * 60 * 24;
        break;
    }

    this.state.start = start;
    this.state.end = end;
    console.log('==========', this.state.start, this.state.end);
  };

  this.handleTap = e => {
    console.log(e);
    let url = app.globalData.api;

    if (e) {
      this.setState({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
      });
      this.setState({
        index1: Number(e.currentTarget.id)
      });
      console.log('time', this.state.start, this.state.end);
      console.log(this.state.sAreaIndex);

      switch (Number(e.currentTarget.id)) {
        case 0:
          // 履职量
          this.setState({
            lv: false
          });
          url += '/api/jmkj/getPerformanceOfDutiesList';
          break;

        case 1:
          // 履职率
          this.setState({
            lv: true
          });
          url += '/api/jmkj/getPerformanceRateBeans';
          break;

        case 2:
          // 逾期量
          this.setState({
            lv: false
          });
          url += '/api/jmkj/OverdueQuantity';
          break;

        case 3:
          // 逾期率
          this.setState({
            lv: true
          });
          url += '/api/jmkj/OverdueRate';
          break;

        case 4:
          // 新建总量
          this.setState({
            lv: false
          });
          url += '/api/jmkj/operationNum';
          break;
      }
    } else {
      this.setState({
        lv: false
      }); // url += '/api/jmkj/getPerformanceOfDutiesList'

      switch (Number(this.state.index1)) {
        case 0:
          // 履职量
          this.setState({
            lv: false
          });
          url += '/api/jmkj/getPerformanceOfDutiesList';
          break;

        case 1:
          // 履职率
          this.setState({
            lv: true
          });
          url += '/api/jmkj/getPerformanceRateBeans';
          break;

        case 2:
          // 逾期量
          this.setState({
            lv: false
          });
          url += '/api/jmkj/OverdueQuantity';
          break;

        case 3:
          // 逾期率
          this.setState({
            lv: true
          });
          url += '/api/jmkj/OverdueRate';
          break;

        case 4:
          // 新建总量
          this.setState({
            lv: false
          });
          url += '/api/jmkj/operationNum';
          break;
      }
    }

    this.resetTime(this.state.timeArea);
    request({
      url: url,
      method: 'GET',
      data: {
        zoneId: Number(this.state.sAreaIndex) + 1,
        timeStart: this.state.start,
        // timeStart: 1398889600000,
        timeEnd: this.state.end
      },
      success: res => {
        console.log('res', res);

        if (res.data.code == 0) {
          let data = res.data.data;

          if (this.state.lv) {
            data.listData = res.data.data.listData.map(it => {
              return _objectSpread(_objectSpread({}, it), {}, {
                proportion: parseInt(it.proportion * 100)
              });
            });
            data.proportion = parseInt(data.proportion * 100);
          }

          this.setState({
            dataList: {
              avatarUrl: '',
              num: '',
              realname: '',
              listData: []
            }
          });
          this.setState({
            dataList: data
          });
          console.log(this.state.dataList);
        }
      }
    });
  };

  this.handleTap1 = e => {
    console.log('2', e);
    let url = app.globalData.api;

    if (e) {
      this.setState({
        sliderOffset1: e.currentTarget.offsetLeft,
        activeIndex1: e.currentTarget.id
      });
      this.setState({
        index2: Number(e.currentTarget.id)
      });
      console.log('time', this.state.start, this.state.end);
      console.log(this.state.sAreaIndex);

      switch (Number(e.currentTarget.id)) {
        case 0:
          // 完成量
          this.setState({
            lv1: false
          });
          url += '/api/jmkj/BrowseComplete';
          break;

        case 1:
          // 新建总量
          this.setState({
            lv1: false
          });
          url += '/api/jmkj/NewBrowse';
          break;
      }
    } else {
      this.setState({
        lv1: false
      }); // url += '/api/jmkj/BrowseComplete'

      switch (Number(this.state.index2)) {
        case 0:
          // 完成量
          this.setState({
            lv1: false
          });
          url += '/api/jmkj/BrowseComplete';
          break;

        case 1:
          // 新建总量
          this.setState({
            lv1: false
          });
          url += '/api/jmkj/NewBrowse';
          break;
      }
    }

    this.resetTime(this.state.timeArea);
    request({
      url: url,
      method: 'GET',
      data: {
        zoneId: Number(this.state.sAreaIndex) + 1,
        timeStart: this.state.start,
        // timeStart: 1398889600000,
        timeEnd: this.state.end
      },
      success: res => {
        console.log('res', res);

        if (res.data.code == 0) {
          let obj = _objectSpread({}, res.data.data);
          this.setState({
            dataList1: {
              avatarUrl: '',
              num: '',
              realname: '',
              listData: []
            }
          });
          this.setState({
            dataList1: obj
          });
          console.log(this.state.dataList1);
        }
      }
    });
  };

  this.handleTap2 = e => {
    console.log(e);
    let url = app.globalData.api;

    if (e) {
      this.setState({
        sliderOffset2: e.currentTarget.offsetLeft,
        activeIndex2: e.currentTarget.id
      });
      this.setState({
        index3: Number(e.currentTarget.id)
      });
      console.log('time', this.state.start, this.state.end);
      console.log(this.state.sAreaIndex);

      switch (Number(e.currentTarget.id)) {
        case 0:
          // 在线时长
          this.setState({
            lv2: true
          });
          url += '/api/jmkj/OnlineDuration';
          break;

        case 1:
          // 登录次数
          this.setState({
            lv2: false
          });
          url += '/api/jmkj/OnlineNum';
          break;
      }
    } else {
      this.setState({
        lv2: false
      }); // url += '/api/jmkj/OnlineDuration'

      switch (Number(this.state.index3)) {
        case 0:
          // 在线时长
          this.setState({
            lv2: true
          });
          url += '/api/jmkj/OnlineDuration';
          break;

        case 1:
          // 登录次数
          this.setState({
            lv2: false
          });
          url += '/api/jmkj/OnlineNum';
          break;
      }
    }

    this.resetTime(this.state.timeArea);
    request({
      url: url,
      method: 'GET',
      data: {
        zoneId: Number(this.state.sAreaIndex) + 1,
        timeStart: this.state.start,
        // timeStart: 1398889600000,
        timeEnd: this.state.end
      },
      success: res => {
        console.log('res', res);

        if (res.data.code == 0) {
          let obj;

          if (url == app.globalData.api + '/api/jmkj/OnlineDuration') {
            obj = _objectSpread(_objectSpread({}, res.data.data), {}, {
              num: parseInt(res.data.data.num / 60)
            });
          } else {
            obj = _objectSpread({}, res.data.data);
          }

          if (url == app.globalData.api + '/api/jmkj/OnlineDuration') {
            obj.listData = res.data.data.listData.map(it => {
              return _objectSpread(_objectSpread({}, it), {}, {
                num: parseInt(it.num / 60)
              });
            });
          }

          this.setState({
            dataList2: {
              avatarUrl: '',
              num: '',
              realname: '',
              listData: []
            }
          });
          this.setState({
            dataList2: obj
          });
          console.log(this.state.dataList);
        }
      }
    });
  };

  this.handleNext = () => {
    this.loadMore();
  };

  this.handleSearch = () => {
    console.log(this.state.sArea, this.state.timeArea);
    this.dataList = {
      avatarUrl: '',
      num: '',
      realname: '',
      listData: []
    };
    this.dataList1 = {
      avatarUrl: '',
      num: '',
      realname: '',
      listData: []
    };
    this.dataList2 = {
      avatarUrl: '',
      num: '',
      realname: '',
      listData: []
    };
    this.handleTap();
    this.handleTap1();
    this.handleTap2();
  };

  this.bindPickerChange = e => {
    console.log(e);
    const index = e.detail.value;
    this.setPickerValue(index);
  };

  this.setPickerValue = index => {
    this.setState({
      sArea: this.state.areaList[index].name,
      sAreaIndex: index
    });
  };

  this.bindPickerTimeChange = e => {
    const index = e.detail.value;
    this.setState({
      timeArea: this.state.timeList[index].name,
      timeAreaIndex: index
    });
  };

  this.state = {
    tabs: [{
      name: '履职量',
      value: 1
    }, {
      name: '履职率',
      value: 2
    }, {
      name: '逾期量',
      value: 3
    }, {
      name: '逾期率',
      value: 4
    }, {
      name: '新建总量',
      value: 5
    }],
    tabs1: [{
      name: '完成总量',
      value: 1
    }, {
      name: '新建总量',
      value: 2
    }],
    tabs2: [{
      name: '在线时长',
      value: 1
    }, {
      name: '登录次数',
      value: 2
    }],
    dataList: {
      avatarUrl: '',
      num: '',
      realname: '',
      listData: []
    },
    dataList1: {
      avatarUrl: '',
      num: '',
      realname: '',
      listData: []
    },
    dataList2: {
      avatarUrl: '',
      num: '',
      realname: '',
      listData: []
    },
    activeIndex: 0,
    sliderOffset: 0,
    activeIndex1: 0,
    sliderOffset1: 0,
    activeIndex2: 0,
    sliderOffset2: 0,
    sliderLeft: 20,
    sliderLeft1: 65,
    sliderLeft2: 73,
    scrollHeight: 0,
    sArea: '',
    timeArea: '上月',
    timeAreaIndex: 0,
    sAreaIndex: 0,
    areaList,
    timeList,
    start: '',
    end: '',
    lv: false,
    lv1: false,
    lv2: false,
    index1: 0,
    index2: 0,
    index3: 0
  };
}

Index = React.toClass(Index, React.Component, {
  componentDidMount: function () {},
  onShow: function () {
    this.setPickerValue(this.state.sAreaIndex);
    this.handleTap();
    this.handleTap1();
    this.handleTap2();
  },
  render: function () {
    var h = React.createElement;
    return h("view", {
      class: "page"
    }, h("view", {
      class: "content-top"
    }, h("picker", {
      onChange: this.bindPickerChange,
      value: this.state.sAreaIndex,
      range: this.state.areaList,
      "range-key": "name",
      "data-change-uid": "e464_18",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "top-inline"
    }, h("input", {
      type: "text",
      disabled: true,
      value: this.state.sArea
    }))), h("picker", {
      onChange: this.bindPickerTimeChange,
      value: this.state.timeAreaIndex,
      range: this.state.timeList,
      "range-key": "name",
      "data-change-uid": "e469_18",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "top-inline"
    }, h("input", {
      type: "text",
      disabled: true,
      value: this.state.timeArea,
      placeholder: "\u8BF7\u9009\u62E9\u65F6\u95F4\u6BB5"
    }))), h("button", {
      type: "primary",
      size: "mini",
      onTap: this.handleSearch,
      "data-tap-uid": "e475_45",
      "data-beacon-uid": "default"
    }, "\u67E5\u770B")), h("view", {
      class: "page__bd",
      style: "padding-bottom:0;"
    }, h("view", {
      class: "weui-tab"
    }, h("view", {
      class: "weui-left-title"
    }, "\u64CD\u4F5C\u6027\u4EFB\u52A1"), h("view", {
      class: "weui-navbar"
    }, this.state.tabs.map((item, index) => h("block", {
      key: item.value
    }, h("view", {
      id: index,
      class: this.state.activeIndex == index ? "weui-navbar__item weui-bar__item_on" : "weui-navbar__item",
      onTap: this.handleTap,
      "data-tap-uid": 'e483_137_' + index,
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-navbar__title"
    }, item.name)))), h("view", {
      class: "weui-navbar__slider",
      style: "left: " + this.state.sliderLeft + "px; transform: translateX(" + this.state.sliderOffset + "px); -webkit-transform: translateX(" + this.state.sliderOffset + "px);"
    }))), h("view", {
      class: "weui-content"
    }, h("view", {
      class: "left-bar border"
    }, h("view", {
      class: "line"
    }, h("view", {
      class: "black"
    }, this.state.tabs[this.state.activeIndex].name, ":"), h("view", {
      class: "num"
    }, this.state.lv ? this.state.dataList.proportion ? this.state.dataList.proportion + '%' : '0%' : this.state.dataList.num || 0)), h("view", {
      class: "line"
    }, h("view", {
      class: "black"
    }, "\u60A8\u7684\u6392\u540D \uFF1A"), h("view", {
      class: "num"
    }, this.state.dataList.ranking))), h("view", {
      class: "right-bar border"
    }, h("view", {
      class: "item-ul"
    }, this.state.dataList.listData.map((it, index) => h("view", {
      class: "item-li",
      key: it
    }, h("view", {
      class: "item-left"
    }, h("image", {
      class: "item-img avatar",
      style: index > 2 ? 'display:none' : '',
      src: index == 0 ? '../../assets/images/one.png' : index == 1 ? '../../assets/images/two.png' : index == 2 ? '../../assets/images/three.png' : '',
      alt: ""
    }), h("text", {
      style: index > 2 ? 'width:48px;text-align:center;display:inline-block' : 'display:none'
    }, index > 2 ? index + 1 : ''), h("image", {
      src: it.avatarUrl,
      class: "avatar items"
    })), h("view", {
      class: "item-name",
      style: 'font-size:12px'
    }, it.realname), h("view", {
      class: "item-grey",
      style: 'font-size:12px;max-width:90px;white-space:normal;'
    }, this.state.tabs[this.state.activeIndex].name, "\uFF1A", this.state.lv ? it.proportion ? it.proportion + '%' : '0%' : it.num || 0))))))), h("view", {
      class: "page__bd",
      style: "padding-bottom:0;"
    }, h("view", {
      class: "weui-tab"
    }, h("view", {
      class: "weui-left-title"
    }, "\u6D4F\u89C8\u6027\u4EFB\u52A1"), h("view", {
      class: "weui-navbar"
    }, this.state.tabs1.map((item, index) => h("block", {
      key: item.value
    }, h("view", {
      id: index,
      class: this.state.activeIndex1 == index ? "weui-navbar__item weui-bar__item_on" : "weui-navbar__item",
      onTap: this.handleTap1,
      "data-tap-uid": 'e530_138_' + index,
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-navbar__title"
    }, item.name)))), h("view", {
      class: "weui-navbar__slider",
      style: "left: " + this.state.sliderLeft1 + "px; transform: translateX(" + this.state.sliderOffset1 + "px); -webkit-transform: translateX(" + this.state.sliderOffset1 + "px);"
    }))), h("view", {
      class: "weui-content"
    }, h("view", {
      class: "left-bar border"
    }, h("view", {
      class: "line"
    }, h("view", {
      class: "black"
    }, this.state.tabs1[this.state.activeIndex1].name, ":"), h("view", {
      class: "num"
    }, this.state.dataList1.num)), h("view", {
      class: "line"
    }, h("view", {
      class: "black"
    }, "\u60A8\u7684\u6392\u540D \uFF1A"), h("view", {
      class: "num"
    }, this.state.dataList1.ranking))), h("view", {
      class: "right-bar border"
    }, h("view", {
      class: "item-ul"
    }, this.state.dataList1.listData.map((it, index) => h("view", {
      class: "item-li",
      key: it
    }, h("view", {
      class: "item-left"
    }, h("image", {
      class: "item-img avatar",
      style: index > 2 ? 'display:none' : '',
      src: index == 0 ? '../../assets/images/one.png' : index == 1 ? '../../assets/images/two.png' : index == 2 ? '../../assets/images/three.png' : '',
      alt: ""
    }), h("text", {
      style: index > 2 ? 'width:48px;text-align:center;display:inline-block' : 'display:none'
    }, index > 2 ? index + 1 : ''), h("image", {
      src: it.avatarUrl,
      class: "avatar items"
    })), h("view", {
      class: "item-name",
      style: 'font-size:12px'
    }, it.realname), h("view", {
      class: "item-grey",
      style: 'font-size:12px;max-width:90px;white-space:normal;'
    }, this.state.tabs1[this.state.activeIndex1].name, "\uFF1A", it.num))))))), h("view", {
      class: "page__bd",
      style: "padding-bottom:0;"
    }, h("view", {
      class: "weui-tab"
    }, h("view", {
      class: "weui-left-title"
    }, "\u901A\u7528"), h("view", {
      class: "weui-navbar"
    }, this.state.tabs2.map((item, index) => h("block", {
      key: item.value
    }, h("view", {
      id: index,
      class: this.state.activeIndex2 == index ? "weui-navbar__item weui-bar__item_on" : "weui-navbar__item",
      onTap: this.handleTap2,
      "data-tap-uid": 'e577_138_' + index,
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-navbar__title"
    }, item.name)))), h("view", {
      class: "weui-navbar__slider",
      style: "left: " + this.state.sliderLeft2 + "px; transform: translateX(" + this.state.sliderOffset2 + "px); -webkit-transform: translateX(" + this.state.sliderOffset2 + "px);"
    }))), h("view", {
      class: "weui-content"
    }, h("view", {
      class: "left-bar border"
    }, h("view", {
      class: "line"
    }, h("view", {
      class: "black"
    }, this.state.tabs2[this.state.activeIndex2].name, ":"), h("view", {
      class: "num"
    }, this.state.lv2 ? this.state.dataList2.num + 'min' : this.state.dataList2.num||0)), h("view", {
      class: "line"
    }, h("view", {
      class: "black"
    }, "\u60A8\u7684\u6392\u540D \uFF1A"), h("view", {
      class: "num"
    }, this.state.dataList2.ranking))), h("view", {
      class: "right-bar border"
    }, h("view", {
      class: "item-ul"
    }, this.state.dataList2.listData.map((it, index) => h("view", {
      class: "item-li",
      key: it
    }, h("view", {
      class: "item-left"
    }, h("image", {
      class: "item-img avatar",
      style: index > 2 ? 'display:none' : '',
      src: index == 0 ? '../../assets/images/one.png' : index == 1 ? '../../assets/images/two.png' : index == 2 ? '../../assets/images/three.png' : '',
      alt: ""
    }), h("text", {
      style: index > 2 ? 'width:48px;text-align:center;display:inline-block' : 'display:none'
    }, index > 2 ? index + 1 : ''), h("image", {
      src: it.avatarUrl,
      class: "avatar items"
    })), h("view", {
      class: "item-name",
      style: 'font-size:12px'
    }, it.realname), h("view", {
      class: "item-grey",
      style: 'font-size:12px;max-width:90px;white-space:normal;'
    }, this.state.tabs2[this.state.activeIndex2].name, "\uFF1A", this.state.lv2 ? it.num + 'min' : it.num||0))))))));;
  },
  classUid: "c22356"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '履职数据',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5',
  enablePullDownRefresh: true
};
Page(React.registerPage(Index, "pages/data/index"));
export default Index;
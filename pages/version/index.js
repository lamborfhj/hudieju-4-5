function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "../../ReactWX.js"; // import { request } from '../../common/utils';
// import { timeList, areaList } from '../../common/data';

var app = React.getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

function Index() {
  this.handleTap = e => {
    console.log(e);
    let url = app.globalData.api;
    this.setState({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    console.log('time', this.state.start, this.state.end);
    console.log(this.state.sAreaIndex);
    this.setState({
      lv: false
    });
    url += 'jmkj/getPerformanceOfDutiesList';
    this.resetTime(this.state.timeArea);
    React.api.request({
      url: url,
      method: 'GET',
      data: {
        zoneId: this.state.sAreaIndex + 1,
        // timeStart: this.state.start,
        timeStart: 1398889600000,
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
            dataList: data
          });
          console.log(this.state.dataList);
        }
      }
    });
  };

  this.handleNext = () => {
    this.loadMore();
  };

  this.handleGoto = (e) => {
    React.api.setStorageSync("versionDetail", e);
    React.api.navigateTo({
      url: "/pages/versionDetail/index"
    });
  };

  this.state = {
    modules: [{
      myName: '当前版本 3.1.0'
    }, {
      myName: '历史版本 3.0.0'
    }, {
      myName: '历史版本 2.0.0'
    }]
  };
}

Index = React.toClass(Index, React.Component, {
  componentDidMount: function () {},
  onShow: function () {
    // this.setPickerValue(this.state.sAreaIndex)
    this.handleTap();
    this.handleTap1();
    this.handleTap2();
  },
  render: function () {
    var h = React.createElement;
    return h("view", {
      class: "page"
    }, h("view", {
      class: "weui-cell",
      onTap: () => this.handleGoto('当前版本'),
      "data-tap-uid": "e101_32",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-cell__bd"
    }, "\u5F53\u524D\u7248\u672C 3.1.0", h("text", {
      style: "color:#a8a8a8;font-size: 12px;margin-left:10px;"
    }, "\u66F4\u65B0\u65F6\u95F4\uFF1A2020-10-20")), h("view", {
      class: "weui-cell__ft weui-cell__ft_in-access"
    })), h("view", {
      class: "weui-cell",
      onTap: () => this.handleGoto('历史版本'),
      "data-tap-uid": "e107_32",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-cell__bd"
    }, "\u5386\u53F2\u7248\u672C 3.0.0", h("text", {
      style: "color:#a8a8a8;font-size: 12px;margin-left:10px;"
    }, "\u66F4\u65B0\u65F6\u95F4\uFF1A2020-9-18")), h("view", {
      class: "weui-cell__ft weui-cell__ft_in-access"
    })), h("view", {
      class: "weui-cell",
      onTap: () => this.handleGoto('历史版本'),
      "data-tap-uid": "e113_32",
      "data-beacon-uid": "default"
    }, h("view", {
      class: "weui-cell__bd"
    }, "\u5386\u53F2\u7248\u672C 2.0.0", h("text", {
      style: "color:#a8a8a8;font-size: 12px;margin-left:10px;"
    }, "\u66F4\u65B0\u65F6\u95F4\uFF1A2019-10-20")), h("view", {
      class: "weui-cell__ft weui-cell__ft_in-access"
    })));;
  },
  classUid: "c3942"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '版本信息',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5',
  enablePullDownRefresh: true
};
Page(React.registerPage(Index, "pages/version/index"));
export default Index;
import React from "../../ReactWX.js"; // import { request } from '../../common/utils';
// import { timeList, areaList } from '../../common/data';

var app = React.getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

function Index() {
  this.state = {
    type:''
  };
}

Index = React.toClass(Index, React.Component, {
  componentDidMount: function () {},
  onShow: function () {// this.setPickerValue(this.state.sAreaIndex)
    this.setState({
      type:React.api.getStorageSync('versionDetail')=='当前版本'
    })
    // this.handleTap()
    // this.handleTap1()
    // this.handleTap2()
  },
  render: function () {
    var h = React.createElement;
    return h("view", {
      class: "page"
    }, h("view", {
      class: "pagebox"
    }, h("view", null, "\u5F53\u524D\u7248\u672C\uFF1A3.1.0"), h("view", null, "\u66F4\u65B0\u65F6\u95F4\uFF1A2020-10-20"), h("view", null, "\u672C\u6B21\u66F4\u65B0\u5185\u5BB9\uFF1A"), h("view", null, "1.\u4E0A\u7EBF\u6570\u636E\u6392\u540D\u529F\u80FD\uFF0C\u6240\u5728\u6392\u540D\u4E00\u76EE\u4E86\u7136"), h("view", null, "2.\u66F4\u65B0\u65B0\u4EFB\u52A1\u63D0\u9192\uFF0C\u518D\u4E5F\u4E0D\u6015\u5FD8\u8BB0\u505A\u4EFB\u52A1\u4E86"), h("view", null, "3.\u65B0\u589E\u5C0F\u533A\u9080\u8BF7\u7801\u590D\u5236\u529F\u80FD")));;
  },
  classUid: "c2841"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '版本信息',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5',
  enablePullDownRefresh: true
};
Page(React.registerPage(Index, "pages/versionDetail/index"));
export default Index;
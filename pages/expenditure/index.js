/*
 * @Author: xingjing
 * @Date: 2020-08-13 17:09:38
 * @LastEditors: xingjing
 * @LastEditTime: 2020-08-31 17:46:07
 * @Description: 9527
 */
import React, { Component } from "../../ReactWX.js";
import { request } from "../../common/utils";
import * as echarts from '../../ec-canvas/echarts'; 
var app = React.getApp();
let chart = null;
let recipeChart = null;

function Index() {}
function getPixelRatio () {
  let pixelRatio = 0
  wx.getSystemInfo({
    success: function (res) {
      pixelRatio = res.pixelRatio
    },
    fail: function () {
      pixelRatio = 0
    }
  })
  console.log(pixelRatio)
  return pixelRatio
}
// console.log(pixelRatio)
var dpr = getPixelRatio()
function setOption(chart, xdata,size) {
  
  console.log(xdata)
  let arr = xdata.length === 0 ? [] : xdata;
  let newData = [];
  arr.forEach(item => {
      let obj = {
          name: item['name'],
          value: item['money'],
      }
      newData.push(obj)
  })
  var option = {
    title: {
      text: size,//主标题
      textStyle: {
          color: 'black',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 'normal',
      },
      // backgroundColor: '#EDEFF4',//标题背景颜色，默认'rgba(0,0,0,0)'透明
      // padding:'5px',
      // subtext: '经营收入',//副标题
      x: 'center',//x轴方向对齐方式
      y: 'bottom'
  },
  tooltip: {
      trigger: 'item',
      formatter: "{b} :  \n {c} ({d}%)",
      　position: ['10%', '50%']
  },

  series: [
      {
          name: '访问来源',
          type: 'pie',
          radius: '35%',
          center: ['50%', '40%'],
          data: newData,
          labelLine: { // 设置指示线的长度
            normal: {
              length: 8,
              length2: 4
            },
          },
          label: {
            normal: {
              formatter(v) {
                let text = v.name;
                let value_format = v.value;
                let percent_format = Math.round(v.percent) + '%';
                if (text.length <= 4) {
                  return `${text}\n`
                } else if (text.length > 4 ) {
                  return text = `${text.slice(0, 4)}\n${text.slice(4)}`
                } 
              },
              textStyle: {
                fontSize: 8
              }
            }
          },
          itemStyle: {
              emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
      }
  ]
};
  chart.setOption(option);
  return chart;
}

Page({
  showShareMenu() {
    wx.showShareMenu();
    console.log("显示了当前页面的转发按钮");
  },
  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: '',
  
    }},
  onReady: function () { 
    console.log(dpr)    
       //这一步是一定要注意的
    this.oneComponent = this.selectComponent('#mychart-one');  
    this.twoComponent = this.selectComponent('#mychart-two');
    this.threeComponent = this.selectComponent('#mychart-three');
    this.fourComponent = this.selectComponent('#mychart-four');
    // *****年*****
    this.oneComponentyear = this.selectComponent('#mychart-dom-one');  
    this.twoComponentyear = this.selectComponent('#mychart-dom-two');
    this.threeComponentyear = this.selectComponent('#mychart-dom-three');
    this.fourComponentyear = this.selectComponent('#mychart-dom-four');
  },
  init_one: function (xdata) {           //初始化第一个图表
    this.oneComponent.init((canvas, width, height) => {
        const chart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr
        });
        setOption(chart, xdata,"经营收入")
        this.chart = chart;
        return chart;
    });
},
init_two: function (xdata) {           //初始化第一个图表
  this.twoComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr
      });
      setOption(chart, xdata,"经营支出")
      this.chart = chart;
      return chart;
  });
},
init_three: function (xdata) {           //初始化第一个图表
  this.threeComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr
      });
      setOption(chart, xdata,"押金收入")
      this.chart = chart;
      return chart;
  });
},
init_four: function (xdata) {           //初始化第一个图表
  this.fourComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr
      });
      setOption(chart, xdata,"押金支出")
      this.chart = chart;
      return chart;
  });
},
init_one_year: function (xdata) {           //初始化第一个图表
  this.oneComponentyear.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr
      });
      setOption(chart, xdata,"经营收入")
      this.chart = chart;
      return chart;
  });
},
init_two_year: function (xdata) {           //初始化第一个图表
  this.twoComponentyear.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr
      });
      setOption(chart, xdata,"经营支出")
      this.chart = chart;
      return chart;
  });
},
init_three_year: function (xdata) {           //初始化第一个图表
  this.threeComponentyear.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr
      });
      setOption(chart, xdata,"押金收入")
      this.chart = chart;
      return chart;
  });
},
init_four_year: function (xdata) {           //初始化第一个图表
  this.fourComponentyear.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr
      });
      setOption(chart, xdata,"押金支出")
      this.chart = chart;
      return chart;
  });
},
  onLoad: function() { 
    // 月饼图
    wx.showLoading();
    request({
      url: app.globalData.api + `/api/accounts/reports/monthStatistical`, //请求接口的url
      method: 'GET', //请求方式
      data: {},//请求参数
      header: {
          'content-type': 'application/json' // 默认值
      },
      complete() {  //请求结束后隐藏 loading 提示框
          wx.hideLoading();
      },
      success: res => {
         this.init_one(res.data.data.operations_receipts_charts)
         this.init_two(res.data.data.operations_disbursements_charts)
         this.init_three(res.data.data.deposit_receipts_charts)
         this.init_four(res.data.data.deposit_disbursements_charts)
         recipeChart = res.data.data.reports.operations_receipts_charts;
         this.setData({
           date:res.data.data.statisticalDate.substring(0,7),
           list:res.data.data.reports,
         })
      }
  });
  // 年饼图

  request({
    url: app.globalData.api + `/api/accounts/reports/yearStatistical`, //请求接口的url
    method: 'GET', //请求方式
    data: {},//请求参数
    header: {
        'content-type': 'application/json' // 默认值
    },
    complete() {  //请求结束后隐藏 loading 提示框
        wx.hideLoading();
    },
    success: res => {
       this.init_one_year(res.data.data.operations_receipts_charts)
       this.init_two_year(res.data.data.operations_disbursements_charts)
       this.init_three_year(res.data.data.deposit_receipts_charts)
       this.init_four_year(res.data.data.deposit_disbursements_charts)
       recipeChart = res.data.data.reports.operations_receipts_charts;
       this.setData({
        dateyear:res.data.data.statisticalDate.toString(),
         listyear:res.data.data.reports,
       })
    }
});
   
  // 账户信息
    request({
      url: app.globalData.api + `/api/accounts/reports/search`, //请求接口的url
      method: 'GET', //请求方式
      data: {},//请求参数
      header: {
          'content-type': 'application/json' // 默认值
      },
      complete() {  //请求结束后隐藏 loading 提示框
          wx.hideLoading();
      },
      success: res => {
         console.log(res.data.data)
         let list = res.data.data;
         this.setData({
            name:list.name,
            bankname:list.bankname,
            accounts:list.cardnumber,
          })
      }
  });
  },
  goreportyear(){
    wx.navigateTo({
      url: `/pages/years/index?dateyear=${this.data.dateyear}`,
      success: function(res) {
    
      },
      fail: function(res) {
    
      },
      complete: function(res) {
    
      },
     })
  },
  goreport(){
    wx.navigateTo({
      url: `/pages/report/index?date=${this.data.date}`,
      success: function(res) {
    
      },
      fail: function(res) {
    
      },
      complete: function(res) {
    
      },
     })
  },
  bindDateChange:function(date){
       this.setData({
        date:date.detail.value
       })
       wx.showLoading();
       request({
        url: app.globalData.api + `/api/accounts/reports/monthStatistical?statisticalDate=${date.detail.value}`, //请求接口的url
        method: 'GET', //请求方式
        data: {},//请求参数
        header: {
            'content-type': 'application/json' // 默认值
        },
        complete() {  //请求结束后隐藏 loading 提示框
            wx.hideLoading();
        },
        success: res => {
           this.init_one(res.data.data.operations_receipts_charts)
           this.init_two(res.data.data.operations_disbursements_charts)
           this.init_three(res.data.data.deposit_receipts_charts)
           this.init_four(res.data.data.deposit_disbursements_charts)
           recipeChart = res.data.data.reports.operations_receipts_charts;
           this.setData({
             list:res.data.data.reports,
           })
        }
    });
          console.log(date)
  },
  bindDateYearChange:function(date){
    this.setData({
      dateyear:date.detail.value
    })
    wx.showLoading();
    request({
      url: app.globalData.api + `/api/accounts/reports/yearStatistical?statisticalDate=${date.detail.value}`, //请求接口的url
      method: 'GET', //请求方式
      data: {},//请求参数
      header: {
          'content-type': 'application/json' // 默认值
      },
      complete() {  //请求结束后隐藏 loading 提示框
          wx.hideLoading();
      },
      success: res => {
   
         this.init_one_year(res.data.data.operations_receipts_charts)
         this.init_two_year(res.data.data.operations_disbursements_charts)
         this.init_three_year(res.data.data.deposit_receipts_charts)
         this.init_four_year(res.data.data.deposit_disbursements_charts)
         recipeChart = res.data.data.reports.operations_receipts_charts;
         this.setData({
           listyear:res.data.data.reports,
         })
      }
  });
       console.log(date)
},
  onShareAppMessage: function (res) {
    return {
      title: '',
    }
  },
  textPaste(){
    wx.showToast({
      title: '复制成功',
    })
    wx.setClipboardData({
      data: "户名："+this.data.name+" 开户行："+this.data.bankname+" 开户账户："+this.data.accounts,
      success: function (res) {
        wx.getClipboardData({    //这个api是把拿到的数据放到电脑系统中的
          success: function (res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },

  data: {
    name:'',
    bankname:'',
    accounts:'',
    date:'',
    dateyear:'',
    time: '12:01',
    log:'123',
    title:'',
    list:{},
    listyear:{},
    ecOne: {
      onInit: true // 3、将数据放入到里面
    },
    ecTwo:{
      onInit: true
    },
    ecThree:{
      onInit: true
    },
    ecFour:{
      onInit: true
    },
    ecOneYear:{
      onInit: true
    },
    ecTwoYear:{
      onInit: true
    },
    ecThreeYear:{
      onInit: true
    },
    ecFourYear:{
      onInit: true
    }
  },});
export default Index;
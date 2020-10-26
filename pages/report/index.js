/*
 * @Author: xingjing
 * @Date: 2020-08-13 17:09:38
 * @LastEditors: xingjing
 * @LastEditTime: 2020-08-31 17:46:07
 * @Description: 9527
 */
import React, { Component } from "../../ReactWX.js";
import * as echarts from '../../ec-canvas/echarts'; 
import { request } from "../../common/utils";
var app = React.getApp();
let chart = null;

function Index() {}

function getinFo() {
  //  默认月份
  const nowDate = new Date();
  const year = nowDate.getFullYear();
  const month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
  const datestr = year + '-' + month;
  return datestr
}

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '经营支出',//主标题
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
      formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  // legend: {
  //     orient: 'vertical',
  //     bottom: 'bottom',
  //     data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
  // },
  series: [
      {
          name: '访问来源',
          type: 'pie',
          radius: '40%',
          center: ['50%', '30%'],
          data: [
              { value: 335, name: '直接访问ddd' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告ff' },
              { value: 135, name: '视频广告ddd' },
              { value: 1548, name: '搜索引擎' }
          ],
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
  clickdetails(e){
    let _this = this;
   
     wx.navigateTo({
            url: `/pages/details/index?newId=${e.currentTarget.dataset.viewId}&statisticalDate=${this.data.date==="" ?getinFo():this.data.date}`,
            success: function(res) {
             
            },
            fail: function(res) {
          
            },
            complete: function(res) {
          
            },
           })
  
 },
  onLoad: function(options) { 
    wx.showLoading();
    this.setData({
      date:options.date,
    })
    request({
      url: app.globalData.api + `/api/accounts/reports/monthdetail?statisticalDate=${options.date}`, //请求接口的url
      method: 'GET', //请求方式
      data: {},//请求参数
      header: {
          'content-type': 'application/json' // 默认值
      },
      complete() {  //请求结束后隐藏 loading 提示框
          wx.hideLoading();
      },
      success: res => {
         console.log(res)
          this.setData({
              title: res.data.data.uname,
              list: res.data.data,
          })
      }
  });
  },
  goreportyear(){
    wx.navigateTo({
      url: '/pages/year/index',
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
      url: '/pages/report/index',
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
        request({
        url: app.globalData.api + `/api/accounts/reports/monthdetail?statisticalDate=${date.detail.value}`, //请求接口的url
        method: 'GET', //请求方式
        data: {},//请求参数
        header: {
            'content-type': 'application/json' // 默认值
        },
        complete() {  //请求结束后隐藏 loading 提示框
            wx.hideLoading();
        },
        success: res => {
           console.log(res)
            this.setData({
              title: res.data.data.uname,
                list: res.data.data,
            })
        }
    });
          console.log(date)
  },
  bindDateYearChange:function(date){
    this.setData({
      dateyear:date.detail.value
    })
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
      data: this.data.log,
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
    date:'2020-09',
    title:'',
    dateyear:'2020',
    time: '12:01',
    log:'123',
    list:{},
    ec: {
      onInit: initChart // 3、将数据放入到里面
    }
  },});
export default Index;
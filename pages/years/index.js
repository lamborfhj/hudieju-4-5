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
function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
}

Page({
  clickdetails(e){
     wx.navigateTo({
            url: `/pages/details/index?newId=${e.currentTarget.dataset.viewId}&statisticalDate=${this.data.dateyear}`,
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
      dateyear:options.dateyear,
    })
      request({
      url: app.globalData.api + `/api/accounts/reports/yeardetail?statisticalDate=${options.dateyear}`, //请求接口的url
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
    wx.showLoading();
       this.setData({
        date:date.detail.value
       })
        request({
        url: app.globalData.api + `/api/accounts/reports/yeardetail?statisticalDate=${date.detail.value}`, //请求接口的url
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
    date:'2020',
    dateyear:'2020',
    title:'',
    time: '12:01',
    log:'123',
    list:{},
    ec: {
      onInit: initChart // 3、将数据放入到里面
    }
  },});
export default Index;
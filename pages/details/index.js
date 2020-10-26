// pages/details/index.js
import React, { Component } from "../../ReactWX.js";
import * as echarts from '../../ec-canvas/echarts'; 
import { request } from "../../common/utils";
var app = React.getApp();
let chart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
     list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getUrl(event){
    console.log(event.currentTarget.dataset.viewId)
    //  wx.navigateTo({
    //         url: `/pages/detailsimg/index?url=${event.currentTarget.dataset.viewId}`,
    //        })
    // if(event.currentTarget.dataset.viewId.indexOf(''))
    wx.downloadFile({
      url: event.currentTarget.dataset.viewId,//可以是后台传过来的路径
      success: function(res) {
        console.log(res)
          const filePath = res.tempFilePath
          // wx.showModal({
          //   title:'下载成功',
          //   content: '附件已经保存至您的手机',
          // })
          console.log(event.currentTarget.dataset.viewId.indexOf('png'))
          if(event.currentTarget.dataset.viewId.indexOf('.png') == -1 && event.currentTarget.dataset.viewId.indexOf('.jpg') ==-1){
            wx.openDocument({
              filePath: filePath,
              success: function(res) {
                console.log(res)
                  //成功
              },fail(err){
                console.log(err)
              }
          })
          }else {
            console.log('css')
            wx.previewImage({
              current:  event.currentTarget.dataset.viewId, // 当前显示图片的http链接
              urls: [event.currentTarget.dataset.viewId] // 需要预览的图片http链接列表
            })
          }
       
      },fail:function(err){
        wx.showModal({
          title:'下载失败',
          content: '不支持此类型下载',
        })
        console.log(err)
      }
  })
  },
  onLoad: function (options) {
    wx.showLoading();
      request({
      url: app.globalData.api + `/api/accounts/reports/subjectDetail?statisticalDate=${options.statisticalDate}&subjectId=${options.newId}`, //请求接口的url
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
              list: res.data.data.reports,
          })
      }
  });
     console.log(options.newId)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})
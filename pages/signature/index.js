import React from "../../ReactWX.js";
import { request } from "../../common/utils";
var app = React.getApp();

function Index() {
  this.handleStart = e => {
    if (e.changedTouches.length == 1) {
      this.setState({
        startX: e.changedTouches[0].x,
        startY: e.changedTouches[0].y,
        disabled: false
      });
    }
  };

  this.handleMove = e => {
    if (e.changedTouches.length == 1) {
      const {
        context,
        startX,
        startY
      } = this.state;
      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(e.changedTouches[0].x, e.changedTouches[0].y);
      context.stroke();
      context.draw(true);
      context.closePath();
      this.setState({
        startX: e.changedTouches[0].x,
        startY: e.changedTouches[0].y
      });
    }
  };

  this.handleReset = () => {
    const {
      context,
      width,
      height
    } = this.state;
    context.setFillStyle('white');
    context.fillRect(0, 0, width, height);
    context.draw();
    context.setLineWidth(4);
    this.setState({
      disabled: true
    });
  };

  this.handleSubmit = () => {
    const that = this;
    const data = app.globalData.requestData2Sign;
    React.api.showLoading({
      title: '请求中...'
    });
    this.setState({
      disabled: true
    }, () => {
      React.api.canvasToTempFilePath({
        canvasId: 'signPlate',
        fileType: 'png',

        success(res) {
          React.api.uploadFile({
            url: app.globalData.api + "/api/common/upload",
            name: 'file',
            filePath: res.tempFilePath,

            success(res) {
              const url = that.props.query.url || 'verifyUrl';
              data.data[url] = JSON.parse(res.data).url;
              request({
                url: data.url,
                method: 'POST',
                data: data.data
              }).then(res => {
                React.api.hideLoading();
                that.setState({
                  disabled: false
                });

                if (res.data.msg === 'success') {
                  app.globalData.requestData2Sign = {};
                  React.api.showToast({
                    title: '操作成功！'
                  }).then(() => {
                    setTimeout(() => {
                      React.api.navigateBack();
                    }, 1500);
                  });
                } else {
                  React.api.showToast({
                    title: res.data.msg,
                    icon: 'none'
                  });
                }
              });
            }

          });
        }

      });
    });
  };

  this.state = {
    width: 0,
    height: 0,
    context: null,
    startX: null,
    startY: null,
    disabled: true
  };
}

Index = React.toClass(Index, React.Component, {
  componentDidMount: function () {
    const context = React.api.createCanvasContext('signPlate');
    context.setLineWidth(4);
    var that = this;
    React.api.getSystemInfo({
      success: function (res) {
        that.setState({
          context,
          width: res.windowWidth,
          height: res.windowHeight - 46
        }, () => {
          const {
            context,
            width,
            height
          } = that.state;
          context.setFillStyle('white');
          context.fillRect(0, 0, width, height);
          context.draw();
        });
      }
    });
  },
  render: function () {
    var h = React.createElement;
    return h("view", {
      class: "page"
    }, h("view", {
      class: "page__bd"
    }, h("canvas", {
      "canvas-id": "signPlate",
      style: "background-color:#ffffff;height:" + this.state.height + "px;width:" + this.state.width + "px;",
      "disable-scroll": true,
      onTouchstart: this.handleStart,
      onTouchmove: this.handleMove,
      "data-touchstart-uid": "e135_12",
      "data-beacon-uid": "default",
      "data-touchmove-uid": "e136_12"
    }), h("view", {
      class: "bottom_btn_area"
    }, h("button", {
      onTap: this.handleReset,
      "data-tap-uid": "e140_20",
      "data-beacon-uid": "default"
    }, "\u91CD\u5199"), h("button", {
      disabled: this.state.disabled,
      onTap: this.handleSubmit,
      "data-tap-uid": "e141_51",
      "data-beacon-uid": "default"
    }, "\u786E\u5B9A"))));;
  },
  classUid: "c4121"
}, {});
Index.config = {
  backgroundTextStyle: 'light',
  navigationBarTextStyle: 'white',
  navigationBarTitleText: '手写签名',
  navigationBarBackgroundColor: '#292929',
  backgroundColor: '#F5f5f5'
};
Page(React.registerPage(Index, "pages/signature/index"));
export default Index;
import React from "../../ReactWX.js";

function VoteTable(props) {
  this.state = {
    dataSource: []
  };
}

VoteTable = React.toClass(VoteTable, React.Component, {
  componentDidMount: function () {
    let resultArr = [];
    let totalArea = 0;
    let totalQuantity = 0;
    JSON.parse(this.props.data.areaResultJson).map(item => {
      JSON.parse(this.props.data.quantityResultJson).map(houseItem => {
        if (item["选项"] == houseItem["选项"]) {
          let resultItem = {
            option: item["选项"],
            area: item["投票面积"],
            areaScale: Number(item["投票面积"] / this.props.data.totalVoteArea * 100).toFixed(2),
            house: houseItem["投票户数"],
            houseScale: Number(houseItem["投票户数"] / this.props.data.totalVoteQuantity * 100).toFixed(2)
          };
          totalArea += item["投票面积"];
          totalQuantity += houseItem["投票户数"];
          resultArr.push(resultItem);
        }
      });
    });
    const unCert = JSON.parse(this.props.data.uncertResultJson);
    const areaNum = Number(this.props.data.totalVoteArea - totalArea - Number(unCert[0]["未认证面积"])).toFixed(2);
    const houseNum = Number(this.props.data.totalVoteQuantity - totalQuantity - Number(unCert[0]["未认证户数"])).toFixed(2);
    const resultItem1 = {
      option: "已认证未参会",
      area: areaNum,
      areaScale: Number(Number(areaNum) / this.props.data.totalVoteArea * 100).toFixed(2),
      house: houseNum,
      houseScale: Number(houseNum / this.props.data.totalVoteQuantity * 100).toFixed(2)
    };
    const resultItem2 = {
      option: "未认证未参会",
      area: Number(unCert[0]["未认证面积"]),
      areaScale: Number(Number(unCert[0]["未认证面积"]) / this.props.data.totalVoteArea * 100).toFixed(2),
      house: unCert[0]["未认证户数"],
      houseScale: Number(unCert[0]["未认证户数"] / this.props.data.totalVoteQuantity * 100).toFixed(2)
    };
    resultArr.push(resultItem1);
    resultArr.push(resultItem2);
    this.setState({
      dataSource: resultArr
    });
  },
  render: function () {
    var h = React.createElement;
    return h("view", {
      class: "weui-cell"
    }, h("view", {
      class: "table"
    }, h("view", {
      class: "tr"
    }, h("view", {
      class: "th"
    }, "\u9009\u9879"), h("view", {
      class: "th noBorder"
    }, h("text", null, "\u6295\u7968\u6237\u6570")), h("view", {
      class: "th"
    }, h("text", null, "\u6295\u7968\u9762\u79EF"))), this.state.dataSource.map((item, index) => {
      return h("view", {
        class: "tr"
      }, h("view", {
        class: "td"
      }, item.option), h("view", {
        class: "td noBorder"
      }, item.house, "\u6237\xA0(", item.houseScale, "%)"), h("view", {
        class: "td"
      }, item.area, "m\xB2\xA0(", item.areaScale, "%)"));
    })));;
  },
  classUid: "c2779"
}, {});
Component(React.registerComponent(VoteTable, "VoteTable"));
export default VoteTable;
import React, { Component } from "react";
import { getWeatherData, getCityData } from "../../api/index";
import styleModule from "./Weather.module.css";

export default class Weather extends Component {
  state = {
    list: [], //天气数据
    cityId: "CH020100", //城市id
    cityName: "上海", //城市名称
    cityList: [], //城市列表数据
    updateTime: "", //天气更新时间
  };

  //在页面加载完的时候设置一个定时器
  componentDidMount() {
    this.getData();
    this.getCitylist();
    this.interval = setInterval(() => this.getData(), 60000);
  }

  //组件销毁的时候清除定时器就行
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  //递归城市数据
  getName = (arrData, name) => {
    let arr = [];
    arrData.forEach((item) => {
      if (item.name === name) {
        arr.push(item);
      } else if (item.list && item.list.length > 0) {
        let arrList = this.getName(item.list, name);
        arr.push(...arrList);
      }
    });

    return arr;
  };

  //天气搜索
  weatherSearch = (e) => {
    const { cityList } = this.state;

    const {
      keyword: { value },
    } = this;
    //判断输入内容是否为空
    if (value.trim() === "") {
      alert("输入内容不能为空");
      return; //拦截
    }
    let newList = this.getName(cityList, value);

    if (newList.length === 0) {
      alert("输入省市区不存在！");
    } else if (newList.length !== 0 && newList[0]?.list?.length > 1) {
      alert("请输入具体城市");
    } else if (newList.length !== 0 && newList[0]?.list?.length === 1) {
      this.setState({
        cityId: newList[0]?.list[0]?.city_id,
        cityName: newList[0]?.list[0]?.name,
      });
      this.getData();
    }
    //清空输入框
    this.keyword.value = "";
  };

  //请求城市数据
  getCitylist = () => {
    getCityData({ id: 1 })
      .then((res) => {
        this.setState({
          cityList: res.data.list,
        });
      })
      .catch((error) => {});
  };

  //请求天气数据
  getData = () => {
    const { cityId } = this.state;
    console.log("cityId :>> ", cityId);
    getWeatherData({ city: cityId, key: "3686l3hnhg2ete52" })
      .then((res) => {
        this.setState({
          cityName: res.data.data.cityName,
          updateTime: res.data.data.sj,
          list: res.data.data.list,
        });
      })
      .catch((error) => {});
  };

  render() {
    const { cityName, updateTime, list } = this.state;

    return (
      <div>
        <div className={styleModule.wather}>
          <header>
            城市搜索：{" "}
            <input
              type="text"
              ref={(c) => (this.keyword = c)}
              placeholder="请输入城市"
            />{" "}
            <button onClick={this.weatherSearch}>搜索</button>
            <h1>{cityName}7天天气数据</h1>
            <h3>{updateTime}</h3>
          </header>
        </div>
        <ul className={styleModule.list}>
          {list.length > 0 &&
            list.map((items, index) => (
              <li key={index}>
                日期：{items.date} <br />
                天气：{items.tq1} <br />
                最高温：{items.qw1} <br />
                最低温：{items.qw2} <br />
                风力：{items.fl1} <br />
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

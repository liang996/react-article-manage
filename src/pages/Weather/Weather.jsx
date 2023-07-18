import React, { Component } from "react";
import { message, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import * as dayjs from "dayjs";

import { getWeatherData, getCityData } from "../../api/index";
import styleModule from "./Weather.module.css";

export default class Weather extends Component {
  state = {
    list: [], //天气数据
    cityId: "101020100", //城市id
    cityName: "上海", //城市名称
    cityList: [], //城市列表数据
    updateTime: "", //天气更新时间
  };

  //在页面加载完的时候设置一个定时器
  componentDidMount() {
    this.getData();
    this.interval = setInterval(() => this.getData(), 60000);
  }

  //组件销毁的时候清除定时器就行
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  //天气搜索
  weatherSearch = (e) => {
    const {
      keyword: { value },
    } = this;
    //判断输入内容是否为空
    if (value.trim() === "") {
      message.error("输入内容不能为空");

      return; //拦截
    } else {
      this.setState({
        cityName: value,
      });
      console.log("value", value);
      this.getCitylist(value);
    }

    //清空输入框
    this.keyword.value = "";
  };
  //请求天气数据
  getData = () => {
    const { cityId } = this.state;
    getWeatherData({
      location: cityId,
      key: "535627da54754fbd880efed958e8d831",
    })
      .then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          this.setState({
            list: res.data.daily,
            updateTime: res.data.updateTime,
          });
        }
      })
      .catch((error) => {
        message.error("请求天气数据失败");
      });
  };
  //请求城市数据
  getCitylist = (value) => {
    console.log("请求城市数据", value);
    getCityData({ location: value, key: "535627da54754fbd880efed958e8d831" })
      .then((res) => {
        console.log("请求城市数据2222", res);

        if (res.status === 200) {
          console.log("请求城市数据1111111");

          this.setState({
            cityId: res.data.location[0].id,
          });
          this.getData();
        }
      })
      .catch((error) => {
        console.log("请求城市数据333");

        message.error("请求城市数据失败");
      });
  };

  render() {
    const { cityName, updateTime, list } = this.state;
    return (
      <div>
        <div className={styleModule.wather}>
          <header>
            城市搜索：
            <input
              style={{ height: "30px", marginRight: "10px" }}
              type="text"
              ref={(c) => (this.keyword = c)}
              placeholder="请输入城市"
            />
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={this.weatherSearch}
            >
              搜索
            </Button>
            <h1>{cityName}7天天气数据</h1>
            <h3>
              数据更新于：{dayjs(updateTime).format("YYYY-MM-DD HH:mm:ss")}
            </h3>
          </header>
        </div>
        <ul className={styleModule.list}>
          {list.length > 0 &&
            list.map((items, index) => (
              <li key={index}>
                日期：{items.fxDate} <br />
                天气：{items.textDay} <br />
                最高温度：{items.tempMax} <br />
                最低温度：{items.tempMin} <br />
                风力等级：{items.windScaleDay} <br />
                日落时间：{items.sunrise} <br />
                白天风向：{items.windDirDay} <br />
                风力等级：{items.sunset} <br />
                能见度：{items.vis} <br />
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

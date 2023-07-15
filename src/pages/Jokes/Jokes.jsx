import React, { Component } from "react";
import { getJokesData } from "../../api/index";
import styleModule from "./Jokes.module.css";

export default class Jokes extends Component {
  state = {
    msg: "段子初始化信息", //段子信息
  };

  //在页面加载完的时候设置一个定时器 （每隔3秒更新段子数据）
  componentDidMount() {
    this.getData();
    this.interval = setInterval(() => this.getData(), 3000);
  }

  //组件销毁的时候清除定时器就行
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  //请求段子数据
  getData = () => {
    getJokesData()
      .then((res) => {
        this.setState({
          msg: res.data.data,
        });
      })
      .catch((error) => {});
  };

  render() {
    const { msg } = this.state;

    return <div className={styleModule.jokes} >随机段子---《{msg}》</div>;
  }
}

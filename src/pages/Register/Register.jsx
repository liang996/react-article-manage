import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, message } from "antd";

import styleModule from "./Register.module.css";
export default class register extends Component {
  state = {
    userName: "",
    password: "",
  };
  saveFormData = (dataType) => {
    return (e) => {
      this.setState({ [dataType]: e.target.value });
    };
  };
  isRegister = () => {
    const { userName, password } = this.state;
    //判断输入内容是否为空
    if (userName.trim() === "" || password.trim() === "") {
      message.error("输入内容不能为空");

      return; //拦截
    } else {
      let data = {
        userName,
        password,
      };

      localStorage.setItem("userData", JSON.stringify(data));
      message.success("注册成功，去登录");

      this.props.history.push("/login");
    }
  };
  render() {
    return (
      <div className={styleModule.container}>
        <div className={styleModule["register-wrapper"]}>
          <div className={styleModule.header}>文章管理系统</div>
          <div className={styleModule["form-wrapper"]}>
            账号：
            <input
              type="text"
              name="username"
              placeholder="请输入账号"
              className={styleModule["input-item"]}
              onChange={this.saveFormData("userName")}
            />
            密码：
            <input
              type="password"
              name="password"
              placeholder="请输入密码"
              className={styleModule["input-item"]}
              onChange={this.saveFormData("password")}
            />
            <Button
              id="register"
              className={styleModule.btn}
              onClick={this.isRegister}
            >
              登录
            </Button>
            {/* <div  id="register" className={styleModule.}"btn" onClick={this.isregister}>
            登录
          </div> */}
          </div>
          <div className={styleModule.msg}>
            已有账号? <Link to="/login">去登入</Link>
          </div>
        </div>
      </div>
    );
  }
}

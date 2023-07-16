import React, { Component } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Link } from "react-router-dom";
import { Button, message } from "antd";
import { nanoid } from "nanoid";
import styleModule from "./Login.module.scss";
import { getUserInfo } from "../../api/asyncVersion/user";
export default class Login extends Component {
  state = {
    userName: "",
    password: "",
    options: {
      // "background": {
      //   "color": {
      //     "value": "#232741"
      //   },
      //   "position": "50% 50%",
      //   "repeat": "no-repeat",
      //   "size": "cover"
      // },
      // 帧数，越低越卡,默认60
      fpsLimit: 120,
      fullScreen: {
        zIndex: 1,
      },
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "slow",
          },
        },
        modes: {
          push: {
            //点击是添加1个粒子
            quantity: 3,
          },
          bubble: {
            distance: 200,
            duration: 2,
            opacity: 0.8,
            size: 20,
            divs: {
              distance: 200,
              duration: 0.4,
              mix: false,
              selectors: [],
            },
          },
          grab: {
            distance: 400,
          },
          //击退
          repulse: {
            divs: {
              //鼠标移动时排斥粒子的距离
              distance: 200,
              //翻译是持续时间
              duration: 0.4,
              factor: 100,
              speed: 1,
              maxSpeed: 50,
              easing: "ease-out-quad",
              selectors: [],
            },
          },
          //缓慢移动
          slow: {
            //移动速度
            factor: 2,
            //影响范围
            radius: 200,
          },
          //吸引
          attract: {
            distance: 200,
            duration: 0.4,
            easing: "ease-out-quad",
            factor: 3,
            maxSpeed: 50,
            speed: 1,
          },
        },
      },
      //  粒子的参数
      particles: {
        //粒子的颜色
        color: {
          value: "#1DA57A",
        },
        //是否启动粒子碰撞
        collisions: {
          enable: true,
        },
        //粒子之间的线的参数
        links: {
          color: {
            value: "#1DA57A",
          },
          distance: 150,
          enable: true,
          warp: true,
        },
        move: {
          attract: {
            rotate: {
              x: 600,
              y: 1200,
            },
          },
          enable: true,
          outModes: {
            bottom: "out",
            left: "out",
            right: "out",
            top: "out",
          },
          speed: 6,
          warp: true,
        },
        number: {
          density: {
            enable: true,
          },
          //初始粒子数
          value: 40,
        },
        //透明度
        opacity: {
          value: 0.5,
          animation: {
            speed: 3,
            minimumValue: 0.1,
          },
        },
        //大小
        size: {
          random: {
            enable: true,
          },
          value: {
            min: 1,
            max: 3,
          },
          animation: {
            speed: 20,
            minimumValue: 0.1,
          },
        },
      },
    },
  };

  particlesInit = async (main) => {
    await loadFull(main);
  };

  //粒子被正确加载到画布中时，这个函数被调用
  particlesLoaded = (container) => {
    console.log("123", container);
  };

  saveFormData = (dataType) => {
    return (e) => {
      this.setState({ [dataType]: e.target.value });
    };
  };
  isLogin = () => {
    const { userName, password } = this.state;
    let user = JSON.parse(localStorage.getItem("userData")) || {};
    console.log("user :>> ", user);

    //判断输入内容是否为空
    if (userName.trim() === "" || password.trim() === "") {
      message.error("输入内容不能为空");

      return; //拦截
    } else if (Object.keys(user).length === 0) {
      message.error("您还未注册，请先注册");

      return; //拦截
    } else if (
      Object.keys(user).length > 0 &&
      (userName !== user.userName || password !== user.password)
    ) {
      message.error("您还未注册，请先注册");

      return; //拦截
    } else {
      // //传递search参数
      // this.props.history.push(
      //   `/home?userName=${userName}&password=${password}`
      // );
      //传递query参数

      // this.props.history.push({
      //   pathname: "/home",
      //   query: { userName, password },
      // });
      getUserInfo(
        `?username=${userName}&password=${password}&roleState=true&_expand=role`
      );
      localStorage.setItem("token", nanoid());

      //传递state参数
      this.props.history.push({
        pathname: "/home",
        state: { userName, password },
      });
    }
  };
  render() {
    return (
      <div className={styleModule.container}>
        <Particles
          id="tsparticles"
          init={this.particlesInit}
          loaded={this.particlesLoaded}
          options={this.state.options}
        />
        <div className={styleModule["login-wrapper"]}>
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
              id="login"
              className={styleModule.btn}
              onClick={this.isLogin}
            >
              登录
            </Button>
            {/* <div  id="login" className={styleModule.}"btn" onClick={this.isLogin}>
              登录
            </div> */}
          </div>
          <div
            className={styleModule.msg}
            style={{ textAlign: "center", paddingTop: "10px" }}
          >
            还没有账号? <Link to="/register">去注册</Link>
          </div>
        </div>
      </div>
    );
  }
}

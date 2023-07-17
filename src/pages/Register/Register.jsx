import React, { Component } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Link } from "react-router-dom";
import { Button, message } from "antd";
import { addUserData, getUserInfo } from "../../api/asyncVersion/user";
import styleModule from "./Register.module.scss";
export default class register extends Component {
  state = {
    username: "",
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
  saveFormData = (dataType) => {
    return (e) => {
      this.setState({ [dataType]: e.target.value });
    };
  };
  particlesInit = async (main) => {
    await loadFull(main);
  };

  //粒子被正确加载到画布中时，这个函数被调用
  // particlesLoaded = (container) => {
  //   console.log("123", container);
  // };
  isRegister = async () => {
    const { username, password } = this.state;
    //判断输入内容是否为空
    if (username.trim() === "" || password.trim() === "") {
      message.error("输入内容不能为空");

      return; //拦截
    } else {
      let data = {
        username,
        password,
      };
      console.log("data :>> ", data);
      let userData = await getUserInfo(
        `?username=${username}&password=${password}&roleState=true&_expand=role`
      );
      console.log("userData", userData);
      //校验输入的账号密码是否和数据库的账号密码是否一致
      if (
        userData[0]?.username === username &&
        userData[0]?.password === password
      ) {
        message.error("当前用户已被注册使用,请前往登录");
        localStorage.setItem("userData", JSON.stringify(data));

        return;
      } else {
        //Math.floor(Math.random()*10)可均衡获取 0 到 9 的随机整数。
        // Math.random()>0.5?1:0; 可均衡获取 0 or 1 的随机整数。
        //Math.floor(Math.random() * (100 - 0)) + 0  可均衡获取 0 到 100 的随机整数。
        const addressArr = [
          "北京",
          "武汉",
          "成都",
          "重庆",
          "深圳",
          "郑州",
          "黄石",
          "宁波",
          "西安",
        ];

        const item = addressArr[Math.floor(Math.random() * addressArr.length)];
        await addUserData({
          username,
          password,
          age: Math.floor(Math.random() * (100 - 1)) + 1,
          sex: Math.random() > 0.5 ? 1 : 0,
          phone: `1820721101${Math.floor(Math.random() * 10)}`,
          roleState: true,
          address: item,
          roleId: 3, //默认普通用户角色
          default: false,
        });
        localStorage.setItem("userData", JSON.stringify(data));
        message.success("注册成功，去登录");
        this.props.history.push("/login");
      }
    }
  };
  render() {
    return (
      <div className={styleModule.container}>
        {/* loaded={this.particlesLoaded} */}
        <Particles
          id="tsparticles"
          init={this.particlesInit}
          options={this.state.options}
        />
        <div className={styleModule["register-wrapper"]}>
          <div className={styleModule.header}>文章管理系统</div>
          <div className={styleModule["form-wrapper"]}>
            账号：
            <input
              type="text"
              name="username"
              placeholder="请输入账号"
              className={styleModule["input-item"]}
              onChange={this.saveFormData("username")}
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
              注册
            </Button>
          </div>
          <div
            className={styleModule.msg}
            style={{ textAlign: "center", paddingTop: "10px" }}
          >
            已有账号? <Link to="/login">去登录</Link>
          </div>
        </div>
      </div>
    );
  }
}

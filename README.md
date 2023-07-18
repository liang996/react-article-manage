# About

此项目为文章管理系统，是 react + antd 构建的后台管理系统，具有登陆，注册、列表展示、权限管理、角色管理、查询真实天气接口,导入导出，复制,富文本,百度地图地图选点等功能。

# 说明

> 如果对您对此项目有兴趣，可以点 "Star" 支持一下 谢谢！ ^\_^

> 如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍

> 传送门：[个人 🙅‍♂ 博客](https://liang996.github.io/)



## 项目所用技术栈 ：

文章管理系统集成技术栈有

```
1.react17
2.Hooks
3.antd
4.jsonServer
5.scss
6.redux
7.react-router
```

## 项目起源：

由于最近接触的 vue 项目比较多，为了防止 react 技术遗忘，为此利用工作闲余时间搭建了这一套文章管理系统项目，用于 react 回顾练习项目，纯属娱乐

## 项目准备

`JSON Server 使用`

1.安装 JSON 服务器

```js
npm install -g json-server
```

2.创建一个包含一些数据的 db.json 文件(放项目根目录)

```js
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```

3.在 package.json 文件中的 scripts 里面配置如下命令

```
  "mock": "json-server db.json --port 8001"
```

3.本项目数据由 JSON-server 模拟（mock）出来的，如果要获取数据，请在启动项目前，执行以下命令：

```
npm run mock

```

## 项目启动

```
npm  run start
```

## 项目打包

```
npm  run build
```

## 项目暴露 webpack 配置，一般情况下不用，根据需要在使用

```
npm  run  eject
```

## antd 表格增删改查案例 (可以用于参考)

```html
https://blog.csdn.net/qq_46105844/article/details/125933947
```

## JSON-server 的增删改查案例 (可以用于参考)

```
 https://blog.csdn.net/weixin_48813932/article/details/124624103
```

## 【前端 react 粒子特效】使用  react-tsparticles  tsparticles

```
1.https://blog.csdn.net/weixin_54127208/article/details/124380211
2.配置 https://blog.csdn.net/echozly/article/details/122296158
```

## 进度条插件- Nprogress使用

 在很多网页的加载过程中，顶部都会展示一个进度条来显示加载进度。Nprogress 就是一款非常方便的进度条插件
1.首先安装 nprogress(咱直接用 npm 安装了)

```
npm install --save nprogress

```

2.在路由切换组件页面使用

```
import NProgress from 'nprogress'; //引入nprogress
import 'nprogress/nprogress.css';   //引入样式

  React.useState(nprogress.start());
  React.useEffect(() => {
    nprogress.done();
    return () => nprogress.start();
  });
```

## 权限功能表关联简述

```
1.先有菜单表 （catalogues），子菜单关联父菜单（children）
2.权限数据其实就是菜单表及子菜单表数据的集合
3.角色表又关联着权限数据 （先给角色授权）
4.用户表又关联着角色表数据  （在给用户赋予角色）
```
## 问题记录

```
1.暂时权限列表控制子目录，不起作用
2.ResizeObserver loop limit exceeded 删除功能偶尔会报
```

## 和风天气
```
https://devapi.qweather.com/v7/weather/3d?location=101020100&key=535627da54754fbd880efed958e8d831 查天气

https://geoapi.qweather.com/v2/city/lookup?location=%E4%B8%8A%E6%B5%B7&key=535627da54754fbd880efed958e8d831 查城市
https://dev.qweather.com/docs/api/weather/weather-daily-forecast/   查和风天气文档
``` 
## Day.js使用
dayjs是一个轻量的处理时间和日期的 JavaScript 库

官方github https://github.com/iamkun/dayjs

中文使用文档 https://github.com/iamkun/dayjs/blob/master/docs/zh-cn/API-reference.md

##  CSS的简写属性
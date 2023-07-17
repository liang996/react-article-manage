## 项目名称 ：

文章管理系统 目前持续开发中。。。。。。。。。。。。。。

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

```
## 问题记录
1.暂时权限列表控制子目录，不起作用
2.ResizeObserver loop limit exceeded 删除功能偶尔会报


```

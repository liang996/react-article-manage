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
由于最近接触的vue项目比较多，为了防止react技术遗忘，为此利用工作闲余时间搭建了这一套文章管理系统项目，用于react回顾练习项目，纯属娱乐

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
3.在package.json文件中的scripts里面配置如下命令
```
  "mock": "json-server db.json --port 8001"
```


3.本项目数据由JSON-server模拟（mock）出来的，如果要获取数据，请在启动项目前，执行以下命令：
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
## 项目暴露webpack配置，一般情况下不用，根据需要在使用

```
npm  run  eject
```



## antd表格增删改查案例 (可以用于参考)
```html
 https://blog.csdn.net/qq_46105844/article/details/125933947 
 ``` 
##  JSON-server 的增删改查案例  (可以用于参考)
```
 https://blog.csdn.net/weixin_48813932/article/details/124624103 
 ```
 ##  【前端react 粒子特效】
```
https://blog.csdn.net/weixin_54127208/article/details/124380211
```

```
## 问题记录
1.暂时权限列表控制子目录，不起作用
2.ResizeObserver loop limit exceeded 删除功能偶尔会报

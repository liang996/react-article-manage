import React, { useState, useEffect } from "react";
import { Menu, Layout } from "antd";
import { withRouter } from "react-router-dom";
import { getMenuList } from "../../api/asyncVersion/menu";
import { isAuth } from "../../utils/common";

import "./index.css";
const { Sider } = Layout;

function MenuList(props) {
  //collapsed：为Boolean ,true为可折叠，反之展开
  console.log("props", props);
  const [collapsed] = useState(false);

  const [MenuData, setMenuData] = useState([]);

  useEffect(() => {
    getArticleData();
  }, []);
  //请求文章数据
  const getArticleData = async () => {
    let res = await getMenuList();
    setMenuData(res);

    console.log("res111111111111", res);
  };
  //请求文章数据
  // const getArticleData = () => {
  //   getMenuList()
  //     .then((res) => {
  //       setMenuData(res.data)
  //     })
  //     .catch(() => {
  //       message.error("获取文章数据失败");
  //     });
  // };
  const onClick = (e) => {
    console.log("click ", e);
    props.history.push({
      pathname: e.key,
    });
  };
  const renderMenu = (menuList) => {
    //auth：auth为权限控制字段，1，有权限，0：无权限
    return (
      menuList &&
      menuList.map((item) => {
        if (item.children &&isAuth(item.auth)) {
          return (
            <Menu.SubMenu
              key={item.key}
              title={item.label}
              icon={item.iconType}
            >
              {/* 递归 */}
              {renderMenu(item.children)}
            </Menu.SubMenu>
          );
        } else {
          return isAuth(item.auth)&& <Menu.Item key={item.key}>{item.label}</Menu.Item>;
        }
      })
    );
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">文章管理系统</div>
      {/* 简单版，直接渲染 */}
      {/*  <Menu 
        theme="dark"
        mode="inline"
        onClick={onClick}
        defaultSelectedKeys={["1"]}
        items={MenuData}
      /> */}
      {/* 递归版渲染目录 */}
      <Menu
        theme="dark"
        mode="inline"
        onClick={onClick}
        defaultSelectedKeys={["1"]}
      >
        {renderMenu(MenuData)}
      </Menu>
      ;
    </Sider>
  );
}

export default withRouter(MenuList);

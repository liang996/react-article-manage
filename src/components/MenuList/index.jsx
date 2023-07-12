import React, { useState, useEffect } from "react";
import { Menu, Layout } from "antd";
import { withRouter } from "react-router-dom";

import "./index.css";
import { UserOutlined } from "@ant-design/icons";
const { Sider } = Layout;

function MenuList(props) {
  //collapsed：为Boolean ,true为可折叠，反之展开
  console.log("props", props);
  const [collapsed] = useState(false);

  const MenulistData = [
    {
      label: "首页",
      icon: <UserOutlined />,
      key: "/home",
    },
    {
      label: "天气管理",
      icon: <UserOutlined />,
      key: "/weather",
    },

    {
      label: "文章管理",
      icon: <UserOutlined />,
      path: "/article-manage",
      key: "2",
      children: [
        {
          label: "文章列表",
          icon: null,
          key: "/article-manage/article/list",
        },
        {
          label: "发布列表",
          icon: null,
          key: "/article-manage/release/list",
        },
        {
          label: "审核列表",
          icon: null,
          key: "/article-manage/auditing/list",
          // children: [],
        },
      ],
    },
  ];
  const [MenuData, setMenuData] = useState([]);

  useEffect(() => {
    getMenuData();
  }, []);
  // 获取菜单数据
  const getMenuData = () => {
    setMenuData(MenulistData);
  };
  const onClick = (e) => {
    console.log("click ", e);
    //传递state参数
    props.history.push({
      pathname: e.key,
    });
  };
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">文章管理系统</div>

      <Menu
        theme="dark"
        mode="inline"
        onClick={onClick}
        defaultSelectedKeys={["1"]}
        items={MenuData}
      />
    </Sider>
  );
}

export default withRouter(MenuList);

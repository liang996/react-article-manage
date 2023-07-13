import React, { useState, useEffect } from "react";
import { Menu, Layout } from "antd";
import { withRouter } from "react-router-dom";
import { getMenuList } from "../../api/asyncVersion/menu";
import { isAuth } from "../../utils/common";
import { UserOutlined, HomeOutlined, PicLeftOutlined} from "@ant-design/icons";
import { WeatherIcon} from '../../utils/icon';

import "./index.css";
const { Sider } = Layout;

const iconList = {
  "/home": <HomeOutlined />,
  "/weather": <WeatherIcon />,
  "/user": <UserOutlined />,
  "/article-manage":<PicLeftOutlined />,
};

function MenuList(props) {
  //collapsed：为Boolean ,true为可折叠，反之展开
  console.log("props", props);
  const [collapsed] = useState(false);

  const [MenuData, setMenuData] = useState([]);
  const [current, setCurrent] = useState("1");

  useEffect(() => {
    getArticleData();
  }, []);

  const renderMenu = (menuList) => {
    return menuList.map((item) => {
      if (!item.icon) {
        item.icon = iconList[item.key];
      }
      return item;
    });
  };
  //请求菜单数据
  const getArticleData = async () => {
    let res = await getMenuList();
    let iconMap = renderMenu(res);
    setMenuData(iconMap);
  };

  const onClick = (e) => {
    setCurrent(e.key);

    props.history.push({
      pathname: e.key,
    });
  };

  // 老版本遍历目录使用
  // const iconList = {
  //   "/home": <UserOutlined />,
  //   "/weather": <UserOutlined />,
  //   "/user": <UserOutlined />,
  //   "/article-manage": <UserOutlined />,
  // };

  // const renderMenu = (menuList) => {
  //   //auth：auth为权限控制字段，1，有权限，0：无权限
  //   return (
  //     menuList &&
  //     menuList.map((item) => {
  //       if (item.children && isAuth(item.auth)) {
  //         return (
  //           <Menu.SubMenu
  //             key={item.key}
  //             title={item.label}
  //             icon={iconList[item.key]}
  //           >
  //             {/* 递归 */}
  //             {renderMenu(item.children)}
  //           </Menu.SubMenu>
  //         );
  //       } else {
  //         return (
  //           isAuth(item.auth) && (
  //             <Menu.Item key={item.key}>{item.label}</Menu.Item>
  //           )
  //         );
  //       }
  //     })
  //   );
  // };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">文章管理系统</div>
      {/* 简单版，直接渲染 */}
      <Menu
        theme="dark"
        mode="inline"
        onClick={onClick}
        selectedKeys={[current]}
        items={MenuData}
      />
      {/* 递归版渲染目录 ,在 4.20.0 版本后，我们提供了 <Menu items={[...]} /> 的简写方式，有更好的性能和更方便的数据组织方式，开发者不再需要自行拼接 JSX。同时我们废弃了原先的写法，你还是可以在 4.x 继续使用，但会在控制台看到警告，并会在 5.0 后移除。*/}
      {/* <Menu
        theme="dark"
        mode="inline"
        onClick={onClick}
        defaultSelectedKeys={["1"]}
      >
        {renderMenu(MenuData)}
      </Menu> */}
      ;
    </Sider>
  );
}

export default withRouter(MenuList);

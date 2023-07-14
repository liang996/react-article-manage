import React, { useState, useEffect } from "react";
import { Menu, Layout } from "antd";
import { withRouter } from "react-router-dom";
import { getList } from "../../api/asyncVersion/menu";
import { UserOutlined, HomeOutlined, PicLeftOutlined } from "@ant-design/icons";
import { WeatherIcon } from "../../utils/icon";

import "./index.css";
const { Sider } = Layout;

const iconList = {
  "/home": <HomeOutlined />,
  "/weather-manage": <WeatherIcon />,
  "/user-manage": <UserOutlined />,
  "/article-manage": <PicLeftOutlined />,
  "/publish-manage": <UserOutlined />,
  "/examine-manage": <UserOutlined />,
  "/auth-manage": <UserOutlined />,
};

function MenuList(props) {
  //collapsed：为Boolean ,true为可折叠，反之展开
  console.log("props", props);
  const [collapsed] = useState(false);

  const [MenuData, setMenuData] = useState([]);

  useEffect(() => {
    getMenuData();
  }, []);

  const checkAuth = (item) => item.auth === 1;
  const renderMenu = (menuList) => {
    return (
      menuList &&
      menuList.map((item) => {
        if (!item.icon) {
          item.icon = iconList[item.key];
        }
        //把只有一层都可以折叠的功能修复
        if (item?.children?.length > 0 && checkAuth(item)) {
          renderMenu(item.children);
          return item;
        } else if (checkAuth(item)) {
          item.children = "";
          return item;
        }
      })
    );
  };
  //请求菜单数据
  const getMenuData = async () => {
    let res = await getList("?_embed=children");
    console.log("通过目录表关联的子目录表数据", res);
    let iconMap = renderMenu(res);
    console.log("iconMap", iconMap);
    setMenuData(iconMap);
  };

  const onClick = (e) => {
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
  //             title={item.title}
  //             icon={iconList[item.key]}
  //           >
  //             {/* 递归 */}
  //             {renderMenu(item.children)}
  //           </Menu.SubMenu>
  //         );
  //       } else {
  //         return (
  //           isAuth(item.auth) && (
  //             <Menu.Item key={item.key}>{item.title}</Menu.Item>
  //           )
  //         );
  //       }
  //     })
  //   );
  // };
  //父路由选中
  const selectedKeys = [props.location.pathname];
  //子路由展开选中
  const OpenKeys = [`/${props.location.pathname.split("/")[1]}`];

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="Menubox">
        <div className="logo">文章管理系统</div>
        {/* 简单版，直接渲染 */}
        <div style={{ flex: "1", overflow: "auto" }}>
          <Menu
            theme="dark"
            mode="inline"
            onClick={onClick}
            selectedKeys={selectedKeys}
            defaultOpenKeys={OpenKeys}
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
        </div>
      </div>
    </Sider>
  );
}

export default withRouter(MenuList);

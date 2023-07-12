import React, { useState, useEffect } from "react";
import { Menu, Layout ,message} from "antd";
import { withRouter } from "react-router-dom";
import { getMenuList } from "../../api/asyncVersion/menu";
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
    setMenuData(res)

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

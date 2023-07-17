import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, Dropdown, Space, Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { removeToken } from "../../utils/common";

const { Header } = Layout;

export default function MenuHeader() {
  const [collapsed, setCollapsed] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("userInfoData"));
    console.log('data', data)
    setUserInfo(data);
  }, []);
  const changeFoldOutlined = () => {
    setCollapsed(!collapsed);
  };

  const onClick = ({ key }) => {
    if (key*1 ===2) {
      removeToken();
      window.location.href = "/login";
    }
  };

  const items = [
    {
      label:userInfo?.role?.roleName,
      key: 1,
    },
    {
      label: "退出登录",
      key: 2,
    },
    // ,
    // {
    //   label: "2nd menu item",
    //   key: "2",
    // },
    // {
    //   label: "3rd menu item",
    //   key: "3",
    // },
  ];
  return (
    <Header
      className="site-layout-background"
      style={{
        padding: "0 16px",
      }}
    >
      {collapsed ? (
        <MenuUnfoldOutlined onClick={changeFoldOutlined} />
      ) : (
        <MenuFoldOutlined onClick={changeFoldOutlined} />
      )}
      <div
        style={{
          float: "right",
        }}
      >
        <Dropdown menu={{ items, onClick }}>
          {/* <a onClick={(e) => e.preventDefault()}> */}
          <Space>
            <span>
              <Avatar
                size={40}
                style={{
                  backgroundColor: "#f56a00",
                }}
              >
                {userInfo.username}
              </Avatar>
            </span>
            <DownOutlined />
          </Space>
          {/* </a> */}
        </Dropdown>
      </div>
    </Header>
  );
}

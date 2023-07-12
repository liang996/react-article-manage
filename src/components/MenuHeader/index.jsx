import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, Dropdown, Menu, Space, Avatar } from "antd";
import React, { useState } from "react";

const { Header } = Layout;

export default function MenuHeader() {
  const [collapsed, setCollapsed] = useState(false);
  const changeFoldOutlined = () => {
    setCollapsed(!collapsed);
  };
  const menu = (
    <Menu
      items={[
        // {
        //   key: "1",
        //   label: (
        //     <a
        //       target="_blank"
        //       rel="noopener noreferrer"
        //       href="https://www.antgroup.com"
        //     >
        //       退出登录
        //     </a>
        //   ),
        // },
        {
          key: "2",
          danger: true,
          label: "退出登录",
        },
      ]}
    />
  );
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
        <Dropdown overlay={menu}>
          {/* <a onClick={(e) => e.preventDefault()}> */}
          <Space>
            <span>
              <Avatar
                size={40}
                style={{
                  backgroundColor: "#f56a00",
                }}
              >
                admin
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

import React from "react";
import { Layout } from "antd";
import MenuHeader from "../../components/MenuHeader";
import MenuList from "../../components/MenuList";
import RouterHomeMenu from "../../router/routerHomeMenu";

import "./index.css";

const { Content } = Layout;

export default function TemplateList() {
  return (
    <Layout>
      <MenuList></MenuList>

      <Layout className="site-layout">
        <MenuHeader></MenuHeader>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            overflow: "auto",
          }}
        >
          <RouterHomeMenu/>
        </Content>
      </Layout>
    </Layout>
  );
}

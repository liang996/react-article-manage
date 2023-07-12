import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,

} from '@ant-design/icons';
import { Layout,  } from 'antd';
import React, { useState } from 'react';
const { Header} = Layout;

export default function MenuHeader() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Header
    className="site-layout-background"
    style={{
      padding: 0,
    }}
  >
    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
      className: 'trigger',
      onClick: () => setCollapsed(!collapsed),
    })}
  </Header>
  )
}

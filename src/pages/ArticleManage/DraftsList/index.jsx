import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Space, Popconfirm } from "antd";

import axios from "axios";
import { NavLink } from "react-router-dom";
import { getDraftsList } from "../../../api/asyncVersion/article";
const { confirm } = Modal;

export default function DraftsList() {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const { username } = JSON.parse(localStorage.getItem("userInfoData"));

    let res = await getDraftsList(
      `?author=${username}&auditState=0&_expand=category`
    );
    console.log('res', res)
    setDataSource(res);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => <b>{id}</b>,
    },
    {
      title: "新闻标题",
      dataIndex: "title",
      render: (title, item) => (
        <b>{title}</b>
        // <NavLink to={`/news-manage/preview/${item.id}`}>{title}</NavLink>
      ),
    },
    {
      title: "作者",
      dataIndex: "author",
    },
    {
      title: "分类",
      dataIndex: "category",
      render: (item) => <span>{item?.title}</span>,
    },
    {
      title: "操作",
      render: (item) => {
        return (
          <Space size="middle">
            <NavLink to={`/news-manage/update/${item.id}`}>
              <Button     type="link">修改</Button>
            </NavLink>
            <Popconfirm okText="确定" cancelText="取消">
              <a style={{ color: "#fa8c16" }}>删除</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];


  return (
    <div>
      <Table
        rowKey={(item) => item.id}
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
}

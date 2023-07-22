import React, { useEffect, useState } from "react";
import { Button, Table, Space, Popconfirm } from "antd";
import { NavLink } from "react-router-dom";
import {
  getDraftsList,
  delArticleData,
} from "../../../api/asyncVersion/article";

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
    console.log("res", res);
    setDataSource(res);
  };
  //发布
  const release = () => {
    console.log("first");
  };
  //文章数据删除
  const deleteData = async (data) => {
    console.log("data", data);
    let res = await delArticleData(`${data.id}`);
    if (Object.keys(res).length ===0) {
      setDataSource(dataSource.filter((item) => item.id !== data.id));
      getList();
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => <b>{id}</b>,
    },
    {
      title: "文章标题",
      dataIndex: "title",
      render: (title, item) => (
        <b>{title}</b>
      ),
    },
    {
      title: "作者",
      dataIndex: "author",
    },
    {
      title: "分类",
      dataIndex: "category",
      render: (category) => <span>{category?.title}</span>,
    },
    {
      title: "操作",
      render: (item) => {
        return (
          <Space size="middle">
            <NavLink to={`/news-manage/update/${item.id}`}>
              <Button type="link">修改</Button>
            </NavLink>
            <Popconfirm
              title="确定要删除吗?"
              onConfirm={deleteData.bind(this, item)}
              okText="确定"
              cancelText="取消"
            >
              <Button type="link" style={{ color: "#fa8c16" }}>
                删除
              </Button>
            </Popconfirm>
            <Button type="link" onClick={release}>
              发布
            </Button>
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

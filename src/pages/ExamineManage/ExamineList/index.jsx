import React, { useState, useEffect, useRef } from "react";
import {
  Space,
  Table,
  Popconfirm,
  Button,
  Input,
  Form,
  Drawer,
  message,
  Tag,
} from "antd";
import { getExamineList } from "../../../api/asyncVersion/article";

import { AUDITSTATE, AUDITCOLOR } from "../../../utils/common";

export default function ExamineList() {
  const [ExamineData, setExamineData] = useState([]);

  const [addVisible, setaddVisible] = useState(false);
  const [editaddVisible, seteditAddVisible] = useState(false);
  const [seachValue, setSeachValue] = useState("");

  const [rowid, setRowid] = useState(null);
  let currentUser = JSON.parse(localStorage.getItem("userInfoData"));

  let editFormRef = useRef();
  useEffect(() => {
    getExamineData();
  }, []);

  //请求审核列表数据

  const getExamineData = async () => {
    //_ne：为不等于 _lte=：为小于等于
    let res = await getExamineList(
      `?author=${currentUser.username}&auditState_ne=0&publishState_lte=1&_expand=category`
    );
    console.log('res', res)
    // setExamineData(res);
  };

  //审核列表数据删除
  const deleteData = async (data) => {};

  //审核列表数据更新
  const updateData = async (data) => {};

  //新增、修改数据时提交失败时的提示信息
  const onFinishFailed = (errorInfo) => {
    message.error("按照格式要求输入");
  };

  const updateState = (e) => {
    setSeachValue(e.target.value);
  }; //即时更新，不加这个就不会更新输入框内容

  //实现按照审核列表标题查询数据
  const queryfn = () => {
    clearTimeout(window.timer); //防抖查询
    window.timer = setTimeout(() => {
      //搜索框输入值，就按搜索查
      if (seachValue.length > 0) {
        let data = ExamineData.filter((r) => r.title === seachValue);
        if (data.length !== 0) {
          setExamineData(data);
        } else {
          setExamineData([]);
        }
      } else {
        //搜索框没输入值，就查全部
        getExamineData();
      }
    }, 500);
  };

  //输入框清空
  const clear = (e) => {
    setSeachValue("");
    getExamineData();
  };

  //显示修改信息抽屉
  const showEditDrawer = (r) => {
    seteditAddVisible(true);
    setRowid(r.id);
    //设置 0 毫秒延迟回显数据
    setTimeout(() => {
      editFormRef.current.setFieldsValue(r);
    }, 0);
  };

  //关闭修改信息对话框
  const onEditClose = () => {
    seteditAddVisible(false);
    message.error("取消操作");
  };

  //关闭新增信息对话框
  const onAddClose = () => {
    setaddVisible(false);

    message.error("取消操作");
  };

  const columns = [
    {
      title: "审核编号",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "文章标题",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "作者",
      dataIndex: "author",
    },
    {
      title: "文章分类",
      dataIndex: "Examine",
      render: (item) => <span>{item.title}</span>,
    },
    {
      title: "审核状态",
      dataIndex: "auditState",
      render: (item) => <Tag color={AUDITCOLOR[item]}>{AUDITSTATE[item]}</Tag>,
    },

    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={showEditDrawer.bind(this, record)}>修改</a>
          <Popconfirm
            title="确定要删除吗?"
            onConfirm={deleteData.bind(this, record)}
            onCancel={onAddClose.bind(this)}
            okText="确定"
            cancelText="取消"
          >
            <a style={{ color: "#fa8c16" }}>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Input
          placeholder="请根据审核列表标题查找信息"
          style={{ marginLeft: "10px", width: "20%" }}
          value={seachValue}
          onChange={updateState}
        />
        <Button onClick={clear} style={{ marginLeft: "10px" }}>
          重置
        </Button>

        <Button style={{ marginLeft: "10px" }} type="primary" onClick={queryfn}>
          查询
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={ExamineData}
        rowKey={(item) => item.id}
      />

      <Drawer
        title="修改审核列表信息"
        onClose={onEditClose}
        open={editaddVisible}
      >
        <Form
          ref={editFormRef}
          onFinish={updateData}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="title"
            label="审核列表标题"
            rules={[{ required: true, message: "请输入审核列表标题" }]}
          >
            <Input placeholder="请输入" id="title" title="输入2-6位中文汉字" />
          </Form.Item>

          <Button onClick={onEditClose.bind(this)}>取消</Button>
          <Button htmlType="submit" type="primary">
            完成
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}

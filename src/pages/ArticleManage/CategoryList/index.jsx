import React, { useState, useEffect, useRef } from "react";
import {
  getCategoryList,
  delCategoryData,
  updateCategoryData,
  addCategoryData,
} from "../../../api/asyncVersion/category";
import {
  Space,
  Table,
  Popconfirm,
  Button,
  Input,
  Form,
  Drawer,
  message,
} from "antd";
import { nanoid } from "nanoid";

export default function CategoryList() {
  const [CategoryData, setCategoryData] = useState([]);

  const [addVisible, setaddVisible] = useState(false);
  const [editaddVisible, seteditAddVisible] = useState(false);
  const [seachValue, setSeachValue] = useState("");

  const [rowid, setRowid] = useState(null);
  let editFormRef = useRef();
  let addFormRef = useRef();
  useEffect(() => {
    getCategoryData();
  }, []);

  //请求类别数据

  const getCategoryData = async () => {
    let res = await getCategoryList();
    setCategoryData(res);
  };

  //类别数据添加
  const addCategory = async (data) => {
    console.log(" addFormRef.current :>> ", data.title);
    let res = await addCategoryData({ title: data.title, value: data.title });
    console.log("res", res);
    if (Object.keys(res).length > 0) {
      message.success({
        content: "类别添加成功",
        className: "custom-class",
        style: {
          marginTop: "20vh",
        },
      });

      getCategoryData();
      setaddVisible(false);
      addFormRef.current.resetFields(); //修改成功后清空输入框中的数据
    }else{
      message.error("类别添加失败");

    }
  };

  //类别数据删除
  const deleteData = async (data) => {
    await delCategoryData(data.id);
    setCategoryData(CategoryData.filter((r) => r.id !== data.id));

    getCategoryData();
    //console.log("类别数据删除", res);
  };

  //类别数据更新
  const updateData = async (data) => {
    await updateCategoryData(rowid, { title: data.title });

    getCategoryData();
    seteditAddVisible(false);
    editFormRef.current.resetFields(); //修改成功后清空输入框中的数据
  };

  //新增、修改数据时提交失败时的提示信息
  const onFinishFailed = (errorInfo) => {
    message.error("按照格式要求输入");
  };
  //显示新增信息抽屉
  const showAddDrawer = () => {
    setaddVisible(true);
  };

  const updateState = (e) => {
    setSeachValue(e.target.value);
  }; //即时更新，不加这个就不会更新输入框内容

  //实现按照类别标题查询数据
  const queryfn = () => {
    clearTimeout(window.timer); //防抖查询
    window.timer = setTimeout(() => {
      //搜索框输入值，就按搜索查
      if (seachValue.length > 0) {
        let data = CategoryData.filter((r) => r.title === seachValue);
        if (data.length !== 0) {
          setCategoryData(data);
        } else {
          setCategoryData([]);
        }
      } else {
        //搜索框没输入值，就查全部
        getCategoryData();
      }
    }, 500);
  };

  //输入框清空
  const clear = (e) => {
    setSeachValue("");
    getCategoryData();
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
      title: "类别编号",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "类别标题",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
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
          placeholder="请根据类别标题查找信息"
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
        <Button
          type="primary"
          style={{ marginLeft: "10px" }}
          onClick={showAddDrawer.bind(this)}
        >
          添加信息
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={CategoryData}
        rowKey={(item) => item.id}
      />
      <Drawer title="添加类别信息" onClose={onAddClose} open={addVisible}>
        <Form
          ref={addFormRef}
          onFinish={addCategory}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="title"
            label="类别标题"
            rules={[{ required: true, message: "请输入类别标题" }]}
          >
            <Input placeholder="请输入" id="title" title="输入2-6位中文汉字" />
          </Form.Item>

          <Button onClick={onAddClose.bind(this)}>取消</Button>
          <Button htmlType="submit" type="primary">
            完成
          </Button>
        </Form>
      </Drawer>
      <Drawer title="修改类别信息" onClose={onEditClose} open={editaddVisible}>
        <Form
          ref={editFormRef}
          onFinish={updateData}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="title"
            label="类别标题"
            rules={[{ required: true, message: "请输入类别标题" }]}
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

import React, { useState, useEffect, useRef } from "react";
import {
  getAuthList,
  delAuthData,
  updateAuthData,
  addAuthData,
  getList,
} from "../../../api/asyncVersion/auth";
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

export default function AuthList() {
  const [AuthData, setAuthData] = useState([]);

  const [addVisible, setaddVisible] = useState(false);
  const [editaddVisible, seteditAddVisible] = useState(false);
  const [seachValue, setSeachValue] = useState("");

  const [rowid, setRowid] = useState(null);
  let formRef1 = useRef();
  let formRef = useRef();
  useEffect(() => {
    getAuthData();
    getListData();
  }, []);

  //请求权限数据

  const getAuthData = async () => {
    let res = await getAuthList();
    setAuthData(res);
    console.log("res111111111111", res);
  };
  //通过权限查查关联的权限  _embed为向下关联，（仅为示例）
  const getListData = async () => {
    let res = await getList("?_embed=articles");
    console.log("通过权限表关联文章表数据", res);
  };

  //权限数据添加
  const addAuth = async () => {
    const data = {
      title: "首页1",
      key: "/home",
      pagepermisson: 1,
      grade: 1,
    };
    let res = await addAuthData(data);
    console.log("权限数据更新", res);
    getAuthData();
    setaddVisible(false);
    formRef.current.resetFields(); //修改成功后清空输入框中的数据

    console.log("res", res);
  };

  //权限数据删除
  const deleteData = async (data) => {
    console.log("data", data);
    let res = await delAuthData(data.id);
    getAuthData();
    console.log("权限数据删除", res);
  };

  //权限数据更新
  const updateData = async (data) => {
    let res = await updateAuthData(rowid, { title: data.title });
    console.log("权限数据更新", res);

    getAuthData();
    seteditAddVisible(false);
    formRef1.current.resetFields(); //修改成功后清空输入框中的数据
  };

  //新增、修改数据时提交失败时的提示信息
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("按照格式要求输入");
  };
  //显示新增信息抽屉
  const showDrawer = () => {
    setaddVisible(true);
  };

  const updateState = (e) => {
    setSeachValue(e.target.value.trim());
  }; //即时更新，不加这个就不会更新输入框内容

  //实现按照权限名称查询数据
  const queryfn = () => {
    clearTimeout(window.timer); //防抖查询
    window.timer = setTimeout(() => {
      //搜索框输入值，就按搜索查
      if (seachValue.length > 0) {
        let data = AuthData.filter((r) => r.title === seachValue);
        if (data.length !== 0) {
          setAuthData(data);
        } else {
          setAuthData([]);
        }
      } else {
        //搜索框没输入值，就查全部
        getAuthData();
      }
    }, 500);
  };

  //输入框清空
  const clear = (e) => {
    setSeachValue("");
    getAuthData();
  };

  //显示修改信息抽屉
  const showDrawer1 = (r) => {
    seteditAddVisible(true);
    setRowid(r.id);
    //设置 0 毫秒延迟回显数据
    setTimeout(() => {
      formRef1.current.setFieldsValue(r);
    }, 0);
  };

  //关闭修改信息对话框
  const onClose1 = () => {
    seteditAddVisible(false);
    message.error("取消操作");
  };

  //关闭新增信息对话框
  const onClose = () => {
    setaddVisible(false);

    message.error("取消操作");
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <b>{id}</b>,
    },
    {
      title: "权限名称",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "权限路径·",
      dataIndex: "key",
      key: "key",
      render: (key) => <Tag color="#1DA57A">{key}</Tag>,
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={showDrawer1.bind(this, record)}>修改</a>
          <Popconfirm
            title="确定要删除吗?"
            onConfirm={deleteData.bind(this, record)}
            onCancel={onClose.bind(this)}
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
          placeholder="请根据权限名称查找权限信息"
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
          onClick={showDrawer.bind(this)}
        >
          添加权限
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={AuthData}
        pagination={{
          pageSize: 10,
        }}
      />
      <Drawer title="添加权限信息" onClose={onClose} open={addVisible}>
        <Form
          ref={formRef}
          onFinish={addAuth}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="Authname"
            label="权限名称"
            rules={[{ required: true, message: "请输入权限名称" }]}
          >
            <Input placeholder="请输入" id="title" title="输入2-6位中文汉字" />
          </Form.Item>

          <Button onClick={onClose.bind(this)}>取消</Button>
          <Button htmlType="submit" type="primary">
            完成
          </Button>
        </Form>
      </Drawer>
      <Drawer title="修改权限信息" onClose={onClose1} open={editaddVisible}>
        <Form
          ref={formRef1}
          onFinish={updateData}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="Authname"
            label="权限名称"
            rules={[{ required: true, message: "请输入权限名称" }]}
          >
            <Input
              placeholder="请输入"
              id="Authname"
              title="输入2-6位中文汉字"
            />
          </Form.Item>

          <Button onClick={onClose1.bind(this)}>取消</Button>
          <Button htmlType="submit" type="primary">
            完成
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}

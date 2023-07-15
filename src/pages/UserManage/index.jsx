import React, { useState, useEffect, useRef } from "react";
import {
  getUserList,
  delUserData,
  updateUserData,
  addUserData,
  getList,
} from "../../api/asyncVersion/user";
import { getRoleList } from "../../api/asyncVersion/role";
import UserForm from "../../components/User/UserForm";

import {
  Space,
  Table,
  Popconfirm,
  Button,
  Input,
  Form,
  Drawer,
  message,
  Switch,
  Radio,
  Select,
} from "antd";

export default function UserManage() {
  const [UserData, setUserData] = useState([]);
  const [userInfo, setuserInfo] = useState({});
  const [roleData, setRoleData] = useState([]); //角色数据

  const [addVisible, setaddVisible] = useState(false);
  const [editaddVisible, seteditAddVisible] = useState(false);
  const [seachValue, setSeachValue] = useState("");

  const [rowid, setRowid] = useState(null);
  let formRef1 = useRef();
  let formRef = useRef();
  useEffect(() => {
    getRoleData();
    getUserArticlesData();
  }, []);

  //请求用户数据

  // const getUserData = async () => {
  //   let res = await getUserList();
  //   setUserData(res);
  //   console.log("res111111111111", res);
  // };
  // //通过用户查关联的文章数据  _embed为向下关联，（仅为示例）
  // const getUserArticlesData = async () => {
  //   let res = await getList("?_embed=articles");
  //   console.log("通过用户表关联文章表数据", res);
  // };

  // };
  //通过用户查关联的角色信息
  const getUserArticlesData = async () => {
    let res = await getList("?_expand=role");
    console.log("通过用户查关联的角色信息", res);
    setUserData(res);
  };
  //请求角色数据
  // value: "jack",
  // label: "Jack",
  const getRoleData = async () => {
    let res = await getRoleList();

    res.map((item) => {
      item.value = item.id;
      item.label = item.roleName;
      return item;
    });

    setRoleData(res);
    console.log("res111111111111", res);
  };

  //用户数据添加
  const addUser = async () => {
    console.log("userInfo", userInfo);
    //   const data = {
    //     username: `王小虎`,
    //     age: 39,
    //     sex: 1,
    //   };
    //   let res = await addUserData(data);
    //   console.log("用户数据更新", res);
    //   getUserArticlesData();
    //   setaddVisible(false);
    //   formRef.current.resetFields(); //修改成功后清空输入框中的数据

    //   console.log("res", res);
  };

  //用户数据删除
  const deleteData = async (data) => {
    console.log("data", data);
    let res = await delUserData(data.id);
    getUserArticlesData();
    console.log("用户数据删除", res);
  };

  //用户数据更新
  const updateData = async (data) => {
    let res = await updateUserData(rowid, { username: data.username });
    console.log("用户数据更新", res);

    getUserArticlesData();
    seteditAddVisible(false);
    formRef1.current.resetFields(); //修改成功后清空输入框中的数据
  };
  //新增信息时的Input输入框事件
  const handleChange = (e) => {
    setuserInfo({
      [e.target.id]: e.target.value,
    });
  };
  //修改信息时的Input输入框事件
  const handleChange1 = (e) => {
    setuserInfo({
      [e.target.id]: e.target.value,
    });
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
    setSeachValue(e.target.value);
  }; //即时更新，不加这个就不会更新输入框内容

  //实现按照姓名查询数据
  const queryfn = () => {
    clearTimeout(window.timer); //防抖查询
    window.timer = setTimeout(() => {
      //搜索框输入值，就按搜索查
      if (seachValue.length > 0) {
        let data = UserData.filter((r) => r.username === seachValue);
        if (data.length !== 0) {
          setUserData(data);
        } else {
          setUserData([]);
        }
      } else {
        //搜索框没输入值，就查全部
        getUserArticlesData();
      }
    }, 500);
  };

  //输入框清空
  const clear = (e) => {
    setSeachValue("");
    getUserArticlesData();
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
  const SelectChange = (value) => {
    console.log("value :>> ", value);
  };

  //关闭新增信息对话框
  const onClose = () => {
    setaddVisible(false);

    message.error("取消操作");
  };
  const columns = [
    {
      title: "姓名",
      dataIndex: "username",
      key: "username",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "角色",
      dataIndex: "role",
      key: "role",
      render: (role) => <a>{role.roleName}</a>,
    },
    {
      title: "用户状态",
      dataIndex: "roleState",
      key: "roleState",
      render: (roleState, item) => (
        <Switch checked={roleState} disabled={item.default}></Switch>
      ),
    },
    {
      title: "性别",
      dataIndex: "sex",
      key: "sex",
      render: (_, { sex }) => <>{sex === 0 ? "女" : "男"}</>,
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={showDrawer1.bind(this, record)}
            disabled={record.default}
          >
            修改
          </Button>
          <Popconfirm
            title="确定要删除吗?"
            onConfirm={deleteData.bind(this, record)}
            onCancel={onClose.bind(this)}
            okText="确定"
            cancelText="取消"
          >
            <Button
              type="link"
              style={{ color: "#fa8c16" }}
              onClick={showDrawer1.bind(this, record)}
              disabled={record.default}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Input
          placeholder="请根据姓名查找用户信息"
          style={{ marginLeft: "10px", width: "20%" }}
          value={userInfo.seachValue}
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
          添加用户
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={UserData}
        rowKey={(item) => item.id}
      />
      <Drawer title="添加用户信息" onClose={onClose} open={addVisible}>
        <UserForm
          userInfo={userInfo}
          roleData={roleData}
          formRef={formRef}
          addUser={addUser}
          onFinishFailed={onFinishFailed}
          handleChange={handleChange}
          onClose={onClose}
          SelectChange={SelectChange}
        />
      </Drawer>
      <Drawer title="修改用户信息" onClose={onClose1} open={editaddVisible}>
        <UserForm
          userInfo={userInfo}
          roleData={roleData}
          formRef={formRef}
          addUser={addUser}
          onFinishFailed={onFinishFailed}
          handleChange={handleChange}
          onClose={onClose}
          SelectChange={SelectChange}
        />
        {/* <Form
          ref={formRef1}
          onFinish={updateData}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            label="姓名"
            rules={[{ required: true, message: "请输入姓名" }]}
          >
            <Input
              placeholder="请输入"
              id="username"
              value={userInfo.username}
              onChange={handleChange1}
              title="输入2-6位中文汉字"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: "请输入您的密码" }]}
          >
            <Input
              placeholder="请输入您的密码"
              id="password"
              value={userInfo.password}
              onChange={handleChange1}
            />
          </Form.Item>
          <Form.Item
            name="sex"
            label="性别"
            rules={[{ required: true, message: "请输入您的性别" }]}
          >
            <Input
              placeholder="请输入您的性别"
              id="sex"
              value={userInfo.sex}
              onChange={handleChange1}
              pattern="^[男|女]{1}$"
              title="输入男或女"
            />
          </Form.Item>
          <Form.Item
            name="age"
            label="年龄"
            rules={[{ required: true, message: "请输入您的年龄" }]}
          >
            <Input
              placeholder="请输入您的年龄"
              id="age"
              value={userInfo.age}
              onChange={handleChange1}
              pattern="^(?:[1-9][0-9]?|1[01][0-9]|120)$"
              title="输入1-120之间的数字"
            />
          </Form.Item>
          <Form.Item
            name="address"
            label="住址"
            rules={[{ required: true, message: "请输入您的住址" }]}
          >
            <Input
              placeholder="请输入您的住址"
              id="address"
              value={userInfo.address}
              onChange={handleChange1}
              pattern="[\u4e00-\u9fa5]{1,100}$"
              title="输入有效中文汉字"
            />
          </Form.Item>
          <Form.Item
            name="phone"
            label="电话"
            rules={[{ required: true, message: "请输入您的电话" }]}
          >
            <Input
              placeholder="请输入11位电话"
              id="phone"
              value={userInfo.phone}
              onChange={handleChange1}
              pattern="^1[0-9]{10}$"
              title="输入1开头的11位有效手机号"
            />
          </Form.Item>

          <Button onClick={onClose1.bind(this)}>取消</Button>
          <Button htmlType="submit" type="primary">
            完成
          </Button>
        </Form> */}
      </Drawer>
    </div>
  );
}

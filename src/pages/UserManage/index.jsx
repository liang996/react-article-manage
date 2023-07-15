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
  const [userData, setUserData] = useState([]);
  const [roleData, setRoleData] = useState([]); //角色数据
  const [isUpData, setIsUpData] = useState(false);

  const [addVisible, setAddVisible] = useState(false);
  const [editaddVisible, setEditAddVisible] = useState(false);
  const [seachValue, setSeachValue] = useState("");

  const [rowid, setRowid] = useState(null);
  let formRef1 = useRef();
  let formRef = useRef();
  useEffect(() => {
    getRoleData();
    getUserArticlesData();
  }, []);

  //通过用户查关联的角色信息
  const getUserArticlesData = async () => {
    let res = await getList("?_expand=role");
    setUserData(res);
  };
  //请求角色数据

  const getRoleData = async () => {
    let res = await getRoleList();

    res.map((item) => {
      item.value = item.id;
      item.label = item.roleName;
      return item;
    });

    setRoleData(res);
  };

  //用户数据添加
  const addUser = () => {
    formRef.current.validateFields().then(async (res) => {
      let addData = await addUserData({
        ...res,
        roleState: true,
        default: false,
      });
      //console.log("addaccse", addData);
      //清空输入框
      formRef.current.resetFields();
      //   setUserData([...userData, {
      //     ...addData,
      //     //给users添加上role中对应的属性
      //     role: roleData.filter(data => res.roleId === data.id)[0]
      // }]);
      getUserArticlesData();

      // setUserData([...userData]);
      setAddVisible(false);
    });
  };

  //用户数据删除
  const deleteData = async (data) => {
    await delUserData(data.id);
    //删除完成重新查数据
    getUserArticlesData();
    // setUserData(userData.filter(item => data.id !== item.id))
  };

  //用户数据更新
  const updateUser = async (data) => {
    await updateUserData(rowid, {
      ...data,
      roleState: true,
      default: false,
    });
    getUserArticlesData();
    setEditAddVisible(false);
    formRef1.current.resetFields(); //修改成功后清空输入框中的数据
  };

  //新增、修改数据时提交失败时的提示信息
  const onFinishFailed = (errorInfo) => {
    message.error("按照格式要求输入");
  };
  //显示新增信息抽屉
  const showAddDrawer = () => {
    setTimeout(() => {
      setIsUpData(false);
      setAddVisible(true);
      formRef.current.resetFields();
    }, 0);
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
        let data = userData.filter((r) => r.username === seachValue);
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
  const showEditDrawer = (r) => {
    setEditAddVisible(true);
    setIsUpData(true);

    setRowid(r.id);
    //设置 0 毫秒延迟回显数据
    setTimeout(() => {
      formRef1.current.setFieldsValue(r);
    }, 0);
  };

  //关闭修改信息对话框
  const onEditClose = () => {
    setEditAddVisible(false);
  };
  const SelectChange = (value) => {
    //console.log("value :>> ", value);
  };

  //关闭新增信息对话框
  const onAddClose = () => {
    setAddVisible(false);
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
            onClick={showEditDrawer.bind(this, record)}
            disabled={record.default}
          >
            修改
          </Button>
          <Popconfirm
            title="确定要删除吗?"
            onConfirm={deleteData.bind(this, record)}
            onCancel={onAddClose.bind(this)}
            okText="确定"
            cancelText="取消"
          >
            <Button
              type="link"
              style={{ color: "#fa8c16" }}
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
          添加用户
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={userData}
        rowKey={(item) => item.id}
      />

      <Drawer
        title={isUpData ? "更新用户信息" : "添加用户信息"}
        onClose={isUpData ? onEditClose : onAddClose}
        open={isUpData ? editaddVisible : addVisible}
      >
        <UserForm
          roleData={roleData}
          ref={isUpData ? formRef1 : formRef}
          onFinish={isUpData ? updateUser : addUser}
          onFinishFailed={onFinishFailed}
          onClose={isUpData ? onEditClose : onAddClose}
          SelectChange={SelectChange}
        />
      </Drawer>
    </div>
  );
}

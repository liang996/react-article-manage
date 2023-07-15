import React, { useState, useEffect, useRef } from "react";
import {
  getRoleList,
  delRoleData,
  updateRoleData,
  addRoleData,
  geMenutList,
} from "../../../api/asyncVersion/role";
import {
  Space,
  Table,
  Popconfirm,
  Button,
  Input,
  Form,
  Drawer,
  message,
  Modal,
  Tree,
} from "antd";

export default function RoleList() {
  const [roleData, setRoleData] = useState([]);
  const [MenuData, setMenuData] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [addVisible, setaddVisible] = useState(false);
  const [editaddVisible, seteditAddVisible] = useState(false);
  const [seachValue, setSeachValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [rowid, setRowid] = useState(null);
  let formRef1 = useRef();
  let formRef = useRef();
  useEffect(() => {
    getRoleData();
    getMenuData();
  }, []);

  //请求菜单数据
  const getMenuData = async () => {
    let res = await geMenutList("?_embed=children");
    console.log("res", res);
    res.map((item) => {
      item.title = item.label;
      if (item.children.length > 0) {
        item.children.forEach((items) => (items.title = items.label));
      }
      return item;
    });

    setMenuData(res);
  };
  //请求角色数据

  const getRoleData = async () => {
    let res = await getRoleList();

    setRoleData(res);
    console.log("res111111111111", res);
  };

  //角色数据添加
  const addRole = async () => {
    const data = {
      roleName: `王小虎`,
      age: 39,
      sex: 1,
    };
    let res = await addRoleData(data);
    console.log("角色数据更新", res);
    getRoleData();
    setaddVisible(false);
    formRef.current.resetFields(); //修改成功后清空输入框中的数据

    console.log("res", res);
  };

  //角色数据删除

  const deleteData = async (data) => {
    let res = await delRoleData(data.id);
    setRoleData(roleData.filter((r) => r.id !== data.id));
    getRoleData();
    // getRoleData();
    //   console.log("角色数据删除", res);
  };
  //角色数据更新
  const updateData = async (data) => {
    let res = await updateRoleData(rowid, { roleName: data.roleName });
    console.log("角色数据更新", res);

    getRoleData();
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
    setSeachValue(e.target.value);
  }; //即时更新，不加这个就不会更新输入框内容

  //实现按照角色名称查询数据
  const queryfn = () => {
    clearTimeout(window.timer); //防抖查询
    window.timer = setTimeout(() => {
      //搜索框输入值，就按搜索查
      if (seachValue.length > 0) {
        let data = roleData.filter((r) => r.roleName === seachValue);
        if (data.length !== 0) {
          setRoleData(data);
        } else {
          setRoleData([]);
        }
      } else {
        //搜索框没输入值，就查全部
        getRoleData();
      }
    }, 500);
  };

  //输入框清空
  const clear = (e) => {
    setSeachValue("");
    getRoleData();
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
  //显示Modal
  const showModal = (data) => {
    console.log("显示Modal", data);
    setIsModalOpen(true);
    setCheckedKeys(data);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  //关闭Modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onSelect = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };
  const onCheck = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
    setCheckedKeys(checkedKeys);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
      key: "roleName",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={showDrawer1.bind(this, record)}>
            修改
          </Button>

          <Popconfirm
            title="确定要删除吗?"
            onConfirm={deleteData.bind(this, record)}
            onCancel={onClose.bind(this)}
            okText="确定"
            cancelText="取消"
          >
            <a style={{ color: "#fa8c16" }}>删除</a>
          </Popconfirm>

          <Button
            type="link"
            style={{ color: "green" }}
            onClick={() => showModal(record.rights)}
          >
            目录列表
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Input
          placeholder="请根据角色名称查找角色信息"
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
          添加角色
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={roleData}
        rowKey={(item) => item.id}
      />
      <Drawer title="添加角色信息" onClose={onClose} open={addVisible}>
        <Form
          ref={formRef}
          onFinish={addRole}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="roleName"
            label="角色名称"
            rules={[{ required: true, message: "请输入角色名称" }]}
          >
            <Input placeholder="请输入" id="title" title="输入2-6位中文汉字" />
          </Form.Item>

          <Button onClick={onClose.bind(this)}>取消</Button>
          <Button htmlType="submit" type="primary">
            完成
          </Button>
        </Form>
      </Drawer>
      <Drawer title="修改角色信息" onClose={onClose1} open={editaddVisible}>
        <Form
          ref={formRef1}
          onFinish={updateData}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="roleName"
            label="角色名称"
            rules={[{ required: true, message: "请输入角色名称" }]}
          >
            <Input
              placeholder="请输入"
              id="roleName"
              title="输入2-6位中文汉字"
            />
          </Form.Item>

          <Button onClick={onClose1.bind(this)}>取消</Button>
          <Button htmlType="submit" type="primary">
            完成
          </Button>
        </Form>
      </Drawer>

      <Modal
        title="权限分配"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Tree
          checkable
          onSelect={onSelect}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          checkStrictly={true}
          treeData={MenuData}
        />
      </Modal>
    </div>
  );
}

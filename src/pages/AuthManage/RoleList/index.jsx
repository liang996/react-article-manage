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
  const [roleData, setRoleData] = useState([]); //角色数据
  const [menuData, setMenuData] = useState([]); //目录数据
  const [checkedKeys, setCheckedKeys] = useState([]); //选择的key
  const [checkedId, setCheckedId] = useState([]);

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
  };

  //角色数据添加
  const addRole = async () => {
    const data = {
      roleName: `王小虎`,
      age: 39,
      sex: 1,
    };
await addRoleData(data);
    getRoleData();
    setaddVisible(false);
    formRef.current.resetFields(); //修改成功后清空输入框中的数据

  };

  //角色数据删除

  const deleteData = async (data) => {
    let res = await delRoleData(data.id);
    setRoleData(roleData.filter((r) => r.id !== data.id));
    getRoleData();
    // getRoleData();
  };
  //角色数据更新
  const updateData = async (data) => {
 await updateRoleData(rowid, { roleName: data.roleName });

    getRoleData();
    seteditAddVisible(false);
    formRef1.current.resetFields(); //修改成功后清空输入框中的数据
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
  const showEditDrawer = (r) => {
    seteditAddVisible(true);
    setRowid(r.id);
    //设置 0 毫秒延迟回显数据
    setTimeout(() => {
      formRef1.current.setFieldsValue(r);
    }, 0);
  };

  //关闭修改信息对话框
  const onEditClose = () => {
    seteditAddVisible(false);
    message.error("取消操作");
  };
  const onSelect = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };
  //关闭新增信息对话框
  const onClose = () => {
    setaddVisible(false);

    message.error("取消操作");
  };
  //显示Modal
  const showModal = (data,id) => {
    setIsModalOpen(true);
    setCheckedKeys(data);
    setCheckedId(id);

  };
  const handleOk =async () => {
    setIsModalOpen(false);
    //同步menuData

    setRoleData(
      roleData.map((item) => {
        if (item.id === checkedId) {
          return {
            ...item,
            rights: checkedKeys,
          };
        }
        return item;
      })
    );

 await updateRoleData(checkedId, {  rights: checkedKeys,});

  };
  //关闭Modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onCheck = (checkedKeys, info) => {
    setCheckedKeys(checkedKeys.checked);
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
          <Button type="link" onClick={showEditDrawer.bind(this, record)}>
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
            onClick={() => showModal(record.rights,record.id)}
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
        {/* <Button
          type="primary"
          style={{ marginLeft: "10px" }}
          onClick={showAddDrawer.bind(this)}
        >
          添加角色
        </Button> */}
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
      <Drawer title="修改角色信息" onClose={onEditClose} open={editaddVisible}>
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

          <Button onClick={onEditClose.bind(this)}>取消</Button>
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
          treeData={menuData}
        />
      </Modal>
    </div>
  );
}

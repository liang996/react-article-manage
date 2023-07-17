import React, { forwardRef } from "react";

import { Button, Input, Form, Radio, Select } from "antd";
const { Option } = Select;

const UserForm = forwardRef((props, ref) => {
  const {
    roleData,
    onFinish,
    onFinishFailed,
    onClose,
    isUpData,
    SelectChange,
    saveCurrentUser
  } = props;
  console.log("props", props);

  const decisionRoleDisabled = (item) => {
    console.log("saveCurrentUser", saveCurrentUser);

    if (isUpData) {
      if (saveCurrentUser?.roleId * 1 === 1) {
        return false;
      } else {
        return true;
      }
    } else {
      if (saveCurrentUser?.roleId * 1 === 1) {
        return false;
      } else {
        return item.roleType !== 3;
      }
    }
  };
  return (
    <Form
      ref={ref}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="username"
        label="姓名"
        rules={[{ required: true, message: "请输入姓名" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        rules={[{ required: true, message: "请输入您的密码" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="sex"
        label="性别"
        rules={[{ required: true, message: "请输入您的性别" }]}
      >
        <Radio.Group>
          <Radio value={1}> 男 </Radio>
          <Radio value={0}> 女 </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="age"
        label="年龄"
        rules={[{ required: true, message: "请输入您的年龄" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="address"
        label="住址"
        rules={[{ required: true, message: "请输入您的住址" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="电话"
        rules={[{ required: true, message: "请输入您的电话" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="roleId"
        label="角色"
        rules={[{ required: true, message: "请选择" }]}
      >
        <Select onChange={SelectChange}>
          {roleData.map((item) => (
            <Option
              disabled={decisionRoleDisabled(item)}
              key={item.id}
              value={item.id}
            >
              {item.roleName}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Button onClick={onClose.bind(this)}>取消</Button>
      <Button htmlType="submit" type="primary">
        完成
      </Button>
    </Form>
  );
});

export default UserForm;

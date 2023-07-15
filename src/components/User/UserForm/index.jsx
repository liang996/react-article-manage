import React from 'react'
import {

    Button,
    Input,
    Form,
    Radio,
    Select
  } from "antd"
export default function UserForm(props) {
   const {userInfo,roleData,formRef,addUser,onFinishFailed,handleChange,onClose,SelectChange}=props
  return (
    <Form
    ref={formRef}
    onFinish={addUser}
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
        onChange={handleChange}
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
        onChange={handleChange}
      />
    </Form.Item>
    <Form.Item
      name="sex"
      label="性别"
      rules={[{ required: true, message: "请输入您的性别" }]}
    >
      <Radio.Group>
        <Radio value="apple"> Apple </Radio>
        <Radio value="pear"> Pear </Radio>
      </Radio.Group>
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
        onChange={handleChange}
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
        onChange={handleChange}
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
        onChange={handleChange}
        pattern="^1[0-9]{10}$"
        title="输入1开头的11位有效手机号"
      />
    </Form.Item>
    <Form.Item
      name="roleName"
      label="角色"
      rules={[{ required: true, message: "请选择" }]}
    >
      <Select
        onChange={SelectChange}
        options={roleData}
      />
    </Form.Item>

    <Button onClick={onClose.bind(this)}>取消</Button>
    <Button htmlType="submit" type="primary">
      完成
    </Button>
  </Form>
  )
}

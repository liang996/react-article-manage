import React, { useState, useEffect, useRef } from "react";
import {
  getArticleList,
  delArticleData,
  udateArticleData,
  addArticleData
} from "../../../api/asyncVersion/article";
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
import axios from "axios";

export default function ArticleList() {
  const [articleData, setArticleData] = useState([]);

  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [seachValue, setSeachValue] = useState("");

  const [rowid, setRowid] = useState(null);
  let formRef1 = useRef();
  let formRef = useRef();
  useEffect(() => {
    getArticleData();
  }, []);

  //请求文章数据

  const getArticleData = async () => {
    let res = await getArticleList();
    setArticleData(res);
    console.log("res111111111111", res);
  };
//json-serevr高级用法（表关联查询）：_embed ,如用户表关联了文章表
// articles：文章表
// let res = await getArticleList("?_embed=articles");

  //文章数据添加
  const addArticle = async () => {

    const data = {
      title: `中国载人登月初步方案公布${+new Date()}`,
      author: "g帆帆",
      describe: "",
    };
    let res = await addArticleData(data);
    console.log("文章数据更新", res);
    getArticleData();
    setVisible(false);
    formRef.current.resetFields() //修改成功后清空输入框中的数据

    console.log("res", res);
  };

  //文章数据删除
  const deleteData = async (data) => {
    console.log("data", data);
    let res = await delArticleData(data.id);
    getArticleData();
    console.log("文章数据删除", res);
  };

  //文章数据更新
  const updateData = async (data) => {
    let res = await udateArticleData(rowid,{title:data.title});
    console.log("文章数据更新", res);

    getArticleData();
    setVisible1(false);
 formRef1.current.resetFields() //修改成功后清空输入框中的数据


  }
    

  //新增、修改数据时提交失败时的提示信息
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("按照格式要求输入");
  };
  //显示新增信息抽屉
  const showDrawer = () => {
    setVisible(true);
  };

  const  updateState = (e) => {
    setSeachValue(e.target.value )
  } //即时更新，不加这个就不会更新输入框内容
  
  

  //实现按照姓名查询数据
  const queryfn = () => {


    clearTimeout(window.timer); //防抖查询
    window.timer = setTimeout(() => {
      let data = articleData.filter((r) => r.title === seachValue);
      if (data.length !== 0) {
        setArticleData(data);
      }else{
        setArticleData([]);

      }
    }, 500);
  };

    //输入框清空
  const clear = (e) => {
    setSeachValue("")
    getArticleData();

  };


  //显示修改信息抽屉
  const showDrawer1 = (r) => {
    setVisible1(true);
    setRowid(r.id);
    //设置 0 毫秒延迟回显数据
    setTimeout(() => {
      formRef1.current.setFieldsValue(r);
    }, 0);
  };

  //关闭修改信息对话框
  const onClose1 = () => {
    setVisible1(false);
    message.error("取消操作");
  };

  //关闭新增信息对话框
  const onClose = () => {
    setVisible(false);

    message.error("取消操作");
  };
  const columns = [
    {
      title: "文章标题",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "文章作者",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "文章描述",
      dataIndex: "describe",
      key: "describe",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* <a>添加</a> */}
          <Popconfirm
            title="确定要删除吗?"
            onConfirm={deleteData.bind(this, record)}
            onCancel={onClose.bind(this)}
            okText="确定"
            cancelText="取消"
          >
            <a style={{ color: "#fa8c16" }}>删除</a>
          </Popconfirm>

          <a onClick={showDrawer1.bind(this, record)}>修改</a>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Button type="primary" onClick={showDrawer.bind(this)}>
        添加信息
      </Button>
      <Input
        placeholder="请根据文章标题查找信息"
        style={{ marginLeft: "10px", width: "20%" }}
        value={seachValue} onChange={updateState} 
      />
          <Button  onClick={clear} >重置</Button>

      <Button type="primary" onClick={queryfn}>
       查询
      </Button>
      <Table columns={columns} dataSource={articleData} />
      <Drawer title="添加文章信息" onClose={onClose} visible={visible}>
        <Form
          ref={formRef}
          onFinish={addArticle}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="title"
            label="文章标题"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input
              placeholder="请输入"
              id="title"
              title="输入2-6位中文汉字"
            />
          </Form.Item>

          <Button onClick={onClose.bind(this)}>取消</Button>
          <Button htmlType="submit" type="primary">
            完成
          </Button>
        </Form>
      </Drawer>
      <Drawer title="修改文章信息" onClose={onClose1} visible={visible1}>
        <Form
          ref={formRef1}
          onFinish={updateData}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="title"
            label="文章标题"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input
              placeholder="请输入"
              id="title"
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

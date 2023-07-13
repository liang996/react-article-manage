import React, { useState, useEffect, useRef } from "react";
import {
  getArticleList,
  delArticleData,
  udateArticleData,
  addArticleData,
  getList,
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
import { nanoid } from "nanoid";

export default function ArticleList() {
  const [articleData, setArticleData] = useState([]);

  const [addVisible, setaddVisible] = useState(false);
  const [editaddVisible, seteditAddVisible] = useState(false);
  const [seachValue, setSeachValue] = useState("");

  const [rowid, setRowid] = useState(null);
  let formRef1 = useRef();
  let formRef = useRef();
  useEffect(() => {
    getArticleData();
    getListData();
  }, []);

  //请求文章数据

  const getArticleData = async () => {
    let res = await getArticleList();
    setArticleData(res);
    console.log("res111111111111", res);
  };
  //通过文章查查关联的用户  _embed为向下关联，（仅为示例）
  // const getListData = async () => {
  //   //json-serevr高级用法（表关联查询）：_embed ,如通过用户表关联文章表数据
  //   //articles：文章表
  //   // let res = await getArticleList();
  //   let res = await getList("?_embed=articles");
  //   console.log("通过用户表关联文章表数据", res);
  // };

  //通过文章查查关联的用户 _expand为向上关联，（仅为示例）
  const getListData = async () => {
    //json-serevr高级用法（表关联查询）：_expand ,如通过文章表获取用户表数据
    // users：用户表 使用_expand为向上关联得用user
    let res = await getList("?_expand=user");
    console.log("通过文章查查关联的用户", res);
  };
  //文章数据添加
  const addArticle = async () => {
    const data = {
      title: `中国载人登月初步方案公布${+new Date()}`,
      author: "姜帆",
      describe: nanoid(),
    };
    let res = await addArticleData(data);
    console.log("文章数据更新", res);
    getArticleData();
    setaddVisible(false);
    formRef.current.resetFields(); //修改成功后清空输入框中的数据

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
    let res = await udateArticleData(rowid, { title: data.title });
    console.log("文章数据更新", res);

    getArticleData();
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

  //实现按照姓名查询数据
  const queryfn = () => {
    clearTimeout(window.timer); //防抖查询
    window.timer = setTimeout(() => {
      //搜索框输入值，就按搜索查
      if (seachValue.length > 0) {
        let data = articleData.filter((r) => r.title === seachValue);
        if (data.length !== 0) {
          setArticleData(data);
        } else {
          setArticleData([]);
        }
      } else {
        //搜索框没输入值，就查全部
        getArticleData();
      }
    }, 500);
  };

  //输入框清空
  const clear = (e) => {
    setSeachValue("");
    getArticleData();
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
          placeholder="请根据文章标题查找信息"
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
          添加信息
        </Button>
      </div>
      <Table columns={columns} dataSource={articleData} />
      <Drawer title="添加文章信息" onClose={onClose} open={addVisible}>
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
            <Input placeholder="请输入" id="title" title="输入2-6位中文汉字" />
          </Form.Item>

          <Button onClick={onClose.bind(this)}>取消</Button>
          <Button htmlType="submit" type="primary">
            完成
          </Button>
        </Form>
      </Drawer>
      <Drawer title="修改文章信息" onClose={onClose1} open={editaddVisible}>
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
            <Input placeholder="请输入" id="title" title="输入2-6位中文汉字" />
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

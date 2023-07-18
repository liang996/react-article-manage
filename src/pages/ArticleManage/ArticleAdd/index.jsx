import React, { Fragment, useState, useRef, useEffect } from "react";
import { PageHeader, Steps, Button, Form, Input, Select, message,notification } from "antd";
import ArticleEditor from "../../../components/ArticleEditor";
import { getCategoryList } from "../../../api/asyncVersion/category";
import { addArticleData } from "../../../api/asyncVersion/article";

import style from "./index.module.css";
const { Option } = Select;
export default function ArticleAdd(props) {
  //当前用户信息
  let currentUser = JSON.parse(localStorage.getItem("userInfoData"));

  const [current, setCurrent] = useState(0);
  const articleRef = useRef(null);
  //编辑文章的状态
  const [categories, setCategories] = useState([]);
  const [formMsg, setFormMsg] = useState({});
  //文本框的数据
  const [describe, setDescribe] = useState("");
  useEffect(() => {
    getCategoryData();
  }, []);
  //请求类别数据

  const getCategoryData = async () => {
    let res = await getCategoryList();
    setCategories(res);
  };

  const nextStep = () => {
    //点击下一步时，如果此时是第0项，则收集表单数据
    if (current === 0) {
      articleRef.current
        .validateFields()
        .then((res) => {
          //console.log(res);
          setFormMsg(res);
          setCurrent(current + 1);
        })
        .catch((error) => {
          //console.log(error);
        });
    } else {
      console.log(formMsg, describe);

      if (describe === "" || describe.trim() === "<p></p>")
        message.error("文章内容不能为空!");
      else setCurrent(current + 1);
    }
  };
  const lastStep = () => {
    setCurrent(current - 1);
  };
  const onValueChange = (value) => {
    setDescribe(value);
  };
  const saveArticleInfo = async (auditState) => {
    let res = await addArticleData({
      ...formMsg,
      userId: currentUser.id,
      author: currentUser.username,
      describe,
      star: 0,
      view: 0,
      roleId: currentUser.roleId,
      createTime: +new Date(),
      publishTime: 0,
      auditState,
      // publishState: 0,
    });
    //
    if(Object.keys(res).length>0){
    notification.info({
      message: "通知",
      description:
          `您可以在${auditState ? "审核列表" : "草稿箱"}中查看您的新闻!`,
      placement: "bottomRight",
  });
  if (auditState)
      props.history.push("/examine-manage/examine/list")
  else
      props.history.push("/article-manage/drafts/list")
}


  };
  return (
    <Fragment>
      <PageHeader className="site-page-header" title="撰写文章" />
      <Steps
        current={1}
        items={[
          {
            title: "基本信息",
            description: "文章标题，文章分类",
          },
          {
            title: "文章内容",
            description: "文章标题，文章分类",
          },
          {
            title: "文章提交",
            description: "保存草稿或提交审核",
          },
        ]}
      />
      {/* 变化部分 */}
      <div
        style={{ marginTop: "70px" }}
        className={current === 0 ? "" : style.hidden}
      >
        {/* 表单 */}
        <Form name="control-hooks" ref={articleRef}>
          <Form.Item
            name="title"
            label="文章标题"
            rules={[{ required: true, message: "标题不能为空!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="文章分类"
            rules={[{ required: true, message: "请选择文章分类!" }]}
          >
            <Select>
              {categories.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </div>
      <div
        style={{ marginTop: "70px" }}
        className={current === 1 ? "" : style.hidden}
      >
        {/* 文本编辑器 */}
        <ArticleEditor onValueChange={onValueChange} value={describe} />
      </div>
      <div
        style={{ marginTop: "70px" }}
        className={current === 2 ? "" : style.hidden}
      ></div>
      <div style={{ marginTop: "50px" }}>
        {current > 0 && (
          <span>
            <Button onClick={lastStep}>上一步</Button>
          </span>
        )}
        {current < 2 && (
          <span>
            <Button type="primary" onClick={nextStep}>
              下一步
            </Button>
          </span>
        )}
        {current === 2 && (
          <span>
            <Button type="primary" onClick={() => saveArticleInfo(0)}>
              保存草稿箱
            </Button>
            <Button danger onClick={() => saveArticleInfo(1)}>
              提交审核
            </Button>
          </span>
        )}
      </div>
    </Fragment>
  );
}

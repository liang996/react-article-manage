import React, { useState, useEffect } from "react";
import { getArticleList } from "../../../api/article";
import { message } from "antd";
import axios from "axios";

export default function ArticleList() {
  const [articleData, setArticleData] = useState([]);

  useEffect(() => {
    getArticleData();
    // addArticle();
    // deleteArticle();
  }, []);

  //请求文章数据
  // const getArticleData = () => {
  //   getArticleList()
  //     .then((res) => {
  //       setArticleData(res.data);
  //     })
  //     .catch(() => {
  //       message.error("获取文章数据失败");
  //     });
  // };
  const getArticleData = async () => {
    let res = await getArticleList();
    console.log("res111111111111", res);
  };
  //文章数据添加
  const addArticle = async () => {
    const url = "http://localhost:8001/articles";

    const data = {
      title: "中国载人登月初步方案公布",
      author: "王帆帆",
      describe: "",
    };
    const { data: res } = await axios({ method: "post", url, data });
    console.log("res", res);
  };
  //文章数据删除

  const id = 21;
  const url = `http://localhost:8001/articles/${id}`;
  const deleteArticle = async () => {
    const res = await axios({ method: "delete", url });
    console.log("res", res);
  };
  console.log("articleData", articleData);
  return <div>文章列表,,,,,,,,,,,,</div>;
}

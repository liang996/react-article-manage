import React, { useState, useEffect } from "react";
import { getArticleList } from "../../../api/article";
import { message } from "antd";

export default function ArticleList() {
  const [articleData, setArticleData] = useState([]);

  useEffect(() => {
    getArticleData();
  }, []);

  //请求文章数据
  const getArticleData = () => {
    getArticleList()
      .then((res) => {
        setArticleData(res.data)
      })
      .catch(() => {
        message.error("获取文章数据失败");
      });
  };
console.log('articleData', articleData)
  return <div>文章列表,,,,,,,,,,,,</div>;
}

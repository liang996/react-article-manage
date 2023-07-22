import React, { useEffect, useState } from "react";
import { PageHeader, Descriptions } from "antd";
import { AUDITSTATE, PUBLISHSTATE, AUDITCOLOR } from "../../utils/common";
import * as dayjs from "dayjs";

import { getArticleInfo } from "../../api/asyncVersion/article";

export default function ArticleInfo(props) {
  const [articleInfo, setArticleInfo] = useState(null);
  useEffect(() => {
    ArticleInfo();
  }, []);
  const ArticleInfo = async () => {
    //props.match.params可以获取url中的参数

    let res = await getArticleInfo(
      `${props.match.params.id}?_expand=category&_expand=role`
    );
    console.log("res :>> ", res);
    setArticleInfo(res);
  };
  return (
    <div>
      {/* 避免组件加载完后，数据还没出来 */}
      {articleInfo && (
        <div>
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={articleInfo.title}
            subTitle={articleInfo.category.title}
          >
            <Descriptions size="small" column={3}>
              <Descriptions.Item label="创建者">
                {articleInfo.author}
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {dayjs(articleInfo.createTime).format("YYYY-MM-DD HH:mm:ss")}
              </Descriptions.Item>
              <Descriptions.Item label="发布时间">
                {articleInfo.publishTime
                  ? dayjs(articleInfo.createTime).format("YYYY-MM-DD HH:mm:ss")
                  : "-"}
              </Descriptions.Item>
              <Descriptions.Item label="用户角色">
                {articleInfo.role.roleName}
              </Descriptions.Item>
              <Descriptions.Item label="审核状态">
                <span style={{ color: AUDITCOLOR[articleInfo.auditState] }}>
                  {AUDITSTATE[articleInfo.auditState]}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="发布状态">
                <span>{PUBLISHSTATE[articleInfo.publishState]}</span>
              </Descriptions.Item>
              <Descriptions.Item label="访问数量">
                <span style={{ color: "green" }}>{articleInfo.view}</span>
              </Descriptions.Item>
              <Descriptions.Item label="点赞数量">
                <span style={{ color: "green" }}>{articleInfo.star}</span>
              </Descriptions.Item>
              <Descriptions.Item label="评论数量">
                <span style={{ color: "green" }}>0</span>
              </Descriptions.Item>
            </Descriptions>
          </PageHeader>
          {/* 让带标签的内容自动转换 */}
          <div
            dangerouslySetInnerHTML={{ __html: articleInfo.describe }}
            style={{ margin: "20px 24px", border: "1px solid #ccc" }}
          ></div>
        </div>
      )}
    </div>
  );
}

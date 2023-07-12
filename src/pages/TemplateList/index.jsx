import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import MenuHeader from "../../components/MenuHeader";
import MenuList from "../../components/MenuList";
import Jokes from "../Jokes/Jokes";
import Weather from "../Weather/Weather";
import Home from "../Home";
import ArticleList from "../ArticleManage/ArticleList";
import AuditingList from "../ArticleManage/AuditingList";
import ReleaseList from "../ArticleManage/ReleaseList";
import ErrorPage from "../../components/ErrorPage/ErrorPage";
import "./index.css";


const { Content } = Layout;

export default function TemplateList() {
  return (
    <Layout>
      <MenuList></MenuList>

      <Layout className="site-layout">
        <MenuHeader></MenuHeader>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/jokes" component={Jokes} />
            <Route path="/weather" component={Weather} />
            <Route path="/weather" component={Weather} />
            <Route
              path="/article-manage/article/list"
              component={ArticleList}
            />
            <Route
              path="/article-manage/auditing/list"
              component={AuditingList}
            />
            <Route
              path="/article-manage/release/list"
              component={ReleaseList}
            />
            {/* //exact:开启精确匹配 */}
            <Redirect from="/" to="/home" exact />
            {/* //如果路由都没有匹配到，则进入 */}
            <Route path="*" component={ErrorPage} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}

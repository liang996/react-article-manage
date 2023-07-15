import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import MenuHeader from "../../components/MenuHeader";
import MenuList from "../../components/MenuList";
import UserManage from "../UserManage";
import Weather from "../Weather/Weather";
import Home from "../Home";
import ArticleList from "../ArticleManage/ArticleList";

import ErrorPage from "../../components/ErrorPage/ErrorPage";
import AuthList from "../AuthManage/AuthList";
import RoleList from "../AuthManage/RoleList";
import ExamineList from "../ExamineManage/ExamineList";
import PublishList from "../PublishManage/PublishList";

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
            overflow:"auto"
          }}
        >
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/user-manage" component={UserManage} />
            <Route path="/weather-manage" component={Weather} />

            <Route
              path="/article-manage/article/list"
              component={ArticleList}
            />
            <Route path="/auth-manage/auth/List" component={AuthList} />
            <Route path="/auth-manage/role/List" component={RoleList} />
            <Route path="/publish-manage/publish/list" component={PublishList} />
            <Route path="/examine-manage/examine/list" component={ExamineList} />
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

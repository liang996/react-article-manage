import React, { useEffect, useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { getMenuSonList, getMenuList } from "../api/asyncVersion/menu";

import UserManage from "../pages/UserManage";
import Weather from "../pages/Weather/Weather";
import Home from "../pages/Home";
import ArticleList from "../pages/ArticleManage/ArticleList";

import ErrorPage from "../components/ErrorPage/ErrorPage";
import AuthList from "../pages/AuthManage/AuthList";
import RoleList from "../pages/AuthManage/RoleList";
import ExamineList from "../pages/ExamineManage/ExamineList";
import PublishList from "../pages/PublishManage/PublishList";
const routerList = {
  "/weather-manage": Weather,
  "/user-manage": UserManage,
  "/article-manage/article/list": ArticleList,
  "/publish-manage/publish/list": PublishList,
  "/examine-manage/examine/list": ExamineList,
  "/auth-manage/auth/List": AuthList,
  "/auth-manage/role/List": RoleList,
  "/home": Home,
};
function RouterHomeMenu() {
  const saveUser = JSON.parse(localStorage.getItem("userInfoData"));

  const [saveRouterList, setSaveRouterList] = useState([]);

  useEffect(() => {
    getMenuData();
  }, []);
  //请求菜单数据
  const getMenuData = async () => {
    let MenuList = await getMenuList();
    let MenuSonList = await getMenuSonList();

    console.log("请求菜单数据,,,,,1,,,,,,", MenuList);
    console.log("请求子菜单数据,,,,3,,,,,,,", MenuSonList);
    setSaveRouterList([...MenuList, ...MenuSonList]);
  };

  const checkRouter = (item) => {
    return routerList[item.key] && item.auth;
  };
  const checkUserRights = (item) => {
    return saveUser.role.rights.includes(item.key);
  };
  return (
    <Switch>
      {saveRouterList.map((item) => {
        if (checkRouter(item) && checkUserRights(item)) {
          return (
            <Route
              path={item.key}
              key={item.key}
              component={routerList[item.key]}
              exact
            />
          );
        }
        return null;
      })}
      {/* //exact:开启精确匹配 */}
      <Redirect from="/" to="/home" exact />
      {/* //如果路由都没有匹配到，则进入 */}
      {saveRouterList.length > 0 && <Route path="*" component={ErrorPage} />}
    </Switch>
  );
}
export default RouterHomeMenu;

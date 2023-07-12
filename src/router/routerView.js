import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../pages/Login/Login";
import TemplateList from "../pages/TemplateList";

export const RouterView = function (props) {
  return (
    // Switch用于提高路由匹配效率，匹配规则为，找到第一个匹配到的路由，就停止
    <Switch>
      <Route path="/login" component={Login} />
      {/* 引入路由组件写法一：component */}
      {/* <Route path="/" component={TemplateList} /> */}
      {/* 引入路由组件写法二：component */}
      <Route
        path="/"
        render={() =>
          localStorage.getItem("token") ? (
            <TemplateList></TemplateList>
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    </Switch>
  );
};

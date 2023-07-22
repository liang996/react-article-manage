// 清空token
export const removeToken = () => {
  localStorage.clear();
  sessionStorage.clear();
  return;
};

//判断是否有权限
export const isAuth = (parame) => {
  return parame;
};
//文章审核状态
export const AUDITSTATE = ["未审核", "审核中", "已通过", "未通过"]
//文章发布状态

export const PUBLISHSTATE = ["未发布", "待发布", "已上线", "已下线"]

//文章状态标记的颜色
export const AUDITCOLOR=["","orange","green","red"]

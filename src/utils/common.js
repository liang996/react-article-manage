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

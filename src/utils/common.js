// 清空token
export const removeToken = () => {
  console.log("first,,,,,,,,,,,,,,,,,,,");
  localStorage.clear();
  sessionStorage.clear();
  return;
};

//判断是否有权限
export const isAuth = (parame) => {
  console.log('parame', parame)
  return parame;
};

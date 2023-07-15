import {postData,fetchData,deleteData,patchData} from "./index";
//用户列表查询 
export const getUserList = () => {
    return fetchData(`/users`)
};
//用户列表查询 (表关联查询)
export const getList = (params) => {
    return fetchData(`/users${params}`)
};
//用户添加
export const addUserData = (params) => {
    return postData("/users",params)
};
//用户删除
export const delUserData = (id) => {
    return deleteData(`/users/${id}`)
};

//用户修改
export const updateUserData = (id,params) => {
    return patchData(`/users/${id}`,params)
};

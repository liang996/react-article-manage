import {postData,fetchData,deleteData,patchData} from "./index";
//用户列表查询 
export const getUserList = () => {
    return fetchData(`/users`)
};
//用户列表查询 (表关联查询)
export const getList = (params) => {
    return fetchData(`/users${params}`)
};
//用户列表添加
export const addUserData = (params) => {
    return postData("/users",params)
};
//用户列表删除
export const delUserData = (id) => {
    return deleteData(`/users/${id}`)
};

//用户列表修改
export const udateUserData = (id,params) => {
    return patchData(`/users/${id}`,params)
};

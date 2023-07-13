import {postData,fetchData,deleteData,patchData} from "./index";
//权限列表查询 
export const getAuthList = () => {
    return fetchData(`/menuLists`)
};
//权限列表查询 (表关联查询)
export const getList = (params) => {
    return fetchData(`/menuLists${params}`)
};
//权限列表添加
export const addAuthData = (params) => {
    return postData("/menuLists",params)
};
//权限列表删除
export const delAuthData = (id) => {
    return deleteData(`/menuLists/${id}`)
};

//权限列表修改
export const updateAuthData = (id,params) => {
    return patchData(`/menuLists/${id}`,params)
};

import {postData,fetchData,deleteData,patchData} from "./index";
//权限列表查询 
export const getAuthList = () => {
    return fetchData(`/menus`)
};
//权限列表查询 (表关联查询)
export const getList = (params) => {
    return fetchData(`/menus${params}`)
};
//权限列表添加
export const addAuthData = (params) => {
    return postData("/menus",params)
};
//权限列表删除
export const delAuthData = (id) => {
    return deleteData(`/menus/${id}`)
};
//权限子列表删除
export const delChildrendData = (id) => {
    return deleteData(`/children/${id}`)
};

//权限列表修改
export const updateAuthData = (id,params) => {
    return patchData(`/menus/${id}`,params)
};

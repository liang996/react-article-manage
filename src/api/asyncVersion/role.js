import {postData,fetchData,deleteData,patchData} from "./index";
//角色列表查询 
export const getRoleList = () => {
    return fetchData(`/roles`)
};
//角色列表查询 (表关联查询)
export const getList = (params) => {
    return fetchData(`/roles${params}`)
};
//角色列表添加
export const addRoleData = (params) => {
    return postData("/roles",params)
};
//角色列表删除
export const delRoleData = (id) => {
    return deleteData(`/roles/${id}`)
};

//角色列表修改
export const updateRoleData = (id,params) => {
    return patchData(`/roles/${id}`,params)
};
//权限子列表删除
export const delChildrendData = (id) => {
    return deleteData(`/children/${id}`)
};
//目录列表查询 (表关联查询)
export const geMenutList = (params) => {
    return fetchData(`/catalogues${params}`)
};
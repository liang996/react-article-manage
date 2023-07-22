import {postData,fetchData,deleteData,patchData} from "./index";
//文章类别列表查询 
export const getCategoryList = () => {
    return fetchData(`/categories`)
};
//文章类别列表查询 (表关联查询)
export const getList = (params) => {
    return fetchData(`/categories${params}`)
};
//文章类别列表添加
export const addCategoryData = (params) => {
    return postData("/categories",params)
};
//文章类别列表删除
export const delCategoryData = (id) => {
    return deleteData(`/categories/${id}`)
};

//文章类别列表修改
export const updateCategoryData = (id,params) => {
    return patchData(`/categories/${id}`,params)
};

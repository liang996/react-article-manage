import {postData,fetchData,deleteData,patchData} from "./index";
//文章列表查询 
export const getArticleList = () => {
    return fetchData(`/articles`)
};
//文章列表查询 (表关联查询)
export const getList = (params) => {
    return fetchData(`/articles${params}`)
};
//文章列表添加
export const addArticleData = (params) => {
    return postData("/articles",params)
};
//文章列表删除
export const delArticleData = (id) => {
    return deleteData(`/articles/${id}`)
};

//文章列表修改
export const updateArticleData = (id,params) => {
    return patchData(`/articles/${id}`,params)
};

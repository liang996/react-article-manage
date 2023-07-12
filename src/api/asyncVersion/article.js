import {postData,fetchData} from "./index";
//文章列表查询
export const getArticleList = () => {
    return fetchData("/articles")
};

//文章列表添加
export const addArticleData = (params) => {
    return postData("/articles",params)
};

import instance from "../utils/request";
//文章列表查询
export const getArticleList = (params) => {
    return instance.request({
        url: "/wen/articles",
        method: "GET",
        params
    });
};

import instance from "../utils/request";
//目录列表查询
export const getMenuList = (params) => {
    return instance.request({
        url: "/wen/menuLists",
        method: "GET",
        params
    });
};

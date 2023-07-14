
import {fetchData} from "./index";
//目录列表查询
export const getMenuList = () => {
    return fetchData("/catalogues")
};
//目录列表查询 (表关联查询)
export const getList = (params) => {
    return fetchData(`/catalogues${params}`)
};
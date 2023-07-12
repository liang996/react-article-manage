
import {fetchData} from "./index";
//目录列表查询
export const getMenuList = () => {
    return fetchData("/menuLists")
};

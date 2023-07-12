import instance from "../utils/request1";
// 天气列表查询
export const getWeatherData = (params) => {
    return instance.request({
        url: "/api/forecast7d",
        method: "GET",
        params
    });
};

// 城市列表查询
export const getCityData = (params) => {
    return instance.request({
        url: "/api/citylist",
        method: "GET",
        params
    });
};

// 段子数据
export const getJokesData = (params) => {
    return instance.request({
        url: "/duanzi/ws/api.php",
        method: "GET",
        params
    });
};

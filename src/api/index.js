import instance from "../utils/request";
// 天气列表查询 api过时
// export const getWeatherData = (params) => { 
//     return instance.request({
//         url: "/api/forecast7d",
//         method: "GET",
//         params
//     });
// };
// 天气列表查询(查城市)
export const getCityData = (params) => {
    return instance.request({
        url: "/weathers/v2/city/lookup",
        method: "GET",
        params
    });
}; 
// 天气列表查询(查天气) 使用和风天气api
export const getWeatherData = (params) => {
    return instance.request({
        url: "/weathers/v7/weather/3d",
        method: "GET",
        params
    });
};
// 城市列表查询
// export const getCityData = (params) => {
//     return instance.request({
//         url: "/api/citylist",
//         method: "GET",
//         params
//     });
// };

// 段子数据
export const getJokesData = (params) => {
    return instance.request({
        url: "/duanzi/ws/api.php",
        method: "GET",
        params
    });
};

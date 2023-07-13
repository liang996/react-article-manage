import { request } from "../../utils/asyncVersion/request";
let baseURL = "/wen";

/**
 *  @description:  get请求封装：（用于查询数据）
 * @param {*} url   //请求url参数
 * @returns  
 */
export const fetchData = async (url) => {
  try {
    return await request({
      url: `${baseURL}${url}`,
      method: "get",
    });
  } catch (error) {
    console.error(error);
  }
};
/**
 *  @description:  post请求封装 （用于添加数据）
 * @param {*} url   //请求url参数
 *  @param {*} params   //参数
 * @returns  
 */

export const postData = async (url, params) => {
  try {
    return await request({
      url: `${baseURL}${url}`,
      method: "post",
      data: params,
    });
  } catch (error) {
    console.error(error);
  }
};
/** 
 *  @description:  put请求封装(用于更新替换数据 （深替换）) 
 * @param {*} id   //请求id参数
 *  @param {*} params   //参数
 * @returns  
 */
export const putData = async (id, params) => {
  try {
    return await request({
      url: `${baseURL}${id}`,
      method: "put",
      data: params,
    });
  } catch (error) {
    console.error(error);
  }
};

/**
 *  @description: patch请求封装(用于更新替换数据 （浅替换:补丁式更新）) 
 * @param {*} id   //请求id参数
 *  @param {*} params   //参数
 * @returns  
 */
export const patchData = async (id, params) => {
  try {
    return await request({
      url: `${baseURL}${id}`,
      method: "patch",
      data: params,
    });
  } catch (error) {
    console.error(error);
  }
};

/**
 *  @description:delete请求封装(用于删除数据 ) 
 * @param {*} id   //请求id参数
 * @returns  
 */
export const deleteData = async (id) => {
  try {
    return await request({
      url: `${baseURL}${id}`,
      method: "delete",
    });
  } catch (error) {
    console.error(error);
  }
};

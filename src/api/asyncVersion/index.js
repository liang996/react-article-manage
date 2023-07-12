import { request } from "../../utils/asyncVersion/request";
let baseURL = "/wen";

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

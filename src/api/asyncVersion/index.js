import { request } from '../../utils/asyncVersion/request'
 let  baseURL="/wen" 

 export const  fetchData= async(url)=> {
  try {
    return await request({
      url:  `${baseURL}${url}`,
      method: 'get'
    })
  } catch (error) {
    console.error(error)
  }
}

export const  postData=  async  (url,params)=> {
  try {
   return await request({
      url: `${baseURL}${url}`,
      method: 'post',
      data:params
    })
  } catch (error) {
    console.error(error)
  }
}

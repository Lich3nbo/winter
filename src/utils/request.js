
import { apiPrefix } from '@/common/v2gogoConfig'

function request({
  url,
  data = {},
  header,
  method = "GET",
  needFailToast = true
}) {
  
  return new Promise((resolve, reject) => {
    header = {
      ...header
    };
    uni.request({
      url: `${apiPrefix}${url}`,
      data,
      header,
      method,
      success: (result) => {
        let { code, message } = result.data;
        if(code === 200 || code === 0){
          resolve(result.data)
        }else{
          let error = result.data.error;
          if (needFailToast) {
            uni.showToast({
              title: message || error,
              icon: 'none',
            });
          }
          console.warn(`请求{ ${ url } }失败： ${message}`)
          reject(result.data.data)
        }
        console.log('%c 🍟 result: ', 'font-size:20px;background-color: #4b4b4b;color:#fff;', result);
      },
      fail: (e) => {
        const {errMsg} = e;
        uni.showToast({
          title: `请求失败，请联系管理员 失败原因：${errMsg}`,
          icon: 'none',
        });
        console.warn(`请求{ ${ url } }失败 原因： ${JSON.stringify(e)}`)
        reject(errMsg)
      },
      complete: () => {}
    });
  })
}

module.exports = {
  request,
}
/* 封装jsonp接口
encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
该方法不会对 ASCII 字母和数字进行编码，也不会对这些 ASCII 标点符号进行编码： - _ . ! ~ * ' ( ) 。
其他字符（比如 ：;/?:@&=+$,# 这些用于分隔 URI 组件的标点符号），都是由一个或多个十六进制的转义序列替换的。
*/

import originJSONP from 'jsonp'

export default function jsonp (url, data, option) { /* 传入的data是为了做url拼接的 */
  url += (url.indexOf('?') < 0 ? '?' : '&' + param(data))
  /* 输入jsonp函数中的url有没有？拼接符号，有的话就用&拼接param函数输出的其他拼接内容，否则就用？直接拼接 */
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function param (data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substr(1) : ''
}
/* substr(1)从第2位开始往后取，将最开始的&符号给祛除 */

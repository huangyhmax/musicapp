/* 在qq音乐的接口中，总有一些接口的参数是保持不变的，将其抽离出来，作为固定参数export出去 */
export const commonParams = {
  g_tk: 1928093487,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}

export const options = {
  param: 'jsonpCallback',
  prefix: 'jp'
}

export const ERR_OK = 0

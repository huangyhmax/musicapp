import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getSingerList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg?channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&g_tk=5381&jsonpCallback=GetSingerListCallback&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0'
  // const data = {
  //   channel: 'singer',
  //   page: 'list',
  //   key: 'all_all_all',
  //   pagesize: 100,
  //   pagenum: 1,
  //   g_tk: 5381,
  //   jsonpCallback: 'GetSingerListCallback',
  //   loginUin: 0,
  //   hostUin: 0,
  //   format: jsonp,
  //   inCharset: 'utf8',
  //   outCharset: 'utf-8',
  //   needNewCode: 0,
  //   notice: 0,
  //   platform: 'yqq'
  // }
  return jsonp(url)
}

export function getSingerDetail (singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 80,
    songstatus: 1,
    singermid: singerId
  })

  return jsonp(url, data, options)
}

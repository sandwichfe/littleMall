import {request} from './request';

/*关于home页面的所有请求都在此*/


export  function getHomeMultidata() {
  return request({
    url: '/home/multidata',
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {          /*后面的参数 如： http://localhost:8080/home/data/?type=?&page=? */
      type,
      page,
    }
  })
}
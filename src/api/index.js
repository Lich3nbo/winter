import {request} from '../utils/request'

// 温泉列表
export function getWqList() {
  return request({
    url: "/tv/tvActivityGroup/getWqList"
  })
}
// 温泉详情
export function getWqDetail(id) {
  return request({
    url: `/tv/tvActivityGroup/getWqDetail?id=${id}`,
  })
}
// 抽奖次数
export function getLotteryNumber({id,userId}) {
  return request({
    url: `/tv/tvActivityGroup/getLotteryNumberByIdAndUserId?userId=${userId}&id=${id}`,
  })
}
// 助力
export function addUserRanking({id,userId}) {
  return request({
    url: ` /tv/tvActivityGroup/addUserRanking?userId=${userId}&id=${id}`,
  })
}
// 抽奖
export function lottery({id,userId}) {
  return request({
    url: `/tv/tvActivityGroup/lottery?userId=${userId}&id=${id}`,
  })
}
// 添加分享次数
export function addShare({id,userId}) {
  return request({
    url: `/tv/tvActivityGroup/addShare?userId=${userId}&id=${id}`,
  })
}






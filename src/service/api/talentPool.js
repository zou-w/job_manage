import request from "../request";
//人才库 , 招聘记录表

//在jobHunter中有两个接口

//人才库页面,公司人才库分页
export function talentPoolSearch() {
  return request({
    url: "/business/recruitmentRecord/company/page",
    method: "get",
    params: {
      current: "1",
      size: "1000",
    },
  });
}

//用户投递结果分页接口
export function talentPoolResult() {
  return request({
    url: "/business/recruitmentRecord/user/page",
    method: "get",
    params: {
      current: "1",
      size: "1000",
    },
  });
}

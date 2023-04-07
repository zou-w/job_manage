import request from "../request";
//求职者

//企业查询投递接口
export function jobHunterSearch() {
  return request({
    url: "/business/jobApplicationResume/company/page",
    method: "get",
    params: {
      current: "1",
      size: "1000",
    },
  });
}

//招聘记录表

//用户投递结果分页接口
export function jobHunterSearchUser() {
  return request({
    url: "/business/recruitmentRecord/user/page",
    method: "get",
    params: {
      current: "1",
      size: "1000",
    },
  });
}

//拒绝
export function jobHunterReject(value) {
  return request({
    url: "/business/recruitmentRecord/delete",
    method: "post",
    data: {
      ...value,
    },
  });
}
//面试,更新
export function jobHunterResolve(value) {
  return request({
    url: "/business/recruitmentRecord/update",
    method: "post",
    data: {
      ...value,
    },
  });
}
//通过,人才库中写入数据
//招聘记录表add
export function jobHunterRAdd(value) {
  return request({
    url: "/business/recruitmentRecord/add",
    method: "post",
    data: {
      ...value,
    },
  });
}

//职位分类表
import request from "../request";

//职位查询
export function positionSearch() {
  return request({
    url: "/business/jobClassification/page",
    method: "get",
    params: {
      size: "1000",
      current: "1",
    },
  });
}

//增加职位
export function positionAdd(value) {
  return request({
    url: "/business/jobClassification/add",
    method: "post",
    data: {
      ...value,
    },
  });
}

//岗位申请记录表
//新增
export function positionNewAdd(value) {
  return request({
    url: "/business/jobApplicationResume/add",
    method: "post",
    data: {
      ...value,
    },
  });
}
//删除
export function positionNewDelete(value) {
  return request({
    url: "/business/jobApplicationResume/delete",
    method: "post",
    data: {
      ...value,
    },
  });
}

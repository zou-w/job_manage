import request from "../request";
//职位

//公司信息 列表接口
export function jobSearch() {
  return request({
    url: "/business/jobInformation/cur/page",
    method: "get",
    params: {
      current: "1",
      size: "1000",
    },
  });
}

//查询岗位
export function searchOneJob(value) {
  return request({
    url: "/business/jobInformation/company/list",
    method: "post",
    data: {
      ...value,
    },
  });
}

//删
export function jobDelete(value) {
  return request({
    url: "/business/jobInformation/delete",
    method: "post",
    data: {
      ...value,
    },
  });
}

//改
export function jobUpdate(value) {
  return request({
    url: "/business/jobInformation/update",
    method: "post",
    data: {
      ...value,
    },
  });
}

//新增,发布职位
export function jobAdd(value) {
  return request({
    url: "/business/jobInformation/add",
    method: "post",
    data: {
      ...value,
    },
  });
}

//全岗位查询
export function jobSearchAll() {
  return request({
    url: "/business/jobInformation/all/page",
    method: "get",
    params: {
      current: "1",
      size: "1000",
    },
  });
}

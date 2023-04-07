import request from "../request";
//职位

//公司信息 列表接口
export function historyAdd(value) {
  return request({
    url: "/business/jobHistory/add",
    method: "post",
    data: {
      ...value,
    },
  });
}

import request from "../request";
//职位

//公司信息 列表接口
export function getCompanyInfo(value) {
  return request({
    url: "/business/companyInformation/page",
    method: "get",
    headers: {},
    params: {
      ...value,
    },
  });
}

//增加公司
export function addCompanyInfo(value) {
  return request({
    url: "/business/companyInformation/add",
    method: "post",
    data: {
      ...value,
    },
  });
}

//根据名字获取公司id
export function getCompanyId(value) {
  return request({
    url: "/business/companyInformation/company/search",
    method: "post",
    data: {
      companyName: value,
    },
  });
}

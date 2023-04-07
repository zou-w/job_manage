import request from "../request";
//个人中心

export function login(value) {
  return request({
    url: "/system/login",
    method: "get",
    params: {
      ...value,
    },
  });
}

export function postRegister(value) {
  return request({
    url: "/system/add",
    method: "post",
    data: {
      ...value,
    },
  });
}

//获取当前用户信息
export function getUserInfo() {
  return request({
    url: "/system/getCurrentUserInfo",
    method: "get",
  });
}

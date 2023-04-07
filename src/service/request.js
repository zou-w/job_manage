import axios from "axios";
import { BASE_URL, TIMEOUT } from "./config";

import ReactDOM from "react-dom/client";
import { Spin, message } from "antd";

//拦截器
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

//定义全局loading

// 当前正在请求的数量
let requestCount = 0;

// 显示loading
function showLoading() {
  if (requestCount === 0) {
    var dom = document.createElement("div");
    dom.setAttribute("id", "loading");
    document.body.appendChild(dom);
    const loading = ReactDOM.createRoot(document.getElementById("loading"));
    loading.render(<Spin tip="加载中..." size="large" />);
  }
  requestCount++;
}

// 隐藏loading
function hideLoading() {
  requestCount--;
  if (requestCount === 0) {
    document.body.removeChild(document.getElementById("loading"));
  }
}

/**
 * 处理失败的方法
 * status:状态码
 * info:信息
 */
const errorHandle = (status, info) => {
  switch (status) {
    case 400:
      console.log(
        "语义有误，当前请求无法被服务器理解。除非进行修改，否则客户端不应该重复提交这个请求。"
      );
      break;
    case 401:
      // token:令牌
      console.log("服务器认证失败");
      break;
    case 403:
      console.log("服务器已经理解请求，但是拒绝执行它");
      break;
    case 404:
      console.log("请检查网络请求地址");
      break;
    case 500:
      console.log(
        "服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。一般来说，这个问题都会在服务器的程序码出错时出现。"
      );
      break;
    case 502:
      console.log(
        "作为网关或者代理工作的服务器尝试执行请求时，从上游服务器接收到无效的响应。"
      );
      break;
    default:
      console.log(info);
      break;
  }
};

instance.interceptors.request.use(
  (config) => {
    //配置token
    if (localStorage.getItem("token")) {
      config.headers.token = localStorage.getItem("token");
    }
    if (config.headers.isLoading !== false) {
      showLoading();
    }
    //发送网络请求时,在界面中间位置显示Loading组件
    return config;
  },
  (err) => {
    // 判断当前请求是否设置了不显示Loading
    if (err.config.headers.isLoading !== false) {
      hideLoading();
    }
    return err;
  }
);

instance.interceptors.response.use(
  (res) => {
    //如果返回信息为,description : 登录信息过期 请重新登录
    if (res.data.data.description === "登录信息过期 请重新登录") {
      localStorage.removeItem("token");
    }
    // 判断当前请求是否设置了不显示Loading
    if (res.config.headers.isLoading !== false) {
      hideLoading();
    }
    return res.data;
  },
  (err) => {
    if (err.config.headers.isLoading !== false) {
      hideLoading();
    }
    const { response } = err;
    console.log("err", err);
    if (err.code === "ECONNABORTED") {
      message.warning("请求超时，请重试");
    }
    errorHandle(response.status, response.info);
  }
);

export default instance;

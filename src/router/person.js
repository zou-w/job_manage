import React from "react";
import { Navigate } from "react-router-dom";

import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

//组件懒加载
const Main = React.lazy((_) => import("@/pages/main"));
const DeliveryRecord = React.lazy((_) =>
  import("@/pages/main/person/deliveryRecord")
);
const Home = React.lazy((_) => import("@/pages/main/person/home"));
const PersonUser = React.lazy((_) => import("@/pages/main/person/personUser"));

const Login = React.lazy((_) => import("@/pages/login"));
const Register = React.lazy((_) => import("@/pages/register"));

// 懒加载的模式需要我们给他加上一层 Loading的提示加载组件
const withLoadingComponent = (comp) => (
  <React.Suspense fallback={<div>Loading...</div>}>{comp}</React.Suspense>
);

//导出,用户端
const routesPerson = [
  {
    path: "/main",
    element: withLoadingComponent(<Main />),
    children: [
      {
        path: "home",
        element: withLoadingComponent(<Home />),
        name: "首页",
        icon: <UserOutlined />,
      },
      {
        path: "deliveryRecord",
        element: withLoadingComponent(<DeliveryRecord />),
        name: "投递记录",
        icon: <UserOutlined />,
      },
      {
        path: "personUser",
        element: withLoadingComponent(<PersonUser />),
        name: "个人中心",
        icon: <UserOutlined />,
      },
    ],
  },

  // 单页面
  { path: "/login", element: withLoadingComponent(<Login />) },
  { path: "/register", element: withLoadingComponent(<Register />) },

  { path: "/", element: <Navigate to="/login" /> },
];
export default routesPerson;

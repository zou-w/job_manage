import React, { memo, useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import { Layout, Menu } from "antd";

import { useSelector } from "react-redux";

import { personRouter, companyRouter } from "@/COMMON";

//引入工具函数
import { useTransformId } from "@/utils/tools";
const LayoutPage = memo(() => {
  const location = useLocation();
  const currentPath = location.pathname.slice(6, location.pathname.length);
  const { Header, Content, Sider } = Layout;
  const navigate = useNavigate();
  const [current, setCurrent] = useState(currentPath);
  const active = localStorage.getItem("active");
  //从redux中获取数据
  const curState = useSelector((state) => state.user.userInfo);
  //获取公司名字,进行转换
  const [companyName, setCompanyName] = useState("");
  const resCompanyName = useTransformId([curState]);
  useEffect(() => {
    if (resCompanyName[0] !== undefined) {
      setCompanyName(resCompanyName[0].companyName);
    }
  }, [resCompanyName, companyName]);
  //设置路径,跳转路由
  const changePath = (e) => {
    setCurrent(e.key);
    navigate(`/main/${e.key}`);
  };
  const loginOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <Layout>
        <Sider>
          <Menu
            theme="dark"
            mode="inline"
            items={
              active === "true"
                ? personRouter.map((item) => ({
                    key: item.path,
                    icon: item.icon,
                    label: item.name,
                  }))
                : companyRouter.map((item) => ({
                    key: item.path,
                    icon: item.icon,
                    label: item.name,
                  }))
            }
            onClick={changePath}
            selectedKeys={[current]}
            style={{ height: "100vh", paddingTop: "60px" }}
          />
        </Sider>
        <Layout>
          <Header>
            <p style={{ color: "#fff", float: "left", cursor: "pointer" }}>
              当前用户名为:{active === "true" ? curState.userName : companyName}
            </p>
            <p
              style={{ color: "#fff", float: "right", cursor: "pointer" }}
              onClick={loginOut}
            >
              退出登录
            </p>
          </Header>
          <Content
            style={{
              height: "80vh",
              overflow: "auto",
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
});

export default LayoutPage;

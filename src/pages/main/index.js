import React, { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LayoutPage from "@/components/LayoutPage";
import { getUserInfo } from "@/service/api/user";
//从redux中获取用户数据
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "@/store/slice/userSlice";
const Main = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const active = localStorage.getItem("active");
  useEffect(() => {
    if (token == null || active === null) {
      navigate("/login");
    } else {
      //获取用户信息
      getUserInfo().then((res) => {
        if (res.code === 200) {
          dispatch(updateUserInfo(res.data));
        }
      });
    }
  }, [token]);
  return (
    <>
      <LayoutPage />
    </>
  );
});

export default Main;

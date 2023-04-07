import React, { memo, useEffect, useRef, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { login } from "@/service/api/user";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { useDispatch } from "react-redux";

//引入img
import leaf1 from "@/assets/images/leaf_01.png";
import leaf2 from "@/assets/images/leaf_02.png";
import leaf3 from "@/assets/images/leaf_03.png";
import leaf4 from "@/assets/images/leaf_04.png";
import bg from "@/assets/images/bg.jpg";
import girl from "@/assets/images/girl.png";
import trees from "@/assets/images/trees.png";

const Login = memo(() => {
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    account: "",
    passwd: "",
  });

  //使用useEffect判断是否有token,有token则跳过登录
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/main/talentPool");
    }
  }, []);
  //更新输入消息
  const handleInputChange1 = (event) => {
    setLoginInfo({
      ...loginInfo,
      account: event.target.value,
    });
  };
  const handleInputChange2 = (event) => {
    setLoginInfo({
      ...loginInfo,
      passwd: event.target.value,
    });
  };
  //登录
  const loginBtn = () => {
    console.log(loginInfo);
    login(loginInfo).then((res) => {
      const { msg, token } = res.data;
      if (msg === "登录成功") {
        localStorage.setItem("active", active);
        if (active === true) {
          //为true,去person
          navigate("/main/home");
        } else {
          navigate("/main/talentPool");
        }
        localStorage.setItem("token", token);
      }
    });
  };
  const changeLogin = () => {
    navigate("/register");
  };
  const [active, setActive] = useState(true);
  //定义公司还是用户,为true时是person
  const isActive1 = () => {
    setActive(true);
  };
  const isActive2 = () => {
    setActive(false);
  };
  return (
    <>
      <section className="loginItem">
      <div className="login">
          <h2>登录</h2>
          <div className="login-title">
            <span onClick={isActive1} className={active ? "span-active" : ""}>
              我要找工作
            </span>
            <span onClick={isActive2} className={active ? "" : "span-active"}>
              我要招聘
            </span>
          </div>
          <div className="innner">
            <div className="inputBox">
              <input
                type="text"
                placeholder="输入账号"
                className="input-item"
                onChange={handleInputChange1}
              />
            </div>
            <div className="inputBox">
              <input
                type="password"
                placeholder="输入密码"
                onChange={handleInputChange2}
                className="input-item"
              />
            </div>
            <div className="inputBox">
              <input
                type="submit"
                value={"登录"}
                className="btn"
                onClick={loginBtn}
              />
            </div>
            <div className="group">
              <a href="#">忘记密码</a>
              <a onClick={changeLogin}>点击注册账号</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export default Login;

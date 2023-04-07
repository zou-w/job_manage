import React, { memo, useEffect, useRef, useState, useCallback } from "react";
import { Button, Divider, message, Select, Space } from "antd";
import { postRegister } from "@/service/api/user";
import { getCompanyInfo, addCompanyInfo } from "@/service/api/company";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

import "./register.scss";
//引入img
import leaf1 from "@/assets/images/leaf_01.png";
import leaf2 from "@/assets/images/leaf_02.png";
import leaf3 from "@/assets/images/leaf_03.png";
import leaf4 from "@/assets/images/leaf_04.png";
import bg from "@/assets/images/bg.jpg";
import girl from "@/assets/images/girl.png";
import trees from "@/assets/images/trees.png";

const Register = memo(() => {
  //提示信息
  const navigate = useNavigate();

  //添加公司
  const companyAddressRef = useRef();
  const companyNameRef = useRef();
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    companyAddress: "",
  });

  const [registerInfo, setRegisterInfo] = useState({
    account: "",
    companyId: "",
    contactEmail: "",
    contactNumber: "",
    deleteFlag: "",
    description: "",
    id: "",
    passwd: "",
    roles: "",
    userName: "",
  });

  //选择公司信息
  const [companyItems, setCompanyItems] = useState([]);
  const debounce = useCallback((fn, delay = 500) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  }, []);
  //获取公司id
  useEffect(() => {
    getCompanyInfoMethod();
  }, []);

  //发送请求获取公司信息
  function getCompanyInfoMethod() {
    let data = {
      current: 1,
      size: 20,
    };
    getCompanyInfo(data).then((res) => {
      const { list } = res.data;
      setCompanyItems(list);
      console.log(list);
    });
  }

  //获取下拉的值
  const getSelectValue = (e) => {
    setRegisterInfo((state) => ({
      ...state,
      companyId: e,
    }));
  };
  const addCompany = (e) => {
    e.preventDefault();
    setCompanyInfo({
      ...companyInfo,
      companyAddress: companyAddressRef.current.value,
      companyName: companyNameRef.current.value,
    });
    //发送请求添加公司
    addCompanyInfo(companyInfo).then((res) => {
      if (res.data.status === 200) {
        getCompanyInfoMethod();
        message.open({
          type: "success",
          content: res.data.msg,
        });
      } else {
        message.open({
          type: "error",
          content: res.data.msg,
        });
      }
    });
  };
  //更新输入消息
  const handleInputChange1 = useCallback(
    debounce((event) => {
      setRegisterInfo({
        ...registerInfo,
        account: event.target.value,
      });
    })
  );
  const handleInputChange2 = useCallback(
    debounce((event) => {
      setRegisterInfo({
        ...registerInfo,
        contactEmail: event.target.value,
      });
    })
  );
  const handleInputChange3 = useCallback(
    debounce((event) => {
      setRegisterInfo({
        ...registerInfo,
        contactNumber: event.target.value,
      });
    })
  );
  const handleInputChange4 = useCallback(
    debounce((event) => {
      setRegisterInfo({
        ...registerInfo,
        description: event.target.value,
      });
    })
  );
  const handleInputChange5 = useCallback(
    debounce((event) => {
      setRegisterInfo({
        ...registerInfo,
        roles: event.target.value,
      });
    })
  );
  const handleInputChange6 = useCallback(
    debounce((event) => {
      setRegisterInfo({
        ...registerInfo,
        userName: event.target.value,
      });
    })
  );
  const handleInputChange7 = useCallback(
    debounce((event) => {
      setRegisterInfo({
        ...registerInfo,
        passwd: event.target.value,
      });
    })
  );
  //注册
  const registerBtn = () => {
    // 发送注册请求;
    postRegister(registerInfo).then((res) => {
      const { status, token } = res.data;
      if (status === "注册成功") {
        navigate("/main/talentPool");
        localStorage.setItem("token", token);
      }
    });
  };
  const changeLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <section className="registerItem">
        <div className="register">
          <h2>注册</h2>
          <div className="innner">
            <div className="inputBox">
              <div className="register-info">
                <input
                  type="text"
                  placeholder="输入账号"
                  maxLength={10}
                  onChange={handleInputChange1}
                />
                <Select
                  style={{
                    width: 300,
                    marginTop: 20,
                    marginLeft: 50,
                  }}
                  placeholder="下拉选择公司"
                  onSelect={getSelectValue}
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider
                        style={{
                          margin: "8px 0",
                        }}
                      />
                      <Space
                        style={{
                          padding: "0 8px 4px",
                        }}
                      >
                        <input
                          placeholder="公司名称"
                          ref={companyNameRef}
                          style={{
                            width: "80px",
                            height: "30px",
                            borderRadius: "3px",
                            padding: "3px",
                          }}
                        />
                        <input
                          placeholder="公司地址"
                          ref={companyAddressRef}
                          style={{
                            width: "80px",
                            height: "30px",
                            borderRadius: "3px",
                            padding: "3px",
                          }}
                        />
                        <Button
                          type="text"
                          icon={<PlusOutlined />}
                          onClick={addCompany}
                        >
                          添加公司
                        </Button>
                      </Space>
                    </>
                  )}
                  options={companyItems.map((item) => ({
                    label: item.companyName,
                    value: item.id,
                  }))}
                />
                <input
                  type="email"
                  placeholder="联系邮件"
                  // ref={contactEmailRef}
                  maxLength={17}
                  onChange={handleInputChange2}
                />
                <input
                  type="text"
                  placeholder="联系号码"
                  // ref={contactNumberRef}
                  maxLength={11}
                  onChange={handleInputChange3}
                />
                <input
                  type="text"
                  placeholder="输入描述信息"
                  // ref={descriptionRef}
                  onChange={handleInputChange4}
                />
                <input
                  type="number"
                  placeholder="输入角色-求职为1"
                  // ref={rolesRef}
                  maxLength={1}
                  onChange={handleInputChange5}
                />
                {/* 登录相关信息 */}
                <input
                  type="text"
                  placeholder="输入用户名称"
                  // ref={usernameRef}
                  maxLength={8}
                  onChange={handleInputChange6}
                />
                <input
                  type="password"
                  placeholder="输入密码"
                  // ref={passwordRef}
                  maxLength={10}
                  onChange={handleInputChange7}
                />
              </div>
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
                onClick={registerBtn}
              />
            </div>
            <div className="group">
              <a href="#">忘记密码</a>
              <a className="btn2" onClick={changeLogin}>
                点击去登录账号
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export default Register;

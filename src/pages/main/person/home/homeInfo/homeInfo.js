import React, { memo, useCallback, useState, useRef } from "react";
import {
  Modal,
  Input,
  message,
  Select,
  Divider,
  DatePicker,
  Space,
} from "antd";
import "dayjs/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";

//从redux中获取管理的状态
import { changeShowDialog } from "@/store/slice/otherSlice";
import { useSelector, useDispatch } from "react-redux";
//引入请求
import { jobHunterRAdd } from "@/service/api/jobHunter";
import { positionNewAdd } from "@/service/api/posision";
//引入工具函数
import { transformName } from "@/utils/tools";

const homeInfo = memo(() => {
  const dispatch = useDispatch();
  const showDialog = useSelector((state) => state.other.showDialog);
  const curJob = useSelector((state) => state.job.curJob);
  const userInfo = useSelector((state) => state.user.userInfo);
  const [curJobItem, setCurJobItem] = useState({
    birthday: "",
    companyName: curJob.companyName,
    graduatedUniversity: "",
    name: userInfo.userName,
    positionInformationId: curJob.id,
    positionName: curJob.positionName,
    sex: 0,
    technicalFeatures: "",
    workingHours: "",
    recruitmentRecordId: "",
  });

  //定义回流函数
  const debounce = useCallback((fn, delay = 500) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  }, []);
  //进行值修改
  const handlerChange2 = useCallback(
    debounce((event) => {
      setCurJobItem({
        ...curJobItem,
        graduatedUniversity: event.target.value,
      });
    })
  );
  const handlerChange3 = useCallback(
    debounce((event) => {
      setCurJobItem({
        ...curJobItem,
        technicalFeatures: event.target.value,
      });
    })
  );
  const handlerChange4 = useCallback(
    debounce((event) => {
      setCurJobItem({
        ...curJobItem,
        workingHours: event.target.value,
      });
    })
  );
  //打开,关闭modal
  const handleOkUpdate = async () => {
    dispatch(changeShowDialog(!showDialog));
    // 执行修改
    // 发送请求,判断请求类型
    const companyId = await transformName(curJob.companyName);
    let searchData1 = {
      account: userInfo.account,
      companyId: companyId,
      hiringResults: "已投递",
      positionName: curJob.positionName,
      userName: userInfo.userName,
    };
    console.log("searchData1", searchData1);
    //招聘记录表,(需填写信息)
    const data = await jobHunterRAdd(searchData1);
    console.log("data", data);
    if (data.data.msg !== "已申请") {
      const updateCurJobItem = {
        ...curJobItem,
        recruitmentRecordId: data.data.RecruitmentRecordID,
      };
      positionNewAdd(updateCurJobItem).then((res) => {
        message.open({
          type: "success",
          content: res.data.msg,
        });
      });
    } else {
      //显示已申请
      message.open({
        type: "success",
        content: data.data.msg,
      });
    }
  };
  const handleCancel = () => {
    dispatch(changeShowDialog(!showDialog));
  };
  const [positionList, setPositionList] = useState([
    { label: "男", value: 0 },
    { label: "女", value: 1 },
  ]);

  //获取下拉的值
  const getSelectValue = (e) => {
    setCurJobItem((state) => ({
      ...state,
      sex: e,
    }));
  };
  //选择日期
  const onChange = (date, dateString) => {
    setCurJobItem({
      ...curJobItem,
      birthday: dateString,
    });
  };
  return (
    <div className="jobsUpdate-content">
      <Modal
        title="填写申请岗位信息"
        open={showDialog}
        onOk={handleOkUpdate}
        onCancel={handleCancel}
      >
        <DatePicker
          style={{
            width: 300,
            marginTop: 20,
          }}
          onChange={onChange}
          locale={locale}
          placeholder="输入生日"
        />
        <Select
          style={{
            width: 300,
            marginTop: 20,
          }}
          placeholder="下拉选择性别"
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
              ></Space>
            </>
          )}
          options={positionList.map((item) => ({
            label: item.label,
            value: item.value,
          }))}
        />
        <Input
          placeholder="输入毕业院校"
          onChange={handlerChange2}
          className="jobsUpdate-item"
        />
        <Input
          placeholder="输入技术特点"
          onChange={handlerChange3}
          className="jobsUpdate-item"
        />
        <Input
          placeholder="输入工作时间"
          onChange={handlerChange4}
          className="jobsUpdate-item"
        />
      </Modal>
    </div>
  );
});

export default homeInfo;

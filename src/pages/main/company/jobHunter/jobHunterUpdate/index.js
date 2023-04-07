import React, { memo, useCallback, useEffect, useState } from "react";
import { Modal, Button, message } from "antd";

//从redux中获取管理的状态
import { changeShowDialog } from "@/store/slice/otherSlice";
import { useSelector, useDispatch } from "react-redux";
//引入请求
import { jobHunterResolve } from "@/service/api/jobHunter";
import { positionNewDelete } from "@/service/api/posision";
//引入工具函数,名字转id
import { transformName } from "@/utils/tools";
import { useNavigate } from "react-router-dom";

const jobHunterUpdate = memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showDialog = useSelector((state) => state.other.showDialog);
  const curJob = useSelector((state) => state.jobHunter.curJobHunter);
  const [curCompanyId, setCurCompanyId] = useState("");
  useEffect(() => {
    transformName(curJob.companyName).then((res) => {
      setCurCompanyId(res);
    });
  }, [curCompanyId]);
  //打开,关闭modal
  const handleOkUpdate = () => {
    dispatch(changeShowDialog(!showDialog));
  };
  const handleCancel = () => {
    dispatch(changeShowDialog(!showDialog));
  };
  //拒绝走删除接口
  const rejectHandler = () => {
    dispatch(changeShowDialog(!showDialog));
    console.log("curJob", curJob);
    //修改岗位申请简历表
    let data1 = {
      account: curJob.account,
      companyId: curCompanyId,
      hiringResults: "拒绝",
      id: curJob.recruitmentRecordId,
      positionName: curJob.positionName,
      userName: curJob.name,
    };
    jobHunterResolve(data1).then((res) => {
      message.open({
        type: res.data.status === 500 ? "error" : "success",
        content: res.data.msg,
      });
    });
    //删除
    let data = {
      birthday: "",
      companyName: "",
      graduatedUniversity: "",
      id: curJob.id,
      name: "",
      positionInformationId: "",
      positionName: "",
      recruitmentRecordId: "",
      sex: 0,
      technicalFeatures: "",
      workingHours: "",
    };
    positionNewDelete(data).then((res) => {
      message.open({
        type: res.data.status === 500 ? "error" : "success",
        content: res.data.msg,
      });
      //刷新页面
      navigate("/main/jobHunter");
    });
  };
  //面试走更新接口
  const updateHandler = () => {
    dispatch(changeShowDialog(!showDialog));
    let searchData = {
      account: curJob.account,
      companyId: curCompanyId,
      hiringResults: "面试",
      id: curJob.recruitmentRecordId,
      positionName: curJob.positionName,
      userName: curJob.name,
    };
    jobHunterResolve(searchData).then((res) => {
      message.open({
        type: res.data.status === 500 ? "error" : "success",
        content: res.data.msg,
      });
    });
  };
  //通过
  const passHandler = () => {
    dispatch(changeShowDialog(!showDialog));
    let data = {
      account: curJob.account,
      companyId: curCompanyId,
      hiringResults: "待录用",
      id: curJob.recruitmentRecordId,
      positionName: curJob.positionName,
      userName: curJob.name,
    };
    jobHunterResolve(data).then((res) => {
      message.open({
        type: res.data.status === 500 ? "error" : "success",
        content: res.data.msg,
      });
    });
  };
  //3个按钮对应3个接口
  return (
    <div className="jobsUpdate-content">
      <Modal
        title="修改信息"
        open={showDialog}
        onOk={handleOkUpdate}
        onCancel={handleCancel}
      >
        <Button type="primary" onClick={updateHandler}>
          面试
        </Button>
        <Button
          style={{ marginLeft: "10%" }}
          type="primary"
          danger
          onClick={rejectHandler}
        >
          拒绝
        </Button>
        <Button
          style={{ background: "#49cc90", marginLeft: "10%" }}
          type="primary"
          onClick={passHandler}
        >
          通过
        </Button>
      </Modal>
    </div>
  );
});

export default jobHunterUpdate;

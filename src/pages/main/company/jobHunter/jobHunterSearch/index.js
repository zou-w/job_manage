import React, { memo } from "react";
import { Modal } from "antd";
//redux
import { changeShowDialog } from "@/store/slice/otherSlice";
import { useSelector, useDispatch } from "react-redux";
//样式
import "./jobHunterSearch.scss";
//做数据展示
const jobHunterSearch = memo(() => {
  const dispatch = useDispatch();
  const jobList = useSelector((state) => state.jobHunter.curJobHunter);
  const showDialog = useSelector((state) => state.other.showDialog);

  //打开,关闭modal
  const handleOkUpdate = () => {
    dispatch(changeShowDialog(!showDialog));
    //执行修改
    //发送请求,判断请求类型
  };
  const handleCancel = () => {
    dispatch(changeShowDialog(!showDialog));
  };
  return (
    <>
      <Modal
        title="修改信息"
        open={showDialog}
        onOk={handleOkUpdate}
        onCancel={handleCancel}
      >
        <div className="jobHunterInfo">
          <p>
            <span>姓名:</span>
            {jobList.name}
          </p>
          <p>
            <span>生日:</span>
            {jobList.birthday.slice(0, 10)}
          </p>
          <p>
            <span>性别:</span>
            {jobList.sex === 1 ? "男" : "女"}
          </p>
          <p>
            <span>毕业院校:</span>
            {jobList.graduatedUniversity}
          </p>
          <p>
            <span>岗位名称:</span>
            {jobList.positionName}
          </p>
          <p>
            <span>工作经验:</span>
            {jobList.workingHours}
          </p>
          <p>
            <span>技术特点:</span>
            {jobList.technicalFeatures}
          </p>
        </div>
      </Modal>
    </>
  );
});

export default jobHunterSearch;

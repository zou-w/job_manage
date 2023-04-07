import React, { memo, useCallback, useState } from "react";
import { Modal, Input, message } from "antd";
import "./jobUpdate.scss";

//从redux中获取管理的状态
import { changeShowDialog } from "@/store/slice/otherSlice";
import { useSelector, useDispatch } from "react-redux";
import { changeJobList } from "@/store/slice/jobSlice";
//引入请求
import { jobUpdate, jobSearch } from "@/service/api/job";
const JobsUpdate = memo(() => {
  const dispatch = useDispatch();
  const showDialog = useSelector((state) => state.other.showDialog);
  const curJob = useSelector((state) => state.job.curJob);
  const [curJobItem, setCurJobItem] = useState({
    positionName: curJob.positionName,
    positionTypeName: curJob.positionTypeName,
    startingSalary: curJob.startingSalary,
    endSalary: curJob.endSalary,
    jobRequirements: curJob.jobRequirements,
    id: curJob.id,
    workplace: curJob.workplace,
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
  const handlerChange1 = useCallback(
    debounce((event) => {
      //修改值
      setCurJobItem({
        ...curJobItem,
        positionName: event.target.value,
      });
    })
  );
  const handlerChange2 = useCallback(
    debounce((event) => {
      setCurJobItem({
        ...curJobItem,
        positionTypeName: event.target.value,
      });
    })
  );
  const handlerChange3 = useCallback(
    debounce((event) => {
      setCurJobItem({
        ...curJobItem,
        startingSalary: event.target.value,
      });
    })
  );
  const handlerChange4 = useCallback(
    debounce((event) => {
      setCurJobItem({
        ...curJobItem,
        endSalary: event.target.value,
      });
    })
  );
  const handlerChange5 = useCallback(
    debounce((event) => {
      setCurJobItem({
        ...curJobItem,
        jobRequirements: event.target.value,
      });
    })
  );
  const handlerChange6 = useCallback(
    debounce((event) => {
      setCurJobItem({
        ...curJobItem,
        workplace: event.target.value,
      });
    })
  );

  //打开,关闭modal
  const handleOkUpdate = () => {
    dispatch(changeShowDialog(!showDialog));
    //执行修改
    //发送请求,判断请求类型
    jobUpdate(curJobItem).then((res) => {
      const { status, msg } = res.data;
      if (status === 200) {
        message.open({
          type: "success",
          content: msg,
        });
        //更新数据
        jobSearch().then((res) => {
          res.data.list.map((item, i) => {
            item.key = i + 1;
          });
          dispatch(changeJobList(res.data.list));
        });
      }
    });
  };
  const handleCancel = () => {
    dispatch(changeShowDialog(!showDialog));
  };
  return (
    <div className="jobsUpdate-content">
      <Modal
        title="修改信息"
        open={showDialog}
        onOk={handleOkUpdate}
        onCancel={handleCancel}
      >
        <Input
          placeholder="输入要修改的岗位名称"
          defaultValue={curJob.positionName}
          onChange={handlerChange1}
          className="jobsUpdate-item"
        />
        <Input
          placeholder="输入要修改的岗位类型"
          defaultValue={curJob.positionTypeName}
          onChange={handlerChange2}
          className="jobsUpdate-item"
        />
        <Input
          placeholder="输入要修改的起始薪资"
          defaultValue={curJob.startingSalary}
          onChange={handlerChange3}
          className="jobsUpdate-item"
        />
        <Input
          placeholder="输入要修改的技术薪资"
          defaultValue={curJob.endSalary}
          onChange={handlerChange4}
          className="jobsUpdate-item"
        />
        <Input
          placeholder="输入要修改的职位要求"
          defaultValue={curJob.jobRequirements}
          onChange={handlerChange5}
          className="jobsUpdate-item"
        />
        <Input
          placeholder="输入要修改的工作地点"
          defaultValue={curJob.workplace}
          onChange={handlerChange6}
          className="jobsUpdate-item"
        />
      </Modal>
    </div>
  );
});

export default JobsUpdate;

import React, { memo, useEffect, useState } from "react";

import { Table, Space, Pagination, Button } from "antd";
//获取数据
import { jobSearch, searchOneJob } from "@/service/api/job";

import { useSelector, useDispatch } from "react-redux";
import { changeJobList, changeCurJob } from "@/store/slice/jobSlice";
import { changeShowDialog } from "@/store/slice/otherSlice";

import DialogBox from "@/components/DialogBox";
import JobsUpdate from "./jobsUpdate";
import JobAdd from "./jobAdd";
const job = memo(() => {
  const [type, setType] = useState("");
  const [searchData, setSearchData] = useState({
    companyName: "",
    creatorId: "",
    endSalary: "",
    id: "",
    jobRequirements: "",
    positionName: "",
    positionTypeName: "",
    startingSalary: "",
    workplace: "",
  });
  const dispatch = useDispatch();
  const showDialog = useSelector((state) => state.other.showDialog);
  const jobList = useSelector((state) => state.job.jobList);
  const curJob = useSelector((state) => state.job.curJob);
  useEffect(() => {
    //公司人才库分页
    jobSearch().then((res) => {
      res.data.list.map((item, i) => {
        item.key = i + 1;
      });
      dispatch(changeJobList(res.data.list));
    });
  }, []);

  //列表展示
  const talentPoolColumns = [
    {
      title: "序号",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "岗位名称",
      dataIndex: "positionName",
      key: "positionName",
    },
    {
      title: "岗位类型",
      dataIndex: "positionTypeName",
      key: "positionTypeName",
    },
    {
      title: "起始薪资",
      dataIndex: "startingSalary",
      key: "startingSalary",
    },
    {
      title: "结束薪资",
      dataIndex: "endSalary",
      key: "endSalary",
    },
    {
      title: "职位要求",
      dataIndex: "jobRequirements",
      key: "jobRequirements",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => updateInfo(record)}>
            修改
          </Button>
          <Button type="primary" danger onClick={() => deleteInfo(record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const updateInfo = (id) => {
    dispatch(changeShowDialog(!showDialog));
    dispatch(changeCurJob(id));
    setType("update");
  };
  const deleteInfo = (id) => {
    dispatch(changeShowDialog(!showDialog));
    dispatch(changeCurJob(id));
    setType("delete");
  };
  const showDialogHandler = () => {
    dispatch(changeShowDialog(!showDialog));
    setType("add");
  };

  const handlerSearch = (event) => {
    setSearchData({
      ...searchData,
      positionName: event.target.value,
    });
  };
  const searchHandler = () => {
    searchOneJob(searchData).then((res) => {
      res.data.map((item, i) => {
        item.key = i;
      });
      dispatch(changeJobList(res.data));
    });
  };
  //分页
  return (
    <>
      <div style={{ marginBottom: "20px", height: "40px" }}>
        <div style={{ float: "left" }}>
          <input
            style={{
              width: "300px",
              height: "40px",
              border: "none",
              borderRadius: "8px",
              paddingLeft: "5px",
              letterSpacing: "2px",
            }}
            placeholder="请求输入岗位名称"
            onChange={handlerSearch}
          />
          <button
            style={{
              width: "100px",
              height: "40px",
              marginLeft: "10px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: "#1677ff",
              color: "#fff",
            }}
            onClick={searchHandler}
          >
            搜索
          </button>
        </div>
        <button
          style={{
            width: "100px",
            height: "40px",
            float: "right",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#d4380d",
            marginRight: "200px",
            color: "#fff",
          }}
          onClick={showDialogHandler}
        >
          发布岗位
        </button>
      </div>
      <Table columns={talentPoolColumns} dataSource={jobList} />
      {showDialog ? (
        <DialogBox
          data={curJob}
          type={type}
          com={type === "update" ? <JobsUpdate /> : <JobAdd />}
          deleteType={"job"}
        />
      ) : (
        ""
      )}
    </>
  );
});
export default job;

import React, { memo, useEffect, useState } from "react";

import { Table, Space, Button } from "antd";
//获取数据
import { jobSearchAll } from "@/service/api/job";

import { useSelector, useDispatch } from "react-redux";
import { changeJobList, changeCurJob } from "@/store/slice/jobSlice";
import { changeShowDialog } from "@/store/slice/otherSlice";

import HomeInfo from "./homeInfo/homeInfo";
import DialogBox from "@/components/DialogBox";

//引入过滤函数
import { filtersData } from "@/utils/filter";
const home = memo(() => {
  const showDialog = useSelector((state) => state.other.showDialog);
  //定义过滤数据
  const [filtersCompanyData, setFiltersCompanyData] = useState([]);
  const [filtersPositionNameData, setFiltersPositionNameData] = useState([]);
  const dispatch = useDispatch();
  const jobList = useSelector((state) => state.job.jobList);
  const curJob = useSelector((state) => state.job.curJob);
  useEffect(() => {
    //公司人才库分页
    jobSearchAll().then((res) => {
      res.data.list.map((item, i) => {
        return (item.key = i + 1);
      });
      dispatch(changeJobList(res.data.list));
      //去重
      const data1 = filtersData(res.data.list, "companyName");
      const data2 = filtersData(res.data.list, "positionName");
      setFiltersCompanyData(data1);
      setFiltersPositionNameData(data2);
    });
  }, [dispatch]);

  //列表展示
  const talentPoolColumns = [
    {
      title: "序号",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "公司名称",
      dataIndex: "companyName",
      key: "companyName",
      filters: filtersCompanyData,
      onFilter: (value, record) => record.companyName.indexOf(value) === 0,
    },
    {
      title: "岗位名称",
      dataIndex: "positionName",
      key: "positionName",
      filters: filtersPositionNameData,
      onFilter: (value, record) => record.positionName.indexOf(value) === 0,
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
            申请
          </Button>
        </Space>
      ),
    },
  ];
  //
  const updateInfo = async (value) => {
    dispatch(changeShowDialog(!showDialog));
    dispatch(changeCurJob(value));
  };
  return (
    <>
      <Table columns={talentPoolColumns} dataSource={jobList} />
      {showDialog ? (
        <DialogBox
          data={curJob}
          type={"add"}
          com={<HomeInfo />}
          deleteType={"job"}
        />
      ) : (
        ""
      )}
    </>
  );
});
export default home;

import React, { memo, useEffect, useState } from "react";

import { Table, Space, Tag, Button } from "antd";
//获取数据
import { jobHunterSearch } from "@/service/api/jobHunter";

import { useSelector, useDispatch } from "react-redux";
import {
  changeJobHunterList,
  changeCurJobHunter,
} from "@/store/slice/jobHunterSlice";
import { changeShowDialog } from "@/store/slice/otherSlice";

import DialogBox from "@/components/DialogBox";
import JobHunterSearch from "./jobHunterSearch";
import JobHunterUpdate from "./jobHunterUpdate";
import { filtersData } from "@/utils/filter";
const jobHunter = memo(() => {
  const [type, setType] = useState("");
  //筛选
  const [filtersPositionNameData, setPositionNameData] = useState([]);
  const dispatch = useDispatch();
  const showDialog = useSelector((state) => state.other.showDialog);
  const jobHunterList = useSelector((state) => state.jobHunter.jobHunterList);
  const curJobHunter = useSelector((state) => state.jobHunter.curJobHunter);
  useEffect(() => {
    //公司人才库分页
    jobHunterSearch().then((res) => {
      console.log(res.data);
      res.data.list.map((item, i) => {
        item.key = i + 1;
      });
      dispatch(changeJobHunterList(res.data.list));
      const data1 = filtersData(res.data.list, "positionName");
      setPositionNameData(data1);
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
      title: "职位名称",
      dataIndex: "positionName",
      key: "positionName",
      filters: filtersPositionNameData,
      onFilter: (value, record) => record.positionName.indexOf(value) === 0,
    },
    {
      title: "申请人名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "毕业院校",
      dataIndex: "graduatedUniversity",
      key: "graduatedUniversity",
    },
    {
      title: "工作经验",
      dataIndex: "workingHours",
      key: "workingHours",
    },
    {
      title: "技术特点",
      dataIndex: "technicalFeatures",
      key: "technicalFeatures",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => searchInfo(record)}>
            查看求职信息
          </Button>
          <Button type="primary" onClick={() => updateInfo(record)}>
            修改状态
          </Button>
        </Space>
      ),
    },
  ];

  const updateInfo = (id) => {
    dispatch(changeShowDialog(!showDialog));
    dispatch(changeCurJobHunter(id));
    setType("update");
  };
  const searchInfo = (id) => {
    dispatch(changeShowDialog(!showDialog));
    dispatch(changeCurJobHunter(id));
    setType("search");
  };

  return (
    <>
      <Table columns={talentPoolColumns} dataSource={jobHunterList} />
      {showDialog ? (
        <DialogBox
          data={curJobHunter}
          type={type}
          com={type === "update" ? <JobHunterUpdate /> : <JobHunterSearch />}
          deleteType={"job"}
        />
      ) : (
        ""
      )}
    </>
  );
});
export default jobHunter;

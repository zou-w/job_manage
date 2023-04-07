import React, { memo, useEffect, useState } from "react";

import { Table, Space, Tag, Button, message } from "antd";
//获取请求
import { jobHunterSearchUser } from "@/service/api/jobHunter";
import { historyAdd } from "@/service/api/history";
import { jobHunterResolve } from "@/service/api/jobHunter";
//redux
import { useSelector, useDispatch } from "react-redux";
import { changeDeliveryRecordList } from "@/store/slice/deliveryRecordSlice";

//引入工具函数
import { useTransformId, getTime } from "@/utils/tools";
import { filtersData } from "@/utils/filter";
const deliveryRecord = memo(() => {
  //过滤
  const [filtersPositionNameData, setPositionNameData] = useState([]);
  useEffect(() => {
    //公司人才库分页
    jobHunterSearchUser().then((res) => {
      res.data.list.map((item, i) => {
        item.key = i + 1;
      });
      dispatch(changeDeliveryRecordList(res.data.list));
      //筛选
      const data1 = filtersData(res.data.list, "positionName");
      setPositionNameData(data1);
    });
  }, []);

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
  const jobList = useSelector(
    (state) => state.deliveryRecord.deliveryRecordList
  );
  const resData = useTransformId(jobList);
  const [showData, setShowData] = useState([]);
  useEffect(() => {
    if (resData.length != 0) {
      let newArray = [];
      for (let i = 0; i < jobList.length; i++) {
        newArray.push({ ...resData[i], ...jobList[i] });
      }
      setShowData(newArray);
    }
  }, [jobList]);
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
      filters: filtersPositionNameData,
      onFilter: (value, record) => record.positionName.indexOf(value) === 0,
    },
    {
      title: "公司名称",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "申请人",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "录用结果",
      key: "hiringResults",
      dataIndex: "hiringResults",
      render: (_, { hiringResults }) => {
        let color = "";
        switch (hiringResults) {
          case "已投递":
            color = "geekblue";
            break;
          case "待录用":
            color = "#87d068";
            break;
          case "拒绝":
            color = "#fd544e";
            break;
          case "双方均同意":
            color = "#00c1c1";
            break;
          default:
            color = "#2db7f5";
            break;
        }
        return (
          <>
            <Tag color={color}>{hiringResults}</Tag>
          </>
        );
      },
    },

    {
      render: (_, record) => {
        return record.hiringResults === "待录用" ? (
          <Space size="middle">
            <Button type="primary" onClick={() => updateInfo(record)}>
              同意
            </Button>
          </Space>
        ) : (
          ""
        );
      },
    },
  ];
  //
  const updateInfo = (value) => {
    const time = getTime();
    let data = {
      account: value.account,
      companyId: value.companyId,
      id: "",
      onboardingTime: "",
      positionName: value.positionName,
      separationTime: time,
    };
    historyAdd(data).then((res) => {
      message.open({
        type: res.data.status === 200 ? "success" : "error",
        content: res.data.msg,
      });
    });
    //作数据更新
    let update = {
      account: value.account,
      companyId: value.companyId,
      hiringResults: "双方均同意",
      id: value.id,
      positionName: value.positionName,
      userName: value.userName,
    };
    jobHunterResolve(update).then((res) => {
      message.open({
        type: res.data.status === 500 ? "error" : "success",
        content: res.data.msg,
      });
    });
  };
  return (
    <>
      <Table columns={talentPoolColumns} dataSource={showData} />
    </>
  );
});
export default deliveryRecord;

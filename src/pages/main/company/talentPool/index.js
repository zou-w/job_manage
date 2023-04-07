import React, { memo, useEffect } from "react";

import { Table, Space, Tag, Button } from "antd";

//获取数据
import { talentPoolSearch } from "@/service/api/talentPool";
//获取表格数据
import { updateTalentPoolList } from "@/store/slice/talentPoolSlice";
import { useSelector, useDispatch } from "react-redux";
//引入接口

const talentPool = memo(() => {
  const dispatch = useDispatch();
  const talentPoolData = useSelector(
    (state) => state.talentPool.talentPoolList
  );
  useEffect(() => {
    //公司人才库分页
    talentPoolSearch().then((res) => {
      res.data.list.map((item, i) => {
        item.key = i + 1;
      });
      dispatch(updateTalentPoolList(res.data.list));
    });
  }, []);

  const talentPoolColumns = [
    {
      title: "序号",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "用户名",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "申请人account",
      dataIndex: "account",
      key: "account",
    },
    {
      title: "申请岗位名称",
      dataIndex: "positionName",
      key: "positionName",
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
  ];

  return (
    <>
      <Table columns={talentPoolColumns} dataSource={talentPoolData} />
    </>
  );
});
export default talentPool;

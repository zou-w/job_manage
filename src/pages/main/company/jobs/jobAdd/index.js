import React, { memo, useCallback, useEffect, useState, useRef } from "react";
import { Modal, Input, message, Select, Divider, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

//从redux中获取管理的状态
import { changeShowDialog } from "@/store/slice/otherSlice";
import { changeJobList } from "@/store/slice/jobSlice";
import { useSelector, useDispatch } from "react-redux";

import { jobAdd } from "@/service/api/job";
import { positionAdd, positionSearch } from "@/service/api/posision";
const JobAdd = memo(() => {
  const dispatch = useDispatch();
  const showDialog = useSelector((state) => state.other.showDialog);
  const jobList = useSelector((state) => state.job.jobList);
  const [curJobItem, setCurJobItem] = useState({
    positionName: "",
    positionTypeName: "",
    startingSalary: "",
    endSalary: "",
    jobRequirements: "",
    workplace: "",
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
  const handlerChange8 = useCallback(
    debounce((event) => {
      setPositionInfo({
        ...positionInfo,
        positionName: event.target.value,
      });
    })
  );
  const handlerChange9 = useCallback(
    debounce((event) => {
      setPositionInfo({
        ...positionInfo,
        positionTypeName: event.target.value,
      });
    })
  );

  //打开,关闭modal
  const handleOkUpdate = () => {
    dispatch(changeShowDialog(!showDialog));
    //执行修改
    //发送请求,判断请求类型
    console.log("curJobItem", curJobItem);
    jobAdd(curJobItem).then((res) => {
      const { status, msg } = res.data;
      if (status === 200) {
        message.open({
          type: "success",
          content: msg,
        });
        //更新数据
        curJobItem.key = jobList.length + 1;
        const newData = [...jobList];
        newData.push(curJobItem);
        dispatch(changeJobList(newData));
      }
    });
  };
  const handleCancel = () => {
    dispatch(changeShowDialog(!showDialog));
  };
  const [positionList, setPositionList] = useState([]);
  useEffect(() => {
    //获取选项
    getPositionSearch();
  }, []);
  function getPositionSearch() {
    positionSearch().then((res) => {
      //进行去重
      const newArr = [];
      res.data.list.map((item) => {
        newArr.push(item.positionTypeName);
      });
      const uniqueArr = [...new Set(newArr)];
      setPositionList(uniqueArr);
    });
  }

  //添加公司
  const [positionInfo, setPositionInfo] = useState({
    positionName: "",
    positionTypeName: "",
  });
  //获取下拉的值
  const getSelectValue = (e) => {
    setCurJobItem((state) => ({
      ...state,
      positionTypeName: e,
    }));
  };
  const addPosition = (e) => {
    e.preventDefault();
    //发送请求,添加职位
    positionAdd(positionInfo).then((res) => {
      //成功后刷新下拉选择框
      getPositionSearch();
      console.log(res);
    });
  };
  return (
    <div className="jobsUpdate-content">
      <Modal
        title="添加岗位信息"
        open={showDialog}
        onOk={handleOkUpdate}
        onCancel={handleCancel}
      >
        <Input
          placeholder="输入岗位名称"
          onChange={handlerChange1}
          className="jobsUpdate-item"
        />
        <Select
          style={{
            width: 300,
            marginTop: 20,
          }}
          placeholder="下拉选择岗位类型"
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
                  placeholder="职位名称"
                  style={{
                    width: "80px",
                    height: "30px",
                    borderRadius: "3px",
                    padding: "3px",
                  }}
                  onChange={handlerChange8}
                />
                <input
                  placeholder="职位类型"
                  onChange={handlerChange9}
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
                  onClick={addPosition}
                >
                  添加职位
                </Button>
              </Space>
            </>
          )}
          options={positionList.map((item) => ({
            label: item,
            value: item,
          }))}
        />
        <Input
          placeholder="输入起始薪资"
          onChange={handlerChange3}
          className="jobsUpdate-item"
        />
        <Input
          placeholder="输入最高薪资"
          onChange={handlerChange4}
          className="jobsUpdate-item"
        />
        <Input
          placeholder="输入职位要求"
          onChange={handlerChange5}
          className="jobsUpdate-item"
        />
        <Input
          placeholder="输入工作地点"
          onChange={handlerChange6}
          className="jobsUpdate-item"
        />
      </Modal>
    </div>
  );
});

export default JobAdd;

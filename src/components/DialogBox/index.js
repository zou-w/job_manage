import React, { memo } from "react";
import { Modal, message } from "antd";

//从redux中获取管理的状态
import { changeShowDialog } from "@/store/slice/otherSlice";
import { useSelector, useDispatch } from "react-redux";
import { changeJobList } from "@/store/slice/jobSlice";

import { jobDelete, jobSearch } from "@/service/api/job";
const DialogBox = memo((props) => {
  const dispatch = useDispatch();
  const showDialog = useSelector((state) => state.other.showDialog);
  const { data, type, deleteType, com } = props;
  console.log("props", props);
  //打开,关闭modal
  const handleOkUpdate = () => {
    dispatch(changeShowDialog(!showDialog));
    //执行修改
    //发送请求,判断请求类型
  };
  const handleOkDelete = () => {
    dispatch(changeShowDialog(!showDialog));
    //执行删除
    switch (deleteType) {
      case "job":
        jobDelete({ id: data.id }).then((res) => {
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
        break;
    }
  };
  const handleCancel = () => {
    dispatch(changeShowDialog(!showDialog));
  };

  return (
    <>
      {type === "update" || type === "add" || type === "search" ? (
        // <Modal
        //   title="修改信息"
        //   open={showDialog}
        //   onOk={handleOkUpdate}
        //   onCancel={handleCancel}
        // >
        // </Modal>
        <div>{com}</div>
      ) : (
        <Modal
          title="确认删除吗?"
          open={showDialog}
          onOk={handleOkDelete}
          onCancel={handleCancel}
        >
          <p>请确定是否删除?</p>
        </Modal>
      )}
    </>
  );
});

export default DialogBox;

import React, { memo } from "react";
import { message } from "antd";

const user = memo(() => {
  const [messageApi, contextHolder] = message.useMessage();
  //定义一个promise
  async function waitMin() {
    return new Promise((resolve, reject) => {
      resolve(1);
    });
  }
  const clickMe = async () => {
    const data = await waitMin();
    console.log(data);
    if (data == 1) {
      messageApi.open({
        type: "success",
        content: data,
      });
    }
  };
  return (
    <div>
      {contextHolder}
      <button onClick={clickMe}>点我出现提示框</button>User
    </div>
  );
});

export default user;

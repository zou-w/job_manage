//工具函数

//将公司id转换成公司name
import { getCompanyInfo, getCompanyId } from "@/service/api/company";

import { useSelector, useDispatch } from "react-redux";
import { changeCompanyList } from "@/store/slice/companySlice";

//将id转换为名字
const useTransformId = (curId) => {
  //接收的参数为一个数组,数组里面元素为对象,对象里面存着companyId
  const dispatch = useDispatch();
  const state = useSelector((state) => state.company.companyList);
  if (state.length === 0) {
    let data = {
      current: "1",
      size: "50",
    };
    getCompanyInfo(data).then((res) => {
      dispatch(changeCompanyList(res.data.list));
    });
  }
  let companyList = [];
  //进行数据操作
  for (let i = 0; i < curId.length; i++) {
    const resData = state.filter((item) => {
      return item.id === curId[i].companyId;
    });
    companyList.push(resData[0]);
  }
  //   console.log("companyList", companyList);
  return companyList;
};

//将名字转换为id
const transformName = async (name) => {
  const res = await getCompanyId(name);
  return res.data[0].id;
};

//获取时间
const getTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return time;
};

export { useTransformId, transformName, getTime };

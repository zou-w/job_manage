//存储用户信息,登录状态,token状态等
import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
  name: "company",
  initialState: {
    //控制提示框显隐
    companyList: [],
    transformName: "",
  },
  reducers: {
    changeCompanyList(state, action) {
      state.companyList = action.payload;
    },
    changeTransformName(state, action) {
      state.transformName = action.payload;
    },
  },
});

export const { changeCompanyList, changeTransformName } = companySlice.actions;

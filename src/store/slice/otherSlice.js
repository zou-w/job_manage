//存储用户信息,登录状态,token状态等
import { createSlice } from "@reduxjs/toolkit";

export const otherSlice = createSlice({
  name: "other",
  initialState: {
    //控制提示框显隐
    showDialog: false,
    //控制室用户还是公司 路由
    isType: true,
  },
  reducers: {
    changeShowDialog(state, action) {
      state.showDialog = action.payload;
    },
    changeIsType(state, action) {
      state.isType = action.payload;
    },
  },
});

export const { changeShowDialog, changeIsType } = otherSlice.actions;

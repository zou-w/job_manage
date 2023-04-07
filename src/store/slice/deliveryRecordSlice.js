//存储用户信息,登录状态,token状态等
import { createSlice } from "@reduxjs/toolkit";

export const deliveryRecordSlice = createSlice({
  name: "deliveryRecord",
  initialState: {
    deliveryRecordList: {},
  },
  reducers: {
    changeDeliveryRecordList(state, action) {
      state.deliveryRecordList = action.payload;
    },
  },
});

export const { changeDeliveryRecordList } = deliveryRecordSlice.actions;

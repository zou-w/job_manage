//存储用户信息,登录状态,token状态等
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    hasToken: "",
    userInfo: {},
  },
  reducers: {
    updateUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export const { updateUserInfo } = userSlice.actions;

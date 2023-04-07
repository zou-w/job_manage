//存储用户信息,登录状态,token状态等
import { createSlice } from "@reduxjs/toolkit";

export const jobHunterSlice = createSlice({
  name: "jobHunter",
  initialState: {
    jobHunterList: [],
    curJobHunter: {},
  },
  reducers: {
    changeJobHunterList(state, action) {
      state.jobHunterList = action.payload;
    },
    changeCurJobHunter(state, action) {
      state.curJobHunter = action.payload;
    },
  },
});

export const { changeJobHunterList, changeCurJobHunter } =
  jobHunterSlice.actions;

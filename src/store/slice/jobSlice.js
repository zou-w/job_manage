//存储用户信息,登录状态,token状态等
import { createSlice } from "@reduxjs/toolkit";

export const jobSlice = createSlice({
  name: "job",
  initialState: {
    //控制提示框显隐
    jobList: [],
    curJob: {},
  },
  reducers: {
    changeJobList(state, action) {
      state.jobList = action.payload;
    },
    changeCurJob(state, action) {
      state.curJob = action.payload;
    },
  },
});

export const { changeJobList, changeCurJob } = jobSlice.actions;

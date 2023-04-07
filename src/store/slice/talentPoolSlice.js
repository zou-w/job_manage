import { createSlice } from "@reduxjs/toolkit";
//获取表格数据

export const talentPoolSlice = createSlice({
  name: "talentPool",
  initialState: {
    talentPoolList: [
      {
        key: "1",
        account: "902",
        companyId: "1",
        hiringResults: "录取",
        id: "1",
        positionName: "前端",
        userName: "张三",
      },
    ],
  },
  reducers: {
    updateTalentPoolList(state, action) {
      state.talentPoolList = action.payload;
    },
  },
});

export const { updateTalentPoolList } = talentPoolSlice.actions;

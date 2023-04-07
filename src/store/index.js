//创建store
import { configureStore } from "@reduxjs/toolkit";
//引入切片
import { talentPoolSlice } from "./slice/talentPoolSlice";
import { userSlice } from "./slice/userSlice";
import { otherSlice } from "./slice/otherSlice";
import { jobSlice } from "./slice/jobSlice";
import { jobHunterSlice } from "./slice/jobHunterSlice";
import { companySlice } from "./slice/companySlice";
import { deliveryRecordSlice } from "./slice/deliveryRecordSlice";

const store = configureStore({
  reducer: {
    talentPool: talentPoolSlice.reducer,
    user: userSlice.reducer,
    other: otherSlice.reducer,
    job: jobSlice.reducer,
    jobHunter: jobHunterSlice.reducer,
    company: companySlice.reducer,
    deliveryRecord: deliveryRecordSlice.reducer,
  },
});

export default store;

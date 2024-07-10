import { createSlice } from "@reduxjs/toolkit";
import { fetchActivitiesData } from "@/pages/api/activitiesAPI";
import { createGenericAsyncThunk } from "../common/asyncThunks";

// 創建一個異步 thunk，用於從 API 加載活動數據
export const fetchActivities = createGenericAsyncThunk(
  "activities/fetchActivities",
  fetchActivitiesData,
);

const activitySlice: any = createSlice({
  name: "activities",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.status = "failed";
        // state.error = action.payload;
      });
  },
});

export default activitySlice.reducer;

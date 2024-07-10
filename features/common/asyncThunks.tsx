import { createAsyncThunk } from "@reduxjs/toolkit";

// 通用的異步 Thunk 創建器
export const createGenericAsyncThunk = (actionType: any, apiFunction: any) => {
  return createAsyncThunk(actionType, async (_, { rejectWithValue }) => {
    try {
      const data = await apiFunction();
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  });
};

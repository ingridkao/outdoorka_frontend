import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LikeState } from "@/types/AuthType";
import { getCookie, USER_T0KEN_COOKIE } from "@/utils/cookieHandler";
import axios from "@/plugins/api/axios";
const { favorite } = axios;

export const showLikes = createAsyncThunk(
  "favorite/ids", 
  async () => {
    try {
      const getT0ken = getCookie(USER_T0KEN_COOKIE);
      if (getT0ken) {
        const res = await favorite.getFavorites();
        return res;
      } else {
        throw new Error("沒有權限");
      }
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

const likeSlice: any = createSlice({
  name: "likes",
  initialState: {
    likesList: [],
    likesCount: 0,
    error: null,
  } as LikeState,
  extraReducers: (builder: any) => {
    const { pending, fulfilled, rejected } = showLikes;
    builder.addCase(pending, (state: LikeState) => {
      state.error = null;
    });
    builder.addCase(rejected, (state: LikeState, action: any) => {
      state.error = action.error;
    });
    builder.addCase(fulfilled, (state: LikeState, action: any) => {
      if (action.payload.error) {
        state.error = action.payload.error;
        state.likesList = [];
        state.likesCount = 0;
      } else if (action.payload.data) {
        state.error = null;
        state.likesList = action.payload.data.map(
          (item: { _id: string; }) => item._id
        );
        state.likesCount = state.likesList.length;
      }
    });
  },
  reducers: {}
});

export default likeSlice.reducer;

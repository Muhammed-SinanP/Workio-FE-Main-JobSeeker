import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  refresh: false,
};

const refreshSlice = createSlice({
  name: "refresh",
  initialState: INITIAL_STATE,
  reducers: {
    toggleRefresh: (state, action) => {
      state.refresh = !state.refresh;
    },
  },
});

export const { toggleRefresh } = refreshSlice.actions;
export default refreshSlice.reducer;

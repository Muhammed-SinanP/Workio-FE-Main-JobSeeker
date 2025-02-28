import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  userLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    saveUserData: (state, action) => {
      state.userLoggedIn = true;
    },
    clearUserData: (state, action) => {
      state.userLoggedIn = false;
    },
  },
});

export const { saveUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;

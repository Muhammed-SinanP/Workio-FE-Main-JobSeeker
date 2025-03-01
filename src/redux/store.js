import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/userSlice";
import themeReducer from "./features/themeSlice";
import refreshReducer from "./features/refreshSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    refresh: refreshReducer,
  },
});

export default store;

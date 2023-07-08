import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./slices/data-slice";

export default configureStore({
  reducer: {
    data: dataSlice,
  },
});

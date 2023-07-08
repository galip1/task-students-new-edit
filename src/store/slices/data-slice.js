import { createSlice } from "@reduxjs/toolkit";

const items =
  localStorage.getItem("mediaData") == null
    ? []
    : JSON.parse(localStorage.getItem("mediaData"));

const initialState = {
  mediaData: items,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    sendData: (state, action) => {
      state.mediaData = action.payload;
    },
  },
});

export const { sendData } = dataSlice.actions;
export default dataSlice.reducer;

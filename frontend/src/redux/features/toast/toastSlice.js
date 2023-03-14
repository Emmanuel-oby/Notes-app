import { createSlice } from "@reduxjs/toolkit";
import {BsFillCheckCircleFill, BsFillExclamationCircleFill, BsFillInfoCircleFill} from 'react-icons/bs'

const initialState = {
  open: false,
  message: "",
  color: "#5bc0de",
  icon:""
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showGreenMessage(state, action) {
      state.open = true;
      state.message = action.payload;
      state.color = "#5cb85c";
    },
    showMessage(state, action) {
      state.open = true;
      state.message = action.payload;
      state.color = "#5bc0de";
    },
    showRedMessage(state, action) {
      state.open = true;
      state.message = action.payload;
      state.color = "#d9534f";
    },
    clearMessage(state, action) {
      state.message = "";
      state.open = false;
    },
  },
});
export const { ShowMessage, ClearMessage, ShowRedMessage, ShowGreenMessage } =
  toastSlice.actions;
export default toastSlice.reducer;
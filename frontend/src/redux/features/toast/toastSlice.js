import { createSlice } from "@reduxjs/toolkit";

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
      state.color = "#12cc53";
      state.icon = "bi:check-circle-fill";
    },
    showMessage(state, action) {
      state.open = true;
      state.message = action.payload;
      state.color = "#0285f7";
      state.icon = "bi:info-circle-fill";
    },
    showRedMessage(state, action) {
      state.open = true;
      state.message = action.payload;
      state.color = "#fc3503";
      state.icon = "bi:exclamation-circle-fill";
    },
    clearMessage(state, action) {
      state.message = "";
      state.open = false;
    },
  },
});
export const { showMessage, clearMessage, showRedMessage, showGreenMessage } =
  toastSlice.actions;
export default toastSlice.reducer;
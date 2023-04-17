import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state, action){
      state.user = null;
    }
  },
});
export const { saveUser, clearUser } =
  userSlice.actions;
export default userSlice.reducer;
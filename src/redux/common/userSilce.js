import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, { payload }) => {
      state.data = payload;
    },
  },
});

export const { getUser } = userSlice.actions;

export default userSlice.reducer;

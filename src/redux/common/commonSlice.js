import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  searchedData: null,
  selectedData: null,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    addData: (state, { payload }) => {
      state.data = payload;
    },
    searchData: (state, { payload }) => {
      if (payload) {
        const tempData = state.selectedData ?? state.data;
        const searchByUserId = tempData.filter((data) =>
          Number(data?.userId) === Number(payload)
        )
        const searchByTitle = tempData.filter((data) =>
          data?.title?.includes(payload)
        )
        state.searchedData = [...searchByUserId, ...searchByTitle]
      } else {
        state.searchedData = null
      }
    },
    filterData: (state, { payload }) => {
      if (payload) {
      const tempData = state.searchedData ?? state.data
      state.selectedData = tempData.filter((data) => data?.userId === payload)
      } else {
        state.selectedData = null
        state.searchedData = null
      }
    },
  },
});

export const { addData, searchData, filterData } = commonSlice.actions;

export default commonSlice.reducer;

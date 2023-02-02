import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

// Initial state
const initialState = {
  creatingCompany: null,
  creatingPageIndex: 1,
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCreatingCompany(state, action) {
      state.creatingCompany = action.payload;
    },
    setCreatingPageIndex(state, action) {
      state.creatingPageIndex = action.payload;
    },
  },
});

export const companyActions = companySlice.actions;

export default companySlice.reducer;

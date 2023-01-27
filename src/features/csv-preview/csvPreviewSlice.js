import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  csvData: [],
  csvHeads: [],
};

export const csvPreviewSlice = createSlice({
  name: 'csvPreview',
  initialState,
  // Define reducers and generate associated actions
  reducers: {
    setCSVData: (state, action) => {
      state.csvData = action.payload.data;
      state.csvHeads = action.payload.fields
    },
    clearCSVPreview: (state) => {
      state.csvData = [];
      state.csvHeads = [];
    }
  }
});

export const { setCSVData, clearCSVPreview } = csvPreviewSlice.actions;

// Selector Functions
export const selectCSVData = (state) => state.csvPreview.csvData;
export const selectCSVHeads = (state) => state.csvPreview.csvHeads;

export default csvPreviewSlice.reducer;

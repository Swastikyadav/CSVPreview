import { configureStore } from '@reduxjs/toolkit';
import csvPreviewReducer from "../features/csv-preview/csvPreviewSlice";

export const store = configureStore({
  reducer: {
    csvPreview: csvPreviewReducer,
  },
});

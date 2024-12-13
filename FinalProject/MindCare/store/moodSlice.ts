// src/store/moodSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MoodData } from '../api/saveMood';

// Define the state type
interface MoodState {
  isSaving: boolean;
  saveSuccess: boolean;
  error: string | null;
  isFetching: boolean;
  moods: any[];
}

// Initial state
const initialState: MoodState = {
  isSaving: false,
  saveSuccess: false,
  isFetching: false,
  error: null,
  moods: [],
};

const moodSlice = createSlice({
  name: 'mood',
  initialState,
  reducers: {
    saveMoodRequest: (state, action: PayloadAction<MoodData>) => {
      state.isSaving = true;
      state.saveSuccess = false;
      state.error = null;
    },
    saveMoodSuccess: (state) => {
      state.isSaving = false;
      state.saveSuccess = true;
    },
    saveMoodFailure: (state, action: PayloadAction<string>) => {
      state.isSaving = false;
      state.error = action.payload;
    },
    fetchMoodsRequest: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    fetchMoodsSuccess: (state, action: PayloadAction<any[]>) => {
      state.isFetching = false;
      state.moods = action.payload;
    },
    fetchMoodsFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    deleteMoodRequest: (state, action: PayloadAction<{ moodId: string }>) => {
      state.isFetching = true;
    },
    deleteMoodSuccess: (state, action) => {
      state.moods = state.moods.filter(mood => mood._id !== action.payload);
      state.isFetching = false;
    },
    deleteMoodFailure: (state, action) => {
      state.error = action.payload;
      state.isFetching = false;
    },
  },
});

export const { saveMoodRequest, saveMoodSuccess, saveMoodFailure, fetchMoodsRequest, fetchMoodsSuccess, fetchMoodsFailure, deleteMoodRequest, deleteMoodSuccess, deleteMoodFailure } = moodSlice.actions;
export default moodSlice.reducer;

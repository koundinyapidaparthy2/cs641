import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initializeAuthRequest: (state) => {
      state.loading = true;
    },
    initializeAuthSuccess: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.token = action.payload;
      state.isLoggedIn = !!action.payload;
    },
    initializeAuthFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    loginRequest: (state, action: PayloadAction<{ email: string; password: string }>) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ token: string }>) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    signUpRequest: (state, action: PayloadAction<{ name: string; email: string; password: string; dateOfBirth: string }>) => {
      state.loading = true;
      state.error = null;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export const { 
  loginRequest, loginSuccess, loginFailure,
  signUpRequest, logOut, initializeAuthRequest, 
  initializeAuthSuccess, initializeAuthFailure } = authSlice.actions;


export default authSlice.reducer;

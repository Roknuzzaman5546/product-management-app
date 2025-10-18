// store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  token: string | null;
  email?: string | null;
};

const initialState: AuthState = {
  token: null,
  email: null
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<{ token: string; email?: string }>) {
      state.token = action.payload.token;
      state.email = action.payload.email ?? null;
    },
    logout(state) {
      state.token = null;
      state.email = null;
    },
  },
});

export const { setToken, logout } = slice.actions;
export default slice.reducer;

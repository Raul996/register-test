import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import localApi from "../../Axios/axios";
import axios from "axios";

export type UserRequest = {
  email: string;
  name: string;
  password: string;
};

export type User = {
  email: string;
  name: string;
};

export type RegistareState = {
  isLoading: boolean;
  hasError: boolean;
  user?: User;
  error?: Error;
};

export type Error = {
  message: string;
  status: number;
};

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (user: UserRequest, { rejectWithValue }): Promise<User | unknown> => {
    try {
      const response = await localApi.post("/user/register", user);

      return response.data as User;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue({
          message: err.response?.data.error,
          status: err.response?.status,
        });
      }

      return rejectWithValue({
        message: "Something went wrong",
        status: 500,
      });
    }
  }
);

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    isLoading: false,
    hasError: false,
    error: undefined,
    user: undefined,
  } as RegistareState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = {
        email: "",
        name: "",
      };
    },
    resetError: (state) => {
      state.hasError = false;
      state.error = undefined;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload as User;
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.hasError = true;
      state.error = action.payload as Error;
    });
  },
});

export const { addUser, resetUser, resetError } = registerSlice.actions;
export default registerSlice.reducer;

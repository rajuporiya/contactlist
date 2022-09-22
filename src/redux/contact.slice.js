import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
};

export const getAllContact = createAsyncThunk(
  "contact/getAllContact",
  async (_, thunkApi) => {
    try {
      const respose = await fetch("https://reqres.in/api/users", {
        signal: thunkApi.signal,
      });
      const data = await respose.json();
      return data.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const constSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllContact.pending, (state, payload) => {
        state.isLoading = true;
      })
      .addCase(getAllContact.fulfilled, (state, payload) => {
        state.isLoading = false;
        state.user = payload.payload;
        state.isSuccess = true;
      })
      .addCase(getAllContact.rejected, (state, payload) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default constSlice.reducer;

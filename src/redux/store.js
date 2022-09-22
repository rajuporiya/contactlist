import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./contact.slice";
const store = configureStore({
  reducer: {
    contact: contactReducer,
  },
});

export default store;

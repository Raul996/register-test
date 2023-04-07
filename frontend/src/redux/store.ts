import { configureStore } from "@reduxjs/toolkit";
import registerReduser from "./reducers/registerReduser";

const store = configureStore({
  reducer: { registerReduser },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

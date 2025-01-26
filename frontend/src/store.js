import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { hackathonApi } from "./service/api";

export const store = configureStore({
  reducer: {
    [hackathonApi.reducerPath]: hackathonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hackathonApi.middleware),
});

setupListeners(store.dispatch);

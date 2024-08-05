import { configureStore } from "@reduxjs/toolkit";

import kubernetesSlice from "@/components/kubernetes-visualizer/kubernetes-slice";
import appSlice from "@/store/app-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      app: appSlice,
      kubernetes: kubernetesSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

import { configureStore } from "@reduxjs/toolkit";

import kubernetesSlice from "@/components/kubernetes-visualizer/kubernetes-slice";
import appSlice from "@/store/app-slice";

export const store = configureStore({
  reducer: {
    app: appSlice,
    kubernetes: kubernetesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

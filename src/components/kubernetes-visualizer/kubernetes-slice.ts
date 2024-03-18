import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Pod = {
  id: string;
  createdAt: string;
  status: "Running" | "Terminating" | "Pending" | "Failed" | "CrashLoopBackOff";
};

type Service = {
  id: number;
  name: string;
  pods: { [podId: string]: Pod };
  createdAt: string;
};

type Namespace = {
  services: { [serviceId: string]: Service };
};

const initialState: Namespace = {
  services: {
    "1": {
      id: 1,
      name: "blacksmith-forge",
      createdAt: new Date().toISOString(),
      pods: {
        "1": {
          id: "1",
          createdAt: new Date().toISOString(),
          status: "Running",
        },
      },
    },
  },
};

export const kubernetesSlice = createSlice({
  name: "kubernetes",
  initialState,
  reducers: {
    addService: (state, action: PayloadAction<string>) => {
      const newServiceId = Object.keys(state.services).length + 1;
      state.services[newServiceId] = {
        id: newServiceId,
        name: action.payload,
        createdAt: new Date().toISOString(),
        pods: {},
      };
    },
    removeService: (state, action: PayloadAction<number>) => {
      if (!state.services[action.payload]) {
        return;
      }
      delete state.services[action.payload];
    },
    addPod: (
      state,
      action: PayloadAction<{ serviceId: number; podId: string }>,
    ) => {
      if (!state.services?.[action.payload.serviceId]) {
        return;
      }
      state.services[action.payload.serviceId].pods[action.payload.podId] = {
        id: action.payload.podId,
        createdAt: new Date().toISOString(),
        status: "Pending",
      };
    },
    updatePod: (
      state,
      action: PayloadAction<{
        serviceId: number;
        podId: string;
        status: Pod["status"];
      }>,
    ) => {
      if (
        !state.services?.[action.payload.serviceId].pods?.[action.payload.podId]
      ) {
        return;
      }
      state.services[action.payload.serviceId].pods[
        action.payload.podId
      ].status = action.payload.status;
    },
    removePod: (
      state,
      action: PayloadAction<{ serviceId: number; podId: string }>,
    ) => {
      if (
        !state.services?.[action.payload.serviceId].pods?.[action.payload.podId]
      ) {
        return;
      }
      delete state.services[action.payload.serviceId].pods[
        action.payload.podId
      ];
    },
  },
});

export const { addService, removeService, addPod, updatePod, removePod } =
  kubernetesSlice.actions;

export default kubernetesSlice.reducer;

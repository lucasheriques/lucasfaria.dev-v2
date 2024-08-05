import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AppState {
  currentHeading: string;
  sandboxActiveView: "preview" | "console";
  theme: "light" | "dark";
}

const initialState: AppState = {
  currentHeading: "introduction",
  sandboxActiveView: "preview",
  theme: "light",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentHeading: (state, action: PayloadAction<string>) => {
      state.currentHeading = action.payload;
    },
    setSandboxActiveView: (
      state,
      action: PayloadAction<"preview" | "console">,
    ) => {
      state.sandboxActiveView = action.payload;
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
  },
});

export const { setCurrentHeading, setSandboxActiveView, setTheme } =
  appSlice.actions;
export default appSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AppState {
  currentHeading: string;
  sandboxActiveView: "preview" | "console";
  currentTheme: "light" | "dark";
}

const initialState: AppState = {
  currentHeading: "introduction",
  sandboxActiveView: "preview",
  currentTheme: "light",
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
    setCurrentTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.currentTheme = action.payload;
    },
  },
});

export const { setCurrentHeading, setSandboxActiveView, setCurrentTheme } =
  appSlice.actions;
export default appSlice.reducer;

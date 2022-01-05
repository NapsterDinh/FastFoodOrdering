import { createSlice, current } from "@reduxjs/toolkit";

// toogle show hide panel cart
const initialState = {
  user: "",
  selectedBranch: '',
  acceptCookie: false,
  covid19: false
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userReducer: (state, action) => {
      switch (action.payload.type) {
        case 'SET_SELECTED_BRANCH':
          state.selectedBranch = action.payload.branch
          break;
        case 'SET_ACCEPT_COOKIE':
            state.acceptCookie = action.payload.acceptCookie
            break;
        case 'SET_COVID_19':
          state.covid19 = action.payload.covid19
          break;
        default:
          state.user = action.payload;
          break;
      }
    },
  },
});
export const { userReducer } = counterSlice.actions;

export default counterSlice.reducer;

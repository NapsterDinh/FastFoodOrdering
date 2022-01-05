import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationList: "",
};

export const manageNotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    loadingNotifications: (state, action) => {
        //call api
        state.notificationList = action.payload
    },
    readAllNotifications: (state, action) => {
        state.notificationList = action.payload;
    },
    readNotificationById: (state, action) => {
        state.notificationList = action.payload;
    },
    deleteNotificationById: (state, action) => {
        state.notificationList = state.notificationList.splice(action.payload.chooseId, 1)
    },
  },
});

export const { loadingNotifications, deleteNotificationById, 
    readNotificationById, readAllNotifications } = manageNotificationSlice.actions;

export default manageNotificationSlice.reducer;

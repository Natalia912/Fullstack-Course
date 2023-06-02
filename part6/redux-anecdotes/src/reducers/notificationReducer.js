import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    unsetNotification(state, action) {
      return ""
    }
  }
})

export const newNotification = (text, time = 5) => {
  return async dispatch => {
    dispatch(setNotification(text))
    setTimeout(() => dispatch(unsetNotification()), time * 1000)
  }
}

export const { setNotification, unsetNotification } = notificationSlice.actions
export default notificationSlice.reducer
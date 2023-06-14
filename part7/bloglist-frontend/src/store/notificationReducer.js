/* eslint-disable no-undef */
import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  message: "",
  isSuccess: false
}

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      state.message = action.payload.message
      state.isSuccess = action.payload.isSuccess
    },
    unsetNotification() {
      return initialState
    }
  }
})

export const { setNotification, unsetNotification } = notificationSlice.actions

export const notificationPopup = (message, isSuccess) => {
  return dispatch => {
    dispatch(setNotification({ message, isSuccess }))
    setTimeout(() =>
      dispatch(unsetNotification()),
    3000
    )
  }}


export default notificationSlice.reducer
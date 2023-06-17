import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "./notificationReducer"
import blogsReducer from "./blogsReducer"
import userReducer from "./userReducer"

export default configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer
  }
})
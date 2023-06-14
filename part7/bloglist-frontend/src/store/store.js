import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "./notificationReducer"
import blogsReducer from "./blogsReducer"

export default configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer
  }
})
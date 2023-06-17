import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "./notificationReducer"
import blogsReducer from "./blogsReducer"
import userReducer from "./userReducer"
import usersReducer from "./usersReducer"

export default configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
    users: usersReducer
  }
})
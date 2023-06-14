import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import { notificationPopup } from "./notificationReducer"
import loginUser from "../services/login"


const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    unsetUser() {
      return null
    }
  }
})

export const { setUser, unsetUser } = userSlice.actions

export const getUserFromLocalStorage = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem("user")

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      await blogService.setToken(user.token)
      dispatch(notificationPopup(`Welcome, ${user.name}`, true))
    }
  }
}

export const loginUserFunction = (user) => {
  return dispatch => {
    loginUser(user).then(data => {
      dispatch(setUser(data))
      blogService.setToken(data.token)
      window.localStorage.setItem("user", JSON.stringify(data))
      dispatch(notificationPopup(`Welcome, ${data.username}`, true))
    }).catch(() => {
      dispatch(notificationPopup("invalid username or password", false))
    })
  }
}

export const logOutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem("user")
    dispatch(unsetUser())
    dispatch(notificationPopup("You have successfully logged out", true))
  }
}

export default userSlice.reducer
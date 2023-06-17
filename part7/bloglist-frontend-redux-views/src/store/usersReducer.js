import { createSlice } from "@reduxjs/toolkit"
import userService from "../services/users"

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    }
  }
})

export const { setUsers } = usersSlice.actions

export const getAllUsers = () => {
  return async dispatch => {
    const data = await userService.users()
    dispatch(setUsers(data))
  }
}

export default usersSlice.reducer
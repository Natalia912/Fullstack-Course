import { createContext, useReducer } from "react"

const UserContext = createContext()

const userReducer = (state, action) => {
  switch(action.type) {
  case "SET":
    return action.payload
  case "UNSET":
    return null
  default:
    return state
  }
}

export const UserContextProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, null)
  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
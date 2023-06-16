import { createContext, useReducer } from "react"

const NotificationContext = createContext()

const initialState = {
  message: "",
  isSuccess: false
}

const notificationReducer = (state, action) => {
  switch(action.type) {
  case "SET":
    return action.payload
  case "UNSET":
    return initialState
  default:
    return state
  }
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, initialState)

  const notificationPopup = (message, isSuccess) => {
    notificationDispatch({
      type: "SET",
      payload: {
        message,
        isSuccess
      } })
    setTimeout(() => {notificationDispatch({ type: "UNSET" })}, 3000)
  }
  return (
    <NotificationContext.Provider value={{ notification, notificationPopup }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
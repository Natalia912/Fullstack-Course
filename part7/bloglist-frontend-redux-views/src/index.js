import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { RouterProvider } from "react-router-dom"
import { router } from "./views/router"
import store from "./store/store"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
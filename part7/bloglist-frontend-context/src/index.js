import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import Provider from "./store/provider"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider>
    <App />
  </Provider>
)
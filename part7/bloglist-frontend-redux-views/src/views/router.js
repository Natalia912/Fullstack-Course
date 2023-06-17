import { createBrowserRouter } from "react-router-dom"
import BlogsList from "./BlogsList"
import Users from "./Users"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BlogsList />
  },
  {
    path: "users",
    element: <Users />
  }
])
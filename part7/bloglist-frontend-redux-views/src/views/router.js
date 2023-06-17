import { createBrowserRouter } from "react-router-dom"
import BlogsList from "./BlogsList"
import Users from "./Users"
import User from "./User"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BlogsList />
  },
  {
    path: "users",
    element: <Users />,
  },
  {
    path: "users/:userId",
    element: <User />
  }
])
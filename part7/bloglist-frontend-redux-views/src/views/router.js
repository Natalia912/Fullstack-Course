import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import BlogsList from "./BlogsList"
import Users from "./Users"
import User from "./User"
import Blog from "./Blog"
import App from "../App"

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<BlogsList />} />
      <Route path="users" element={<Users />} />
      <Route path="users/:userId" element={<User />} />
      <Route path="blogs/:blogId" element={<Blog />} />
    </Route>
  )
)
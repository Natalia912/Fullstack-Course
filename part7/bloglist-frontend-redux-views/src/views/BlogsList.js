import { useSelector } from "react-redux"
import Blog from "../components/Blog"
import NewBlogForm from "../components/NewBlogForm"
import Togglable from "../components/Togglable"

const BlogsList = () => {
  const blogs = useSelector(state => state.blogs)
  const loggedUser = useSelector(state => state.user)
  return (
    <div>
      { loggedUser &&
        <Togglable label="new blog">
          <NewBlogForm />
        </Togglable>
      }
      <div>
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
      </div>
    </div>
  )
}

export default BlogsList
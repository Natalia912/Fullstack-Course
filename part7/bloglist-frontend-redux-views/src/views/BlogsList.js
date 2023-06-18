import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import NewBlogForm from "../components/NewBlogForm"
import Togglable from "../components/Togglable"

const BlogsList = () => {
  const blogs = useSelector(state => state.blogs)
  const loggedUser = useSelector(state => state.user)

  const blogStyles = {
    border: "1px solid black",
    padding: "1rem",
    marginBottom: "1rem",
  }
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
            <Link key={blog.id} to={`blogs/${blog.id}`}>
              <p style={blogStyles}>{blog.title} {blog.author}</p>
            </Link>
          )}
      </div>
    </div>
  )
}

export default BlogsList
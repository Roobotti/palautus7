import Blogs from './Blogs'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Home = ({ user, blogs, addBlog, BlogFormRef }) => {
  return (
    <div>
      {user && (
        <div>
          <Togglable buttonLabel="new blog" ref={BlogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      )}
      <Blogs blogs={blogs} />
    </div>
  )
}

export default Home

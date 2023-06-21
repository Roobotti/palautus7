import { Link } from 'react-router-dom'
import { StyledLink } from '../styled'

const Blogs = ({ blogs }) => {
  if (!blogs) return null
  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <br />
          <StyledLink to={`../blogs/${blog.id}`}>{blog.title}</StyledLink>
          <br />
        </div>
      ))}
    </div>
  )
}

export default Blogs

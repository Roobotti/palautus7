import { Button, RedButton } from '../styled'
import Comments from './Comments'

const BlogDetails = ({ blog, user, handleDelete, handleLike }) => {
  if (!blog) {
    return null
  }
  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        {''}
        <a href={blog.url}> {blog.url}</a>
        {''}
        <div>
          likes {blog.likes} <Button onClick={handleLike}>like</Button>
        </div>
        <div>{blog.user && blog.user.name}</div>
        {user && blog.user.username === user.username && (
          <RedButton onClick={handleDelete}>delete</RedButton>
        )}
      </div>
      <Comments blog={blog} />
    </div>
  )
}

export default BlogDetails

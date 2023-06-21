import { useState } from 'react'
import Togglable from './Togglable'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../actions/notification'
import { commentBlog } from '../reducers/blogReducer'

const Comments = ({ blog }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(comment)
    await dispatch(commentBlog(blog, comment))
    dispatch(setNotification('comment added', false))
    setComment('')
  }

  const BlogFormRef = useRef()
  return (
    <div>
      <h4>comments</h4>
      <div>
        <Togglable buttonLabel="add comment" ref={BlogFormRef}>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                value={comment}
                onChange={({ target }) => setComment(target.value)}
                id="comment-input"
              />
            </div>
            <button id="comment-button" type="submit">
              add comment
            </button>
          </form>
        </Togglable>
      </div>
      <div>
        {blog.comments &&
          blog.comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
      </div>
    </div>
  )
}

export default Comments

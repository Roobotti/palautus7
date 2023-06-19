import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, loggedUser }) => {
  const [showDetails, setShowDetails] = useState(false)

  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
      handleDelete(blog.id)
    }
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className="blog">
      <div className="title">
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>{showDetails ? 'Hide' : 'View'}</button>
      </div>
      {showDetails && (
        <div className="details">
          <div>{blog.url}</div>
          <div>
            {blog.likes}{' '}
            <button onClick={() => handleLike(blog.id)}>like </button>
          </div>
          <div>{blog.user.name}</div>
          {loggedUser && blog.user.username === loggedUser.username && (
            <button onClick={handleDeleteClick}>delete</button>
          )}
        </div>
      )}
    </div>
  )
}
export default Blog

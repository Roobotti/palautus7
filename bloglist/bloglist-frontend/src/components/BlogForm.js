import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      important: true,
    })

    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }

  return (
    <div className="formDiv">
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          title
          <input
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
            id="title-input"
          />
        </div>
        <div>
          author
          <input
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
            id="author-input"
          />
        </div>
        <div>
          url
          <input
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
            id="url-input"
          />
        </div>
        <button id="post-button" type="submit">
          post
        </button>
      </form>
    </div>
  )
}

export default BlogForm

import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newMessage, setNewMessage] = useState({ message: null, error: false })
  const [newBlog, setNewBlog] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  //const [loginFormVisible, setLoginFormVisible] = useState(false)

  const [oldTimeout, setOldTimeout] = useState(0)

  const [tokenChanged, setTokenChanged] = useState(false)

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs)
    })
  }, [newBlog])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    setTokenChanged(false)
  }, [tokenChanged])

  const showMessage = (message, error = false) => {
    console.log(message)
    clearTimeout(oldTimeout)
    setNewMessage({ message: message, error: error })
    const timeout = setTimeout(
      () => setNewMessage({ message: null, error: false }),
      2000
    )
    setOldTimeout(timeout)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      //setLoginFormVisible(false)
      showMessage('login success', false)
    } catch (exception) {
      showMessage('wrong username or password', true)
    }
  }

  const handleLike = async (blogId) => {
    const updatedBlogs = blogs.map((blog) => {
      if (blog.id === blogId) {
        return { ...blog, likes: blog.likes + 1 }
      }
      return blog
    })

    try {
      await blogService.update(
        blogId,
        updatedBlogs.find((blog) => blog.id === blogId)
      )
      setBlogs(updatedBlogs)
      showMessage(`${blogs.find((b) => b.id === blogId).title} liked`, false)
    } catch (error) {
      console.error('Failed to update likes:', error)
    }
  }

  const handleDelete = async (blogId) => {
    const updatedBlogs = blogs.filter((b) => b.id !== blogId)

    try {
      await blogService.deleteOne(blogId)
      setBlogs(updatedBlogs)
      showMessage('Blog deleted')
    } catch (error) {
      showMessage('Blog was allready deleted:', true)
    }
  }

  const addBlog = async (blogObject) => {
    BlogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blogObject)
      setNewBlog(returnedBlog)
      showMessage(
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        false
      )
    } catch (error) {
      showMessage('add title and author', true)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    //setLoginFormVisible(true)
  }

  const BlogFormRef = useRef()
  const LoginFormRef = useRef()

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={newMessage.message} error={newMessage.error} />

      {!user && (
        <Togglable buttonLabel="log in" ref={LoginFormRef}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      )}

      {user && (
        <div>
          <p>{user.name} logged in </p>
          <button onClick={() => logout()}>logout </button>
          <Togglable buttonLabel="new blog" ref={BlogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      )}

      {
        <div>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={handleLike}
                handleDelete={handleDelete}
                loggedUser={user}
              />
            ))}
        </div>
      }
    </div>
  )
}

export default App

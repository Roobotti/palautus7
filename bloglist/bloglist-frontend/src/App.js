import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import loginService from './services/login'
import storage from './services/storage'
import { setUser, removeUser } from './reducers/userReducer'

import {
  createBlog,
  initializeBlogs,
  likeBlog,
  deleteBlog,
} from './reducers/blogReducer'

import { setNotification } from './actions/notification'

const App = () => {
  const dispatch = useDispatch()

  const newMessage = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //const [loginFormVisible, setLoginFormVisible] = useState(false)

  const [oldTimeout, setOldTimeout] = useState(0)
  useEffect(() => {
    const storedUser = storage.loadUser()
    if (storedUser) {
      dispatch(setUser(storedUser))
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch, blogs])

  const showMessage = (message, error = false) => {
    clearTimeout(oldTimeout)
    dispatch(setNotification(message, error))
    const timeout = setTimeout(
      () => setNotification({ message: null, error: false }),
      2000
    )
    setOldTimeout(timeout)
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const newUser = await loginService.login({
        username,
        password,
      })
      console.log(newUser)
      dispatch(setUser(newUser))
      setUsername('')
      setPassword('')
      //setLoginFormVisible(false)
      LoginFormRef.current.toggleVisibility()
      showMessage('login success', false)
    } catch (exception) {
      showMessage('wrong username or password', true)
    }
  }

  const handleLike = async (blog) => {
    console.log('user', user)
    await dispatch(likeBlog(blog))
    //dispatch(initializeBlogs())
    dispatch(setNotification(`blog ${blog.title} liked`, false))
  }

  const handleDelete = async (blog) => {
    await dispatch(deleteBlog(blog))
    //dispatch(initializeBlogs())
    dispatch(setNotification(`blog ${blog.title} deleted`, false))
  }

  const addBlog = async (blog) => {
    BlogFormRef.current.toggleVisibility()
    dispatch(createBlog(blog))
    dispatch(setNotification(`blog ${blog.title} added`, false))
  }

  const logout = async () => {
    await dispatch(removeUser())
    LoginFormRef.current.toggleVisibility()
    dispatch(setNotification('logged out', false))
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
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              like={() => handleLike(blog)}
              canRemove={user && blog.user.username === user.username}
              remove={() => handleDelete(blog)}
            />
          ))}
        </div>
      }
    </div>
  )
}

export default App

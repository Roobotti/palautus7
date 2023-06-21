import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BlogDetails from './components/Blog'
import { Routes, Route, Link, useMatch, Navigate } from 'react-router-dom'

import Blogs from './components/Blogs'
import Users from './components/Users'
import UserPage from './components/UserPage'
import Home from './components/Home'

import Notification from './components/Notification'
import Login from './components/Login'

import storage from './services/storage'
import { setUser, removeUser } from './reducers/userReducer'

import {
  createBlog,
  initializeBlogs,
  likeBlog,
  deleteBlog,
} from './reducers/blogReducer'

import { setNotification } from './actions/notification'
import { Button, Navigation, Page, RedButton, StyledLink } from './styled'

const App = () => {
  const dispatch = useDispatch()

  const newMessage = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const [timeoutId, setTimeoutId] = useState(null)

  const BlogFormRef = useRef()
  const LoginFormRef = useRef()

  useEffect(() => {
    const storedUser = storage.loadUser()
    console.log('storedUser', storedUser)
    if (storedUser) {
      dispatch(setUser(storedUser))
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch, blogs])

  useEffect(() => {
    clearTimeout(timeoutId)

    if (newMessage) {
      const newTimeoutId = setTimeout(
        () => dispatch(setNotification(null)),
        3000
      )
      setTimeoutId(newTimeoutId)
    }
  }, [newMessage])

  const handleLike = async (blog) => {
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
    console.log('userNOW', user)
    await dispatch(createBlog(blog))
    await dispatch(initializeBlogs())
    dispatch(setNotification(`blog ${blog.title} added`, false))
  }

  const logout = async () => {
    await dispatch(removeUser())
    LoginFormRef.current.toggleVisibility()
    dispatch(setNotification('logged out', false))
  }

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  return (
    <Page>
      <h1>Blog app</h1>
      <Notification message={newMessage.message} error={newMessage.error} />
      <div>
        <Navigation>
          <StyledLink to={'/blogs'}>blogs</StyledLink>
          <StyledLink to={'/users'}>users</StyledLink>
        </Navigation>
        <br />
        {user ? (
          <div>
            {user.name} logged in
            <RedButton onClick={() => logout()}>logout </RedButton>
          </div>
        ) : (
          <StyledLink className="padding" to="/Login">
            login
          </StyledLink>
        )}
      </div>

      <Routes>
        <Route path="/users/:id" element={<UserPage />} />
        <Route
          path="/blogs/:id"
          element={
            <BlogDetails
              blog={blog}
              user={user}
              handleDelete={() => handleDelete(blog)}
              handleLike={() => handleLike(blog)}
            />
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/blogs" element={<Blogs blogs={blogs} />} />
        <Route
          path="/Login"
          element={!user ? <Login /> : <Navigate replace to="/" />}
        />
        <Route
          path="/"
          element={
            <Home
              user={user}
              blogs={blogs}
              addBlog={addBlog}
              BlogFormRef={BlogFormRef}
            />
          }
        />
      </Routes>
    </Page>
  )
}

export default App

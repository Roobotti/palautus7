import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const slice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    like(state, action) {
      console.log('like')
      const id = action.payload
      const toLike = state.find((s) => s.id === id)
      const liked = { ...toLike, likes: toLike.likes + 1 }
      return state.map((s) => (s.id === id ? liked : s))
    },
    replaceBlog(state, action) {
      const replaced = action.payload
      return state.map((s) => (s.id === replaced.id ? replaced : s))
    },
    delBlog(state, action) {
      const blog = action.payload
      return state.filter((s) => s.id !== blog.id)
    },
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      return state.concat(action.payload)
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (object) => {
  return async (dispatch) => {
    const blog = await blogService.create(object)
    dispatch(addBlog(blog))
  }
}

export const likeBlog = (object) => {
  const toLike = { ...object, likes: object.likes + 1 }
  return async (dispatch) => {
    const blog = await blogService.update(toLike)
    dispatch(replaceBlog(blog))
  }
}

export const deleteBlog = (object) => {
  console.log(object.id)
  return async (dispatch) => {
    try {
      const blog = await blogService.deleteOne(object.id)
      //dispatch(delBlog(blog))
    } catch (error) {
      console.log(error)
    }
  }
}

export const { setBlogs, addBlog, replaceBlog, delBlog, like } = slice.actions
export default slice.reducer

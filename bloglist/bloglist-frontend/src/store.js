import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import blogSlice from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import allUsersReducer from './reducers/allUsersReducer'

const store = configureStore({
  reducer: {
    blogs: blogSlice,
    notification: notificationReducer,
    user: userReducer,
    users: allUsersReducer,
  },
})

export default store

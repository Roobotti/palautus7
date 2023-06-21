import { createSlice } from '@reduxjs/toolkit'
import usersServices from '../services/users'

const slice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    sGetUsers(state, action) {
      return action.payload
    },
  },
})

export const getUsers = () => {
  return async (dispatch) => {
    const users = await usersServices.getAllUsers()
    dispatch(sGetUsers(users))
  }
}

export const { sGetUsers } = slice.actions
export default slice.reducer

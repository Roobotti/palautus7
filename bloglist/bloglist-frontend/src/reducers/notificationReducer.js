import { SET_NOTIFICATION } from '../actions/notification'

const initialState = {
  message: null,
  error: false,
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return {
        message: action.payload.message,
        error: action.payload.error,
      }
    default:
      return state
  }
}

export default notificationReducer

export const SET_NOTIFICATION = 'SET_NOTIFICATION'

export const setNotification = (message, error) => {
  return {
    type: SET_NOTIFICATION,
    payload: {
      message,
      error,
    },
  }
}

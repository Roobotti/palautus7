import { createContext, useState } from 'react'
import loginService from '../services/login'
import { setUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../actions/notification'

const LoginContext = createContext()

const LoginProvider = ({ children }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event) => {
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
      dispatch(setNotification('login success', false))
    } catch (exception) {
      dispatch(setNotification('wrong username or password', true))
    }
  }

  const loginContextValue = {
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
    handleSubmit,
  }

  return (
    <LoginContext.Provider value={loginContextValue}>
      {children}
    </LoginContext.Provider>
  )
}

export { LoginContext, LoginProvider }

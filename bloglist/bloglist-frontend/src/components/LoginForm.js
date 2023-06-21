import { useContext } from 'react'
import { LoginContext } from '../context/loginContext'
import { Button, InputField } from '../styled'

const LoginForm = () => {
  const {
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password,
  } = useContext(LoginContext)

  const passwordIsInvalid = password.length < 4
  const usernameIsInvalid = username.length < 4
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username:
          <InputField
            value={username}
            onChange={handleUsernameChange}
            isInvalid={usernameIsInvalid}
          />
        </div>
        <br />
        <div>
          password:
          <InputField
            type="password"
            value={password}
            onChange={handlePasswordChange}
            isInvalid={passwordIsInvalid}
          />
        </div>
        <Button id="login-button" type="submit">
          login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm

import { Link } from 'react-router-dom'
import { StyledLink } from '../styled'

const User = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <tr>
      <td>
        <br />
        <StyledLink to={`../users/${user.id}`}>{user.name}</StyledLink>
        <br />
      </td>
      <td>{user.blogs.length}</td>
    </tr>
  )
}

export default User

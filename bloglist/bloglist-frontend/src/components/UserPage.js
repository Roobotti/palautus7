import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../reducers/allUsersReducer'
import { StyledLink } from '../styled'

const UserPage = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const { id } = useParams()
  const user = users.find((user) => user.id === id)

  if (!user || !user.blogs) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h1>added blogs</h1>
      {user.blogs.map((blog) => (
        <li key={blog.id}>
          <br />
          <StyledLink to={`../blogs/${blog.id}`}>{blog.title}</StyledLink>
          <br />
        </li>
      ))}
    </div>
  )
}

export default UserPage

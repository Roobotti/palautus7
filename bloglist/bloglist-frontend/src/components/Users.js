import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
//import User from './User'
import { Table } from 'react-bootstrap'
import { getUsers } from '../reducers/allUsersReducer'
import User from './User'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  return (
    <div>
      <h2>Users</h2>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th scope="col">blogs added</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import UserPaginate from '../components/UserPaginate'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'
import { deleteUser, getUsersList } from '../actions/userActions'

const UserListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pageNumber } = useParams() || 1
  const userList = useSelector((state) => state.userList)
  const { loading, error, usersList, pages, page } = userList
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const userDelete = useSelector((state) => state.userDelete)
  const { success } = userDelete

  const deleteHandler = (id, name) => {
    if (window.confirm(`Are you sure want to delete ${name}`)) {
      dispatch(deleteUser(id))
      if (usersList.length === 1) {
        navigate(`/admin/users/${pageNumber - 1}`)
      }
    }
  }
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUsersList(pageNumber))
    } else {
      navigate('/')
    }
  }, [dispatch, navigate, success, userInfo, pageNumber])
  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    <Button
                      as={Link}
                      to={`/admin/users/${user._id}/edit`}
                      variant='light'
                      className='btn-sm'
                    >
                      <i className='fas fa-edit' />
                    </Button>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(user._id, user.name)}
                    >
                      <i className='fas fa-trash' />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <UserPaginate pages={pages} page={page} />
        </>
      )}
    </>
  )
}

export default UserListScreen

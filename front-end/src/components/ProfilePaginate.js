import React from 'react'
import { Pagination } from 'react-bootstrap'
import { useNavigate } from 'react-router'

const ProfilePaginate = ({ pages, page, isAdmin = false, userId }) => {
  const navigate = useNavigate()
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item
            key={x + 1}
            active={x + 1 === page}
            activeLabel={false}
            onClick={() =>
              !isAdmin
                ? navigate(`/profile/${x + 1}`)
                : navigate(`/admin/users/${userId}/edit/${x + 1}`)
            }
          >
            {x + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )
  )
}

export default ProfilePaginate

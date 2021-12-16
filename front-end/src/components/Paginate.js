import React from 'react'
import { Pagination } from 'react-bootstrap'
import { useNavigate } from 'react-router'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
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
                ? keyword
                  ? navigate(`/search/${keyword}/page/${x + 1}`)
                  : navigate(`/page/${x + 1}`)
                : navigate(`/admin/products/${x + 1}`)
            }
          >
            {x + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )
  )
}

export default Paginate

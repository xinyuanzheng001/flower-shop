import React from 'react'
import { Pagination } from 'react-bootstrap'
import { useNavigate } from 'react-router'

const CategoryPaginate = ({ category, pages, page, vip = false }) => {
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
              !vip
                ? navigate(`/${category}/${x + 1}`)
                : navigate(`/vip/${x + 1}`)
            }
          >
            {x + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )
  )
}

export default CategoryPaginate

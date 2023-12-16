import React from 'react'
import Summary from './Summary'
import RowsPerPage from './RowsPerPage'
import Paginate from './Paginate'


export default function Pagination(props) {
  const {
    meta: {
      from, to, total, per_page: perPage, last_page: lastPage, current_page: currentPage,
    },
    setPerPage,
    setPage,
  } = props

  return (
    <div className="row align-items-center justify-content-center">
      <Summary from={from} to={to} total={total} />
      <RowsPerPage perPage={perPage} setPerPage={setPerPage} />
      <Paginate currentPage={currentPage} lastPage={lastPage} setPage={setPage} />
    </div>
  )
}

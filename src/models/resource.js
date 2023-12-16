
const getTo = (total, page, perPage) => {
  if (page === 1) {
    return total < perPage ? total : perPage
  }

  return (page - 1) * perPage + perPage
}

const getLastPage = (total, perPage) => {
  if (total <= 1) {
    return 1
  }

  return Math.ceil(total / perPage)
}

export const newResource = (
  data,
  total,
  page,
  perPage,
) => ({
  data,
  meta: {
    current_page: page,
    last_page: getLastPage(total, perPage),
    from: page === 1 ? 1 : (page - 1) * perPage + 1,
    to: getTo(total, page, perPage),
    per_page: perPage,
    total,
  },
})

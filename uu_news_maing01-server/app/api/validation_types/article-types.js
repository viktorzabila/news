const articleCreateDtoInType = shape({
  name: uu5String(255).isRequired(),
  url: uri().isRequired(),
  newspaperId: id().isRequired(),
  authorId: id().isRequired(),
  publishDate: date().isRequired(),
  topicIdList : array(id(), 1, 10).isRequired(),
  visibility: oneOf([true, false])
})

const articleListDtoInType = shape({
  sortBy: oneOf(["name", "publishDate"]),
  order: oneOf(["asc", "desc"]),
  filterMap: shape({
    topicIdList: array(id(), 10),
    authorId: id(),
    newspaperId: id(),
    publishDate: date(),
    visibility: oneOf(["true", "false"])
  }),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
})

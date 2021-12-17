/* eslint-disable */
const topicCreateDtoInType  = shape({
  name: uu5String(255).isRequired()
})

const topicGetDtoInType  = shape({
  id: id().isRequired()
})

const topicListDtoInType = shape({
  order: oneOf(["asc", "desc"]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
});

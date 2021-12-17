/* eslint-disable */
const newspaperCreateDtoInType  = shape({
  name: uu5String(255).isRequired(),
  newspaperUrl: uu5String(255).isRequired()
})

const newspaperGetDtoInType  = shape({
  id: id().isRequired()
})

const newspaperUpdateDtoInType = shape({
  id: id().isRequired(),
  name: string().isRequired(),
  newspaperUrl: uri().isRequired()
})

const newspaperDeleteDtoInType = shape({
  id: id().isRequired()
})

const newspaperListDtoInType = shape({
  order: oneOf(["asc", "desc"]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
})

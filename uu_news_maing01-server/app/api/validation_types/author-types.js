/* eslint-disable */
const authorCreateDtoInType = shape({
  name: uu5String(255).isRequired(),
  surname: uu5String(255).isRequired(),
});

const authorGetDtoInType = shape({
  id: id().isRequired(),
});

const authorListDtoInType = shape({
  order: oneOf(["asc", "desc"]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
});

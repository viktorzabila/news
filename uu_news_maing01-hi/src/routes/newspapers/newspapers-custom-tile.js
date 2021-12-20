//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "../config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "NewspapersCustomTile",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const NewspapersCustomTile = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    data: UU5.PropTypes.object,
    handleOpenDetailsModal: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { handleOpenDetailsModal, data: item } = props;
    //@@viewOn:private
    const confirm = props.getConfirmRef();
    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return currentNestingLevel ? (
      <UU5.Bricks.Container noSpacing={true}>
        <div {...attrs}>
          <UU5.Bricks.Card className="uu5-common-padding-xl">
            <UU5.Bricks.Dropdown label="..." size="l">
              <UU5.Bricks.Dropdown.Item label="update" onClick={() => handleOpenDetailsModal(item)} />
              <UU5.Bricks.Dropdown.Item
                label="delete"
                onClick={() => {
                  return confirm.open({
                    header: <UU5.Bricks.Header level={4} content="Delete newspaper" />,
                    content: <UU5.Bricks.Div>Are you sure you want to delete newspaper?</UU5.Bricks.Div>,
                    onRefuse: confirm.close(),
                    onConfirm: item?.handlerMap?.delete,
                  });
                }}
              />
            </UU5.Bricks.Dropdown>
            <div
              onClick={() =>
                UU5.Environment.setRoute({ url: { useCase: "newspaper", parameters: { newspaperId: item.data.id } } })
              }
            >
              <UU5.Bricks.Text content={item?.data?.name} />
            </div>
          </UU5.Bricks.Card>
        </div>
      </UU5.Bricks.Container>
    ) : null;
    //@@viewOff:render
  },
});

export default NewspapersCustomTile;

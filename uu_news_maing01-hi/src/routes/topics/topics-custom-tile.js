//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState } from "uu5g04-hooks";
import Config from "../config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "CustomTile",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const TopicsCustomTile = createVisualComponent({
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
    const { data: item, handleReload } = props;
    const { handlerMap } = item;
    let [isTrue, setIsTrue] = useState();
    //@@viewOn:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return currentNestingLevel ? (
      <UU5.Bricks.Container noSpacing={true}>
        <div {...attrs}>
          <UU5.Bricks.Card>
            <div onClick={() => UU5.Environment.setRoute({url:{useCase:"home"}}) }></div>
            <div><UU5.Bricks.Icon icon="mdi-tag-multiple"/></div>
              <UU5.Bricks.Text
                content={item?.data?.name}
              />
          </UU5.Bricks.Card>
        </div>
      </UU5.Bricks.Container>
    ) : null;
    //@@viewOff:render
  },
});

export default TopicsCustomTile;

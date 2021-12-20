//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import Config from "../config/config";
import AuthorsCustomTile from "./author-custom-tile";
import useAuthors from "./context/use-authors";
import Lsi from "../../config/lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Tiles",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const AuthorsTiles = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    data: UU5.PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    const { data } = useAuthors();
    //@@viewOff:hooks

    //@@viewOn:private

    //@@viewOff:private
    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        <Uu5Tiles.ControllerProvider data={data}>
          <UU5.Bricks.Container>
            <UU5.Bricks.Header level={3}>
              <UU5.Bricks.Lsi lsi={Lsi.author.header} />
            </UU5.Bricks.Header>
            <Uu5Tiles.Grid tileHeight={"auto"} tileMinWidth={1000} tileMaxWidth={1600} tileSpacing={40} rowSpacing={40}>
              <AuthorsCustomTile />
            </Uu5Tiles.Grid>
          </UU5.Bricks.Container>
        </Uu5Tiles.ControllerProvider>
      </div>
    );
    //@@viewOff:render
  },
});

export default AuthorsTiles;

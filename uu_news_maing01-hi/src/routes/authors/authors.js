//@@viewOn:imports
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import Config from "../../bricks/config/config";
import DataListStateResolver from "../../common/data-list-state-resolver";
import AuthorsLoader from "./authors-loader";
import AuthorsContext from "./context/authors-context";
import AuthorsTiles from "./authors-tiles";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ArticlesList",
  //@@viewOff:statics
};

export const AuthorsList = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  //@@viewOn:render
  render(props, params) {

    return (
      <AuthorsLoader>
        <AuthorsContext.Consumer>
          {(dataListResult) => {
            return (
              <DataListStateResolver dataList={dataListResult}>
                <AuthorsTiles
                />
              </DataListStateResolver>
            );
          }}
        </AuthorsContext.Consumer>
      </AuthorsLoader>
    );
  },
  //@@viewOff:render
});

export default AuthorsList;

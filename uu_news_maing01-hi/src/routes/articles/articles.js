//@@viewOn:imports
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import Config from "../../bricks/config/config";
import DataListStateResolver from "../../common/data-list-state-resolver";
import ArticlesLoader from "./articles-loader";
import ArticlesContext from "../articles/context/articles-context";
import Tiles from "../articles/tiles";
import {ModalManager} from "../../common/modal-manager";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ArticlesList",
  //@@viewOff:statics
};

export const ArticlesList = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  //@@viewOn:render
  render(props, params) {



    return (
    <ModalManager>
      <ArticlesLoader>
        <ArticlesContext.Consumer>
          {(dataListResult) => {
            return (
              <DataListStateResolver dataList={dataListResult}>
                <Tiles
                  newspaperId={props?.params?.newspaperId}
                />
              </DataListStateResolver>
            );
          }}
        </ArticlesContext.Consumer>
      </ArticlesLoader>
    </ModalManager>
    );
  },
  //@@viewOff:render
});

export default ArticlesList;

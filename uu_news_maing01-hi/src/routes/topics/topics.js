//@@viewOn:imports
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import Config from "../../bricks/config/config";
import DataListStateResolver from "../../common/data-list-state-resolver";
import TopicsLoader from "./topics-loader";
import TopicsContext from "../topics/context/topics-context";
import TopicsTiles from "../topics/topics-tiles";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "TopicsList",
  //@@viewOff:statics
};

export const TopicsList = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  //@@viewOn:render
  render(props, params) {

    return (
      <TopicsLoader>
        <TopicsContext.Consumer>
          {(dataListResult) => {
            return (
              <DataListStateResolver dataList={dataListResult}>
                <TopicsTiles
                />
              </DataListStateResolver>
            );
          }}
        </TopicsContext.Consumer>
      </TopicsLoader>
    );
  },
  //@@viewOff:render
});

export default TopicsList;

//@@viewOn:imports
import "uu5g04-bricks";
import { createComponent, useDataList } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";

import Config from "../config/config";

import TopicsContext from "./context/topics-context";

import Calls from "calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "TopicsLoader",
  //@@viewOff:statics
};

export const TopicsLoader = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  //@@viewOn:render
  render(props) {
    const dataListResult = useDataList({
      handlerMap: {
        load: Calls.topicList,
        create: Calls.topicCreate,
      },
    });

    return <TopicsContext.Provider value={dataListResult}>{props.children}</TopicsContext.Provider>;
  },
  //@@viewOff:render
});

export default TopicsLoader;

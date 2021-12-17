//@@viewOn:imports
import "uu5g04-bricks";
import { createComponent, useDataList } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";

import Config from "../config/config";

import ArticlesContext from "./context/articles-context";

import Calls from "calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SomeLoader",
  //@@viewOff:statics
};

export const ArticlesLoader = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes
  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  //@@viewOn:render
  render(props) {

    const dataListResult = useDataList({
      handlerMap: {
        load: Calls.articleList,
        create: Calls.articleCreate,
        // load: Calls.topicIdList
      },
    });

    return <ArticlesContext.Provider value={dataListResult}>{props.children}</ArticlesContext.Provider>;
  },
  //@@viewOff:render
});

export default ArticlesLoader;

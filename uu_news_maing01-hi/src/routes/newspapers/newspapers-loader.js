//@@viewOn:imports
import "uu5g04-bricks";
import { createComponent, useDataList } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";

import Config from "../config/config";

import NewspapersContext from "./context/newspapers-context";

import Calls from "calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SomeLoader",
  //@@viewOff:statics
};

export const NewspapersLoader = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  //@@viewOn:render
  render(props) {
    const dataListResult = useDataList({
      handlerMap: {
        load: Calls.newspaperList,
        create: Calls.newspaperCreate,
      },
      itemHandlerMap: {
        update: Calls.newspaperUpdate,
        delete: Calls.newspaperDelete,
      },
    });

    return <NewspapersContext.Provider value={dataListResult}>{props.children}</NewspapersContext.Provider>;
  },
  //@@viewOff:render
});

export default NewspapersLoader;

//@@viewOn:imports
import "uu5g04-bricks";
import { createComponent, useDataList } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import Config from "../config/config";
import AuthorsContext from "./context/authors-context.js";
import Calls from "calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "AuthorsLoader",
  //@@viewOff:statics
};

export const AuthorsLoader = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  //@@viewOn:render
  render(props) {
    const dataListResult = useDataList({
      handlerMap: {
        load: Calls.authorList,
        // create: Calls.authorCreate,
      },
    });

    return <AuthorsContext.Provider value={dataListResult}>{props.children}</AuthorsContext.Provider>;
  },
  //@@viewOff:render
});

export default AuthorsLoader;

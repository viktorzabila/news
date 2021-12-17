//@@viewOn:imports
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import Config from "../../bricks/config/config";
import DataListStateResolver from "../../common/data-list-state-resolver";
import NewspapersLoader from "./newspapers-loader";
import NewspapersContext from "../newspapers/context/newspapers-context";
import Tiles from "./tiles";
import {ModalManager} from "../../common/modal-manager";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Newspapers",
  //@@viewOff:statics
};

export const NewspapersList = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  //@@viewOn:render
  render(props) {

    return (
      <ModalManager>
      <NewspapersLoader>
        <NewspapersContext.Consumer>
          {(dataListResult) => {
            return (
              <DataListStateResolver dataList={dataListResult}>
                <Tiles />
              </DataListStateResolver>
            );
          }}
        </NewspapersContext.Consumer>
      </NewspapersLoader>
      </ModalManager>
    );
  },
  //@@viewOff:render
});

export default NewspapersList;

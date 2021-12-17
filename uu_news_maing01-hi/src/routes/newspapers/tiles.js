//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import Config from "../config/config";
import CustomTile from "./custom-tile";
import useNewspapers from "../newspapers/context/use-newspapers";
import {useContextModal} from "../../common/modal-manager";
import {ItemUpdateControls, ItemUpdateForm, ItemUpdateHeader} from "./newspapers-update-form/newspapers-update-form";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Tiles",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};


export const Tiles = createVisualComponent({
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
    const { data, handlerMap: listHandlerMap } = useNewspapers();
    const [open, close, showAlert, getConfirmRef] = useContextModal();

    //@@viewOff:hooks

    //@@viewOn:private
    function handleOpenDetailsModal(data) {
      open({
        header: <ItemUpdateHeader />,
        content: <ItemUpdateForm data={data} closeModal={close} showAlert={showAlert} />,
        footer: <ItemUpdateControls />,
      });
    }

    //@@viewOff:private
    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        <Uu5Tiles.ControllerProvider data={data}>
        <UU5.Bricks.Container>
            <Uu5Tiles.Grid tileHeight={"row"} tileMinWidth={1000} tileMaxWidth={1600} tileSpacing={20} rowSpacing={20}>
              <CustomTile  getConfirmRef={getConfirmRef} handleOpenDetailsModal={handleOpenDetailsModal}/>
            </Uu5Tiles.Grid>
        </UU5.Bricks.Container>
        </Uu5Tiles.ControllerProvider>
      </div>
    );
    //@@viewOff:render
  },
});

export default Tiles;

//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useEffect } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import Config from "../config/config";
import CustomTile from "./custom-tile";
import useArticles from "../articles/context/use-articles";
import {ArticleCreateControls, ArticleCreateForm, ArticleCreateHeader} from "./article-create-form/article-create-form";
import {useContextModal} from "../../common/modal-manager";
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
    const { data, handlerMap: listHandlerMap, item } = useArticles();
    const [open, close, showAlert, getConfirmRef] = useContextModal();
    useEffect(() => {
      if (props.newspaperId)
        listHandlerMap.load({filterMap: {newspaperId: props.newspaperId}})
      else {
        listHandlerMap.load({filterMap: {}})
      }
    }, [props.newspaperId]);
    //@@viewOff:hooks

    //@@viewOn:private

    function handleOpenDetailsModal() {
      open({
        header: <ArticleCreateHeader />,
        content: <ArticleCreateForm data={data} newspaperId={props.newspaperId} isCreateForm={true}  closeModal={close} showAlert={showAlert} />,
        footer: <ArticleCreateControls />,

      });
    }

    const SORTERS = () => {
      return [
        {
          key: "publicationDate",
          label: "publicationDate",
          sorterFn: (item, value) => {
            console.log("item", item);
            console.log("value", value);
            return item?.data?.publicationDate === value;
          },
        },
      ];
    };

    function handleOpenCreateModal() {
      open({
        header: <ArticleCreateHeader />,
        content: <ArticleCreateForm data={data} isCreateForm={true} closeModal={close} showAlert={showAlert} />,
        footer: <ArticleCreateControls isCreateForm={true}/>,
      });
    }

    //@@viewOff:private
    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        <Uu5Tiles.ControllerProvider data={data} sorters={SORTERS()}>
          <Uu5Tiles.SorterBar initialDisplayed/>
          <UU5.Bricks.Container>
            <UU5.Bricks.Button colorSchema="blue" bgStyle="transparent" content="+ Create article" onClick={() => handleOpenDetailsModal({})}/>
            <Uu5Tiles.Grid tileHeight={"row"} tileMinWidth={1000} tileMaxWidth={1600} tileSpacing={20} rowSpacing={20}>
              <CustomTile  getConfirmRef={getConfirmRef} handleOpenDetailsModal={handleOpenDetailsModal} handleOpenCreateModal={handleOpenCreateModal}/>
            </Uu5Tiles.Grid>
          </UU5.Bricks.Container>
        </Uu5Tiles.ControllerProvider>
      </div>
    );
    //@@viewOff:render
  },
});

export default Tiles;

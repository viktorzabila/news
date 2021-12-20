//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useEffect, useState } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import Config from "../../bricks/config/config";
import DataListStateResolver from "../../common/data-list-state-resolver";
import ArticlesLoader from "./articles-loader";
import ArticlesContext from "../articles/context/articles-context";
import ArticlesTiles from "./articles-tiles";
import { ModalManager } from "../../common/modal-manager";
import Calls from "../../calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ArticlesList",
  //@@viewOff:statics
};

const CLASS_NAMES = {
  center: () => Config.Css.css`
    display: flex;
  `,
};

export const ArticlesList = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  //@@viewOn:render
  render(props, params) {
    const [newspaper, setNewspaper] = useState({});

    useEffect(() => {
      (async () => {
        const newspaper = await Calls.newspaperGet({ id: props?.params?.newspaperId });
        setNewspaper(newspaper);
      })();
    }, []);

    return (
      <ModalManager>
        <ArticlesLoader>
          <ArticlesContext.Consumer>
            {(dataListResult) => {
              return (
                <DataListStateResolver dataList={dataListResult}>
                  <UU5.BlockLayout.Block className={CLASS_NAMES.center()}>
                    <UU5.BlockLayout.Row className="row">
                      <UU5.BlockLayout.Column>
                        <UU5.Bricks.Link href={newspaper?.newspaperUrl} content={newspaper?.name} colorSchema="cyan" />
                        <UU5.Bricks.Block content={newspaper?.newspaperUrl} colorSchema="cyan" />
                      </UU5.BlockLayout.Column>
                    </UU5.BlockLayout.Row>
                  </UU5.BlockLayout.Block>
                  <ArticlesTiles newspaperId={props?.params?.newspaperId} />
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

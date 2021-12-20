//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-app";

import Config from "./config/config.js";
import Lsi from "../config/lsi.js";
import NewspapersLoader from "../routes/newspapers/newspapers-loader";
import NewspapersContext from "../routes/newspapers/context/newspapers-context";
import DataListStateResolver from "../common/data-list-state-resolver";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:static
  displayName: Config.TAG + "Left",
  //@@viewOff:static
};

export const Left = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <NewspapersLoader>
        <NewspapersContext.Consumer>
          {(dataListResult) => {
            return (
              <DataListStateResolver dataList={dataListResult}>
                <Plus4U5.App.Left
                  {...props}
                  logoProps={{
                    backgroundColor: UU5.Environment.colors.blue.c700,
                    backgroundColorTo: UU5.Environment.colors.blue.c500,
                    title: "uuNews",
                    companyLogo: Plus4U5.Environment.basePath + "assets/img/unicorn-logo.svg",
                    generation: "1",
                  }}
                  aboutItems={[{ content: <UU5.Bricks.Lsi lsi={Lsi.left.about} />, href: "about" }]}
                  helpHref={null}
                >
                  <Plus4U5.App.MenuTree
                    borderBottom
                    // NOTE Item "id" equals to useCase so that item gets automatically selected when route changes (see spa-autheticated.js).
                    items={[
                      // { id: "home", href: "home", content: <UU5.Bricks.Lsi lsi={Lsi.left.home} /> },
                      { id: "articles", href: "articles", content: <UU5.Bricks.Lsi lsi={Lsi.left.articles} /> },
                      { id: "newspapers", href: "newspapers", content: <UU5.Bricks.Lsi lsi={Lsi.left.newspapers} /> },
                      { id: "authors", href: "authors", content: <UU5.Bricks.Lsi lsi={Lsi.left.authors} /> },
                      { id: "topics", href: "topics", content: <UU5.Bricks.Lsi lsi={Lsi.left.topics} /> },
                      { id: "watchlist", href: "watchlist", content: <UU5.Bricks.Lsi lsi={Lsi.left.watchlist} /> },
                      { id: "about", href: "about", content: <UU5.Bricks.Lsi lsi={Lsi.left.about} /> },
                    ]}
                  />
                </Plus4U5.App.Left>
              </DataListStateResolver>
            );
          }}
        </NewspapersContext.Consumer>
      </NewspapersLoader>
    );
    //@@viewOff:render
  },
});

export default Left;

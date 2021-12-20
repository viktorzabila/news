//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, useEffect } from "uu5g04-hooks";
import Config from "../config/config";
import Calls from "../../calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ArticlesCustomTile",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

const CLASS_NAMES = {
  wrapper: () => Config.Css.css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  `,
};

export const ArticlesCustomTile = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    data: UU5.PropTypes.object,
    handleOpenDetailsModal: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { data: item } = props;
    let [topics, setTopics] = useState([]);
    useEffect(() => {
      const promises = item?.data?.topicIdList.map((topicId) => {
        return toList(topicId);
      });
      Promise.all(promises).then((data) => {
        setTopics(data);
      });
    }, []);
    // let arrayOfTopics = [];
    const toList = async (id) => {
      const topic = await Calls.topicGet({ id });
      return topic;
    };
    //@@viewOn:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    return currentNestingLevel ? (
      <UU5.Bricks.Container noSpacing={true}>
        <div {...attrs}>
          <UU5.Bricks.Card className="uu5-common-padding-s" colorSchema={item?.data?.visibility ? "blue" : "grey"}>
            <div className={CLASS_NAMES.wrapper()}>
              {/*<div onClick={() => UU5.Environment.setRoute({url:{useCase:"articles"}}) }></div>*/}
              <div>
                <UU5.Bricks.Row display="flex">
                  <UU5.Bricks.Icon icon="mdi-account" />
                  <UU5.Bricks.Link content={item?.data?.name} href={item?.data?.url} target="_blank" />
                </UU5.Bricks.Row>
                <UU5.Bricks.Row display="flex">
                  <UU5.Bricks.Icon icon="mdi-calendar" />
                  <UU5.Bricks.Text content={item?.data?.url} />
                </UU5.Bricks.Row>
                <UU5.Bricks.Row display="flex">
                  <UU5.Bricks.Icon icon="mdi-newspaper" />
                  <UU5.Bricks.Text content={item?.data?.publishDate} />
                </UU5.Bricks.Row>
                <UU5.Bricks.Row display="flex">
                  <UU5.Bricks.Icon icon="mdi-tag-multiple" />
                  {renderTopics(topics)}
                </UU5.Bricks.Row>
              </div>
              <UU5.Bricks.Dropdown
                label=""
                iconClosed="mdi-dots-vertical"
                iconOpen="mdi-dots-vertical"
                items={[{ label: "Edit" }, { label: "Delete" }]}
              />
            </div>
          </UU5.Bricks.Card>
        </div>
      </UU5.Bricks.Container>
    ) : null;
    //@@viewOff:render
  },
});

const renderTopics = (topics) => {
  console.log(topics, "in function");
  return topics.map((topic) => {
    return <UU5.Bricks.Text key={topic?.id}>{topic?.name}</UU5.Bricks.Text>;
  });
};

export default ArticlesCustomTile;

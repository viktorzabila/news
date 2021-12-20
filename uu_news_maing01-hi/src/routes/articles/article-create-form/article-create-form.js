import UU5 from "uu5g04";
import { createVisualComponent, useState, useEffect } from "uu5g04-hooks";
import Config from "../config/config";
import Calls from "../../../calls";
import Lsi from "./article-create-form-lsi";

const STATICS = {
  displayName: Config.TAG + "ItemUpdateForm",
  nestingLevel: "bigBoxCollection",
};

const ArticleCreateForm = createVisualComponent({
  ...STATICS,

  render(props) {
    const { data, newspaperId, closeModal } = props;
    const [isLoading] = useState(false);
    const [list, setList] = useState([]);
    const [listTopic, setTopicList] = useState([]);
    const [newspaper, setNewspaper] = useState({});

    useEffect(() => {
      (async () => {
        const topicIdList = await Calls.topicList();
        const authorIdList = await Calls.authorList();
        const newspaper = await Calls.newspaperGet({ id: newspaperId });
        console.log("news--", newspaper);
        setNewspaper(newspaper);
        setList(topicIdList.itemList);
        setTopicList(authorIdList.itemList);
      })();
      console.log("data props-", newspaperId);
    }, []);

    async function handleUpdate(formData) {
      const { values, component } = formData;
      values.newspaperId = newspaperId;

      component.setPending();

      try {
        await Calls.articleCreate(values);
        component.getAlertBus().addAlert({
          content: <UU5.Common.Error content={<UU5.Bricks.Lsi lsi={Lsi.saveSuccess} />} />,
          colorSchema: "success",
        });
      } catch {
        component.getAlertBus().addAlert({
          content: <UU5.Common.Error content={<UU5.Bricks.Lsi lsi={Lsi.saveError} />} />,
          colorSchema: "danger",
        });
      }

      component.setReady();
      closeModal();
    }
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    console.log(data, "check data");
    return (
      <UU5.Forms.ContextForm
        onSave={handleUpdate}
        onCancel={closeModal}
        progressIndicator={<UU5.Bricks.Loading />}
        disabled={isLoading}
      >
        <h1>Form was opened!</h1>
        <UU5.Forms.Text
          label="Name of article"
          name="name"
          pattern="[A-Za-z]{3}"
          patternMessage="Must contain at least 3 alphabet characters"
          required
        />
        <UU5.Forms.Text
          label="Enter link to the article"
          name="url"
          pattern="[A-Za-z]{3}"
          patternMessage="Must contain at least 3 alphabet characters"
          required
        />
        <UU5.Forms.Text
          label="Enter name of newspaper"
          pattern="[A-Za-z]{3}"
          patternMessage="Must contain at least 3 alphabet characters"
          name="newspaperId"
          value={newspaper?.name}
          required
        />
        <UU5.Forms.DatePicker
          label="Enter name a date of Article publishment"
          name="publishDate"
          valueType="iso"
          iconOpen="mdi-clock"
          patternMessage="This is not what I was expecting"
          required
        />
        <UU5.Forms.Select label="Enter an Author name" size="m" name="authorId" required>
          {listTopic?.length &&
            listTopic.map((author) => (
              <UU5.Forms.Select.Option key={author?.id} value={author?.id} content={author?.name} />
            ))}
        </UU5.Forms.Select>
        <UU5.Forms.Select label="Enter topic" size="m" multiple={true} name="topicIdList" required>
          {list?.length &&
            list.map((topic) => <UU5.Forms.Select.Option key={topic?.id} value={topic?.id} content={topic?.name} />)}
        </UU5.Forms.Select>
        <UU5.Forms.Checkbox name="visibility" label="Visibility" />
      </UU5.Forms.ContextForm>
    );
  },
});

const ArticleCreateHeader = () => {
  return (
    <UU5.Forms.ContextHeader content={<UU5.Bricks.Lsi lsi={Lsi.header} />} info={<UU5.Bricks.Lsi lsi={Lsi.info} />} />
  );
};
const ArticleCreateControls = () => {
  return <UU5.Forms.ContextControls />;
};

const ArticleUpdateControls = () => {
  return (
    <UU5.Forms.ContextControls
      buttonSubmitProps={{ content: <UU5.Bricks.Lsi lsi={Lsi.submit("Update")} /> }}
      buttonCancelProps={{ content: <UU5.Bricks.Lsi lsi={Lsi.cancel} /> }}
    />
  );
};
export { ArticleCreateForm, ArticleCreateHeader, ArticleUpdateControls, ArticleCreateControls };
export default ArticleCreateForm;

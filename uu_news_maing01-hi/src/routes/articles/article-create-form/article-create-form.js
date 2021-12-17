import UU5 from "uu5g04";
import { createVisualComponent, useLsiValues, useState, useEffect  } from "uu5g04-hooks";
import Lsi from './article-create-form-lsi';
import Config from "../config/config";

const STATICS = {
  displayName: Config.TAG + "ItemUpdateForm",
  nestingLevel: "bigBoxCollection",
};

const ArticleCreateForm = createVisualComponent({
  ...STATICS,

  render(props) {
    const { data, closeModal, handlerMap, authorId } = props;
    const [isLoading]=useState(false);
    const [list, setList]=useState(false);

    useEffect(() => {
      (async function () {
        console.log()
        const topicIdList = await handlerMap.topicIdList()
        const authorIdList = await handlerMap.authorIdList()
        // authLit
        console.log("topicIdList---", topicIdList)
      setList(topicIdList.itemList)
      })()
    }, [])

    function toRenderOptions() {
      console.log("list---", data)
      return data.map(topic => {
        return <UU5.Forms.Select.Option value={topic.name}/>
      })
    }


    async function handleUpdate(formData) {
      const { values, component } = formData;

      component.setPending();

      try{
        await data.handlerMap.update(values);
        component.getAlertBus().addAlert({
          content: <UU5.Common.Error content={<UU5.Bricks.Lsi lsi={Lsi.saveSuccess} />} />,
          colorSchema: "success",
        });
      }
      catch{
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
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(
      props,
      STATICS
    );
    console.log(data,"check data");
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
        />
        <UU5.Forms.Text
          label="Enter link to the article"
          name="Enter link to the article"
        />
        <UU5.Forms.Text
          label="Enter name of newspaper"
          name="Enter name of newspaper"
        />
        <UU5.Forms.DatePicker
          label="Enter name a date of Article publishment"
          name="publishedDate"
          valueType="iso"
          iconOpen="mdi-clock"
          patternMessage="This is not what I was expecting"
        />
        <UU5.Forms.Text
          label="Enter an Author name"
          name=""
        />
        <UU5.Forms.Select
          label="Enter topic"
          size="m"
        >
          {toRenderOptions}
        </UU5.Forms.Select>

      </UU5.Forms.ContextForm>
    );
  },
});

const ArticleCreateHeader = () => {
  return (
    <UU5.Forms.ContextHeader
      content={<UU5.Bricks.Lsi lsi={Lsi.header} />}
      info={<UU5.Bricks.Lsi lsi={Lsi.info}  />}
    />
  );
};
const ArticleCreateControls = () => {
  return (
    <UU5.Forms.ContextControls
    />
  );
};

const ArticleUpdateControls = () => {
  return (
    <UU5.Forms.ContextControls
      buttonSubmitProps={{ content: <UU5.Bricks.Lsi lsi={Lsi.submit("Update")} /> }}
      buttonCancelProps={{ content: <UU5.Bricks.Lsi lsi={Lsi.cancel} /> }}
    />
  );
};
export { ArticleCreateForm, ArticleCreateHeader, ArticleUpdateControls,ArticleCreateControls };
export default  ArticleCreateForm;

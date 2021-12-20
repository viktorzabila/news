import UU5 from "uu5g04";
import { createVisualComponent, useState } from "uu5g04-hooks";
import Config from "../config/config";
import Lsi from "./newspapers-update-form-lsi";

const STATICS = {
  displayName: Config.TAG + "ItemUpdateForm",
  nestingLevel: "bigBoxCollection",
};

const ItemUpdateForm = createVisualComponent({
  ...STATICS,

  render(props) {
    const { data, closeModal } = props;
    const [isLoading] = useState(false);

    async function handleUpdate(formData) {
      const { values, component } = formData;

      component.setPending();

      try {
        await data.handlerMap.update(values);
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

    return (
      <UU5.Forms.ContextForm
        onSave={handleUpdate}
        onCancel={closeModal}
        progressIndicator={<UU5.Bricks.Loading />}
        disabled={isLoading}
      >
        <UU5.Forms.Text
          label="Name"
          name="name"
          pattern="[A-Za-z]{3}"
          patternMessage="Must contain at least 3 alphabet characters"
          value={data?.data.name}
        />
        <UU5.Forms.Text
          label="newspaperUrl"
          name="newspaperUrl"
          pattern="[A-Za-z]{3}"
          patternMessage="Must contain at least 3 alphabet characters"
          value={data?.data.newspaperUrl}
        />
      </UU5.Forms.ContextForm>
    );
  },
});
const ItemUpdateHeader = () => {
  return <UU5.Forms.ContextHeader content={<UU5.Bricks.Lsi lsi={Lsi.header} />} />;
};

const ItemUpdateControls = () => {
  return (
    <UU5.Forms.ContextControls
      buttonSubmitProps={{ content: <UU5.Bricks.Lsi lsi={Lsi.submit("Update")} /> }}
      buttonCancelProps={{ content: <UU5.Bricks.Lsi lsi={Lsi.cancel} /> }}
    />
  );
};
export { ItemUpdateForm, ItemUpdateHeader, ItemUpdateControls };
export default ItemUpdateForm;

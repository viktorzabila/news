import Config from "../bricks/config/config";

const modalFix = () => Config.Css.css`
  width: 100%!important;

  .uu5-bricks-alert-header-wrapper {
    .uu5-bricks-alert-content {
      width: calc(100% - 48px);
    }

    .uu5-common-error.plus4u5-bricks-error {
      width: 100%;
    }

    .uu5-bricks-alert-content {
      justify-content: start;
    }
  }
`;

export default {
  modalFix,
};

"use strict";
const NewsMainUseCaseError = require("./news-main-use-case-error.js");

const Init = {
  UC_CODE: `${NewsMainUseCaseError.ERROR_PREFIX}init/`,

  InvalidDtoIn: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SchemaDaoCreateSchemaFailed: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.status = 500;
      this.code = `${Init.UC_CODE}schemaDaoCreateSchemaFailed`;
      this.message = "Create schema by Dao createSchema failed.";
    }
  },

  SetProfileFailed: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}sys/setProfileFailed`;
      this.message = "Set profile failed.";
    }
  },

  CreateAwscFailed: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}createAwscFailed`;
      this.message = "Create uuAwsc failed.";
    }
  },

  UuNewsMainCreateDaoFailed: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}uuNewsMainCreateDaoFailed`;
      this.message = "Create uuNewsMain by DAO method failed.";
    }
  },
};

module.exports = {
  Init,
};

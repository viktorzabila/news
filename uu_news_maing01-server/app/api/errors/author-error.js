"use strict";

const NewsMainUseCaseError = require("./news-main-use-case-error.js");
const AUTHOR_ERROR_PREFIX = `${NewsMainUseCaseError.ERROR_PREFIX}author/`;

const Create = {
  UC_CODE: `${AUTHOR_ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  UuNewsDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}UuNewsDoesNotExist`;
      this.message = "uuNews does not exist.";
    }
  },

  UuNewsIsNotInCorrectState: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}UuNewsIsNotInCorrectState`;
      this.message = "uuNews is not in correct state.";
    }
  },

  AuthorDaoCreateFailed: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}AuthorDaoCreateFailed`;
      this.message = "Creating author by news DAO create failed.";
    }
  },
};

const Get = {
  UC_CODE: `${AUTHOR_ERROR_PREFIX}get/`,

  InvalidDtoIn: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  UuNewsDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}UuNewsDoesNotExist`;
      this.message = "uuNews does not exist.";
    }
  },

  UuNewsIsNotInCorrectState: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}UuNewsIsNotInCorrectState`;
      this.message = "uuNews is not in correct state.";
    }
  },

  AuthorDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}AuthorDoesNotExist`;
      this.message = "Author does not exist";
    }
  },
};

const List = {
  UC_CODE: `${AUTHOR_ERROR_PREFIX}list/`,

  UuNewsDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}UuNewsDoesNotExist`;
      this.message = "uuNews does not exist.";
    }
  },

  UuNewsIsNotInCorrectState: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}UuNewsIsNotInCorrectState`;
      this.message = "uuNews is not in correct state.";
    }
  },
};

module.exports = {
  List,
  Create,
  Get,
};

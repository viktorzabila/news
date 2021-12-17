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

  UuAuthorDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}UuAuthorDoesNotExist`;
      this.message = "UuNewspaperDoesNotExist does not exist.";
    }
  },

  UuAuthorIsNotInCorrectState: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}UuAuthorIsNotInCorrectState`;
      this.message = "The application is not in correct state.";
    }
  },

  AuthorCreateDtoInType: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}AuthorCreateDtoInType`;
      this.message = "Creating newspaper by  DAO create failed.";
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

  UuAuthorDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}UuAuthorDoesNotExist`;
      this.message = "UuNewsDoesNotExist does not exist.";
    }
  },

  UuAuthorIsNotInCorrectState: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}UuAuthorIsNotInCorrectState`;
      this.message = "The application is not in correct state.";
    }
  },

  AuthorGetDtoInType: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}AuthorGetDtoInType`;
      this.message = "Author  failed.";
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
  UuAuthorIsNotInCorrectState: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}UuAuthorIsNotInCorrectState`;
      this.message = "The application is not in correct state.";
    }
  },

  AuthorGetDtoInType: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}AuthorGetDtoInType`;
      this.message = "Author  failed.";
    }
  },

  UuAuthorDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}UuAuthorDoesNotExist`;
      this.message = "Authors does not exist";
    }
  },
};

module.exports = {
  List,
  Create,
  Get
};

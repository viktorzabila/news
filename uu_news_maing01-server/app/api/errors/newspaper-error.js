"use strict";

const NewsMainUseCaseError = require("./news-main-use-case-error.js");
const NEWSPAPER_ERROR_PREFIX = `${NewsMainUseCaseError.ERROR_PREFIX}newspaper/`;

const Create = {
  UC_CODE: `${NEWSPAPER_ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  UuNewspaperDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}UuNewspaperDoesNotExist`;
      this.message = "UuNewspaperDoesNotExist does not exist.";
    }
  },

  UuNewspaperIsNotInCorrectState: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}UuNewspaperIsNotInCorrectState`;
      this.message = "The application is not in correct state.";
    }
  },

  NewspaperDaoCreateFailed: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}NewspaperDaoCreateFailed`;
      this.message = "Newspaper by DAO create failed.";
    }
  },
  NewspaperNameNotUnique: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}NewspaperNameNotUnique`;
      this.message = "News name is not unique";
    }
  },
  NewspaperUrlNotUnique: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}NewspaperUrlNotUnique`;
      this.message = "News url is not unique";
    }
  },
};

const Get = {
  UC_CODE: `${NEWSPAPER_ERROR_PREFIX}get/`,

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
      this.message = "UuNewsDoesNotExist does not exist.";
    }
  },

  UuNewsIsNotInCorrectState: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}UuNewsIsNotInCorrectState`;
      this.message = "The application is not in correct state.";
    }
  },

  NewspaperGetDtoInType: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}NewspaperGetDtoInType`;
      this.message = "Creating newspaper by  DAO create failed.";
    }
  },

  NewspaperDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}NewspaperDoesNotExist`;
      this.message = "Newspaper does not exist";
    }
  },
};

const Update = {
  UC_CODE: `${NEWSPAPER_ERROR_PREFIX}update/`,

  InvalidDtoIn: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  uuNewsDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}uuNewsDoesNotExist`;
      this.message = "uuNews does not exist.";
    }
  },

  UuNewsIsNotInCorrectState: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}UuNewsIsNotInCorrectState`;
      this.message = "uuNews is not in correct state.";
    }
  },

  NewspaperDaoUpdateFailed: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}NewspaperDaoUpdateFailed`;
      this.message = "Update newspaper by newspaper DAO update failed.";
    }
  },

  UuObjectNewspaperDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}UuObjectNewspaperDoesNotExist`;
      this.message = "uuObject Newspaper does not exist";
    }
  },
  NewspaperNameNotUnique: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}NewspaperNameNotUnique`;
      this.message = "Newspaper name is not unique in awid.";
    }
  },
  NewspaperUrlNotUnique: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}NewspaperUrlNotUnique`;
      this.message = "Newspaper url is not unique in awid.";
    }
  },
};

const List = {
  UC_CODE: `${NEWSPAPER_ERROR_PREFIX}list/`,
  UuNewspaperIsNotInCorrectState: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}UuNewspaperIsNotInCorrectState`;
      this.message = "The application is not in correct state.";
    }
  },

  NewspaperGetDtoInType: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}NewspaperGetDtoInType`;
      this.message = "Newspaper failed.";
    }
  },

  UuNewspaperDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}UuNewspaperDoesNotExist`;
      this.message = "Newspaper does not exist";
    }
  },
};

const Delete = {
  UC_CODE: `${NEWSPAPER_ERROR_PREFIX}delete/`,

  UuNewsDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}UuNewsDoesNotExist`;
      this.message = "uuNews does not exist.";
    }
  },

  UuNewsIsNotInCorrectState: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}UuNewsIsNotInCorrectState`;
      this.message = "uuNews is not in correct state.";
    }
  },

  UuObjectNewspaperDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}UuObjectNewspaperDoesNotExist`;
      this.message = "uuObject Newspaper does not exist";
    }
  },

  RelatedArticlesExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}RelatedArticlesExist`;
      this.message = "Newspaper contains articles.";
    }
  },

  NewspaperDaoDeleteFailed: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}NewspaperDaoDeleteFailed`;
      this.message = "Delete newspaper by newspaper Dao delete failed.";
    }
  },
};

module.exports = {
  Delete,
  Create,
  Get,
  Update,
  List,
};

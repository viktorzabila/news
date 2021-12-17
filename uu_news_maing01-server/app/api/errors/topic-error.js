"use strict";

const NewsMainUseCaseError = require("./news-main-use-case-error.js");
const TOPIC_ERROR_PREFIX = `${NewsMainUseCaseError.ERROR_PREFIX}topic/`;

const Create = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  UuTopicDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}UuTopicDoesNotExist`;
      this.message = "UuTopicDoesNotExist does not exist.";
    }
  },

  UuTopicIsNotInCorrectState: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}UuTopicIsNotInCorrectState`;
      this.message = "The application is not in correct state.";
    }
  },

  TopicCreateDtoInType: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}TopicCreateDtoInType`;
      this.message = "Creating topic by  news failed.";
    }
  },

  TopicDaoCreateFailed: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}TopicDaoCreateFailed`;
      this.message = "Creating topic by news failed.";
    }
  },
};

const Get = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}get/`,

  InvalidDtoIn: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  UuTopicDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}UuTopicDoesNotExist`;
      this.message = "UuTopicDoesNotExist does not exist.";
    }
  },

  UuTopicIsNotInCorrectState: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}UuTopicIsNotInCorrectState`;
      this.message = "The application is not in correct state.";
    }
  },

  TopicGetDtoInType: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}TopicGetDtoInType`;
      this.message = "Creating topic by  news  failed.";
    }
  },

  TopicDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}TopicDoesNotExist`;
      this.message = "Topic does not exist";
    }
  },
};

const List = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}list/`,
  UuTopicIsNotInCorrectState: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}UuTopicIsNotInCorrectState`;
      this.message = "The application is not in correct state.";
    }
  },

  TopicGetDtoInType: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}TopicGetDtoInType`;
      this.message = "Topic  failed.";
    }
  },

  UuTopicDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}UuTopicDoesNotExist`;
      this.message = "Topic does not exist";
    }
  },
};

module.exports = {
  List,
  Get,
  Create
};

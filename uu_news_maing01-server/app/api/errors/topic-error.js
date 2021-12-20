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
      this.message = "The application is not in correct state.";
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
      this.code = `${Get.UC_CODE}UuTopicIsNotInCorrectState`;
      this.message = "The application is not in correct state.";
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

  UuNewsIsNotInCorrectState: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}UuNewsIsNotInCorrectState`;
      this.message = "The application is not in correct state.";
    }
  },

  UuNewsDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}UuNewsDoesNotExist`;
      this.message = "Topic does not exist";
    }
  },
};

module.exports = {
  List,
  Get,
  Create
};

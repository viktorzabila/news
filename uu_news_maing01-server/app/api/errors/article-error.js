"use strict";

const NewsMainUseCaseError = require("./news-main-use-case-error.js");
const ARTICLE_ERROR_PREFIX = `${NewsMainUseCaseError.ERROR_PREFIX}article/`;

const Create = {
  UC_CODE: `${ARTICLE_ERROR_PREFIX}create/`,

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

  NewspaperDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}NewspaperDoesNotExist`;
      this.message = "Newspaper does not exist";
    }
  },

  AuthorDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}AuthorDoesNotExist`;
      this.message = "Author does not exist";
    }
  },

  TopicDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}TopicDoesNotExist`;
      this.message = "Topic does not exist";
    }
  },
  TopicsDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}TopicsDoesNotExist`;
      this.message = "Topic does not exist";
    }
  },

  ArticleUrlNotUnique: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}ArticleUrlNotUnique`;
      this.message = "Article url is not unique in awid.";
    }
  },

  ArticleDaoCreateFailed: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}ArticleDaoCreateFailed`;
      this.message = "Create article by article DAO create failed.";
    }
  },

};

const List = {
  UC_CODE: `${ARTICLE_ERROR_PREFIX}list/`,
  uuNewsIsNotInCorrectState: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}uuNewsIsNotInCorrectState`;
      this.message = "uuNews is not in correct state.";
    }
  },

  articleDaoListByFilterFailed: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}articleDaoListByFilterFailed`;
      this.message = "List articles by article DAO listByFiler failed.";
    }
  },

  uuNewsDoesNotExist: class extends NewsMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}uuNewsDoesNotExist`;
      this.message = "uuNews does not exist.";
    }
  },
};

module.exports = {
  List,
  Create
};

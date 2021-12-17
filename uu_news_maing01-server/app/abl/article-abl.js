"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/article-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },

  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
  },
};

class ArticleAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("article");
    this.mainDao = DaoFactory.getDao("newsMain");
    this.daoNewspaper = DaoFactory.getDao("newspaper");
    this.daoAuthor = DaoFactory.getDao("author");
    this.daoTopic = DaoFactory.getDao("topic");
  }

  async list(uri, dtoIn, uuAppErrorMap = {}) {
    // HDS 1 Checks uuNews state.
    const awid = uri.getAwid();
    const NewsInstance = await this.mainDao.get(awid);
    if (!NewsInstance) {
      throw new Errors.Create.uuNewsDoesNotExist({ uuAppErrorMap }, { awid });
    }
    if (NewsInstance.state !== 'active') {
      throw new Errors.Create.uuNewsIsNotInCorrectState({uuAppErrorMap}, { awid})
    }

    // HDS 2 Validation of dtoIn.
    const validationResult = this.validator.validate("articleListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    //HDS 3 Loads a list of article  uuObjects from the uuAppObjectStore according to filterMap values in dtoIn:
    const { pageInfo, filterMap } = dtoIn;
    const articleList = await this.dao.list(filterMap, pageInfo);

    // HDS 3.1 Loads a list of article uuObjects through the article DAO ListByFilter.
    if (!articleList) {
      throw new Error.Create.articleDaoListByFilterFailed({uuAppErrorMap}, { awid })
    }
    //HDS 4 Returns properly filled dtoOut.
    return {
      ...articleList,
      uuAppErrorMap,
    };
  }

  async create(uri, dtoIn, uuAppErrorMap = {}) {
    const awid = uri.getAwid();
    const uuNews  = await this.mainDao.get(awid);

    // HDS 1 Checks state.

    if (!uuNews ) {
      throw new Errors.Create.UuNewsDoesNotExist({ uuAppErrorMap }, { awid });
    }
    if (uuNews.state !== "active") {
      throw new Errors.Create.UuNewsIsNotInCorrectState(
        { uuAppErrorMap },
        { currentState: uuNews.state },
        { expectedState: "active", awid }
      );
    }

    // HDS 2 - Validation of dtoIn.

    const validationResult = this.validator.validate("articleCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    // HDS 3 Checking dtoIn
    let uuObject = { ...dtoIn, awid}

    // HDS 3.1 Get Newspaper with Newspaper DAO get and dtoIn.newspaperId

    const newspaper = await this.daoNewspaper.get({awid: uuObject.awid, id: uuObject.newspaperId})

    if (!newspaper) {
      throw new Errors.Create.NewspaperDoesNotExist({uuAppErrorMap, id: uuObject.newspaperId})
    }

    //HDS 3.2 Get Author with Author DAO get and dtoIn.authorId
    const author = await this.daoAuthor.get({awid: uuObject.awid, id: uuObject.authorId})

    if (!author) {
      throw new Errors.Create.AuthorDoesNotExist({uuAppErrorMap, id: uuObject.newspaperId})
    }
    //HDS 3.3 Get TopicList with topic DAO get and dtoIn.topicIdList
    const topicsNumber = dtoIn.topicIdList.length;
    const existingTopics = [];
    let atLeastOneExist = false;

    for(let i=0; i<topicsNumber; i++){
      let singleTopic = await this.daoTopic.get({id: dtoIn.topicIdList[i], awid});
      if(singleTopic){
        existingTopics.push(singleTopic);
        atLeastOneExist = true;
      }
    }

    let existingIds = existingTopics.map((item)=> item.id);

    if (!atLeastOneExist) {
      throw new Errors.Create.TopicDoesNotExist({ uuAppErrorMap }, { id: uuObject.newspaperId });
    }

    //HDS4 Creates the article uuObject in the uuAppObjectStore (article DAO create)

    let createdArticle = null;

    uuObject.topicIdList = [...existingIds];

    try {
      createdArticle = await this.dao.create(uuObject);
    } catch (err) {
      throw new Errors.Create.ArticleDaoCreateFailed({ uuAppErrorMap }, err );
    }

    // HDS5 Returns properly filled dtoOut.

    return {
      ...createdArticle,
      uuAppErrorMap,
    };
  }

}

module.exports = new ArticleAbl();

"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/topic-error.js");

const WARNINGS = {
  createDtoInType: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },

  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`,
  },

  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
  },
};

class TopicAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("topic");
    this.mainDao = DaoFactory.getDao("newsMain");
  }

  async list(uri, dtoIn, uuAppErrorMap = {}) {
    // HDS 1
    const awid = uri.getAwid();
    const NewsInstance = await this.mainDao.get(awid);
    if (!NewsInstance) {
      throw new Errors.Create.UuTopicDoesNotExist({ uuAppErrorMap }, { awid });
    }
    if (NewsInstance.state !== 'active') {
      throw new Errors.Create.UuTopicIsNotInCorrectState({uuAppErrorMap}, { awid})
    }

    // HDS 2
    const validationResult = this.validator.validate("topicListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    //HDS 3 Loads a list of Author uuObjects from the uuAppObjectStore according to criteria specified in dtoIn (through the category DAO list).
    const { pageInfo, ...restDtoIn } = dtoIn;
    let filter = { ...restDtoIn, awid };
    const authorList = await this.dao.list(filter, pageInfo);

    //HDS 4 Returns properly filled dtoOut.
    return {
      ...authorList,
      uuAppErrorMap,
    };
  }

  async get(uri, dtoIn, uuAppErrorMap = {}) {
    const awid = uri.getAwid();
    const NewsInstance = await this.mainDao.get(awid);

    // HDS 1 Checks state.

    if (!NewsInstance) {
      throw new Errors.Get.UuNewsDoesNotExist({ uuAppErrorMap }, { awid });
    }
    if (NewsInstance.state !== "active") {
      throw new Errors.Create.UuNewsIsNotInCorrectState(
        { uuAppErrorMap },
        { currentState: NewsInstance.state }
      );
    }

    // HDS 2 - Validation of dtoIn.

    const validationResult = this.validator.validate("topicGetDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    //HDS3 Loads the newspaper upp uuObject from the uuAppObjectStore by dtoIn.id (through the newspaper DAO get)
    const uuObject = {...dtoIn, awid}
    let particularNewspaper = await this.dao.get(uuObject);
    if (!particularNewspaper) {
      throw new Errors.Get.NewspaperDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }

    // HDS4 Returns properly filled dtoOut.

    return {
      uuAppErrorMap,
      ...particularNewspaper,
    };
  }

  async create(uri, dtoIn, uuAppErrorMap = {}) {
    const awid = uri.getAwid();
    const NewsInstance = await this.mainDao.get(awid);

    // HDS 1 Checks state.

    if (!NewsInstance) {
      throw new Errors.Create.UuTopicDoesNotExist({ uuAppErrorMap }, { awid });
    }
    if (NewsInstance.state !== 'active') {
      throw new Errors.Create.UuTopicIsNotInCorrectState({uuAppErrorMap}, { awid})
    }

    // HDS 2 - Validation of dtoIn.

    const validationResult = this.validator.validate("topicCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createDtoInType.code,
      Errors.Create.InvalidDtoIn
    );

    //HDS3 Creates newspaper in the uuAppObjectStore (newspaper DAO create).
    const uuObject = { ...dtoIn, awid}
    let newspaper = null;

    try {
      newspaper = await this.dao.create(uuObject);
    } catch (err) {
      throw new Errors.Create.TopicDaoCreateFailed({ uuAppErrorMap }, err);
    }

    // HDS4 Returns properly filled dtoOut.

    return {
      ...newspaper,
      uuAppErrorMap,
    };
  }

}

module.exports = new TopicAbl();

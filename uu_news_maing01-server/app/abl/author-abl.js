"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/author-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },

  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`,
  },

  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
  },
};

class AuthorAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("author");
    this.mainDao = DaoFactory.getDao("newsMain");
  }

  async list(uri, dtoIn, uuAppErrorMap = {}) {
    // HDS 1
    const awid = uri.getAwid();
    const NewsInstance = await this.mainDao.get(awid);
    if (!NewsInstance) {
      throw new Errors.Create.UuNewsDoesNotExist({ uuAppErrorMap }, { awid });
    }
    if (NewsInstance.state !== "active") {
      throw new Errors.Create.UuNewsIsNotInCorrectState({ uuAppErrorMap }, { awid });
    }

    // HDS 2
    const validationResult = this.validator.validate("authorListDtoInType", dtoIn);
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

  async create(uri, dtoIn, uuAppErrorMap = {}) {
    const awid = uri.getAwid();
    const NewsInstance = await this.mainDao.get(awid);

    // HDS 1 Checks state.

    if (!NewsInstance) {
      throw new Errors.Create.UuNewsDoesNotExist({ uuAppErrorMap }, { awid });
    }
    if (NewsInstance.state !== "active") {
      throw new Errors.Create.UuNewsIsNotInCorrectState({ uuAppErrorMap }, { awid });
    }

    // HDS 2 - Validation of dtoIn.

    const validationResult = this.validator.validate("authorCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    //HDS3 Creates newspaper in the uuAppObjectStore (newspaper DAO create).
    const uuObject = { ...dtoIn, awid };
    let newspaper = null;

    try {
      newspaper = await this.dao.create(uuObject);
    } catch (err) {
      throw new Errors.Create.AuthorDaoCreateFailed({ uuAppErrorMap }, err);
    }

    // HDS4 Returns properly filled dtoOut.

    return {
      ...newspaper,
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
      throw new Errors.Get.UuNewsIsNotInCorrectState({ uuAppErrorMap }, { currentState: NewsInstance.state });
    }

    // HDS 2 - Validation of dtoIn.

    const validationResult = this.validator.validate("authorGetDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    //HDS3 Loads the author uuObject from the uuAppObjectStore by dtoIn.id (through the  DAO get)
    const uuObject = { ...dtoIn, awid };
    let particularNewspaper = await this.dao.get(uuObject);
    if (!particularNewspaper) {
      throw new Errors.Get.AuthorDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }

    // HDS4 Returns properly filled dtoOut.

    return {
      uuAppErrorMap,
      ...particularNewspaper,
    };
  }
}

module.exports = new AuthorAbl();

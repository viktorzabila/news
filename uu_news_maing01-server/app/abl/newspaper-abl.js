"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/newspaper-error.js");

const WARNINGS = {
  unsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },

  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
  },
};

class NewspaperAbl {
  constructor() {
    this.validator = Validator.load();
    this.mainDao = DaoFactory.getDao("newsMain");
    this.dao = DaoFactory.getDao("newspaper");
    this.articleDao = DaoFactory.getDao("article");
  }

  async delete(awid, dtoIn, uuAppErrorMap = {}) {
    //HDS 1 - Checks uuNews existance and its state
    let uuNewsInstance = await this.mainDao.get(awid);

    if (!uuNewsInstance) {
      throw new Errors.Delete.uuNewsDoesNotExist({ uuAppErrorMap }, { awid });
    }

    if (uuNewsInstance.state !== "active") {
      throw new Errors.Delete.uuNewsIsNotInCorrectState(
        { uuAppErrorMap },
        { awid, state: uuNewsInstance.state, expectedStateList: "active" }
      );
    }

    //HDS 2 - validation of dtoin
    let validationResult = this.validator.validate("newspaperDeleteDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    //HDS 3 Gets newspaper uuObject according to dtoIn.id (by newspaper DAO get)
    const uuObject = { ...dtoIn, awid };

    let particularNewspaper = await this.dao.get(uuObject);

    if (!particularNewspaper) {
      throw new Errors.Delete.uuObjectNewspaperDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }



    //HDS 4 Checks that the article count in the specified newspaper is 0 (through the article DAO getCountByNewspaperId).

    let availableArticle = await this.articleDao.getByNewsPaperId({newspaperId: String(particularNewspaper.id)});

    if(availableArticle){
      throw new Errors.Delete.relatedArticlesExist({ uuAppErrorMap }, { relatedArticle: availableArticle.id });
    }

    //HDS 5 Deletes the newspaper uuObject from the uuAppObjectStore with a given Id (through the newspaper DAO delete).
    try{
      await this.dao.delete(uuObject);
    }catch(error){
      throw new Errors.Delete.newspaperDaoDeleteFailed({ uuAppErrorMap }, { cause: { ...error } });
    }

    //HDS 6 Returns properly filled dtoOut
    return {
      uuAppErrorMap,
    };

  }

  async update(awid, dtoIn, uuAppErrorMap = {}) {
    //HDS 1 - Checks uuNews existance and its state
    let uuNewsInstance = await this.mainDao.get(awid);

    if (!uuNewsInstance) {
      throw new Errors.Update.UuNewspaperDoesNotExist({ uuAppErrorMap }, { awid });
    }

    if (uuNewsInstance.state !== "active") {
      throw new Errors.Update.uuNewsIsNotInCorrectState(
        { uuAppErrorMap },
        { awid, state: uuNewsInstance.state, expectedStateList: "active" }
      );
    }

    //HDS 2 - validation of dtoin
    let validationResult = this.validator.validate("newspaperUpdateDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    //HDS 3 - Gets newspaper uuObject according to dtoIn.id (by newspaper DAO get)
    const uuObject = { ...dtoIn, awid };

    let particularNewspaper = await this.dao.get(uuObject);

    if (!particularNewspaper) {
      throw new Errors.Update.UuObjectNewspaperDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }

    //HDS 4 - Checked dtoIn is saved to the uuAppObjectStore (through the newspaper DAO update).

    //HDS 4.1 - Newspaper uuObject with this name already exists
    let uniqueNameNewspaper = await this.dao.getByName(uuObject);

    if (uniqueNameNewspaper && String(uniqueNameNewspaper.id) !== String(particularNewspaper.id)) {
      throw new Errors.Update.NewspaperNameNotUnique({ uuAppErrorMap }, { newspaperName: dtoIn.name });
    }

    //HDS 4.2 - Newspaper uuObject with this url already exists
    let uniqueUrlNewspaper = await this.dao.getByUrl(uuObject);

    if (uniqueUrlNewspaper && String(uniqueUrlNewspaper.id) !== String(particularNewspaper.id)) {
      throw new Errors.Update.NewspaperUrlNotUnique({ uuAppErrorMap }, { newspaperUrl: dtoIn.newspaperUrl });
    }

    //HDS 4.3 - Failed to update the Newspaper uuObject
    let updatedNewspaper = null;
    try {
      updatedNewspaper = await this.dao.update(uuObject);
    } catch (error) {
      throw new Errors.Update.NewspaperDaoUpdateFailed({ uuAppErrorMap }, { cause: { ...error } });
    }

    //HDS 5 Returns properly filled dtoOut
    return {
      ...updatedNewspaper,
      uuAppErrorMap,
    };
  }

  async get(awid, dtoIn, uuAppErrorMap = {}) {
    //HDS 1 - Checks uuNews existance and its state
    let uuNewsInstance = await this.mainDao.get(awid);

    if (!uuNewsInstance) {
      throw new Errors.Get.uuNewsDoesNotExist({ uuAppErrorMap }, { awid });
    }

    if (uuNewsInstance.state !== "active") {
      throw new Errors.Get.uuNewsIsNotInCorrectState(
        { uuAppErrorMap },
        { awid, state: uuNewsInstance.state, expectedStateList: "active" }
      );
    }

    //HDS 2 - validation of dtoin
    let validationResult = this.validator.validate("newspaperGetDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    //HDS 3 - Gets newspaper uuObject according to dtoIn.id (by newspaper DAO get)
    const uuObject = { ...dtoIn, awid };

    let particularNewspaper = await this.dao.get(uuObject);

    if (!particularNewspaper) {
      throw new Errors.Get.uuObjectNewspaperDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }

    //HDS 4
    return {
      ...particularNewspaper,
      uuAppErrorMap,
    };
  }

  async create(awid, dtoIn, uuAppErrorMap = {}) {
    //HDS 1 - Checks uuNews existance and its state
    let uuNewsInstance = await this.mainDao.get(awid);

    if (!uuNewsInstance) {
      throw new Errors.Create.UuNewspaperDoesNotExist({ uuAppErrorMap }, { awid });
    }

    if (uuNewsInstance.state !== "active") {
      throw new Errors.Create.uuNewsIsNotInCorrectState(
        { uuAppErrorMap },
        { awid, state: uuNewsInstance.state, expectedStateList: "active" }
      );
    }

    //HDS 2 - validation of dtoin
    let validationResult = this.validator.validate("newspaperCreateDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    //HDS 3 - Creates the newspaper uuObject in the uuAppObjectStore (article DAO create)
    let uuObject = { ...dtoIn, awid };

    //HDS 3.1 - Newspaper uuObject with this name already exists
    let uniqueNameNewspaper = await this.dao.getByName(uuObject);

    if (uniqueNameNewspaper) {
      throw new Errors.Create.NewspaperNameNotUnique({ uuAppErrorMap }, { newspaperName: dtoIn.name });
    }

    //HDS 3.2 - Newspaper uuObject with this url already exists
    let uniqueUrlNewspaper = await this.dao.getByUrl(uuObject);

    if (uniqueUrlNewspaper) {
      throw new Errors.Create.NewspaperUrlNotUnique({ uuAppErrorMap }, { newspaperUrl: dtoIn.newspaperUrl });
    }

    let createdNewspaper = null;

    try {
      createdNewspaper = await this.dao.create(uuObject);
    } catch (error) {
      throw new Errors.Create.itemDaoCreateFailed({ uuAppErrorMap }, { cause: { ...error } });
    }

    //HDS 4 - returns created newsPaper
    return {
      ...createdNewspaper,
      uuAppErrorMap,
    };
  }

  async list(uri, dtoIn, uuAppErrorMap = {}) {
    // HDS 1
    const awid = uri.getAwid();
    const NewsInstance = await this.mainDao.get(awid);
    if (!NewsInstance) {
      throw new Errors.List.UuNewspaperDoesNotExist({ uuAppErrorMap }, { awid });
    }
    if (NewsInstance.state !== 'active') {
      throw new Errors.List.UuNewspaperIsNotInCorrectState({uuAppErrorMap}, { awid})
    }

    // HDS 2
    const validationResult = this.validator.validate("newspaperListDtoInType", dtoIn);
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
}

module.exports = new NewspaperAbl();

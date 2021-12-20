"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ArticleMongo extends UuObjectDao {
  async createSchema() {}

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async list(filterMap = {}, pageInfo = {}) {
    return await super.find(filterMap, pageInfo);
  }

  async sort(uuObject) {
    let filter = {
      awid: uuObject.awid,
    };
    return await super.find(filter);
  }

  async getByNewsPaperId(uuObject) {
    let filter = {
      newspaperId: uuObject.newspaperId,
    };
    return await super.findOne(filter);
  }
}

module.exports = ArticleMongo;

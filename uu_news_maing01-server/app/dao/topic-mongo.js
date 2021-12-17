"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class TopicMongo extends UuObjectDao {

  async createSchema(){
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async get(uuObject) {
    let filter = {
      id: uuObject.id,
      awid: uuObject.awid,
    };
    return await super.findOne(filter);
  }

  async list(uuObject) {
    let filter = {
      awid: uuObject.awid,
    };
    return await super.find(filter);
  }
}

module.exports = TopicMongo;

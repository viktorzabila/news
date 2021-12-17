"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class NewspaperMongo extends UuObjectDao {

  async createSchema(){
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async get(uuObject) {
    let filter = {
      id: uuObject.id,
      awid: uuObject.awid
    }
    return await super.findOne(filter);
  }

  async getByName(uuObject) {
    let filter = {
      awid: uuObject.awid,
      name: uuObject.name
    }
    return await super.findOne(filter);
  }

  async getByUrl(uuObject) {
    let filter = {
      awid: uuObject.awid,
      newspaperUrl: uuObject.newspaperUrl
    }
    return await super.findOne(filter);
  }

  async update(uuObject){
    let filter = {
      id: uuObject.id
    };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }

  async delete(uuObject) {
    let filter = {
      id: uuObject.id,
      awid: uuObject.awid
    }
    return await super.deleteOne(filter);
  }

  async list(uuObject) {
    let filter = {
      awid: uuObject.awid,
    };
    return await super.find(filter);
  }

}

module.exports = NewspaperMongo;

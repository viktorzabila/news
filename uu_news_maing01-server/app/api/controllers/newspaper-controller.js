"use strict";
const NewspaperAbl = require("../../abl/newspaper-abl.js");

class NewspaperController {
  delete(ucEnv) {
    return NewspaperAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  update(ucEnv) {
    return NewspaperAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return NewspaperAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return NewspaperAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  list(ucEnv) {
    return NewspaperAbl.list(ucEnv.getUri(), ucEnv.getDtoIn());
  }
}

module.exports = new NewspaperController();

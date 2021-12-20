"use strict";
const TopicAbl = require("../../abl/topic-abl.js");

class TopicController {
  list(ucEnv) {
    return TopicAbl.list(ucEnv.getUri(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return TopicAbl.get(ucEnv.getUri(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return TopicAbl.create(ucEnv.getUri(), ucEnv.getDtoIn());
  }
}

module.exports = new TopicController();

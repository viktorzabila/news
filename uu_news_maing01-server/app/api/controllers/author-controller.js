"use strict";
const AuthorAbl = require("../../abl/author-abl.js");

class AuthorController {
  create(ucEnv) {
    return AuthorAbl.create(ucEnv.getUri(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return AuthorAbl.get(ucEnv.getUri(), ucEnv.getDtoIn());
  }

  list(ucEnv) {
    return AuthorAbl.list(ucEnv.getUri(), ucEnv.getDtoIn());
  }
}

module.exports = new AuthorController();

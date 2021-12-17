"use strict";
const NewsMainAbl = require("../../abl/news-main-abl.js");

class NewsMainController {
  init(ucEnv) {
    return NewsMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new NewsMainController();

const { TestHelper } = require("uu_appg01_server-test");
const PolygonsTestHelper = require("../polygons-test-helper.js");
const CMD = "article/list";
afterEach(async () => {
  await TestHelper.dropDatabase();
  await TestHelper.teardown();
});

beforeEach(async () => {
  await TestHelper.setup();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  let session = await TestHelper.login("AwidLicenseOwner", false, false);

  let dtoIn = {
    uuAppProfileAuthorities: "urn:uu:GGPLUS4U",
  };
  await TestHelper.executePostCommand("sys/uuAppWorkspace/init", dtoIn, session);
});

describe("Testing the article/list uuCmd...", () => {
  test("HDS", async () => {
    let session = await TestHelper.login("AwidLicenseOwner", false, false);
    let listOne = await TestHelper.executePostCommand("article/create", {name: "Article 3",
      url: "https://tw",
      newspaperId: "61bc6f9ffb5a841fe8c03b83",
      authorId: "61bc6e3bfb5a841fe8c03b2a",
      publishDate: "2021-10-10",
      topicIdList: ["61be38e5de9ab121f465e508", "61be38f2de9ab121f465e50b", "61bc6e03fb5a841fe8c03b1a", "61bc6e00fb5a841fe8c03b17"]});
    let listTwo = await TestHelper.executePostCommand("article/create", {name: "Article 3",
      url: "https://tw",
      newspaperId: "61bc6f9ffb5a841fe8c03b83",
      authorId: "61bc6e3bfb5a841fe8c03b2a",
      publishDate: "2021-10-10",
      topicIdList: ["61be38e5de9ab121f465e508", "61be38f2de9ab121f465e50b", "61bc6e03fb5a841fe8c03b1a", "61bc6e00fb5a841fe8c03b17"]});


    let list = await TestHelper.executeGetCommand("article/list", {});
    expect(list).toBeDefined();
  });
  test("UuNewsIsNotInCorrectState", async () => {
    let session = await TestHelper.login("Authorities", false, false);
    let filter = `{awid: "${TestHelper.awid}"}`;
    let restore = `{$set: ${JSON.stringify({ state: `underConstruction` })}}`;
    await TestHelper.executeDbScript(`db.newsMain.findOneAndUpdate(${filter}, ${restore});`);

    let expectedError = {
      code: `${CMD}/UuNewsIsNotInCorrectState`,
      message: "The application is not in correct state.",
    };
    let errMsg = "The application is not in correct state.";

    try {
      await TestHelper.executePostCommand("article/create", PolygonsTestHelper.dtoIn.topic.create, session);
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(e.message).toEqual("uuNews is not in correct state.")
      expect(e.code).toEqual("uu-news-main/article/create/UuNewsIsNotInCorrectState")
    }
  });
  test("UuNewsDoesNotExist", async () => {
    let session = await TestHelper.login("Authorities", false, false);
    let filter = `{awid: "${TestHelper.awid}"}`;
    let restore = `{$set: ${JSON.stringify({ awid: `active` })}}`;
    await TestHelper.executeDbScript(`db.newsMain.findOneAndUpdate(${filter}, ${restore});`);
    let params = `{$set: ${JSON.stringify({ awid: 77777777777777 })}}`;
    let db = await TestHelper.executeDbScript(`db.newsMain.findOneAndUpdate(${filter}, ${params});`);
    let expectedError = {
      code: "UuNewsDoesNotExist",
      message: "uuNews does not exist.",
    };
    try {
      let com = await TestHelper.executePostCommand("article/create", { name: "Hello list" }, session);
    } catch (error) {
      expect(error.status).toEqual(400);
      expect(error.message).toEqual(expectedError.message);
    }
    expect.assertions(2);
  });
});

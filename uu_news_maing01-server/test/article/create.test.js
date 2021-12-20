const { TestHelper } = require("uu_appg01_server-test");
const PolygonsTestHelper = require("../polygons-test-helper.js");

const CMD = "article/create";

beforeEach(async () => {
  await TestHelper.setup();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();

  let session = await TestHelper.login("AwidLicenseOwner", false, false);

  let dtoIn = {
    name: "Article 32",
    url: "https://tw1",
    newspaperId: "61bf18a571223717d8dd91d0",
    authorId: "61bc6e3bfb5a841fe8c03b2a",
    publishDate: "2021-10-10",
    topicIdList: [
      "61be38e5de9ab121f465e508",
      "61be38f2de9ab121f465e50b",
      "61bc6e03fb5a841fe8c03b1a",
      "61bc6e00fb5a841fe8c03b17",
    ],
    uuAppProfileAuthorities: "urn:uu:GGALL",
  };
  let result = await TestHelper.executePostCommand("sys/uuAppWorkspace/init", dtoIn, session);
  const filter = `{awid: "${TestHelper.awid}"}`;
  const params = `{$set: ${JSON.stringify({ state: `active` })}}`;
  await TestHelper.executeDbScript(`db.newsMain.findOneAndUpdate(${filter}, ${params});`);
});

afterEach(async () => {
  await TestHelper.dropDatabase();
  await TestHelper.teardown();
});

describe("Testing the article/create...", () => {
  test("HDS", async () => {
    let session = await TestHelper.login("AwidLicenseOwner", false, false);
    let result = await TestHelper.executePostCommand(
      "article/create",
      {
        name: "Article 4w",
        url: "https://tdwd",
        newspaperId: "61bf18a571223717d8dd91d0",
        authorId: "61bc6e3bfb5a841fe8c03b2a",
        publishDate: "2021-10-10",
        topicIdList: ["61be38e5de9ab121f465e508", "61be38f2de9ab121f465e50b"],
      },
      session
    );
    console.log(newspaperId);
    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();
    expect.assertions(2);
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
  test("Test A3 - invalidDtoIn", async () => {
    let session = await TestHelper.login("Authorities", false, false);

    expect.assertions();
    try {
      await TestHelper.executePostCommand("article/create", { name: true }, session);
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(e.message).toEqual("DtoIn is not valid.");
      expect(e.code).toEqual("uu-news-main/article/create/invalidDtoIn");
    }
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
      await TestHelper.executePostCommand("article/create", PolygonsTestHelper.dtoIn.article.create, session);
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(e.message).toEqual("uuNews is not in correct state.");
      expect(e.code).toEqual("uu-news-main/article/create/UuNewsIsNotInCorrectState");
    }
  });
});

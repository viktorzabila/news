const { TestHelper } = require("uu_appg01_server-test");
const ValidateHelper = require("../validate-helper.js");
const PolygonsTestHelper = require("../polygons-test-helper.js");
const CMD = "topic/get";
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
    uuAppProfileAuthorities: "urn:uu:GGALL",
  };
  await TestHelper.executePostCommand("sys/uuAppWorkspace/init", dtoIn, session);
});

describe("Testing the topic/get...", () => {
  test("HDS", async () => {
    let session = await TestHelper.login("AwidLicenseOwner", false, false);
    let dtoIn = {
      id: "61bc6e03fb5a841fe8c03b1a",
    };
    let help = await TestHelper.executePostCommand("topic/create", { name: "List name" }, session);
    let result = await TestHelper.executeGetCommand(CMD, { id: help.id }, session);
    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();
  });
  test("Invalid dtoIn", async () => {
    expect.assertions(3);
    let session = await TestHelper.login("AwidLicenseOwner", false, false);
    try{
      let result = await TestHelper.executePostCommand("topic/create", {}, session);
      let fin = await TestHelper.executeGetCommand("topic/get", {dr:result.id}, session);

    } catch(e){
      expect(e.status).toEqual(400);
      expect(e.message).toEqual("DtoIn is not valid.")
      expect(e.code).toEqual("uu-news-main/topic/create/invalidDtoIn")
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
      await TestHelper.executePostCommand("topic/create", PolygonsTestHelper.dtoIn.topic.create, session);
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(e.message).toEqual("The application is not in correct state.")
      expect(e.code).toEqual("uu-news-main/topic/create/UuNewsIsNotInCorrectState")
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
      let com = await TestHelper.executePostCommand("topic/create", { name: "Hello list" }, session);
    } catch (error) {
      expect(error.status).toEqual(400);
      expect(error.message).toEqual(expectedError.message);
    }
    expect.assertions(2);
  });
});

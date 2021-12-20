const { TestHelper } = require("uu_appg01_server-test");
const PolygonsTestHelper = require("../polygons-test-helper.js");

const CMD = "newspaper/update";
afterAll(async () => {
  await TestHelper.dropDatabase();
  await TestHelper.teardown();
});

beforeAll(async () => {
  await TestHelper.setup();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  let session = await TestHelper.login("AwidLicenseOwner", false, false);

  let dtoIn = {
    uuAppProfileAuthorities: "urn:uu:GGALL",
  };
  await TestHelper.executePostCommand("sys/uuAppWorkspace/init", dtoIn, session);
});

describe("Testing the list/get uuCmd...", () => {
  test("HDS", async () => {
    let session = await TestHelper.login("AwidLicenseOwner", false, false);
    console.log("five");
    let helpingVar = await TestHelper.executePostCommand("newspaper/create", {
      name: "topic1",
      newspaperUrl: "topicSurname2",
    });
    let result = await TestHelper.executePostCommand(
      "newspaper/update",
      { id: helpingVar.id, name: "Newspaper 3", newspaperUrl: "https://ru.wikipedia.org/wiki" },
      session
    );
    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();
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
      let com = await TestHelper.executePostCommand("newspaper/create", { name: "Hello list" }, session);
    } catch (error) {
      expect(error.status).toEqual(400);
      expect(error.message).toEqual("UuNewspaperDoesNotExist does not exist.");
    }
    expect.assertions(2);
  });
  test("Test A3 - invalidDtoIn", async () => {
    let session = await TestHelper.login("Authorities", false, false);

    expect.assertions();
    try {
      await TestHelper.executePostCommand("newspaper/create", { name: true }, session);
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(e.message).toEqual("DtoIn is not valid.");
      expect(e.code).toEqual("uu-news-main/newspaper/create/invalidDtoIn");
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
      await TestHelper.executePostCommand("newspaper/create", PolygonsTestHelper.dtoIn.newspaper.create, session);
    } catch (e) {}
  });
});

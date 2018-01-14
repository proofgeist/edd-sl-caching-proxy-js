import EDDSL from "../src/edd-sl-caching-proxy-js";

const url = "https://edd-sl-proxy.geistgate.com";
const license = "1aeec99b943061c0cd8ee59973aae9b8";
const itemId = "82638";
const activationId = "jest-testing";
const eddsl = new EDDSL(url);

/**
 * Dummy test
 */
describe("EDDSL test", () => {
  jest.setTimeout(10000);
  it("EDDSL is instantiable", () => {
    expect(eddsl).toBeInstanceOf(EDDSL);
  });

  it("EDDSL.check returns site_inactive before activation", () => {
    return eddsl.check(license, itemId, activationId).then((result: any) => {
      return expect(result.license).toEqual("site_inactive");
    });
  });

  it("EDDSL.activate returns 'valid'", () => {
    return eddsl.activate(license, itemId, activationId).then((result: any) => {
      return expect(result.license).toEqual("valid");
    });
  });

  it("EDDSL.check bad license returns 'invalid'", () => {
    return eddsl
      .check("BAD--LICENSE", itemId, activationId)
      .then((result: any) => {
        return expect(result.license).toEqual("invalid");
      });
  });

  it("EDDSL.check bad itemId returns 'item_name_mismatch'", () => {
    return eddsl
      .check(license, "BAD--ITEM--ID", activationId)
      .then((result: any) => {
        return expect(result.license).toEqual("item_name_mismatch");
      });
  });

  it("EDDSL.check returns 'valid' after activation", () => {
    return eddsl.check(license, itemId, activationId).then((result: any) => {
      return expect(result.license).toEqual("valid");
    });
  });

  it("EDDSL.dectivate sets license to 'deactivated'", () => {
    return eddsl
      .deactivate(license, itemId, activationId)
      .then((result: any) => {
        return expect(result.license).toEqual("deactivated");
      });
  });

  it("EDDSL.check returns 'site_inactive' after deactivation", () => {
    return eddsl.check(license, itemId, activationId).then((result: any) => {
      return expect(result.license).toEqual("site_inactive");
    });
  });
});

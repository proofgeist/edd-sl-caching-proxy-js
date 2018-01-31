import EDDSL from "../src/edd-sl-caching-proxy-js";

const url = "https://edd-sl-proxy.geistgate.com";
const license = "1aeec99b943061c0cd8ee59973aae9b8";
const itemId = "82638";
const activationId = "jest-testing";
const eddsl = new EDDSL(url);

describe("EDDSL test", () => {
  jest.setTimeout(10000);
  it("EDDSL is instantiable", () => {
    expect(eddsl).toBeInstanceOf(EDDSL);
  });

  it("EDDSL.licenseCheck returns site_inactive before activation", () => {
    return eddsl
      .licenseCheck(license, itemId, activationId)
      .then((result: any) => {
        return expect(result.license).toEqual("site_inactive");
      });
  });

  it("EDDSL.licenseActivate returns 'valid'", () => {
    return eddsl
      .licenseActivate(license, itemId, activationId)
      .then((result: any) => {
        return expect(result.license).toEqual("valid");
      });
  });

  it("EDDSL.licenseCheck bad license returns 'invalid'", () => {
    return eddsl
      .licenseCheck("BAD--LICENSE", itemId, activationId)
      .then((result: any) => {
        return expect(result.license).toEqual("invalid");
      });
  });

  it("EDDSL.licenseCheck bad itemId returns 'item_name_mismatch'", () => {
    return eddsl
      .licenseCheck(license, "BAD--ITEM--ID", activationId)
      .then((result: any) => {
        return expect(result.license).toEqual("item_name_mismatch");
      });
  });

  it("EDDSL.licenseCheck returns 'valid' after activation", () => {
    return eddsl
      .licenseCheck(license, itemId, activationId)
      .then((result: any) => {
        return expect(result.license).toEqual("valid");
      });
  });

  it("EDDSL.liceseDeactivate sets license to 'deactivated'", () => {
    return eddsl
      .liceseDeactivate(license, itemId, activationId)
      .then((result: any) => {
        return expect(result.license).toEqual("deactivated");
      });
  });

  it("EDDSL.licenseCheck returns 'site_inactive' after deactivation", () => {
    return eddsl
      .licenseCheck(license, itemId, activationId)
      .then((result: any) => {
        return expect(result.license).toEqual("site_inactive");
      });
  });

  it("EDDSL.login works", () => {
    return eddsl.login("toddgeist", "hkq2z6fy").then((result: any) => {
      expect(result.user_email).toEqual("todd@geistinteractive.com");
      expect(result.token).toBeUndefined();
      return true;
    });
  });

  it("EDDSL.isLoggedIn() returns true when logged in", () => {
    return eddsl.isLoggedIn().then(result => {
      return expect(result).toBeTruthy();
    });
  });

  it("EDDSL.user() gets the user", () => {
    const userData = eddsl.user();
    expect(userData.user_email).toEqual("todd@geistinteractive.com");
  });

  it("EDDSL.logOut() removes user Data", () => {
    eddsl.logout();
    const userData = eddsl.user();
    expect(userData).toBeNull();
  });

  it("EDDSL.isLoggedIn() returns false when loggedout", () => {
    return eddsl.isLoggedIn().then(result => {
      return expect(result).toBeFalsy();
    });
  });

  it("EDDSL.login works again", () => {
    return eddsl.login("toddgeist", "hkq2z6fy").then((result: any) => {
      expect(result.user_email).toEqual("todd@geistinteractive.com");
      expect(result.token).toBeUndefined();
      return true;
    });
  });

  it("EDDSL.userLicenses gets an array", () => {
    return eddsl.userLicenses().then((result: any) => {
      expect(result[0].sale).toBeDefined();
      expect(result[0].license).toBeDefined();
      return true;
    });
  });

  it("EDDSL.userLicenses(productName) gets an array ", () => {
    return eddsl
      .userLicenses("FMPerception - Single User")
      .then((result: any) => {
        expect(result[0].sale).toBeDefined();
        expect(result[0].license).toBeDefined();
        return true;
      });
  });

  it("EDDSL.userLicenses fails when logged out", () => {
    eddsl.logout();
    return eddsl.userLicenses().catch(e => {
      expect(e).toBeDefined();
    });
  });
});

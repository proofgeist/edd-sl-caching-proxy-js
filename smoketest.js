const EDDSL = require("./");

const url = "https://edd-sl-proxy.geistgate.com";
const license = "1aeec99b943061c0cd8ee59973aae9b8";
const itemId = "82638";
const activationId = "jest-testing";
const eddsl = new EDDSL(url);

eddsl
  .licenseCheck(license, itemId, activationId)
  .then(result => {
    console.log(result);
  })
  .catch(e => {
    console.log(e);
  });

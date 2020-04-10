const { Builder, Key, By, until} = require("selenium-webdriver");
const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();

let driver;

describe("First name field check", () => {
  before(() => {
    driver = new Builder().forBrowser("chrome").build();
  });

  after(() => {
    return driver.quit();
  });

  it("test", async () => {
    await driver.get("file:///Users/Tak/Development/purpletech/selenium/selenium_web_1/index.html");
    await driver.manage().window().setRect(1440, 830)
    
    let result3 = document.evaluate(
      '//input[@id="child"]/../..',
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
  );
  console.log(result3)
  
    const attr = result3.getAttribute("class")
    console.log(attr)
    assert.equal(attr, "granpa");
  });
  
});

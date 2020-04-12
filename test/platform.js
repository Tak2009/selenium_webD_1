// import the selenium web driver
const { Builder, Key, By, until} = require("selenium-webdriver");
// let until = require('selenium-webdriver').until
const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();

let driver;

describe("Email field check", () => {
  before(() => {
    driver = new Builder().forBrowser("chrome").build();
  });

  after(() => {
    return driver.quit();
  });

  it("label text check", async () => {
    await driver.get("https://revolgy-forms-case-study-master.staging.axiory.com/jp/registration/demo");
    await driver.manage().window().setRect(1440, 830)
    assert(await driver.findElement(By.css(".atm-select-box-container:nth-child(7) .label")).getText() == "プラットフォーム")
  });
  it("ご選択下さい(selected disabled invalid) selected case. an error message expected ", async () => {
    const dropdown = await driver.findElement(By.id("platform"))
    await dropdown.findElement(By.xpath("//*[@id=\'platform\']/option[1]")).click()  //await dropdown.findElement(By.xpath("//option[. = 'MetaTrader4']")).click()
    await driver.findElement(By.css(".button")).click()
    const errorMessage = await driver.findElement(By.css(".atm-select-box-container:nth-child(7) .error-messages")).getText()
    assert(errorMessage !== "");
    // const element = await driver.wait(until.elementLocated(By.xpath("//*[@id=\'platform\']/../../../div[7]"),10000)).getAttribute("class") <--This xpath does not work.... why???
    // assert.equal(element, "atm-select-box-container valid");
  });
  it("pass cases. no error message expected", async () => {
    const pattern = ["option[2]","option[3]"]
    const failResult = []
    const passResult = []
    const dropdown = await driver.findElement(By.id("platform"))
    for (let i = 0; i < pattern.length; i++){
      await dropdown.findElement(By.xpath(`//*[@id=\'platform\']/${pattern[i]}`)).click() 
      await driver.findElement(By.css(".button")).click()
      let validFlag = await driver.findElement(By.css(".atm-select-box-container:nth-child(7) .error-messages")).getText()
        // if there is no error message
      if (validFlag == ""){
        // push "pass" to the pass result array
        passResult.push("pass")
      } else {
        failResult.push("fail")
      }
    }
    assert.equal(passResult.length, pattern.length);
  });
});


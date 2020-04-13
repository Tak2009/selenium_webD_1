// import the selenium web driver
const { Builder, Key, By, until} = require("selenium-webdriver");
// let until = require('selenium-webdriver').until
const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();

let driver;

describe("Leverage field check", () => {
  before(() => {
    driver = new Builder().forBrowser("chrome").build();
  });

  after(() => {
    return driver.quit();
  });

  it("label text check", async () => {
    await driver.get("https://revolgy-forms-case-study-master.staging.axiory.com/jp/registration/demo");
    await driver.manage().window().setRect(1440, 830)
    assert(await driver.findElement(By.css(".atm-select-box-container:nth-child(9) .label")).getText() == "ご希望のレバレッジをご教示下さい")
  });
  it("ご選択下さい(selected disabled invalid) selected case. an error message expected ", async () => {
    const dropdown = await driver.findElement(By.id("leverage"))
    await dropdown.findElement(By.xpath("//*[@id=\'leverage\']/option[1]")).click()  //await dropdown.findElement(By.xpath("//option[. = '1:1']")).click() for option[2]
    await driver.findElement(By.css(".button")).click()
    const errorMessage = await driver.findElement(By.css(".atm-select-box-container:nth-child(9) .error-messages")).getText()
    assert(errorMessage !== "");
  });
  it("pass cases. no error message expected", async () => {
    const pattern = ["option[2]","option[3]","option[4]","option[5]","option[6]","option[7]","option[8]","option[9]"]
    const failResult = []
    const passResult = []
    const dropdown = await driver.findElement(By.id("leverage"))
    for (let i = 0; i < pattern.length; i++){
      // debugger
      await dropdown.findElement(By.xpath(`//*[@id=\'leverage\']/${pattern[i]}`)).click() 
      await driver.findElement(By.css(".button")).click()
      let validFlag = await driver.findElement(By.css(".atm-select-box-container:nth-child(9) .error-messages")).getText()
        // if there is no error message
      if (validFlag == ""){
        // push "pass" to the pass result array
        passResult.push(pattern[i])
      } else {
        failResult.push(pattern[i])
      }
    }
    assert.equal(passResult.length, pattern.length);
  });
});


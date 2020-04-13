// import the selenium web driver
const { Builder, Key, By, until} = require("selenium-webdriver");
// let until = require('selenium-webdriver').until
const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();

let driver;

describe("Account Type field check", () => {
  before(() => {
    driver = new Builder().forBrowser("chrome").build();
  });

  after(() => {
    return driver.quit();
  });

  it("label text check", async () => {
    await driver.get("https://revolgy-forms-case-study-master.staging.axiory.com/jp/registration/demo");
    await driver.manage().window().setRect(1440, 830)
    assert(await driver.findElement(By.css(".atm-select-box-container:nth-child(8) .label")).getText() == "最初のお口座のタイプをご選択下さい")
  });
  it("ご選択下さい(selected disabled invalid) selected case. an error message expected ", async () => {
    const dropdown = await driver.findElement(By.id("accountType"))
    await dropdown.findElement(By.xpath("//*[@id=\'accountType\']/option[1]")).click()  //await dropdown.findElement(By.xpath("//option[. = 'Standard (STP)']")).click() for option[2]
    await driver.findElement(By.css(".button")).click()
    const errorMessage = await driver.findElement(By.css(".atm-select-box-container:nth-child(8) .error-messages")).getText() // By.xpath("//*[@id=\'accountType\']/../../../div/div[1]")
    assert(errorMessage == "Please select a valid option!")
    assert(errorMessage !== "");
  });
  it("pass cases. no error message expected", async () => {
    // pass case. these must pass
    const pattern = ["option[2]","option[3]"]
    const failResult = []
    const passResult = []
    const dropdown = await driver.findElement(By.id("accountType"))
    for (let i = 0; i < pattern.length; i++){
      // debugger
      await dropdown.findElement(By.xpath(`//*[@id=\'accountType\']/${pattern[i]}`)).click() 
      await driver.findElement(By.css(".button")).click()
      let validFlag = await driver.findElement(By.css(".atm-select-box-container:nth-child(8) .error-messages")).getText()
        // if there is no error message
      if (validFlag == ""){
        // push "pass" to the pass result array
        passResult.push(pattern[i])
      } else {
        failResult.push(pattern[i])
      }
    }
    // as pass expected, passResult.length must be equal to the legth of pass pattern array
    assert.equal(passResult.length, pattern.length);
  });
});


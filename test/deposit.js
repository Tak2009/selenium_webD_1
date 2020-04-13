// import the selenium web driver
const { Builder, Key, By, until} = require("selenium-webdriver");
// let until = require('selenium-webdriver').until
const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();

let driver;

describe("Deposit field check", () => {
  before(() => {
    driver = new Builder().forBrowser("chrome").build();
  });

  after(() => {
    return driver.quit();
  });

  it("label text check", async () => {
    await driver.get("https://revolgy-forms-case-study-master.staging.axiory.com/jp/registration/demo");
    await driver.manage().window().setRect(1440, 830)
    assert(await driver.findElement(By.xpath("//label[@for=\'deposit\']")).getText() == "初期残高")
    assert(await driver.findElement(By.xpath("//p[@class=\'description\']")).getText() == "初期残高の希望額をご入力ください。")
  });
  it("invalid cases. error messages expected ", async () => {
    //fail pattern. these need to fail
    const pattern = [0,999,789,21,98,1]
    //here, using hash to store key:value
    const failResult = {}
    const passResult = []
    
    for (let i = 0; i < pattern.length; i++){
      // debugger
      await driver.findElement(By.id("deposit")).clear()
      await driver.findElement(By.id("deposit")).sendKeys(pattern[i])
      await driver.findElement(By.id("currency")).click()
      let validFlag = await driver.findElement(By.xpath("//input[@id=\'deposit\']/../../div[2]")).getText()
      // if there is no error message
      if (validFlag !== ""){
        // push succesfully fail case to the fail result array
        failResult[pattern[i]] = validFlag
      } else {
        passResult.push(pattern[i])
      }
    }
    // as fail expected, failResult key array length must be equal to the legth of fail pattern array
    assert.equal(Object.keys(failResult).length, pattern.length);
    
  });
  it("pass cases. no error message expected", async () => {
    //pass pattern. these need to pass
    const pattern = [1000,2001,3090,5000]
    //here, using hash to store key:value
    const failResult = []
    const passResult = {}
    
    for (let i = 0; i < pattern.length; i++){
      // debugger
      await driver.findElement(By.id("deposit")).clear()
      await driver.findElement(By.id("deposit")).sendKeys(pattern[i])
      await driver.findElement(By.id("currency")).click()
      let validFlag = await driver.findElement(By.xpath("//input[@id=\'deposit\']/../../div[2]")).getText()
      // if there is no error message
      if (validFlag == ""){
        // push pass case to the pass result array
        passResult[pattern[i]] = validFlag
      } else {
        failResult.push(pattern[i])
      }
    }
    // as pass expected, passResult key array length must be equal to the legth of pass pattern array
    assert.equal(Object.keys(passResult).length, pattern.length);
  });
});


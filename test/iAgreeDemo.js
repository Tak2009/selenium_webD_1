// import the selenium web driver
const { Builder, Key, By, until} = require("selenium-webdriver");
// let until = require('selenium-webdriver').until
const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();

let driver;

describe("Check box check", () => {
  before(() => {
    driver = new Builder().forBrowser("chrome").build();
  });

  after(() => {
    return driver.quit();
  });

  it("label text check", async () => {
    await driver.get("https://revolgy-forms-case-study-master.staging.axiory.com/jp/registration/demo");
    // 画面サイズ
    await driver.manage().window().setRect(1440, 830)
    assert(await driver.findElement(By.xpath("//input[@id=\'iAgreeDemo\']/../label[@for=\'iAgreeDemo\']")).getText() == "ニュースレター、特別なお知らせなどのメールを弊社から受け取ることに同意します。")
  });
  it("not ticked case. error message check", async () => {
    await driver.findElement(By.id("iAgreeDemo")).click()
    // debugger
    await driver.findElement(By.id("iAgreeDemo")).click()
    // check the error message
    assert(await driver.wait(until.elementLocated(By.xpath("//input[@id=\'iAgreeDemo\']/../../div[@class=\'error-messages\']/div/div"),10000)).getText() == "下記のボックスに✓を入れることで、同意となります。")
  });
  it("not ticked case. validation check = field is red ticked", async () => {
    //親の親要素のクラス属性の属性値を確認
  const element = await driver.findElement(By.xpath("//input[@id=\'iAgreeDemo\']/..")).getAttribute("class")
    //検証
    assert.equal(element, "atm-check-box-container invalid");
  });
  it("pass case. no error message", async () => {
    await driver.findElement(By.id("iAgreeDemo")).click()
    //検証：Error Messageがないかどうか確認
    const errorMessage = await driver.findElement(By.xpath("//input[@id=\'iAgreeDemo\']/../../div")).getText()
    assert.equal(errorMessage, "");
  });
  it("pass case. validation check = field is green ticked", async () => {
    const element = await driver.findElement(By.xpath("//input[@id=\'iAgreeDemo\']/../../div[2]")).getAttribute("class")
    assert.equal(element, "atm-check-box-container valid");
  });
});


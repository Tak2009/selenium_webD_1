// import the selenium web driver
const { Builder, Key, By, until} = require("selenium-webdriver");
// let until = require('selenium-webdriver').until
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

  it("label text check", async () => {
    await driver.get("https://revolgy-forms-case-study-master.staging.axiory.com/jp/registration/demo");
    // 画面サイズ
    await driver.manage().window().setRect(1440, 830)
    // text check
    assert(await driver.findElement(By.css(".atm-input-layout:nth-child(2) .label")).getText() == "名（First name）例：Taro")
  });
  it("blank case. error message check", async () => {
    // click in the field to activate. id=firstname but the label text says family name...　tricky!
    await driver.findElement(By.id("firstname")).click()
    // id=lastname is assigned to first name node.. tricky!!
    await driver.findElement(By.id("lastname")).click()
    // check the error message
    assert(await driver.wait(until.elementLocated(By.css(".atm-input-layout:nth-child(2) .error-messages"),10000)).getText() == "お客様のお名前をご教示下さい。")
  });
  it("blank case. validation check = field is red ticked", async () => {
    //親の親要素のクラス属性の属性値を確認
    const element = await driver.findElement(By.xpath("//input[@id=\'firstname\']/../..")).getAttribute("class")
    //検証
    assert.equal(element, "atm-input-container invalid");
  });
  it("number case. error message check", async () => {
    await driver.findElement(By.id("firstname")).sendKeys("kimo777")
    await driver.findElement(By.id("lastname")).click()
    assert(await driver.wait(until.elementLocated(By.css(".atm-input-layout:nth-child(2) .error-messages"),10000)).getText() == "お名前が正しくないフォーマットで記入されています。半角の英字でご記入下さい。")
  });
  it("number case. validation check = field is red ticked", async () => {
    const element = await driver.findElement(By.xpath("//input[@id=\'firstname\']/../..")).getAttribute("class")
    assert.equal(element, "atm-input-container invalid");
  });
  it("special charactor input case. error message check", async () => {
    await driver.findElement(By.id("firstname")).clear()
    await driver.findElement(By.id("firstname")).sendKeys("kimo^%$£")
    await driver.findElement(By.id("lastname")).click()
    assert(await driver.wait(until.elementLocated(By.css(".atm-input-layout:nth-child(2) .error-messages"),10000)).getText() == "お名前が正しくないフォーマットで記入されています。半角の英字でご記入下さい。")
  });
  it("special charactor case. validation check = field is red ticked", async () => {
    const element = await driver.findElement(By.xpath("//input[@id=\'firstname\']/../..")).getAttribute("class")
    assert.equal(element, "atm-input-container invalid");
  });
  it("only space input case. error message check", async () => {
    await driver.findElement(By.id("firstname")).clear()
    await driver.findElement(By.id("firstname")).sendKeys(" ")
    await driver.findElement(By.id("lastname")).click()
    assert(await driver.wait(until.elementLocated(By.css(".atm-input-layout:nth-child(2) .error-messages"),10000)).getText() == "お客様のお名前をご教示下さい。")
  });
  it("only space case. validation check = field is red ticked", async () => {
    const element = await driver.findElement(By.xpath("//input[@id=\'firstname\']/../..")).getAttribute("class")
    assert.equal(element, "atm-input-container invalid");
  })
  it("only hyphen input case. error message check", async () => {
    await driver.findElement(By.id("firstname")).clear()
    await driver.findElement(By.id("firstname")).sendKeys("-")
    await driver.findElement(By.id("lastname")).click()
    assert(await driver.wait(until.elementLocated(By.css(".atm-input-layout:nth-child(2) .error-messages"),10000)).getText() == "お客様のお名前をご教示下さい。")
  });
  it("only hyphen case. validation check = field is red ticked", async () => {
    const element = await driver.findElement(By.xpath("//input[@id=\'firstname\']/../..")).getAttribute("class")
    assert.equal(element, "atm-input-container invalid");
  })
  it("pass case. no error message", async () => {
    await driver.findElement(By.id("firstname")).clear()
    //テストをパスするインプットを入力エリアに渡す
    await driver.findElement(By.id("firstname")).sendKeys("kimotoKIMOTO")
    //lastname入力エリアからでる。これをすることでこの結論からDOMアクションをトリガーさせる
    await driver.findElement(By.id("lastname")).click()
    //検証：Error Messageがないかどうか確認
    const errorMessage = await driver.findElement(By.css(".atm-input-layout:nth-child(2) .error-messages")).getText()
    assert.equal(errorMessage, "");
  });
  it("pass case. validation check = field is green ticked", async () => {
    const element = await driver.findElement(By.xpath("//input[@id=\'firstname\']/../..")).getAttribute("class")
    assert.equal(element, "atm-input-container valid");
  });
});


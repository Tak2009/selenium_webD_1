// import the selenium web driver
const { Builder, Key, By, until} = require("selenium-webdriver");
// let until = require('selenium-webdriver').until
const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();

let driver;

describe("Family name field check", () => {
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
    // 
    assert(await driver.findElement(By.css(".atm-input-layout:nth-child(3) .label")).getText() == "性（Family name）例：Yamada")
  });
  it("blank case", async () => {
    // click in the field to activate. id=lastname but the label text says first name...　tricky!
    await driver.findElement(By.id("lastname")).click()
    // id=firstname is assigned to family name node.. tricky!!
    await driver.findElement(By.id("firstname")).click()
    // check the error message
    assert(await driver.wait(until.elementLocated(By.css(".atm-error-message-container"),10000)).getText() == "お客様のご苗字をご教示下さい。")
  });
  it("blank case. validation check = field is red ticked", async () => {
    //親の親要素のクラス属性の属性値を確認
    const element = await driver.findElement(By.xpath("//input[@id=\'lastname\']/../..")).getAttribute("class")
    //検証
    assert.equal(element, "atm-input-container invalid");
  });
  it("number case", async () => {
    await driver.findElement(By.id("lastname")).sendKeys("take777")
    await driver.findElement(By.id("firstname")).click()
    await driver.findElement(By.css(".atm-error-message-container")).click()
    assert(await driver.wait(until.elementLocated(By.css(".atm-error-message-container"),10000)).getText() == "ご苗字が正しくないフォーマットで記入されています。半角の英字でご記入下さい。")
  });
  it("number case. validation check = field is red ticked", async () => {
    //親の親要素のクラス属性の属性値を確認
    const element = await driver.findElement(By.xpath("//input[@id=\'lastname\']/../..")).getAttribute("class")
    //検証
    assert.equal(element, "atm-input-container invalid");
  });
  it("special charactor input case", async () => {
    await driver.findElement(By.id("lastname")).clear()
    await driver.findElement(By.id("lastname")).sendKeys("take^%$£")
    await driver.findElement(By.id("firstname")).click()
    await driver.findElement(By.css(".atm-error-message-container")).click()
    assert(await driver.wait(until.elementLocated(By.css(".atm-error-message-container"),10000)).getText() == "ご苗字が正しくないフォーマットで記入されています。半角の英字でご記入下さい。")
  });
  it("special charactor case. validation check = field is red ticked", async () => {
    //親の親要素のクラス属性の属性値を確認
    const element = await driver.findElement(By.xpath("//input[@id=\'lastname\']/../..")).getAttribute("class")
    //検証
    assert.equal(element, "atm-input-container invalid");
  });
  it("only space input case", async () => {
    await driver.findElement(By.id("lastname")).clear()
    await driver.findElement(By.id("lastname")).sendKeys(" ")
    await driver.findElement(By.id("firstname")).click()
    await driver.findElement(By.css(".atm-error-message-container")).click()
    assert(await driver.wait(until.elementLocated(By.css(".atm-error-message-container"),10000)).getText() == "お客様のご苗字をご教示下さい。")
  });
  it("only space case. validation check = field is red ticked", async () => {
    //親の親要素のクラス属性の属性値を確認
    const element = await driver.findElement(By.xpath("//input[@id=\'lastname\']/../..")).getAttribute("class")
    //検証
    assert.equal(element, "atm-input-container invalid");
  })
  it("only hyphen input case", async () => {
    await driver.findElement(By.id("lastname")).clear()
    await driver.findElement(By.id("lastname")).sendKeys("-")
    await driver.findElement(By.id("firstname")).click()
    await driver.findElement(By.css(".atm-error-message-container")).click()
    assert(await driver.wait(until.elementLocated(By.css(".atm-error-message-container"),10000)).getText() == "お客様のご苗字をご教示下さい。")
  });
  it("only hyphen case. validation check = field is red ticked", async () => {
    //親の親要素のクラス属性の属性値を確認
    const element = await driver.findElement(By.xpath("//input[@id=\'lastname\']/../..")).getAttribute("class")
    //検証
    assert.equal(element, "atm-input-container invalid");
  })
  it("pass case. no error message", async () => {
    await driver.findElement(By.id("lastname")).clear()
    //テストをパスするインプットを入力エリアに渡す
    await driver.findElement(By.id("lastname")).sendKeys("kimotoKIMOTO")
    //lastname入力エリアからでる。これをすることでこの結論からDOMアクションをトリガーさせる
    await driver.findElement(By.id("firstname")).click()
    //検証：Error Messageがないかどうか確認
    const errorMessage = await driver.findElement(By.css(".error-messages")).getText()
    assert.equal(errorMessage, "");
  });
  it("pass case. validation check = field is green ticked", async () => {
    //親の親要素のクラス属性の属性値を確認
    const element = await driver.findElement(By.xpath("//input[@id=\'lastname\']/../..")).getAttribute("class")
    //検証
    assert.equal(element, "atm-input-container valid");
  });
});


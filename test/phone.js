// import the selenium web driver
const { Builder, Key, By, until} = require("selenium-webdriver");
// let until = require('selenium-webdriver').until
const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();

let driver;

describe("Phone number field check", () => {
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
    assert(await driver.findElement(By.css(".atm-input-layout:nth-child(4) .label")).getText() == "お電話番号")
  });
  it("blank case. error message check", async () => {
    await driver.findElement(By.id("phone")).click()
    await driver.findElement(By.id("lastname")).click()
    // check the error message
    assert(await driver.wait(until.elementLocated(By.css(".atm-input-layout:nth-child(4) .error-messages"),10000)).getText() == "お客様のお電話番号をご教示下さい。ご教示頂いたお電話番号は、お客様のお口座に問題がございます場合のみ使用させて頂きます。")
  });
  it("blank case. validation check = field is red ticked", async () => {
    //親の親要素のクラス属性の属性値を確認
    const element = await driver.findElement(By.xpath("//input[@id=\'phone\']/../..")).getAttribute("class")
    //検証
    assert.equal(element, "atm-input-container invalid");
  });
  it("letter case. error message check", async () => {
    await driver.findElement(By.id("phone")).sendKeys("7878takeああくKiaｱ")
    await driver.findElement(By.id("lastname")).click()
    assert(await driver.wait(until.elementLocated(By.css(".atm-input-layout:nth-child(4) .error-messages"),10000)).getText() == "お電話番号が正しくないフォーマットで記入されています。半角の数字でご記入下さい。")
  });
  it("letter case. validation check = field is red ticked", async () => {
    //親の親要素のクラス属性の属性値を確認
    const element = await driver.findElement(By.xpath("//input[@id=\'phone\']/../..")).getAttribute("class")
    //検証
    assert.equal(element, "atm-input-container invalid");
  });
  it("special charactor input case. error message check", async () => {
    await driver.findElement(By.id("phone")).clear()
    await driver.findElement(By.id("phone")).sendKeys(":<>777^%$£")
    await driver.findElement(By.id("lastname")).click()
    assert(await driver.wait(until.elementLocated(By.css(".atm-input-layout:nth-child(4) .error-messages"),10000)).getText() == "お電話番号が正しくないフォーマットで記入されています。半角の数字でご記入下さい。")
  });
  it("special charactor case. validation check = field is red ticked", async () => {
    const element = await driver.findElement(By.xpath("//input[@id=\'phone\']/../..")).getAttribute("class")
    assert.equal(element, "atm-input-container invalid");
  });
  it("only space input case. error message check", async () => {
    await driver.findElement(By.id("phone")).clear()
    await driver.findElement(By.id("phone")).sendKeys(" ")
    await driver.findElement(By.id("lastname")).click()
    assert(await driver.wait(until.elementLocated(By.css(".atm-input-layout:nth-child(4) .error-messages"),10000)).getText() == "お客様のお電話番号をご教示下さい。ご教示頂いたお電話番号は、お客様のお口座に問題がございます場合のみ使用させて頂きます。")
  });
  it("only space case. validation check = field is red ticked", async () => {
    const element = await driver.findElement(By.xpath("//input[@id=\'phone\']/../..")).getAttribute("class")
    assert.equal(element, "atm-input-container invalid");
  })
  it("only hyphen input case. error message check", async () => {
    await driver.findElement(By.id("phone")).clear()
    await driver.findElement(By.id("phone")).sendKeys("-")
    await driver.findElement(By.id("lastname")).click()
    assert(await driver.wait(until.elementLocated(By.css(".atm-input-layout:nth-child(4) .error-messages"),10000)).getText() == "お電話番号が正しくないフォーマットで記入されています。半角の数字でご記入下さい。")
  });
  it("only hyphen case. validation check = field is red ticked", async () => {
    const element = await driver.findElement(By.xpath("//input[@id=\'phone\']/../..")).getAttribute("class")
    assert.equal(element, "atm-input-container invalid");
  })
  it("pass case. no error message", async () => {
    await driver.findElement(By.id("phone")).clear()
    //テストをパスするインプットを入力エリアに渡す
    await driver.findElement(By.id("phone")).sendKeys("08655365293")
    //lastname入力エリアからでる。これをすることでこの結論からDOMアクションをトリガーさせる
    await driver.findElement(By.id("lastname")).click()
    //検証：Error Messageがないかどうか確認
    const errorMessage = await driver.findElement(By.css(".atm-input-layout:nth-child(4) .error-messages")).getText()
    assert.equal(errorMessage, "");
    // const elements = await driver.findElements(By.css(".atm-input-layout:nth-child(4) .error-messages"))
    // assert(elements.length, 0)
  });
  it("pass case. validation check = field is green ticked", async () => {
    const element = await driver.findElement(By.xpath("//input[@id=\'phone\']/../..")).getAttribute("class")
    assert.equal(element, "atm-input-container valid");
  });
});


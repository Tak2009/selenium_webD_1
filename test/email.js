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
    // 画面サイズ
    await driver.manage().window().setRect(1440, 830)
    assert(await driver.findElement(By.css(".atm-input-layout:nth-child(6) .label")).getText() == "メールアドレス")
  });
  it("blank case. error message check", async () => {
    await driver.findElement(By.id("email")).click()
    await driver.findElement(By.id("lastname")).click()
    // check the error message
    assert(await driver.wait(until.elementLocated(By.css(".atm-input-layout:nth-child(6) .error-messages"),10000)).getText() == "お客様のメールアドレスをご教示下さい。ご教示頂いたメールアドレスは、弊社サービスまたはお客様のお口座に関する重要な情報をお送りする際に使用させて頂きます。スパムの心配はございません。")
  });
  it("blank case. validation check = field is red ticked", async () => {
    //親の親要素のクラス属性の属性値を確認
    const element = await driver.findElement(By.xpath("//input[@id=\'email\']/../..")).getAttribute("class")
    //検証
    assert.equal(element, "atm-input-container invalid");
  });
  it("dot hyphen underscore input cases. they must be accepted and hence no error message is expected", async () => {
    // these should pass and no error message expected 
    const pattern = ["takkimo9@gmail.com","tak.kimo@gmail.com","tak-kimo@gmail.com","tak_kimo@gmail.com"]
    const failResult = []
    const passResult = []
    // debugger
    for (let i = 0; i < pattern.length; i++){
      // debugger
      await driver.findElement(By.id("email")).clear()
      await driver.findElement(By.id("email")).sendKeys(pattern[i])
      await driver.findElement(By.id("lastname")).click()
      let elements = await driver.findElement(By.css(".atm-input-layout:nth-child(6) .error-messages")).getText()
      // if there is an error message pops up
      if (elements != ""){
        // push "failed" to the result array
        failResult.push("failed")
      } else {
        passResult.push("pass")
      }
    }
    // the number of error messages is expected to be 0 as these 4 cases should pass
    assert.equal(failResult.length, 0)
  });
  it("dot hyphen underscore input cases. validation check = field is GREEN ticked", async () => {
    const pattern = ["takkimo9@gmail.com","tak.kimo@gmail.com","tak-kimo@gmail.com","tak_kimo@gmail.com"]
    const failResult = []
    const passResult = []
    for (let i = 0; i < pattern.length; i++){
      await driver.findElement(By.id("email")).clear()
      await driver.findElement(By.id("email")).sendKeys(pattern[i])
      await driver.findElement(By.id("lastname")).click()
      let validFlag = await driver.findElement(By.xpath("//input[@id=\'email\']/../..")).getAttribute("class")
      // if the validFlag = invalid
      if (validFlag == "atm-input-container invalid"){
        // push "failed" to the fail result array as it is supposed to be valid
        failResult.push("failed")
      } else {
        passResult.push("pass")
      }
    }
    assert.equal(failResult.length, 0);
  });
  it("@ cases. the pattern array elements must be rejected", async () => {
    // these should pass and no error message expected 
    const pattern = ["a@","@gmail.com","a b c@gmail.com","abc.@gmail.com","abc..@gmail.com","abs@&%$#*+.com"]
    const failResult = []
    const passResult = []
    debugger
    for (let i = 0; i < pattern.length; i++){
      debugger
      await driver.findElement(By.id("email")).clear()
      await driver.findElement(By.id("email")).sendKeys(pattern[i])
      await driver.findElement(By.id("lastname")).click()
      let elements = await driver.findElement(By.css(".atm-input-layout:nth-child(6) .error-messages")).getText()
      // if there is an error message pops up
      if (elements == "メールアドレスが正しくないフォーマットで記入されています。ご確認下さい。"){
        // push "failed" to the fail result array
        failResult.push("failed")
      } else {
        passResult.push("pass")
      }
    }
    // the number of error messages is expected to be the same length of fail case pattern array
    assert.equal(failResult.length, pattern.length)
  });
  it("@ cases. validation check = field is red ticked", async () => {
    const pattern = ["a@","@gmail.com","a b c@gmail.com","abc.@gmail.com","abc..@gmail.com","abs@&%$#*+.com"]
    const failResult = []
    const passResult = []
    // debugger
    for (let i = 0; i < pattern.length; i++){
      await driver.findElement(By.id("email")).clear()
      await driver.findElement(By.id("email")).sendKeys(pattern[i])
      await driver.findElement(By.id("lastname")).click()
      let validFlag = await driver.findElement(By.xpath("//input[@id=\'email\']/../..")).getAttribute("class")
      // if the validFlag = invalid
      if (validFlag == "atm-input-container invalid"){
        // push "failed" to the fail result array as it is supposed to be invalid
        failResult.push("failed")
      } else {
        passResult.push("pass")
      }
    }
    assert.equal(failResult.length, pattern.length);
  });
  it("special charactor input case. error message check", async () => {
    await driver.findElement(By.id("email")).clear()
    await driver.findElement(By.id("email")).sendKeys("^%$£@gmail.com")
    await driver.findElement(By.id("lastname")).click()
    assert(await driver.wait(until.elementLocated(By.css(".atm-input-layout:nth-child(6) .error-messages"),10000)).getText() == "メールアドレスが正しくないフォーマットで記入されています。ご確認下さい。")
  });
  it("special charactor case. validation check = field is red ticked", async () => {
    const element = await driver.findElement(By.xpath("//input[@id=\'email\']/../..")).getAttribute("class")
    assert.equal(element, "atm-input-container invalid");
  });
  it("only space input case. error message check", async () => {
    await driver.findElement(By.id("email")).clear()
    await driver.findElement(By.id("email")).sendKeys(" ")
    await driver.findElement(By.id("lastname")).click()
    assert(await driver.wait(until.elementLocated(By.css(".atm-input-layout:nth-child(6) .error-messages"),10000)).getText() == "お客様のメールアドレスをご教示下さい。ご教示頂いたメールアドレスは、弊社サービスまたはお客様のお口座に関する重要な情報をお送りする際に使用させて頂きます。スパムの心配はございません。")
  });
  it("only space case. validation check = field is red ticked", async () => {
    const element = await driver.findElement(By.xpath("//input[@id=\'email\']/../..")).getAttribute("class")
    assert.equal(element, "atm-input-container invalid");
  })
  it("space input case. error message check", async () => {
    await driver.findElement(By.id("email")).clear()
    await driver.findElement(By.id("email")).sendKeys("tak kimo@gmail.com")
    await driver.findElement(By.id("lastname")).click()
    assert(await driver.wait(until.elementLocated(By.css(".atm-input-layout:nth-child(6) .error-messages"),10000)).getText() == "メールアドレスが正しくないフォーマットで記入されています。ご確認下さい。")
  });
  it("space input case. validation check = field is red ticked", async () => {
    const element = await driver.findElement(By.xpath("//input[@id=\'email\']/../..")).getAttribute("class")
    assert.equal(element, "atm-input-container invalid");
  })
  it("only hyphen input case. error message check", async () => {
    await driver.findElement(By.id("email")).clear()
    await driver.findElement(By.id("email")).sendKeys("-")
    await driver.findElement(By.id("lastname")).click()
    assert(await driver.wait(until.elementLocated(By.css(".atm-input-layout:nth-child(6) .error-messages"),10000)).getText() == "メールアドレスが正しくないフォーマットで記入されています。ご確認下さい。")
  });
  it("only hyphen case. validation check = field is red ticked", async () => {
    const element = await driver.findElement(By.xpath("//input[@id=\'email\']/../..")).getAttribute("class")
    assert.equal(element, "atm-input-container invalid");
  })
  it("pass case. no error message", async () => {
    await driver.findElement(By.id("email")).clear()
    //テストをパスするインプットを入力エリアに渡す
    await driver.findElement(By.id("email")).sendKeys("tak.1-kim_77@gmail.com")
    //lastname入力エリアからでる。これをすることでこの結論からDOMアクションをトリガーさせる
    await driver.findElement(By.id("lastname")).click()
    //検証：Error Messageがないかどうか確認
    const errorMessage = await driver.findElement(By.css(".atm-input-layout:nth-child(6) .error-messages")).getText()
    assert.equal(errorMessage, "");
    // const elements = await driver.findElements(By.css(".atm-input-layout:nth-child(4) .error-messages"))
    // assert(elements.length, 0)
  });
  it("pass case. validation check = field is green ticked", async () => {
    const element = await driver.findElement(By.xpath("//input[@id=\'email\']/../..")).getAttribute("class")
    assert.equal(element, "atm-input-container valid");
  });
});


// import the selenium web driver
const { Builder, Key, By, until} = require("selenium-webdriver");
// let until = require('selenium-webdriver').until
const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();

// async function main() {
//   let driver = await new Builder()
//       .forBrowser('chrome')
//       .build();

let driver;

describe("First name field check", () => {
  before(() => {
    driver = new Builder().forBrowser("chrome").build();
  });

  after(() => {
    return driver.quit();
  });

  it("blank case", async () => {
    await driver.get("https://revolgy-forms-case-study-master.staging.axiory.com/jp/registration/demo");
    // 画面サイズ
    await driver.manage().window().setRect(1440, 830)
    // click in the field to activate. id=lastname is assigned to first name. tricky!
    await driver.findElement(By.id("lastname")).click()
    // id=firstname is assigned to lastname. tricky!
    await driver.findElement(By.id("firstname")).click()
    // check the error message
    assert(await driver.wait(until.elementLocated(By.css(".atm-error-message-container"),10000)).getText() == "お客様のご苗字をご教示下さい。")
 
    // // //////test
    // // id=lastname is assigned to first name. tricky!
    // // let ele1 = await driver.wait(until.elementLocated(By.id("lastname")),10000);
    // let ele1 = await driver.findElement(By.id("lastname"))
    // debugger
    // ele1.click()
    // // id=firstname is assigned to lastname. tricky!
    // let ele2 = await driver.findElement(By.id("firstname"))
    // debugger
    // ele2.click()
    // // let ele3 = await driver.findElement(By.css(".atm-error-message-container"))
    // // let ele3 = await driver.wait(until.elementLocated(By.css(".atm-error-message-container"),10000));
    // assert(await driver.wait(until.elementLocated(By.css(".atm-error-message-container"),10000)).getText() == "お客様のご苗字をご教示下さい。")

    // let ele = await driver.wait(until.elementLocated(By.id('lastname')),10000);
    // debugger
    // //親の親の要素を探す 親の場合は”..”で二つ上なら"../.."
    // const grandParentElement = ele.findElement(By.xpath("../.."))
    // //親の親の要素のクラス属性の属性値をゲット
    // const attributeOfGranPEle = grandParentElement.getAttribute("className")
    // // /////end
  });
  it("number case", async () => {
    // input invalid input = number
    const test = await driver.findElement(By.id("lastname"))
    const test2 = await driver.findElement(By.id("lastname"))
    await driver.findElement(By.id("lastname")).sendKeys("9")
    await driver.findElement(By.id("firstname")).click()
    await driver.findElement(By.css(".atm-error-message-container")).click()
    assert(await driver.wait(until.elementLocated(By.css(".atm-error-message-container"),10000)).getText() == "ご苗字が正しくないフォーマットで記入されています。半角の英字でご記入下さい。")
  });
  it("pass case. no error message", async () => {
    
    await driver.findElement(By.id("lastname")).click()
    await driver.findElement(By.id("lastname")).clear()
    //テストをパスするインプットを入力エリアに渡す
    await driver.findElement(By.id("lastname")).sendKeys("kimotoKIMOTO")
    //lastname入力エリアからでる。これをすることでこの結論からDOMアクションをトリガーさせる
    await driver.findElement(By.id("firstname")).click()
    debugger
    //child element
    const childEle = await driver.findElement(By.id("lastname")).parent //driver.wait(until.elementLocated(By.id('lastname')),20000);
    // grand parent element
    const grandParent = childEle.parent
    //探し当てた親の親のクラス属性の属性値がatm-input-container validであることを確認
    assert.equal(grandParent.getAttribute("class"), "atm-input-container valid");
    //更にエラーメッセージが入っていないことを確認する
    // const errorMessage = await driver.findElement(By.css(".atm-error-message-container")).getText()
    // assert.equal(errorMessage, "");

    });
});
//}

//*[@id="page"]/div/div/div/main/div/div/div/div/div/form/div[2]/section/div[3]/div
// /html/body/div[1]/div/div/div/main/div/div/div/div/div/form/div[2]/section/div[3]/div


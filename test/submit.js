// import the selenium web driver
const { Builder, Key, By, until} = require("selenium-webdriver");
// let until = require('selenium-webdriver').until
const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();

 // handmade sleep. 
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

let driver;

describe("Submit button check", () => {
  before(() => {
    driver = new Builder().forBrowser("chrome").build();
  });
  after(() => {
    sleep(20000).then(() => {
    return driver.quit();
    })
  });
  it("pass cases. can navigate to the confirmation screen", async () => {
    await driver.get("https://revolgy-forms-case-study-master.staging.axiory.com/jp/registration/demo");
    await driver.manage().window().setRect(1440, 830)
    //pass pattern
    const pattern = {
      firstname: "tak",
      lastname: "kim",
      phone: "08655365293",
      countryLabel: "United Kingdom",
      email: "tak@gmail.com",
      platform: "//option[. = 'MetaTrader4']",
      accountType: "//option[. = 'Standard (STP)']",
      leverage: "//option[. = '1:10']",
      currency: "//option[. = 'JPY']",
      deposit: "1000"
    };
    const {firstname, lastname, phone, countryLabel, email, platform, accountType, leverage, currency, deposit} = pattern

    // debugger
    await driver.findElement(By.id("firstname")).sendKeys(firstname)
    await driver.findElement(By.id("lastname")).sendKeys(lastname)
    await driver.findElement(By.id("phone")).sendKeys(phone)
    await driver.findElement(By.id("countryLabel")).sendKeys(countryLabel)
    await driver.findElement(By.id("email")).sendKeys(email)
    const dropdownP = await driver.findElement(By.id("platform"))
    await dropdownP.findElement(By.xpath(platform)).click()
    const dropdownA = await driver.findElement(By.id("accountType"))
    await dropdownA.findElement(By.xpath(accountType)).click()
    const dropdownL = await driver.findElement(By.id("leverage"))
    await dropdownL.findElement(By.xpath(leverage)).click()
    const dropdownC = await driver.findElement(By.id("currency"))
    await dropdownC.findElement(By.xpath(currency)).click()
    await driver.findElement(By.id("deposit")).sendKeys(deposit)
    await driver.findElement(By.id("iAgreeDemo")).click()
    await driver.findElement(By.css(".button")).click()


    // const currentUrl = await driver.getCurrentUrl();
    // assert.equal(currentUrl,"https://www.axiory.com/jp/registration/demo?lng=ja&step=completed-mt4")

  /////// this is not working.... I am trying to "sleep" the assert check until the button click action finishes navigating to the confirmation page.\\\\\\\  
    sleep(7000)
    .then(() => {
    const currentUrl = driver.getCurrentUrl();
    assert.equal(currentUrl,"https://www.axiory.com/jp/registration/demo?lng=ja&step=completed-mt4")
    .catch(err => alert(err));
   })
  });
});


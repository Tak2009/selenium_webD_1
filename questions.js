it("pass case. no error message2", async () => {
    await driver.findElement(By.id("lastname")).click()
    await driver.findElement(By.id("lastname")).clear()
    //テストをパスするインプットを入力エリアに渡す
    await driver.findElement(By.id("lastname")).sendKeys("kimotoKIMOTO")
    //lastname入力エリアからでる。これをすることでこの結論からDOMアクションをトリガーさせる
    await driver.findElement(By.id("firstname")).click()
    //検証：Error Messageがないかどうか確認
    const elements = await driver.findElements(By.xpath("//input[@id=\'lastname\']/../.."))
    assert(elements.length)
    const element = elements.findElement(By.className("error-messages"))
    const errorMessage = element.getText()
    assert.equal(errorMessage, "");
  });
    // //存在するかどうか確認
    // const elements = await driver.wait(until.elementLocated(By.css("atm-input-container valid"),10000))
    // assert(elements.length)
   // // assert(await driver.wait(until.elementLocated(By.css("atm-input-container valid"),10000))
    // const errorMessage = await driver.findElement(By.css(".error-messages")).getText()
    // assert.equal(errorMessage, "");

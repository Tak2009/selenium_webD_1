1. npm init

2. npm install -D selenium-webdriver mocha chai chromedriver@80.0.0 
   * my current Chrome version = Version 80.0.3987.162

3. change package.json

        "scripts": {
        ...
            "test": "mocha test/SeleniumChromeTest.js --timeout 0",
        ...
        },
    
    * default timeout = 2000ms but change to 0 for the tine being.
# How to install SeleniumWebdriver with JavaScript
1. npm init

2. npm install -D selenium-webdriver mocha chai chromedriver@80.0.0 
   * check the chrome version

3. change package.json

        "scripts": {
        ...
            "test": "mocha test/SeleniumChromeTest.js --timeout 0",
        ...
        },
    
    * default timeout = 2000ms but change to 0 for the tine being.


# How to debug Mocha tests running in Node using Chrome DevTools inspector.
If you are using Mocha test runner, you can easily debug the test execution using Node and Chrome DevTools inspector. I am using Mocha 3.5.3 and Node 8.9.4 in this demo.

1. Break at the start of the Node process

Here is my test command (I am working on detecting it.only used inside the tests, thus my command for this demo is only-test)

package.json

{
  "scripts": {
    "only-test": "mocha --inspect-brk only-test/test.js"
  }
}
2. When starting the tests it pauses the execution and outputs the following message


$ npm run only-test

> snap-shot-it@0.0.0-development only-test /Users/gleb/git/snap-shot-it
> mocha --inspect-brk only-test/test.js

Debugger listening on ws://127.0.0.1:9229/40045c70-8525-4d12-a565-11066bc604a3
For help see https://nodejs.org/en/docs/inspector
Debugger attached.

3. Open in Chrome special url chrome://inspect which shows that there is a "remote target" available to connect.
var result = document.evaluate(
    '//div[@id="main"]/p[contains(@class,"content")][3]/a[starts-with(@href,"http://example.com")]',
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
);
  
  console.log(result.snapshotLength); //1
  console.log(result.snapshotLength);
  var elem = result.snapshotItem(0);
  console.log(elem);
  console.log(elem.innerHTML);

var result2 = document.evaluate(
    '/html',
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
);

console.log(result2.singleNodeValue)

var result3 = document.evaluate(
    '//input[@id="child"]/../..',
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
);

console.log(result3.singleNodeValue)

let result4 = document.evaluate(
    '//input[@id="child"]/../..',
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
);
let elem = result4.snapshotItem(0);
console.log(elem)

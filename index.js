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
  console.log(elem.innerHTML);

var result2 = document.evaluate(
    '/html',
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
);

console.log(result2.singleNodeValue)
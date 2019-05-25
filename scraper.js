const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

// Wasn't sure if any page of www.banno.com was fair game so chose this one due to 
// the content being easier accessible through my chosen method pf scraping.

  await page.goto("https://banno.com/features/");

//----------------------------------------------------------------------------------------
  // A count of the number of products offered.
  const products = await page.evaluate(() =>
    Array.from(document.querySelectorAll("div.flex-item h3")).map(product =>
      product.innerText.trim()
    )
  );

    console.log("Product Names: ", products.join(','));
    console.log("Product Count: ", products.length);

  
//----------------------------------------------------------------------------------------
  // The top 3 occuring alphanumeric characters contained in the HTML, and how
  // many times each occurs.
  const top3Names = await page.evaluate(() =>
    Array.from(document.querySelectorAll("html")).map(top3Names =>
      top3Names.innerText.split("")
    )
  );

  // Credit to user: row1, from Source:
  // https://stackoverflow.com/questions/22590023/finding-the-most-frequent-character-in-a-string-javascript?lq=1
  
  var exp = top3Names.toString();
  var expCounts = {};
  var maxKey = "";
  for (var i = 0; i < exp.length; i++) {
    var key = exp[i];
    if (!expCounts[key]) {
      expCounts[key] = 0;
    }
    expCounts[key]++;
    if (maxKey == "" || expCounts[key] > expCounts[maxKey]) {
      maxKey = key;
    }
  }

  console.debug("Most Common Character and Occurrences: ", maxKey + ":" + expCounts[maxKey]);

//----------------------------------------------------------------------------------------
  // The number of .png images in the HTML.
  const numPngImgs = await page.evaluate(() =>
    Array.from(document.querySelectorAll("body img")).map(
      numPngImgs => numPngImgs.src
    )
  );

  console.log(".png Images Found: ", numPngImgs);
  console.log("Number of .png Images Found: ", numPngImgs.length);

  
//----------------------------------------------------------------------------------------
  // BannoJHA’s Twitter handle: this should work if the Twitter name were to change.
  const twitterHandle = await page.evaluate(() =>
    Array.from(document.querySelectorAll("footer a")).map(
      twitterHandle => twitterHandle.href
    )
  );

  console.log("Twitter Handle: ", twitterHandle[9]);

//----------------------------------------------------------------------------------------
  // The number of times the term “financial institution” occurs in text.
    const finInstituteOccurences = await page.evaluate(() =>
        Array.from(document.querySelectorAll("html")).map(finInstituteOccurences =>
            finInstituteOccurences.innerText.split(" ")
        )
    );

    function getOccurrence(array, value) {
        return array.filter((v) => (v === value)).length;
    }

    console.log("Number of times 'Financial Institution' occurs: ", getOccurrence(finInstituteOccurences, 'financial')); 
   

  //console.log(finInstituteOccurences);
  await browser.close();
})();

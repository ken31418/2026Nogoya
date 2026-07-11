const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const root = __dirname;
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1900 }, deviceScaleFactor: 1 });
  await page.goto('file:///' + path.join(root, 'index.html').replace(/\\/g, '/'), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const names = [
    '01_0718_高雄到名古屋.png','02_0719_科學館與大須.png','03_0720_吉卜力Standard.png',
    '04_0721_LEGOLAND.png','05_0722_吉卜力Premium.png','06_0723_自駕到河口湖.png',
    '07_0724_河口湖慢遊.png','08_0725_清水靜岡濱名湖.png','09_0726_晨泳還車名古屋站.png',
    '10_0727_鰻魚飯與機場返台.png'
  ];
  for (let i = 0; i < names.length; i++) {
    await page.goto('file:///' + path.join(root, 'index.html').replace(/\\/g, '/'), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const card = await page.$(`#day-${i + 1}`);
    await card.scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    await card.screenshot({ path: path.join(root, names[i]) });
  }
  await browser.close();
  console.log(`Rendered ${names.length} daily cards.`);
})();

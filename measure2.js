const puppeteer = require('puppeteer-core');

async function test(height) {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    defaultViewport: { width: 1440, height },
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:8098', { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1500));
  await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll('*'));
    const el = all.find((e) => e.children.length === 0 && e.textContent && e.textContent.trim() === 'Power MDB');
    if (el) {
      let node = el;
      for (let i = 0; i < 6 && node; i++) { node.click(); node = node.parentElement; }
    }
  });
  await new Promise((r) => setTimeout(r, 800));

  const result = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('div'));
    const scrollers = els
      .filter((e) => e.scrollHeight > e.clientHeight + 1 && e.clientHeight > 50)
      .map((e) => ({
        scrollHeight: e.scrollHeight,
        clientHeight: e.clientHeight,
        diff: e.scrollHeight - e.clientHeight,
      }))
      .sort((a,b)=>b.diff-a.diff);
    const hasMdb = document.body.innerText.includes('MDB STATUS');
    return { hasMdb, scrollers: scrollers.slice(0,3) };
  });
  console.log('height=', height, JSON.stringify(result));
  await browser.close();
}

(async () => {
  for (const h of [800, 780, 768, 750, 730, 700]) {
    await test(h);
  }
})();

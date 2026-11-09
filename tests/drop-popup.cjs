// Run with PLAYWRIGHT_MODULE pointing to an installed playwright package.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const url = process.env.TEST_BASE_URL || 'http://127.0.0.1:3187';

test('home announces the new shirt after a delay, not on arrival', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.goto(url);
    const popup = page.getByRole('dialog', { name: 'Una historia que se viste.' });
    assert.equal(await popup.isVisible(), false);
    await popup.waitFor({ state: 'visible', timeout: 8000 });
    assert.equal(await popup.isVisible(), true);
  } finally { await browser.close(); }
});

test('announcement presents the race shirt and links to the supplied Facebook post', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.goto(url);
    const popup = page.getByRole('dialog', { name: 'Una historia que se viste.' });
    await popup.waitFor({ state: 'visible', timeout: 8000 });
    assert.match(await popup.innerText(), /participantes.*domingo 13 de diciembre/);
    assert.doesNotMatch(await popup.innerText(), /Nuevo drop/i);
    assert.match(await popup.innerText(), /Un desafío que se vive/);
    const post = popup.getByRole('link', { name: 'Ver publicación en Facebook' });
    assert.equal(await post.getAttribute('href'), 'https://www.facebook.com/61574004722441/posts/122203583444800157/#1d1d1d');
    assert.equal(await post.getAttribute('target'), '_blank');
    assert.match(await post.getAttribute('rel'), /noopener/);
    await post.focus();
    await page.keyboard.press('Tab');
    assert.equal(await popup.evaluate(node => node.contains(document.activeElement)), true);
    await page.keyboard.press('Tab');
    assert.equal(await page.getByRole('button', { name: 'Cerrar novedad' }).evaluate(node => node === document.activeElement), true);
  } finally { await browser.close(); }
});

for (const width of [1440, 390, 320]) {
  test(`popup works at ${width}px: images, focus, dismissal and session`, async () => {
    const browser = await chromium.launch({ headless: true });
    try {
      const page = await browser.newPage({ viewport: { width, height: width === 320 ? 568 : 900 }, reducedMotion: 'reduce' });
      await page.goto(url);
      const popup = page.getByRole('dialog', { name: 'Una historia que se viste.' });
      await popup.waitFor({ state: 'visible', timeout: 8000 });
      await page.getByRole('button', { name: 'Detrás', exact: true }).click();
      assert.equal(await page.getByRole('button', { name: 'Detrás', exact: true }).getAttribute('aria-pressed'), 'true');
      assert.equal(await popup.locator('img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0)), true);
      for (let i = 0; i < 6; i++) {
        await page.keyboard.press('Tab');
        assert.equal(await popup.evaluate(node => node.contains(document.activeElement)), true);
      }
      const bounds = await popup.boundingBox();
      assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= width);
      assert.equal(await popup.evaluate(node => node.scrollWidth <= node.clientWidth), true);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      await popup.screenshot({ path: `/tmp/ibhola-drop-${width}.png` });
      await page.keyboard.press('Escape');
      assert.equal(await popup.isVisible(), false);
      assert.notEqual(await page.evaluate(() => document.documentElement.style.overflow), 'hidden');
      await page.reload();
      await page.waitForTimeout(4500);
      assert.equal(await popup.isVisible(), false);
      await page.evaluate(() => sessionStorage.clear());
      await page.reload();
      await popup.waitFor({ state: 'visible', timeout: 8000 });
      await page.getByRole('button', { name: 'Cerrar novedad' }).click();
      assert.equal(await popup.isVisible(), false);
      await page.evaluate(() => sessionStorage.clear());
      await page.reload();
      await popup.waitFor({ state: 'visible', timeout: 8000 });
      await page.getByRole('button', { name: 'Seguir explorando' }).click();
      assert.equal(await popup.isVisible(), false);
    } finally { await browser.close(); }
  });
}

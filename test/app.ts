import { Browser, firefox, Page } from 'playwright';
import { expect } from "chai";
import "mocha"

import app from '../src/app.js'
import { Server } from 'http';
const port = 3000

describe('End to End Testing', function () {
  let browser: Browser;
  let page: Page;
  let server: Server<any, any>;

  this.timeout(20_000)

  before(async () => {
    browser = await firefox.launch();
    page = await browser.newPage();
    server = app.listen(3000)
  });

  after(async () => {
    await browser.close();
    server.close()
  });
  describe("Service 1 Testing", function () {
    it('should work to handle good and bad UENs', async () => {
        await page.goto('http://localhost:3000');
        const link = await page.locator('a', { hasText: 'UEN Verification' });
        await link.click();

        await page.waitForURL('**/service1');
        const currentURL = page.url();
        expect(currentURL).to.include('/service1');
        
        page.locator('input[type="text"]').fill('S99PB0011X');
        page.locator('button').click();
        expect(await page.locator('.alert-success').textContent()).to.include("UEN formatting correct")
        
        page.locator('input[type="text"]').fill('123456789');
        page.locator('button').click();
        expect(await page.locator('.alert-danger').textContent()).to.include("UEN formatting invalid")
    });
  })
});
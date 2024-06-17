const { chromium } = require('@playwright/test');
const { credentials } = require('./data/credentials');
const fs = require('fs');
const path = require('path');

module.exports = async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://qauto2.forstudy.space/');
  await page.waitForSelector('#signinEmail', { state: 'visible' });
  await page.fill('#signinEmail', credentials.email);
  await page.waitForSelector('#password', { state: 'visible' });
  await page.fill('#password', credentials.password);
  await page.waitForSelector('#login-button', { state: 'visible' });
  await page.click('#login-button');

  const storageDir = './storage';
  if (!fs.existsSync(storageDir)){
    fs.mkdirSync(storageDir);
  }
  await context.storageState({ path: path.join(storageDir, 'storageState.json') });

  await browser.close();
};

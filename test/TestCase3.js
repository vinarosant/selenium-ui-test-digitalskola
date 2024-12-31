const { Builder } = require(`selenium-webdriver`);
const LoginPage = require(`../WebComponent/LoginPage`);
const DashboardPage = require('../WebComponent/DashboardPage');
const CartPage = require('../WebComponent/CartPage');
const assert = require(`assert`);
const fs = require('fs');
require(`dotenv`).config();

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

const screenshotDir = './screenshots/';
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
}

describe(`TestCase 3 [Add to Cart] #Regression`, function () {
    this.timeout(40000);
    let driver;

    let options;
    switch (browser.toLowerCase()) {
        case `firefox`:
            const firefox = require(`selenium-webdriver/firefox`);
            options = new firefox.Options();
            options.addArguments(`--headless`);
            break;
        case `edge`:
            const edge = require(`selenium-webdriver/edge`);
            options = new edge.Options();
            options.addArguments(`--headless`);
            break;
        case `chrome`:
        default:
            const chrome = require(`selenium-webdriver/chrome`);
            options = new chrome.Options();
            options.addArguments(`--headless`);
            break;
    }

    before(async function () {
        driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();
    });

    beforeEach(async function () {
        const loginPage = new LoginPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.login(username, password);
    });

    it(`Add item to cart and verify`, async function () {
        const cartPage = new CartPage(driver);

        await cartPage.addItemToCart('Sauce Labs Backpack');

        const itemCount = await cartPage.getCartItemCount();
        assert.strictEqual(itemCount, '1', 'Expected 1 item in the cart');
    });

    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`;
        fs.writeFileSync(filepath, screenshot, 'base64');
    });

    after(async function () {
        await driver.quit();
    });
});

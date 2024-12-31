const { Builder } = require('selenium-webdriver');
const LoginPage = require('../WebComponent/LoginPage');
const DashboardPage = require('../WebComponent/DashboardPage');
const CartPage = require('../WebComponent/CartPage');
const FormCheckoutPage = require('../WebComponent/FormCheckoutPage');
const CheckoutOverviewPage = require('../WebComponent/CheckoutOverviewPage');
const CheckoutSuccesPage = require('../WebComponent/CheckoutSuccesPage');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

const screenshotDir = './screenshots/';
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
}

describe('TestCase 4 [Checkout Validation] #Regression', function () {
    let driver;
    this.timeout(40000);
    let loginPage, dashboardPage, cartPage, formCheckoutPage, checkoutOverviewPage, checkoutSuccesPage;

    switch (browser.toLowerCase()) {
        case 'firefox':
            const firefox = require('selenium-webdriver/firefox');
            options = new firefox.Options();
            options.addArguments('--headless');
            break;
        case 'edge':
            const edge = require('selenium-webdriver/edge');
            options = new edge.Options();
            options.addArguments('--headless');
            break;
        case 'chrome':
        default:
            const chrome = require('selenium-webdriver/chrome');
            options = new chrome.Options();
            options.addArguments('--headless');
            break;
    }

    before(async function (){
        driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();
        loginPage = new LoginPage(driver);
        dashboardPage = new DashboardPage(driver);
        cartPage = new CartPage(driver);
        formCheckoutPage = new FormCheckoutPage(driver);
        checkoutOverviewPage = new CheckoutOverviewPage(driver);
        checkoutSuccesPage = new CheckoutSuccesPage(driver);

        await driver.get('https://www.saucedemo.com/');
        await loginPage.login('standard_user', 'secret_sauce');
    });

    it('Error: First Name is required', async function () {
        const itemName = "Sauce Labs Backpack";
        console.log("Adding item to cart:", itemName);
        await dashboardPage.addToCart(itemName);  // Menambahkan item ke keranjang
        await cartPage.goToCart();
        await cartPage.checkout();

        await formCheckoutPage.enterLastName('Doe');
        await formCheckoutPage.enterPostalCode('12345');
        await formCheckoutPage.continue();

        const errorMessage = await formCheckoutPage.getErrorMessage();
        assert.strictEqual(errorMessage, 'Error: First Name is required');
    });

    it('Checkout Overview displays correct item and total', async function () {
        const itemName = "Sauce Labs Backpack";
        console.log("Adding item to cart:", itemName);
        await dashboardPage.addToCart(itemName);  // Menambahkan item ke keranjang
        await cartPage.goToCart();
        await cartPage.checkout();

        await formCheckoutPage.enterFirstName('John');
        await formCheckoutPage.enterLastName('Doe');
        await formCheckoutPage.enterPostalCode('12345');
        await formCheckoutPage.continue();

        const cartItemName = await checkoutOverviewPage.getCartItemName();
        assert.strictEqual(cartItemName, itemName);

        const total = await checkoutOverviewPage.getTotal();
        assert.strictEqual(total, '$32.39');
    });

    it('User successfully completes checkout', async function () {
        const itemName = "Sauce Labs Backpack";
        console.log("Adding item to cart:", itemName);
        await dashboardPage.addToCart(itemName);  // Menambahkan item ke keranjang
        await cartPage.goToCart();
        await cartPage.checkout();

        await formCheckoutPage.enterFirstName('John');
        await formCheckoutPage.enterLastName('Doe');
        await formCheckoutPage.enterPostalCode('12345');
        await formCheckoutPage.continue();
        await checkoutOverviewPage.finish();

        const successMessage = await checkoutSuccesPage.getSuccessMessage();
        assert.strictEqual(successMessage, 'THANK YOU FOR YOUR ORDER');
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

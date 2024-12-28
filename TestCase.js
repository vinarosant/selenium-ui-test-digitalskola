const { Builder } = require('selenium-webdriver');
const LoginPage = require('./WebComponent/LoginPage');
const DashboardPage = require('./WebComponent/DashboardPage');
const CartPage = require('./WebComponent/CartPage');

describe('SauceDemo Tests', function () {
    let driver;
    let loginPage, dashboardPage, cartPage;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        loginPage = new LoginPage(driver);
        dashboardPage = new DashboardPage(driver);
        cartPage = new CartPage(driver);
    });

    after(async function () {
        await driver.quit();
    });

    it('User success login and validate dashboard', async function () {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        const isOnDashboard = await dashboardPage.isOnDashboard();
        console.log('Is on Dashboard:', isOnDashboard);
        if (!isOnDashboard) throw new Error('User is not on the dashboard!');
    });

    it('Add item to cart and validate', async function () {
        await cartPage.addItemToCart();
        await cartPage.goToCart();
        const itemCount = await cartPage.getCartItemsCount();
        console.log('Items in cart:', itemCount);
        if (itemCount < 1) throw new Error('No items found in the cart!');
    });
});

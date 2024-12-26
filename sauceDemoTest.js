const { Builder, By, Key, until } = require(`selenium-webdriver`);
const assert = require(`assert`);

async function sauceDemoTest() {
    let driver = await new Builder().forBrowser(`chrome`).build();

    try {
        await driver.get("https://www.saucedemo.com");

        //user succes login
        await driver.findElement(By.id(`user-name`)).sendKeys(`standard_user`);
        await driver.findElement(By.xpath("//input[@id='password']")).sendKeys(`secret_sauce`);
        await driver.findElement(By.xpath("//input[@id='login-button']")).click();

        //validate user berada di dashboard setelah login
        let titleText = await driver.findElement(By.className('app_logo')).getText();
        assert.strictEqual(titleText, 'Swag Labs', "User is not on the dashboard");

        //add item to cart
        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']")).click();

        //validate item sukses ditambahkan ke cart
        let cartBadge = await driver.findElement(By.className('shopping_cart_badge')).getText();
        assert.strictEqual(cartBadge, '1', "Item was not added to the cart");

        console.log("Test berhasil!");
        } catch (error) {
        console.error("Test gagal:", error);

        } finally {
            await driver.quit();
    }
}

sauceDemoTest();
const { By } = require('selenium-webdriver');

class CartPage {
    constructor(driver) {
        this.driver = driver;
        this.cartItems = By.className('cart_item');
        this.addToCartButton = By.className('btn_inventory');
        this.cartIcon = By.className('shopping_cart_link');
    }

    async addItemToCart() {
        await this.driver.findElement(this.addToCartButton).click();
    }

    async goToCart() {
        await this.driver.findElement(this.cartIcon).click();
    }

    async getCartItemsCount() {
        const items = await this.driver.findElements(this.cartItems);
        return items.length;
    }
}

module.exports = CartPage;

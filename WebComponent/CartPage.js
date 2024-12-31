const { By } = require('selenium-webdriver');

class CartPage {
    constructor(driver) {
        this.driver = driver;
    }

    async getCartItemCount() {
        const cartBadge = await this.driver.findElement(By.className('shopping_cart_badge'));
        return cartBadge.getText();
    }

    async addItemToCart(itemName) {
        const addToCartButton = await this.driver.findElement(By.xpath(`//button[text()='Add to cart'][contains(@id, '${itemName.toLowerCase().replace(/ /g, '-')}')]`));
        await addToCartButton.click();
    }

    async goToCart() {
        const cartIcon = await this.driver.findElement(By.className('shopping_cart_link'));
        await cartIcon.click();
    }

    async checkout() {
        const checkoutButton = await this.driver.findElement(By.xpath('//button[text()="Checkout"]'));
        await checkoutButton.click();
    }
}

module.exports = CartPage;

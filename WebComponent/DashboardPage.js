const { By } = require('selenium-webdriver');

class DashboardPage {
    constructor(driver) {
        this.driver = driver;
    }


    async isOnDashboard() {
        const title = await this.driver.findElement(By.className('title'));
        return title.getText();
    }

    async addToCart(itemName) {

        const addToCartButton = await this.driver.findElement(By.xpath(`//button[text()='Add to cart'][contains(@id, '${itemName.toLowerCase().replace(/ /g, '-')}')]`));
        await addToCartButton.click();
    }
    
}

module.exports = DashboardPage;

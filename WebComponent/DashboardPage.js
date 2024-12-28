const { By, until } = require('selenium-webdriver');

class DashboardPage {
    constructor(driver) {
        this.driver = driver;
        this.inventoryContainer = By.id('inventory_container');
    }

    async isOnDashboard() {
        try {
            await this.driver.wait(until.elementLocated(this.inventoryContainer), 5000);
            return true;
        } catch {
            return false;
        }
    }
}

module.exports = DashboardPage;

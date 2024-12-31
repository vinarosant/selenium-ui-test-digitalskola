class CheckoutOverviewPage {
    constructor(driver) {
        this.driver = driver;
    }

    async verifyItem() {
        const itemName = await this.driver.findElement(By.className("inventory_item_name")).getText();
        return itemName;
    }

    async verifyTotal() {
        const total = await this.driver.findElement(By.className("summary_total_label")).getText();
        return total;
    }

    async clickFinishButton() {
        await this.driver.findElement(By.id("finish")).click();
    }
}
module.exports = CheckoutOverviewPage;

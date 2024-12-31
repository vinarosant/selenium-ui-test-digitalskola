class CheckoutSuccesPage {
    constructor(driver) {
        this.driver = driver;
    }

    async isCheckoutComplete() {
        const header = await this.driver.findElement(By.className("complete-header")).getText();
        return header === "THANK YOU FOR YOUR ORDER";
    }
}
module.exports = CheckoutSuccesPage;

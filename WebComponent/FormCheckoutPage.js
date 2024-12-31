const { By } = require('selenium-webdriver'); // Tambahkan ini untuk mengimpor By

class FormCheckoutPage {
    constructor(driver) {
        this.driver = driver;
    }

    async enterFirstName(firstName) {
        const firstNameField = await this.driver.findElement(By.id('first-name'));
        await firstNameField.sendKeys(firstName);
    }

    async enterLastName(lastName) {
        const lastNameField = await this.driver.findElement(By.id('last-name'));
        await lastNameField.sendKeys(lastName);
    }

    async enterPostalCode(postalCode) {
        const postalCodeField = await this.driver.findElement(By.id('postal-code'));
        await postalCodeField.sendKeys(postalCode);
    }

    async continue() {
        const continueButton = await this.driver.findElement(By.id('continue'));
        await continueButton.click();
    }

    async getErrorMessage() {
        const errorMessage = await this.driver.findElement(By.css('.error-message-container'));
        return errorMessage.getText();
    }
}

module.exports = FormCheckoutPage;

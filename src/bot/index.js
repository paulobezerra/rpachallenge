const delay = require("delay");
const { Builder, By, until } = require("selenium-webdriver")
const buttonStartSelector = ".instructions button.waves-effect"

const openPage = async (targetPage) => {
    let driver = await new Builder().forBrowser("firefox").build();
    await driver.get(targetPage);
    return driver;
}

const fillFormData = async (driver, row) => {
    try {
        Object.keys(row).forEach(async key => {
            const selector = `rpa1-field[ng-reflect-dictionary-value='${key}'] input`
            const value = row[key]
            await driver.findElement(By.css(selector)).sendKeys(value);
        })
        await delay(800);
        driver.findElement(By.css('form input[type="submit"]')).click();
    } catch (error) {
        console.error(error)
        throw error
    }
}

const write = async (targetPage, rows) => {
    let driver = null
    try {
        driver = await openPage(targetPage);
        await driver.findElement(By.css(buttonStartSelector)).click();

        for (const row of rows) {
            await driver.wait(until.elementLocated(By.css('form div.row')), 5000);
            await fillFormData(driver, row);
        }
        
        await driver.wait(until.elementLocated(By.css('.congratulations .message1')), 5000);
        await delay(10000);
    } catch (error) {
        console.log(error)
    } finally {
        await driver.quit();
    }
}

module.exports = write
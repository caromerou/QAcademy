import {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/login.page'
import { userData } from '../data/testdata';


test('Login Passed', async({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.fillEmail(userData.email);
    await loginPage.fillPassword(userData.password);
    await loginPage.clickLoginButton();

    await page.waitForSelector('ul > li:nth-child(1) > a');
    await page.waitForTimeout(10000);

});
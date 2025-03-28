import {test, expect} from '@playwright/test'
import { RegisterPage} from '../pages/register.page'
import { userData } from '../data/testdata';


test('Register Passed',async({page})=>{
    const registerPage = new RegisterPage(page);
    await registerPage.goTo();
    await registerPage.fillName(userData.name);
    await registerPage.fillLastName(userData.lastname);
    await registerPage.fillEmail(userData.email);
    await registerPage.fillPassword(userData.password);
    await registerPage.clickRegisterButton();

    await page.waitForTimeout(10000);
});


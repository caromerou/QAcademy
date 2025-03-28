import {test, expect} from '@playwright/test'
import { RegisterPage} from '../pages/register.page'

test('Register Passed',async({page})=>{
    const registerPage = new RegisterPage(page);
    await registerPage.goTo();
    await registerPage.fillName("Ronaldo");
    await registerPage.fillLastName("Genes");
    await registerPage.fillEmail("ronaldogenes@gmail.com");
    await registerPage.fillPassword("Rgenes16*");
    await registerPage.clickRegisterButton();

    await page.waitForTimeout(10000);
})


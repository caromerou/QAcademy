import {test, expect} from '@playwright/test'
import { RegisterPage} from '../pages/register.page'
import { userData } from '../data/testdata';
import {LoginPage} from  '../pages/login.page';


test('Register Passed',async({page})=>{
    const registerPage = new RegisterPage(page);
    await registerPage.goTo();
    await registerPage.fillRegisterUser(userData.name,
        userData.lastname,
        userData.email,
        userData.password
    );
    // assertions
    expect(page.getByRole('heading',{name:"Log in"})).toBeVisible();

    await page.pause();
    /*
    await registerPage.fillName(userData.name);
    await registerPage.fillLastName(userData.lastname);
    await registerPage.fillEmail(userData.email);
    await registerPage.fillPassword(userData.password);
    await registerPage.clickRegisterButton();
    */
    //await page.waitForTimeout(10000);
});

test('Login Passed', async({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.loginCredentials(userData.email,userData.password);

    //assertions
    expect( page.getByRole('link', {name:'Dashboard'})).toBeVisible();
    //await page.waitForSelector('ul > li:nth-child(1) > a');
    
    await page.pause();

    //await page.waitForTimeout(10000);

});


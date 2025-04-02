import {test, expect} from '@playwright/test'
import { RegisterPage} from '../pages/register.page'
import { userData } from '../data/testdata';
import {LoginPage} from  '../pages/login.page';


test('Register Passed and login',async({page})=>{
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);

    await test.step('Register User', async () => {
        await registerPage.goTo();
        await registerPage.fillRegisterUser(userData.name,
        userData.lastname,
        userData.email,
        userData.password
    )
    // assertions
    // Espera a que la redirección a Login ocurra
    await page.waitForURL('**/login', { timeout: 10000 });
    expect(page.getByRole('heading',{name:"Log in"})).toBeVisible();
    await page.waitForTimeout(10000);
    });
    

    await test.step('Login Passed', async () => {
        await loginPage.goTo();
        await loginPage.loginCredentials(userData.email,userData.password);

        //assertions
        expect( page.getByRole('link', {name:'Dashboard'})).toBeVisible();


        await page.pause();
        
    });

});




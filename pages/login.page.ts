import { Page, Locator } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly EmailInput:Locator;
    readonly PasswordInput:Locator;
    readonly LoginButton:Locator;

    
    
    constructor(page:Page) {
        this.page = page;
        this.EmailInput = page.locator('#loginEmail');
        this.PasswordInput = page.locator('#loginPassword');
        this.LoginButton = page.locator('#login > div > form > div:nth-child(4) > button');
        
    }
    async goTo(){
        await this.page.goto('https://automation-portal-bootcamp.vercel.app/login');
    }
    async fillEmail(Email:string){
        await this.EmailInput.fill(Email);
    }
    async fillPassword(Password:string){
        await this.PasswordInput.fill(Password);
    }
    async clickLoginButton(){
        await this.LoginButton.click();
    }

}
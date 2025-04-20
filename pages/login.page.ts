import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput;
  readonly passwordInput;
  readonly loginButton;

  constructor(page: Page) {
    this.page = page;
    // Actualiza los selectores aquí
    this.emailInput = page.locator('#loginEmail');  // Selector actualizado para el email
    this.passwordInput = page.locator('#loginPassword'); // Selector actualizado para la contraseña
    this.loginButton = page.locator('#login > div > div > div.tf-login-form > form > div.bottom > div:nth-child(2) > button'); // Selector para el botón de login
  }

  async goTo() {
    await this.page.goto('https://automation-portal-bootcamp.vercel.app/login');
  }

  async loginCredentials(email: string, password: string) {
    await this.emailInput.fill(email);  // Rellena el campo de email
    await this.passwordInput.fill(password);  // Rellena el campo de contraseña
    await this.loginButton.click();  // Haz clic en el botón de login
  }
}

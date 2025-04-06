import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly EmailInput;
  readonly PasswordInput;
  readonly LoginButton;

  constructor(page: Page) {
    this.page = page;
    this.EmailInput = page.getByPlaceholder('Email');
    this.PasswordInput = page.getByPlaceholder('Password');
    this.LoginButton = page.getByRole('button', { name: 'Login' });
  }

  async goTo() {
    await this.page.goto('https://automation-portal-bootcamp.vercel.app/login');
  }

  async loginCredentials(email: string, password: string) {
    await this.EmailInput.fill(email);
    await this.PasswordInput.fill(password);
    await this.LoginButton.click();
  }
}

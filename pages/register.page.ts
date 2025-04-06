import { Page, Locator, expect } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly popupCloseButton: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.popupCloseButton = page.locator('#newsletterPopup > div > div > div.modal-bottom > div.text-center > a');
    this.firstName = page.locator('#register-form > div:nth-child(1) > input').nth(0); // carolina
    this.lastName = page.locator('#register-form > div:nth-child(2) > input');         // romero
    this.email = page.locator('#register-form > div:nth-child(3) > input');            // caromeroulloa@hotmail.com
    this.password = page.locator('#register-form > div.tf-field.style-1.mb_30 > input'); // 12345*
    this.registerButton = page.locator('#register-form > div.mb_20 > button');
  }

  async goto() {
    await this.page.goto('https://automation-portal-bootcamp.vercel.app/register');
    await this.page.waitForLoadState('domcontentloaded');
    await this.closePopupIfVisible();
  }

  async closePopupIfVisible() {
    if (await this.popupCloseButton.isVisible()) {
      await this.popupCloseButton.click();
    }
  }

  async fillForm() {
    await this.firstName.fill('carolina');
    await this.lastName.scrollIntoViewIfNeeded();
    await this.lastName.fill('romero');
    await this.email.scrollIntoViewIfNeeded();
    await this.email.fill('carolinaromeroulloa@gmail.com');
    await this.password.scrollIntoViewIfNeeded();
    await this.password.fill('12345*');
  }

  async submitForm() {
    await this.registerButton.scrollIntoViewIfNeeded();
    await this.registerButton.click();
  }
}

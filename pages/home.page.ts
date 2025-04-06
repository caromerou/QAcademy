import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly profileIcon: Locator;
  readonly popupCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileIcon = page.locator(
      '#header > div > div > div.col-xxl-5.col-md-4.col-3 > ul > li.nav-account > a'
    );
    this.popupCloseButton = page.locator(
      '#newsletterPopup > div > div > div.modal-bottom > div.text-center > a'
    );
  }

  async goto() {
    await this.page.goto('https://automation-portal-bootcamp.vercel.app/');
    await this.page.waitForLoadState('domcontentloaded');
    await this.closePopupIfVisible();
  }

  async closePopupIfVisible() {
    try {
      if (await this.popupCloseButton.isVisible({ timeout: 3000 })) {
        await this.popupCloseButton.click();
      }
    } catch (e) {
      console.log('Popup no visible. Continuando...');
    }
  }

  async clickProfileIcon() {
    await this.profileIcon.waitFor({ state: 'visible', timeout: 5000 });
    await this.profileIcon.click();
  }
}

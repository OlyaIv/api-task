import { Locator, Page } from '@playwright/test';

export abstract class BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  browserControlMenuBttn(): Locator {
    return this.page.locator('#MiniBrowsePanelClosedFolder');
  }

  openBrowserControlMenu(): Locator {
    return this.page.locator('#MiniBrowsePanelOpenFolder');
  }

  askQMenuBttn(): Locator {
    return this.page.locator('#BrowsePanelAskQ');
  }

  financialServicesBttn(): Locator {
    return this.page.locator('#AskQ-Q-Financial-Services-Card-Payments');
  }

  async openFinancialServicesPage(): Promise<void> {
    await this.browserControlMenuBttn().click();
    await this.askQMenuBttn().click();
    await this.financialServicesBttn().click();
    await this.openBrowserControlMenu().click();
  }
}

import { Locator, FrameLocator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class FinancialSevicesCardPayments extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private pageFrame(): FrameLocator {
    return this.page
      .locator('div#DashboardEmbedDiv')
      .frameLocator('iframe.quicksight-embedding-iframe');
  }

  // in case we want to access the page directly
  async navigateToFinancialServicesPage(): Promise<void> {
    await this.page.goto('/#Dashboard-AskQ-Q-Financial-Services-Card-Payments');
  }

  customersTab(): Locator {
    return this.pageFrame().getByLabel('Customers');
  }

  // diff locator on close
  controlsPannel(): Locator {
    return this.pageFrame().getByTestId('sheet-control-panel-toggle-expand');
  }

  datePickerStart(): Locator {
    return this.pageFrame().getByTestId('date_picker_0');
  }

  datePickerEnd(): Locator {
    return this.pageFrame().getByTestId('date_picker_1');
  }

  creditCardDropdown(): Locator {
    return this.pageFrame().getByTestId('sheet_control_value');
  }

  selectAll(): Locator {
    return this.pageFrame().getByTestId(
      'dropdown_select_all_search_result_entry'
    );
  }

  creditCardOption(creditCard: string) {
    return this.pageFrame()
      .getByTestId('param_value_as_entry')
      .locator(`[data-automation-context="${creditCard}"]`);
  }

  customerList(): Locator {
    return this.pageFrame().locator(
      '[data-automation-context="TABLE - Customer List"]'
    );
  }

  customerTableMenuBttn(): Locator {
    return this.pageFrame().getByTestId('analysis_visual_dropdown_menu_button');
  }

  exportToCsvMenuOption(): Locator {
    return this.pageFrame().getByTestId('dashboard_visual_dropdown_export');
  }

  async populateDate(startdate: string, endDate: string) {
    await this.datePickerStart().fill(startdate);
    await this.datePickerEnd().fill(endDate);
  }

  async selectCreditCard(creditCard: string): Promise<void> {
    await this.creditCardDropdown().click();
    await this.selectAll().click();
    await this.creditCardOption(creditCard).click();
    await this.page.keyboard.press('Escape');
  }

  async populateCustomersTabFilters(
    startdate: string,
    endDate: string,
    creditCard: string
  ): Promise<void> {
    await this.controlsPannel().click();
    await this.populateDate(startdate, endDate);
    await this.selectCreditCard(creditCard);
  }

  async downloadCustomerTable(path: string): Promise<void> {
    await this.customerList().click();
    await this.customerTableMenuBttn().click();

    const downloadPromise = this.page.waitForEvent('download');
    await this.exportToCsvMenuOption().click();
    const download = await downloadPromise;

    // Wait for the download process to complete and save the downloaded file somewhere.
    await download.saveAs(path);
    console.log('After download');
  }
}

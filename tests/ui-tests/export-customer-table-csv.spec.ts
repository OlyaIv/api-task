import { test, expect } from '@playwright/test';
import { FinancialSevicesCardPayments } from '../../demo-central/src/pages/financial-services-and-payments.page';
import { parseFile } from '../../demo-central/src/helper/customer-list-csv-parser';

test.describe('Export Customer Table to CSV', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  test('User can download filtered Customer Table and calculate revenue value', async ({
    page,
  }) => {
    const finURL = '#Dashboard-AskQ-Q-Financial-Services-Card-Payments';
    const filePath = './tests/artifacts/customer_data_list.csv';
    const startDate = '2023/11/23 00:00:00';
    const endDate = '2023/11/23 00:00:00';
    const creditCardName = 'MasterCard';
    const expectedValue = 13915.15;

    const financialServicePage = new FinancialSevicesCardPayments(page);
    await financialServicePage.openFinancialServicesPage();

    const pageUrl = await page.url();
    expect(pageUrl).toContain(finURL);

    await financialServicePage.customersTab().click();
    await financialServicePage.populateCustomersTabFilters(
      startDate,
      endDate,
      creditCardName
    );
    await financialServicePage.downloadCustomerTable(filePath);

    const data = parseFile(filePath);
    const calculateRevenue = data
      .map((revenue) => revenue.Revenue)
      .reduce((sum, Revenue) => sum + Revenue, 0);

    expect(calculateRevenue).toEqual(expectedValue);
  });
});

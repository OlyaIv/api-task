import { test, expect } from '@playwright/test';
import { apiClient } from './consts';

test.describe('POST math expressions', () => {
  test('Valid array of Expressions shoudl return calculated results', async () => {
    const requestBody = {
      expr: ['2*(7-3)', '2/3', 'sin(45 deg) ^ 2', '9 / 3 + 2i'],
      precision: 6,
    };
    const response = await apiClient.post('/', requestBody);

    expect(response.status).toBe(200);
    expect(response.data.result).toEqual(['8', '0.666667', '0.5', '3 + 2i']);
    expect(response.data.error).toBeNull();
  });

  test('Single string with division by Zero should throw an error', async () => {
    const requestBody = { expr: '2/(7-7)' };
    const response = await apiClient
      .post('/', requestBody)
      .catch((err) => err.response);

    expect(response.status).toBe(400);
    expect(response.data.result).toContain('Infinity');
    expect(response.data.error).toContainText('Error'); // Test fails as response code is 200 from math.js
  });

  test('Shoudl throw an error when array contains text', async () => {
    const requestBody = { expr: ['string'] };
    const response = await apiClient
      .post('/', requestBody)
      .catch((err) => err.response);

    expect(response.data.result).toBeNull(); 
    expect(response.status).toBe(400);
    expect(response.data.error).toContain('Error: Undefined symbol test'); //Received: ["function"] but endpoint sends Error: {"result":null,"error":"Error: Undefined symbol test"}
  });

  test('Shoudl throw an error when expression is empty', async () => {
    const requestBody = { expr: [''] };
    const response = await apiClient
      .post('/', requestBody)
      .catch((err) => err.response);

    expect(response.data.result).toContain('undefined');
    expect(response.status).toBe(400);
    expect(response.data.error).toContain('Error');
  });
});

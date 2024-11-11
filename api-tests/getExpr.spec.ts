import { test, expect } from '@playwright/test';
import { apiClient } from './consts';

test.describe('GET math expression', () => {
  
  test('Valid expression shoudl return calculated result', async () => {
    const response = await apiClient.get('/', {
      params: { expr: '2*(7-3)' },
    });

    expect(response.data).toBe(8);
    expect(response.status).toBe(200);
  });

  test('Division by Zero shoudl return error', async () => {
    const response = await apiClient.get('/', {
      params: { expr: '2/(7-7)' },
    }).catch(err => err.response);

    expect(response.data).toContain('Infinity');
    expect(response.status).toBe(400); // is 200 from math.js
  });
  
});

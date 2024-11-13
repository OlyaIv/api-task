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

  test('Valid expression shoudl return calculated result with correct precision', async () => {
    const response = await apiClient.get('/', {
      params: { expr: '2/3', precision: 2, },
    });

    expect(response.data).toBe(0.67);
    expect(response.status).toBe(200);
  });

  test('Shoudl return an error when dividing by Zero', async () => { 
    const response = await apiClient
      .get('/', {
        params: { expr: '2/(7-7)' },
      })
      .catch((err) => err.response);

    expect(response.data).toContain('Infinity');
    expect(response.status).toBe(400); // Test fails as response code is 200 from math.js
  });

  test('Should return an error when precision is invalid', async () => { 
    const response = await apiClient
      .get('/', {
        params: { expr: '2*0.0001', precision: 'text'},
      })
      .catch((err) => err.response);

    expect(response.status).toBe(400);
  });
});

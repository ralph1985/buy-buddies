import { beforeEach, describe, expect, it } from 'vitest';
import { getProductsRepository } from '../../src/infra/repositories/factory.js';

describe('repository factory', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('usa mock si no hay googleSheetID', () => {
    const repo = getProductsRepository();
    expect(repo.isMockData).toBe(true);
  });

  it('usa sheets si hay googleSheetID', () => {
    localStorage.setItem('googleSheetID', 'SOME_SHEET_ID');
    const repo = getProductsRepository();
    expect(repo.isMockData).toBe(false);
  });
});

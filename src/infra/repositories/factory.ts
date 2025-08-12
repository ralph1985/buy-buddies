import { MockProductsRepository } from './products/MockProductsRepository.js';
import { SheetsProductsRepository } from './products/SheetsProductsRepository.js';
import type { ProductsRepository } from '../../domain/types.js';

export function getProductsRepository(): ProductsRepository {
  const googleSheetID = typeof window !== 'undefined'
    ? window.localStorage.getItem('googleSheetID') || ''
    : '';

  if (!googleSheetID) {
    return new MockProductsRepository();
  }
  return new SheetsProductsRepository(googleSheetID);
}

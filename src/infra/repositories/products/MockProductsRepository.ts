import type { ProductsRepository } from '../../../domain/types.js';
import { mockProducts } from './mockProducts.js';

export class MockProductsRepository implements ProductsRepository {
  public readonly isMockData = true;

  async list() {
    // devolver copia para evitar mutaciones externas
    return typeof structuredClone === 'function'
      ? structuredClone(mockProducts)
      : JSON.parse(JSON.stringify(mockProducts));
  }
}

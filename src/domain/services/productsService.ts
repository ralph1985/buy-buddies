import { getProductsRepository } from '../../infra/repositories/factory.js';

export async function loadProducts() {
  const repo = getProductsRepository();
  const items = await repo.list();
  return { items, isMockData: repo.isMockData } as const;
}

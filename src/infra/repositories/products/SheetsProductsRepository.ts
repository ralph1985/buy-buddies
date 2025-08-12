import type { Product, ProductsRepository } from '../../../domain/types.js';

export class SheetsProductsRepository implements ProductsRepository {
  public readonly isMockData = false;

  constructor(private googleSheetID: string) {}

  async list(): Promise<Product[]> {
    const url = `/api/shopping/get?googleSheetId=${encodeURIComponent(this.googleSheetID)}`;
    const res = await fetch(url);
    const json = await res.json();
    return json.data as Product[];
  }
}

import type { ShoppingRepository } from '../../core/shopping/ports/shopping-repository.js';
import type { ShoppingItem } from '../../core/shopping/models/shopping-item.js';
import { items } from './items.js';

export class MockShoppingRepository implements ShoppingRepository {
  async getItems(): Promise<ShoppingItem[]> {
    return items;
  }
}

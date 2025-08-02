import type { ShoppingItem } from '../models/shopping-item.js';

export interface ShoppingRepository {
  getItems(): Promise<ShoppingItem[]>;
}

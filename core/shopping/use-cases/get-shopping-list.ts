import type { ShoppingRepository } from '../ports/shopping-repository.js';
import type { ShoppingItem } from '../models/shopping-item.js';

export async function getShoppingList(
  repo: ShoppingRepository,
): Promise<ShoppingItem[]> {
  return repo.getItems();
}

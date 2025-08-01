import { ShoppingRepository } from '../ports/shopping-repository.js';
import { ShoppingItem } from '../models/shopping-item.js';

export async function getShoppingList(
  repo: ShoppingRepository,
): Promise<ShoppingItem[]> {
  return repo.getItems();
}

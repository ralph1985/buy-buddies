import type { ShoppingRepository } from '../../core/shopping/ports/shopping-repository.js';
import type { ShoppingItem } from '../../core/shopping/models/shopping-item.js';

const items: ShoppingItem[] = [
  {
    id: '1',
    name: 'Milk',
    group: 'Kitchen',
    category: 'Dairy',
    assignedTo: 'Alice',
    bought: false,
  },
  {
    id: '2',
    name: 'Bread',
    group: 'Kitchen',
    category: 'Bakery',
    assignedTo: 'Bob',
    bought: true,
  },
];

export class MockShoppingRepository implements ShoppingRepository {
  async getItems(): Promise<ShoppingItem[]> {
    return items;
  }
}

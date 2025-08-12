import type { ShoppingItem } from '../../core/shopping/models/shopping-item.js';
import { mockProducts } from '../../src/infra/repositories/products/mockProducts.js';

export const items: ShoppingItem[] = mockProducts.map((p) => ({
  id: p.id,
  name: p.name,
  quantity: p.quantity !== undefined ? String(p.quantity) : '',
  unit: p.unit ?? '',
  group: p.group,
  category: p.category,
  notes: '',
  bought: p.bought,
}));
